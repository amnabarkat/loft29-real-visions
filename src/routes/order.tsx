import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getCatalog, type Catalog } from "@/lib/ordering.functions";
import { OrderShell, Field, inputClass } from "@/components/loft/order-shell";
import { useCart } from "@/context/cart";
import { formatPkr } from "@/lib/menu-images";
import { Photo } from "@/components/loft/Photo";

const title = "Order Online — Loft 29 Paragon City, Lahore";
const description =
  "Order Loft 29 steaks, burgers, pasta and platters for delivery across Paragon City and East Lahore. Live menu, area-based delivery fees, cash on delivery.";

export const Route = createFileRoute("/order")({
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
  component: OrderPage,
  errorComponent: () => (
    <OrderShell>
      <p className="py-24 text-center text-sm text-muted-foreground">
        The menu didn't load. Please refresh.
      </p>
    </OrderShell>
  ),
  notFoundComponent: () => (
    <OrderShell>
      <p className="py-24 text-center text-sm text-muted-foreground">Not found.</p>
    </OrderShell>
  ),
});

function OrderPage() {
  const { categories, items, zones, settings } = Route.useLoaderData() as Catalog;
  const cart = useCart();
  const [active, setActive] = useState<string>(categories[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const zone = zones.find((z) => z.id === cart.zoneId) ?? null;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) return items.filter((i) => i.name.toLowerCase().includes(q));
    return items.filter((i) => i.category_id === active);
  }, [items, active, query]);

  return (
    <OrderShell>
      <h1 className="display text-[clamp(2.5rem,7vw,4.5rem)] text-foreground">Order Online</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Delivery across Paragon City and East Lahore. Pick your area to see the delivery fee and
        minimum order.
      </p>

      {!settings?.accepting_orders && (
        <p className="mt-6 border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
          We're not accepting online orders right now. Call {""}
          <a className="text-accent" href="tel:+923222132221">
            +92 322 2132221
          </a>
          .
        </p>
      )}

      <div className="mt-8 grid gap-4 border border-border bg-secondary/30 p-5 md:grid-cols-[1fr_1fr]">
        <Field label="Delivery area">
          <select
            className={inputClass}
            value={cart.zoneId ?? ""}
            onChange={(e) => cart.setZoneId(e.target.value || null)}
          >
            <option value="">Select your area…</option>
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
          </select>
        </Field>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {zone ? (
            <ul className="space-y-1.5 pt-7">
              <li>Delivery fee · {formatPkr(zone.delivery_fee)}</li>
              <li>Minimum order · {formatPkr(zone.minimum_order)}</li>
              <li>ETA · {zone.estimated_time}</li>
              {zone.sub_areas.length > 0 && (
                <li className="normal-case tracking-normal text-muted-foreground/80">
                  Covers: {zone.sub_areas.join(", ")}
                </li>
              )}
            </ul>
          ) : (
            <p className="pt-7">Choose an area to check eligibility.</p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActive(c.id);
                setQuery("");
              }}
              className={`shrink-0 rounded-xs border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                !query && active === c.id
                  ? "border-primary bg-primary/20 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <input
          className={`${inputClass} md:max-w-xs`}
          placeholder="Search the menu"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {visible.map((item) => {
          const line = cart.lines.find((l) => l.id === item.id);
          return (
            <li key={item.id} className="flex items-start gap-4 py-5">
              {item.image_src && item.image_lqip ? (
                <div className="w-[70px] shrink-0 sm:w-[96px]">
                  <Photo
                    image={{
                      src: item.image_src,
                      srcSet: item.image_srcset ?? item.image_src,
                      lqip: item.image_lqip,
                      alt: `Loft 29 ${item.name}`,
                    }}
                    ratio="1 / 1"
                    sizes="96px"
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-medium text-foreground">{item.name}</h2>
                {item.description && (
                  <p className="mt-1 max-w-prose text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
                <p className="mt-2 font-mono text-sm text-accent">{formatPkr(item.price)}</p>
              </div>
              <div className="shrink-0 pt-1">
                  {!item.available ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Sold out
                    </span>
                  ) : line ? (
                    <div className="flex items-center gap-3 border border-border">
                      <button
                        type="button"
                        aria-label={`Remove one ${item.name}`}
                        className="px-3 py-1.5 text-foreground"
                        onClick={() => cart.setQuantity(item.id, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="font-mono text-sm text-foreground">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Add one ${item.name}`}
                        className="px-3 py-1.5 text-foreground"
                        onClick={() => cart.setQuantity(item.id, line.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        cart.add({ id: item.id, name: item.name, price: item.price })
                      }
                      className="rounded-xs border border-primary/60 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary/25"
                    >
                      Add
                    </button>
                  )}
              </div>
            </li>
          );
        })}
      </ul>

      {cart.hydrated && cart.count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {cart.count} item{cart.count > 1 ? "s" : ""}
              </p>
              <p className="text-lg text-foreground">{formatPkr(cart.subtotal)}</p>
            </div>
            <Link
              to="/checkout"
              className="rounded-xs bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </OrderShell>
  );
}