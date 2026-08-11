import { createFileRoute, Link } from "@tanstack/react-router";
import { getOrderStatus } from "@/lib/ordering.functions";
import { OrderShell } from "@/components/loft/order-shell";
import { formatPkr } from "@/lib/menu-images";

const STEPS = ["new", "preparing", "out_for_delivery", "delivered"] as const;
const LABEL: Record<string, string> = {
  new: "Order received",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const title = "Order Status — Loft 29";
const description = "Track your Loft 29 delivery order in real time, from kitchen to doorstep.";

export const Route = createFileRoute("/order-status/$id")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ params }) => getOrderStatus({ data: { id: params.id } }),
  component: StatusPage,
  errorComponent: () => (
    <OrderShell>
      <p className="py-24 text-center text-sm text-muted-foreground">
        We couldn't load this order.
      </p>
    </OrderShell>
  ),
  notFoundComponent: () => (
    <OrderShell>
      <p className="py-24 text-center text-sm text-muted-foreground">Order not found.</p>
    </OrderShell>
  ),
});

function StatusPage() {
  const data = Route.useLoaderData();

  if (!data) {
    return (
      <OrderShell>
        <div className="py-24 text-center">
          <h1 className="display text-4xl text-foreground">Order not found</h1>
          <Link to="/order" className="mt-6 inline-block text-sm text-accent">
            Back to the menu
          </Link>
        </div>
      </OrderShell>
    );
  }

  const { order, items, events } = data;
  const currentIndex = STEPS.indexOf(order.order_status as (typeof STEPS)[number]);

  return (
    <OrderShell>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {order.order_number}
      </p>
      <h1 className="display mt-3 text-[clamp(2.2rem,6vw,3.5rem)] text-foreground">
        {LABEL[order.order_status] ?? order.order_status}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {order.zone_name} · ETA {order.estimated_time}
      </p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] ${
              i <= currentIndex
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border text-muted-foreground"
            }`}
          >
            {LABEL[s]}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="border border-border bg-secondary/20 p-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Items
          </h2>
          <ul className="mt-4 space-y-3">
            {items.map((it, i) => (
              <li key={i} className="flex justify-between text-sm text-foreground">
                <span>
                  {it.quantity} × {it.name_snapshot}
                </span>
                <span className="font-mono text-muted-foreground">{formatPkr(it.subtotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPkr(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd>{formatPkr(order.delivery_fee)}</dd>
            </div>
            <div className="flex justify-between text-foreground">
              <dt>Total</dt>
              <dd>{formatPkr(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            {order.payment_method === "cod" ? "Cash on delivery" : "Bank transfer"} ·{" "}
            {order.payment_status}
          </p>
        </div>

        <div className="border border-border bg-secondary/20 p-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Timeline
          </h2>
          <ul className="mt-4 space-y-4">
            {events.map((e, i) => (
              <li key={i} className="text-sm">
                <p className="text-foreground">{LABEL[e.status] ?? e.status}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(e.created_at).toLocaleString("en-PK")}
                  {e.note ? ` · ${e.note}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">
            Delivering to {order.delivery_address}
          </p>
        </div>
      </div>
    </OrderShell>
  );
}