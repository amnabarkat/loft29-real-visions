import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getCatalog, placeOrder, type Catalog } from "@/lib/ordering.functions";
import { OrderShell, Field, inputClass } from "@/components/loft/order-shell";
import { useCart } from "@/context/cart";
import { formatPkr } from "@/lib/menu-images";
import { toast } from "sonner";

const title = "Checkout — Loft 29 Delivery, Lahore";
const description =
  "Confirm your Loft 29 delivery order: address, area, payment method and live totals with delivery fee.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => getCatalog(),
  component: CheckoutPage,
  errorComponent: () => (
    <OrderShell>
      <p className="py-24 text-center text-sm text-muted-foreground">
        Checkout didn't load. Please refresh.
      </p>
    </OrderShell>
  ),
  notFoundComponent: () => (
    <OrderShell>
      <p className="py-24 text-center text-sm text-muted-foreground">Not found.</p>
    </OrderShell>
  ),
});

function CheckoutPage() {
  const { zones, settings } = Route.useLoaderData() as Catalog;
  const cart = useCart();
  const navigate = useNavigate();
  const submit = useServerFn(placeOrder);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    house: "",
    floor: "",
    landmark: "",
    instructions: "",
    paymentMethod: "cod" as "cod" | "bank_transfer",
  });

  const zone = zones.find((z) => z.id === cart.zoneId) ?? null;
  const deliveryFee = zone?.delivery_fee ?? 0;
  const tax = settings?.tax_enabled ? Math.round((cart.subtotal * Number(settings.tax_rate)) / 100) : 0;
  const service = settings?.service_charge_enabled
    ? Math.round((cart.subtotal * Number(settings.service_charge_rate)) / 100)
    : 0;
  const packaging = settings?.packaging_fee_enabled ? (settings.packaging_fee ?? 0) : 0;
  const total = cart.subtotal + deliveryFee + tax + service + packaging;
  const belowMinimum = zone ? cart.subtotal < zone.minimum_order : false;

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cart.zoneId) {
      toast.error("Please pick your delivery area.");
      return;
    }
    if (cart.lines.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setBusy(true);
    try {
      const res = await submit({
        data: {
          ...form,
          zoneId: cart.zoneId,
          items: cart.lines.map((l) => ({ id: l.id, quantity: l.quantity })),
        },
      });
      cart.clear();
      toast.success(`Order ${res.orderNumber} placed`);
      navigate({ to: "/order-status/$id", params: { id: res.id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "We couldn't place your order.");
    } finally {
      setBusy(false);
    }
  }

  if (cart.hydrated && cart.lines.length === 0) {
    return (
      <OrderShell>
        <div className="py-24 text-center">
          <h1 className="display text-4xl text-foreground">Your cart is empty</h1>
          <Link
            to="/order"
            className="mt-6 inline-block rounded-xs bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
          >
            Browse the menu
          </Link>
        </div>
      </OrderShell>
    );
  }

  return (
    <OrderShell>
      <h1 className="display text-[clamp(2.5rem,7vw,4rem)] text-foreground">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name">
              <input required className={inputClass} value={form.customerName} onChange={set("customerName")} />
            </Field>
            <Field label="Phone">
              <input required className={inputClass} value={form.phone} onChange={set("phone")} placeholder="03xx xxxxxxx" />
            </Field>
          </div>
          <Field label="Email (optional)">
            <input type="email" className={inputClass} value={form.email} onChange={set("email")} />
          </Field>
          <Field label="Delivery area">
            <select
              className={inputClass}
              value={cart.zoneId ?? ""}
              onChange={(e) => cart.setZoneId(e.target.value || null)}
              required
            >
              <option value="">Select your area…</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Address">
            <textarea required rows={3} className={inputClass} value={form.address} onChange={set("address")} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="House / Flat">
              <input className={inputClass} value={form.house} onChange={set("house")} />
            </Field>
            <Field label="Floor">
              <input className={inputClass} value={form.floor} onChange={set("floor")} />
            </Field>
            <Field label="Landmark">
              <input className={inputClass} value={form.landmark} onChange={set("landmark")} />
            </Field>
          </div>
          <Field label="Instructions">
            <textarea rows={2} className={inputClass} value={form.instructions} onChange={set("instructions")} />
          </Field>

          <fieldset className="border border-border p-4">
            <legend className="px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Payment
            </legend>
            <div className="space-y-3">
              {settings?.cod_enabled && (
                <label className="flex items-center gap-3 text-sm text-foreground">
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === "cod"}
                    onChange={() => setForm((f) => ({ ...f, paymentMethod: "cod" }))}
                  />
                  Cash on delivery
                </label>
              )}
              {settings?.bank_transfer_enabled && (
                <label className="flex items-start gap-3 text-sm text-foreground">
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === "bank_transfer"}
                    onChange={() => setForm((f) => ({ ...f, paymentMethod: "bank_transfer" }))}
                  />
                  <span>
                    Bank transfer
                    {settings.bank_transfer_instructions && (
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {settings.bank_transfer_instructions}
                      </span>
                    )}
                  </span>
                </label>
              )}
            </div>
          </fieldset>
        </div>

        <aside className="h-fit border border-border bg-secondary/30 p-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Your order
          </h2>
          <ul className="mt-4 space-y-3">
            {cart.lines.map((l) => (
              <li key={l.id} className="flex items-start justify-between gap-4 text-sm">
                <span className="text-foreground">
                  {l.quantity} × {l.name}
                </span>
                <span className="shrink-0 font-mono text-muted-foreground">
                  {formatPkr(l.price * l.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
            <Row label="Subtotal" value={formatPkr(cart.subtotal)} />
            <Row label="Delivery" value={zone ? formatPkr(deliveryFee) : "—"} />
            {tax > 0 && <Row label="Tax" value={formatPkr(tax)} />}
            {service > 0 && <Row label="Service" value={formatPkr(service)} />}
            {packaging > 0 && <Row label="Packaging" value={formatPkr(packaging)} />}
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Total
            </span>
            <span className="text-xl text-foreground">{formatPkr(total)}</span>
          </div>
          {zone && (
            <p className="mt-3 text-xs text-muted-foreground">
              {zone.name} · {zone.estimated_time} · minimum {formatPkr(zone.minimum_order)}
            </p>
          )}
          {belowMinimum && (
            <p className="mt-3 text-xs text-destructive">
              Add {formatPkr(zone!.minimum_order - cart.subtotal)} more to meet the minimum order.
            </p>
          )}
          <button
            type="submit"
            disabled={busy || belowMinimum || !settings?.accepting_orders}
            className="mt-5 w-full rounded-xs bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Placing order…" : "Place order"}
          </button>
          {!settings?.accepting_orders && (
            <p className="mt-3 text-xs text-destructive">Online ordering is paused right now.</p>
          )}
        </aside>
      </form>
    </OrderShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}