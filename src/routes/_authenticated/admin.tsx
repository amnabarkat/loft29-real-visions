import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { OrderShell } from "@/components/loft/order-shell";
import { formatPkr } from "@/lib/menu-images";
import { toast } from "sonner";

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  zone_name: string;
  delivery_address: string;
  house: string | null;
  floor: string | null;
  landmark: string | null;
  instructions: string | null;
  total: number;
  payment_method: string;
  order_status: string;
  created_at: string;
};

type Item = { order_id: string; name_snapshot: string; quantity: number; subtotal: number };
type MenuItem = { id: string; name: string; price: number; available: boolean; category_id: string };

const TABS: { key: string; label: string }[] = [
  { key: "new", label: "New" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

const NEXT: Record<string, string> = {
  new: "preparing",
  preparing: "out_for_delivery",
  out_for_delivery: "delivered",
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Order Dashboard — Loft 29" },
      { name: "description", content: "Loft 29 staff dashboard for live orders and menu availability." },
      { property: "og:title", content: "Order Dashboard — Loft 29" },
      { property: "og:description", content: "Live orders and menu availability for Loft 29 staff." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function beep() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.value = 0.08;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    /* audio is a nice-to-have */
  }
}

function AdminPage() {
  const [tab, setTab] = useState("new");
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [accepting, setAccepting] = useState(true);
  const firstLoad = useRef(true);

  const load = useCallback(async () => {
    const [{ data: o }, { data: m }, { data: s }] = await Promise.all([
      supabase
        .from("orders")
        .select(
          "id, order_number, customer_name, phone, zone_name, delivery_address, house, floor, landmark, instructions, total, payment_method, order_status, created_at",
        )
        .order("created_at", { ascending: false })
        .limit(200),
      supabase.from("menu_items").select("id, name, price, available, category_id").order("sort_order"),
      supabase.from("restaurant_settings").select("accepting_orders").eq("id", 1).maybeSingle(),
    ]);
    setOrders((o ?? []) as Order[]);
    setMenu((m ?? []) as MenuItem[]);
    if (s) setAccepting(s.accepting_orders);
    const ids = (o ?? []).map((x) => x.id);
    if (ids.length) {
      const { data: it } = await supabase
        .from("order_items")
        .select("order_id, name_snapshot, quantity, subtotal")
        .in("order_id", ids);
      setItems((it ?? []) as Item[]);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase.rpc("has_role", {
        _user_id: user.user.id,
        _role: "admin",
      });
      setIsAdmin(Boolean(data));
      if (data) await load();
    })();
  }, [load]);

  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        if (payload.eventType === "INSERT" && !firstLoad.current) {
          const row = payload.new as Order;
          beep();
          toast.success(`New order ${row.order_number}`, {
            description: `${row.customer_name} · ${row.zone_name} · ${formatPkr(row.total)}`,
          });
        }
        firstLoad.current = false;
        void load();
      })
      .subscribe();
    firstLoad.current = false;
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isAdmin, load]);

  const visible = useMemo(() => orders.filter((o) => o.order_status === tab), [orders, tab]);
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const o of orders) c[o.order_status] = (c[o.order_status] ?? 0) + 1;
    return c;
  }, [orders]);

  async function advance(order: Order, status: string) {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", order.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase.from("order_status_events").insert({ order_id: order.id, status });
    toast.success(`${order.order_number} → ${status.replace(/_/g, " ")}`);
    void load();
  }

  async function toggleItem(item: MenuItem) {
    const { error } = await supabase
      .from("menu_items")
      .update({ available: !item.available })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setMenu((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, available: !item.available } : m)),
    );
  }

  async function toggleAccepting() {
    const { error } = await supabase
      .from("restaurant_settings")
      .update({ accepting_orders: !accepting })
      .eq("id", 1);
    if (error) {
      toast.error(error.message);
      return;
    }
    setAccepting((v) => !v);
  }

  if (isAdmin === null) {
    return (
      <OrderShell>
        <p className="py-24 text-center text-sm text-muted-foreground">Loading dashboard…</p>
      </OrderShell>
    );
  }

  if (!isAdmin) {
    return (
      <OrderShell>
        <div className="py-24 text-center">
          <h1 className="display text-4xl text-foreground">Staff access only</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This account doesn't have dashboard permissions.
          </p>
          <button
            type="button"
            onClick={() => supabase.auth.signOut().then(() => window.location.assign("/auth"))}
            className="mt-6 rounded-xs border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground"
          >
            Sign out
          </button>
        </div>
      </OrderShell>
    );
  }

  return (
    <OrderShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <h1 className="display truncate text-3xl text-foreground sm:text-4xl">Order dashboard</h1>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleAccepting}
            className={`rounded-xs border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
              accepting ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground"
            }`}
          >
            {accepting ? "Accepting orders" : "Orders paused"}
          </button>
          <button
            type="button"
            onClick={() => supabase.auth.signOut().then(() => window.location.assign("/auth"))}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-xs border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
              tab === t.key
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            {t.label}
            {counts[t.key] ? ` · ${counts[t.key]}` : ""}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {visible.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No orders here.</p>
        )}
        {visible.map((o) => (
          <article key={o.id} className="border border-border bg-secondary/20 p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {o.order_number} · {new Date(o.created_at).toLocaleString("en-PK")}
                </p>
                <h2 className="mt-1 truncate text-lg text-foreground">
                  {o.customer_name} · {o.phone}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {o.zone_name} — {o.delivery_address}
                  {o.house ? `, ${o.house}` : ""}
                  {o.floor ? `, floor ${o.floor}` : ""}
                  {o.landmark ? `, near ${o.landmark}` : ""}
                </p>
                {o.instructions && (
                  <p className="mt-1 text-xs text-muted-foreground">Note: {o.instructions}</p>
                )}
                <ul className="mt-3 space-y-1 text-sm text-foreground">
                  {items
                    .filter((i) => i.order_id === o.id)
                    .map((i, idx) => (
                      <li key={idx}>
                        {i.quantity} × {i.name_snapshot} — {formatPkr(i.subtotal)}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xl text-foreground">{formatPkr(o.total)}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {o.payment_method === "cod" ? "Cash" : "Bank"}
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {NEXT[o.order_status] && (
                    <button
                      type="button"
                      onClick={() => advance(o, NEXT[o.order_status]!)}
                      className="rounded-xs bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground"
                    >
                      Mark {NEXT[o.order_status]!.replace(/_/g, " ")}
                    </button>
                  )}
                  {o.order_status !== "delivered" && o.order_status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => advance(o, "cancelled")}
                      className="rounded-xs border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="display text-2xl text-foreground">Menu availability</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleItem(m)}
              className={`flex items-center justify-between gap-3 border px-4 py-3 text-left text-sm ${
                m.available ? "border-border text-foreground" : "border-destructive/50 text-muted-foreground"
              }`}
            >
              <span className="min-w-0 truncate">{m.name}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em]">
                {m.available ? "Available" : "Sold out"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </OrderShell>
  );
}