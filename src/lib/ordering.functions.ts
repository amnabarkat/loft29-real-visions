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

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: settings } = await supabaseAdmin
      .from("restaurant_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (!settings) throw new Error("Ordering is temporarily unavailable.");
    if (!settings.accepting_orders)
      throw new Error("Loft 29 is not accepting online orders right now.");
    if (data.paymentMethod === "cod" && !settings.cod_enabled)
      throw new Error("Cash on delivery is currently unavailable.");
    if (data.paymentMethod === "bank_transfer" && !settings.bank_transfer_enabled)
      throw new Error("Bank transfer is currently unavailable.");

    const { data: zone } = await supabaseAdmin
      .from("delivery_zones")
      .select("*")
      .eq("id", data.zoneId)
      .maybeSingle();
    if (!zone || !zone.active) throw new Error("We do not deliver to that area yet.");

    const ids = [...new Set(data.items.map((i) => i.id))];
    const { data: menuItems } = await supabaseAdmin
      .from("menu_items")
      .select("id, name, price, available")
      .in("id", ids);

    const byId = new Map((menuItems ?? []).map((m) => [m.id, m]));
    const lines = data.items.map((line) => {
      const item = byId.get(line.id);
      if (!item) throw new Error("One of the items is no longer on the menu.");
      if (!item.available) throw new Error(`${item.name} is currently sold out.`);
      return {
        menu_item_id: item.id,
        name_snapshot: item.name,
        price_snapshot: item.price,
        quantity: line.quantity,
        subtotal: item.price * line.quantity,
      };
    });

    const subtotal = lines.reduce((sum, l) => sum + l.subtotal, 0);
    if (subtotal < zone.minimum_order)
      throw new Error(
        `Minimum order for ${zone.name} is Rs. ${zone.minimum_order.toLocaleString("en-PK")}.`,
      );

    const taxAmount = settings.tax_enabled ? Math.round((subtotal * Number(settings.tax_rate)) / 100) : 0;
    const serviceCharge = settings.service_charge_enabled
      ? Math.round((subtotal * Number(settings.service_charge_rate)) / 100)
      : 0;
    const packagingFee = settings.packaging_fee_enabled ? settings.packaging_fee : 0;
    const total = subtotal + zone.delivery_fee + taxAmount + serviceCharge + packagingFee;

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customerName,
        phone: data.phone,
        email: data.email || null,
        zone_id: zone.id,
        zone_name: zone.name,
        delivery_address: data.address,
        house: data.house || null,
        floor: data.floor || null,
        landmark: data.landmark || null,
        instructions: data.instructions || null,
        estimated_time: zone.estimated_time,
        subtotal,
        delivery_fee: zone.delivery_fee,
        tax_amount: taxAmount,
        service_charge: serviceCharge,
        packaging_fee: packagingFee,
        total,
        payment_method: data.paymentMethod,
      })
      .select("id, order_number, total, estimated_time")
      .single();
    if (error || !order) throw new Error("We couldn't save your order. Please try again.");

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(lines.map((l) => ({ ...l, order_id: order.id })));
    if (itemsError) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error("We couldn't save your order items. Please try again.");
    }

    await supabaseAdmin
      .from("order_status_events")
      .insert({ order_id: order.id, status: "new", note: "Order placed online" });

    return {
      id: order.id,
      orderNumber: order.order_number,
      total: order.total,
      estimatedTime: order.estimated_time,
    };
  });

export const getOrderStatus = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select(
        "id, order_number, customer_name, zone_name, delivery_address, estimated_time, subtotal, delivery_fee, tax_amount, service_charge, packaging_fee, total, payment_method, payment_status, order_status, created_at",
      )
      .eq("id", data.id)
      .maybeSingle();
    if (!order) return null;

    const [{ data: items }, { data: events }] = await Promise.all([
      supabaseAdmin
        .from("order_items")
        .select("name_snapshot, price_snapshot, quantity, subtotal")
        .eq("order_id", order.id),
      supabaseAdmin
        .from("order_status_events")
        .select("status, note, created_at")
        .eq("order_id", order.id)
        .order("created_at"),
    ]);

    return { order, items: items ?? [], events: events ?? [] };
  });
