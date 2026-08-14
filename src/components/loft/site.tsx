import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { loft29Images } from "@/lib/loft29-images";
import { dishImage, formatPkr } from "@/lib/menu-images";
import { useCart } from "@/context/cart";
import type { Catalog } from "@/lib/ordering.functions";

const I = loft29Images;

export const CONTACT = {
  phone: "0300 8489980",
  phoneHref: "tel:+9230008489980",
  whatsapp: "https://wa.me/03008489980",
  address: "Opposite Paragon Gate 2, Street 360, Barki Road, Lahore",
  area: "Block D, Park View CHS — Paragon City, Lahore",
  maps: "https://www.google.com/maps/search/?api=1&query=Loft+29+Lahore",
};

const NAV = [
  ["Menu", "#menu"],
  ["Reviews", "#reviews"],
  ["Events", "#events"],
  ["Contact", "#contact"],
];

const btnPrimary =
  "neon-ring inline-block rounded-xs bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5";
const btnGhost =
  "inline-block rounded-xs border border-foreground/40 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent";

/* ------------------------------------------------------------------ nav */

export function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, hydrated } = useCart();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="display text-2xl tracking-tight text-foreground md:text-3xl">
          Loft<span className="text-primary">29</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/order"
            className="rounded-xs bg-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Order Online
          </Link>
          <Link
            to="/checkout"
            aria-label="Cart"
            className="rounded-xs border border-border px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:border-accent"
          >
            Cart{hydrated && count > 0 ? ` ${count}` : ""}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-border lg:hidden"
          >
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* --------------------------------------------------------- sticky order */

export function StickyOrderCta() {
  const { count, subtotal, hydrated } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-5 py-3 backdrop-blur-xl md:hidden">
      <Link
        to={hydrated && count > 0 ? "/checkout" : "/order"}
        className="flex w-full items-center justify-center gap-3 rounded-xs bg-primary px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground"
      >
        {hydrated && count > 0 ? `Checkout · ${formatPkr(subtotal)}` : "Order Online"}
      </Link>
    </div>
  );
}

/* ----------------------------------------------------------------- hero */

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <picture>
        <source media="(max-width: 640px)" srcSet={I.hero.mobileSrc} />
        <img
          src={I.hero.src}
          srcSet={I.hero.srcSet}
          sizes="100vw"
          alt={I.hero.alt}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 45%" }}
        />
      </picture>
      <div className="absolute inset-0 night-veil" />
      <div className="absolute inset-0 bg-background/15" />

      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-20 md:px-10 md:pb-24">
          <div className="max-w-2xl">
            <p className="eyebrow reveal">Paragon City · Lahore</p>
            <h1 className="display reveal mt-5 text-[clamp(3.5rem,14vw,10rem)] text-foreground">
              Loft 29
            </h1>
            <p
              className="reveal mt-5 font-mono text-xs uppercase tracking-[0.35em] text-accent sm:text-sm"
              style={{ animationDelay: "120ms" }}
            >
              Dining • Events • Experiences
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
              <Link to="/order" className={btnPrimary}>
                Order Online
              </Link>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Loft 29 — I'd like to reserve a table.")}`}
                target="_blank"
                rel="noreferrer noopener"
                className={btnGhost}
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- order / zones */

export function OrderOnline({ zones }: { zones: Catalog["zones"] }) {
  const cart = useCart();
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState<string | null>(null);
  const zone = zones.find((z) => z.id === checked) ?? null;

  return (
    <section id="order" className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <h2 className="display text-[clamp(2.25rem,6vw,4.5rem)] text-foreground">
            Order from Loft 29.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/order" className={btnPrimary}>
              Order Online
            </Link>
            <a href="#menu" className={btnGhost}>
              View Menu
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="border border-border bg-card/40 p-6 md:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Where should we deliver?
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <select
              aria-label="Delivery area"
              value={selected}
              onChange={(e) => {
                setSelected(e.target.value);
                setChecked(null);
              }}
              className="w-full rounded-xs border border-border bg-secondary/40 px-3 py-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Enter your area…</option>
              {zones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!selected}
              onClick={() => {
                setChecked(selected);
                cart.setZoneId(selected);
              }}
              className="shrink-0 rounded-xs bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground disabled:opacity-40"
            >
              Check Delivery
            </button>
          </div>

          {checked && zone && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                ✓ We deliver here
              </p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Delivery fee · {formatPkr(zone.delivery_fee)}</li>
                <li>Minimum order · {formatPkr(zone.minimum_order)}</li>
                <li>Estimated delivery · {zone.estimated_time}</li>
              </ul>
              <Link
                to="/order"
                className="mt-6 inline-block rounded-xs border border-primary/60 bg-primary/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground hover:bg-primary/25"
              >
                View Menu
              </Link>
            </div>
          )}
          {checked && !zone && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm text-foreground">
                Sorry, we don't currently deliver to this area.
              </p>
              <button
                type="button"
                onClick={() => {
                  setChecked(null);
                  setSelected("");
                }}
                className="mt-4 rounded-xs border border-border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground"
              >
                Try Another Area
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- food */

export function Food({ items }: { items: Catalog["items"] }) {
  const cart = useCart();
  const featured = items
    .map((item) => ({ item, photo: dishImage(item.name) }))
    .filter((x) => x.photo && x.item.available)
    .slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section id="menu" className="mx-auto max-w-[1600px] px-5 pb-20 md:px-10 md:pb-28">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <h2 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground">
          From the Kitchen
        </h2>
        <Link to="/order" className={btnGhost}>
          View Full Menu
        </Link>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {featured.map(({ item, photo }, i) => (
          <Reveal key={item.id} delay={(i % 4) * 100} as="figure" className="group">
            <Photo
              image={photo!}
              ratio="1 / 1"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="lift"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
              <span>
                <span className="block text-base text-foreground">{item.name}</span>
                <span className="mt-1 block font-mono text-sm text-muted-foreground">
                  {formatPkr(item.price)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => cart.add({ id: item.id, name: item.name, price: item.price })}
                className="shrink-0 rounded-xs border border-primary/60 bg-primary/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary/25"
              >
                Add
              </button>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- reviews */

export function Reviews() {
  const sources = [
    { score: "4.2", of: "5", label: "Google", note: "857 reviews" },
    { score: "4.6", of: "5", label: "Foodpanda", note: "242 ratings" },
    { score: "5.0", of: "5", label: "TripAdvisor", note: "#124 of 631 in Lahore" },
  ];
  return (
    <section id="reviews" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2 className="display text-[clamp(2rem,5vw,4rem)] text-foreground">
            What our guests say
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {sources.map((s, i) => (
            <Reveal key={s.label} delay={i * 110} className="bg-background px-6 py-10 md:px-10">
              <p className="display text-6xl text-primary md:text-7xl">
                ★ {s.score}
                <span className="text-2xl text-muted-foreground">/{s.of}</span>
              </p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                {s.label}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Ratings as published on each platform.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- after dark */

export function AfterDark() {
  return (
    <section id="after-dark" className="relative w-full overflow-hidden">
      <div className="relative h-[85svh] min-h-[520px] w-full">
        <img
          src={I.nightBand.src}
          srcSet={I.nightBand.srcSet}
          sizes="100vw"
          alt={I.nightBand.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
            <Reveal>
              <h2 className="display max-w-3xl text-[clamp(2.75rem,8vw,7rem)] text-foreground">
                After dark,
                <br />
                Loft 29 comes alive.
              </h2>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Loft 29 — I'd like to reserve a table.")}`}
                target="_blank"
                rel="noreferrer noopener"
                className={`${btnGhost} mt-9`}
              >
                Reserve a Table
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- events */

export function Events() {
  return (
    <section id="events" className="relative w-full overflow-hidden">
      <div className="relative min-h-[80svh] w-full">
        <img
          src={I.containersNight.src}
          srcSet={I.containersNight.srcSet}
          sizes="100vw"
          alt={I.containersNight.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 40%" }}
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="relative mx-auto flex min-h-[80svh] max-w-[1600px] items-center px-5 py-24 md:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="display text-[clamp(2.5rem,7vw,6rem)] text-foreground">
              Make it
              <br />a Loft 29 moment.
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Birthdays • Anniversaries • Private Events • Celebrations
            </p>
            <a
              href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Loft 29 — I'd like to plan an event.")}`}
              target="_blank"
              rel="noreferrer noopener"
              className={`${btnPrimary} mt-9`}
            >
              Plan Your Event
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- contact */

export function Contact() {
  return (
    <section id="contact" className="relative w-full overflow-hidden border-t border-border">
      <div className="grid lg:grid-cols-2">
        <Photo
          image={I.terraceLights}
          ratio="3 / 2"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full lg:aspect-auto"
        />
        <div className="flex items-center bg-card/40 px-5 py-16 md:px-14 md:py-20">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] text-foreground">
              Contact Loft 29
            </h2>
            <dl className="mt-8 grid gap-6 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Address
                </dt>
                <dd className="mt-2 text-muted-foreground">{CONTACT.address}</dd>
                <dd className="text-muted-foreground">{CONTACT.area}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a href={CONTACT.phoneHref} className="text-muted-foreground hover:text-accent">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Hours
                </dt>
                <dd className="mt-2 text-muted-foreground">Sun – Thu · 3:00 PM – 1:30 AM</dd>
                <dd className="text-muted-foreground">Fri – Sat · 3:00 PM – 2:00 AM</dd>
              </div>
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noreferrer noopener"
                className={btnGhost}
              >
                Get Directions
              </a>
              <a href={CONTACT.phoneHref} className={btnGhost}>
                Call
              </a>
              <a
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Loft 29 — I'd like to reserve a table.")}`}
                target="_blank"
                rel="noreferrer noopener"
                className={btnPrimary}
              >
                Reserve a Table
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- footer */

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-20 md:pb-0">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-12 md:grid-cols-[1fr_auto_auto] md:px-10">
        <div>
          <p className="display text-4xl text-foreground">
            Loft<span className="text-primary">29</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{CONTACT.address}</p>
          <a
            href={CONTACT.phoneHref}
            className="mt-2 block font-mono text-sm text-accent hover:underline"
          >
            {CONTACT.phone}
          </a>
        </div>

        <nav className="grid gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/order" className="hover:text-accent">
            Order Online
          </Link>
          <a href="#menu" className="hover:text-accent">
            Menu
          </a>
          <a href="#events" className="hover:text-accent">
            Events
          </a>
          <a href="#contact" className="hover:text-accent">
            Contact
          </a>
          <a href={CONTACT.maps} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
            Location
          </a>
        </nav>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>Sun – Thu · 3 PM – 1:30 AM</p>
          <p className="mt-2">Fri – Sat · 3 PM – 2 AM</p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 block hover:text-accent"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:px-10">
        © {new Date().getFullYear()} Loft 29 · Paragon City, Lahore
      </div>
    </footer>
  );
}
