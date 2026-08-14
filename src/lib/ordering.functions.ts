import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

type T = Database["public"]["Tables"];
export type OrderStatusData = {
  order: Pick<
    T["orders"]["Row"],
    | "id"
    | "order_number"
    | "customer_name"
    | "zone_name"
    | "delivery_address"
    | "estimated_time"
    | "subtotal"
    | "delivery_fee"
    | "tax_amount"
    | "service_charge"
    | "packaging_fee"
    | "total"
    | "payment_method"
    | "payment_status"
    | "order_status"
    | "created_at"
  >;
  items: Pick<T["order_items"]["Row"], "name_snapshot" | "price_snapshot" | "quantity" | "subtotal">[];
  events: Pick<T["order_status_events"]["Row"], "status" | "note" | "created_at">[];
} | null;

export type Catalog = {
  categories: T["menu_categories"]["Row"][];
  items: T["menu_items"]["Row"][];
  zones: T["delivery_zones"]["Row"][];
  settings: T["restaurant_settings"]["Row"] | null;
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [categories, items, zones, settings] = await Promise.all([
    supabase.from("menu_categories").select("*").order("sort_order"),
    supabase.from("menu_items").select("*").order("sort_order"),
    supabase.from("delivery_zones").select("*").eq("active", true).order("sort_order"),
    supabase.from("restaurant_settings").select("*").eq("id", 1).maybeSingle(),
  ]);

  return {
    categories: categories.data ?? [],
    items: items.data ?? [],
    zones: zones.data ?? [],
    settings: settings.data,
  };
});

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(10)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  zoneId: z.string().trim().min(1).max(60),
  address: z.string().trim().min(6).max(300),
  house: z.string().trim().max(80).optional().or(z.literal("")),
  floor: z.string().trim().max(80).optional().or(z.literal("")),
  landmark: z.string().trim().max(120).optional().or(z.literal("")),
  instructions: z.string().trim().max(500).optional().or(z.literal("")),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
  items: z
    .array(z.object({ id: z.string().min(1).max(80), quantity: z.number().int().min(1).max(50) }))
    .min(1)
    .max(60),
});

export type PlaceOrderInput = z.infer<typeof orderSchema>;

function rpcMessage(error: { message: string } | null, fallback: string) {
  const raw = error?.message?.trim();
  if (!raw) return fallback;
  return raw.replace(/^[A-Z0-9]+:\s*/, "").replace(/^ERROR:\s*/i, "") || fallback;
}

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: result, error } = await supabase.rpc("place_order", {
      payload: {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || "",
        zoneId: data.zoneId,
        address: data.address,
        house: data.house || "",
        floor: data.floor || "",
        landmark: data.landmark || "",
        instructions: data.instructions || "",
        paymentMethod: data.paymentMethod,
        items: data.items,
      },
    });
    if (error || !result) {
      throw new Error(rpcMessage(error, "We couldn't save your order. Please try again."));
    }

    const placed = result as {
      id: string;
      orderNumber: string;
      total: number;
      estimatedTime: string;
    };
    return {
      id: placed.id,
      orderNumber: placed.orderNumber,
      total: placed.total,
      estimatedTime: placed.estimatedTime,
    };
  });

export const getOrderStatus = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: result, error } = await supabase.rpc("get_order_status", { _id: data.id });
    if (error) throw new Error(rpcMessage(error, "We couldn't load this order."));
    return (result as OrderStatusData) ?? null;
  });
