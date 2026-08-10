import { useEffect, useState } from "react";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { loft29Images } from "@/lib/loft29-images";
import { loft29Menu } from "@/lib/loft29-menu";

const I = loft29Images;

export const CONTACT = {
  phone: "+92 322 2132221",
  phoneHref: "tel:+923222132221",
  whatsapp: "https://wa.me/923222132221",
  address: "Opposite Paragon Gate 2, Street 360, Barki Road, Lahore",
  area: "Block D, Park View CHS — Paragon City, Lahore",
  maps: "https://www.google.com/maps/search/?api=1&query=Loft+29+Lahore",
};

const NAV = [
  ["The Space", "#space"],
  ["After Dark", "#after-dark"],
  ["Menu", "#menu"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["Find Us", "#location"],
];

/* ------------------------------------------------------------------ nav */

export function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

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
          <a
            href="#reserve"
            className="hidden rounded-xs border border-primary/60 bg-primary/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-primary/25 sm:inline-block"
          >
            Reserve
          </a>
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
          {NAV.concat([["Reserve", "#reserve"]]).map(([label, href]) => (
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
        <div className="mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 md:pb-24">
          <div className="max-w-2xl">
            <p className="eyebrow reveal">Paragon City · Lahore</p>
            <h1 className="display reveal mt-5 text-[clamp(3.5rem,14vw,10rem)] text-foreground">
              Loft 29
            </h1>
            <p
              className="reveal mt-5 font-mono text-xs uppercase tracking-[0.35em] text-accent sm:text-sm"
              style={{ animationDelay: "120ms" }}
            >
              Dining. Events. Nights.
            </p>
            <div
              className="reveal mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "220ms" }}
            >
              <a
                href="#menu"
                className="neon-ring rounded-xs bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Explore Menu
              </a>
              <a
                href="#reserve"
                className="rounded-xs border border-foreground/40 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                Reserve
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- experience */

export function Experience() {
  const stats = [
    ["4.2★", "857 Google reviews"],
    ["4.6★", "242 Foodpanda ratings"],
    ["3 PM – 2 AM", "Open late, every night"],
  ];
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">The Loft 29 Experience</p>
          <h2 className="display mt-6 text-[clamp(2.5rem,6vw,5rem)] text-foreground">
            A stack of steel
            <br />
            and glass, on grass.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Shipping containers framed in green steel, lifted over a lawn, a water feature and a
            deck. Glass dining rooms on the upper level, open-air tables below, and colour that
            changes with the hour.
          </p>
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-3 gap-px self-end bg-border">
          {stats.map(([big, small]) => (
            <div key={small} className="bg-background px-3 py-8 sm:px-5">
              <p className="display text-xl text-accent sm:text-3xl">{big}</p>
              <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
                {small}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- architecture */

export function Architecture() {
  return (
    <section id="space" className="relative mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-40">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <p className="eyebrow">02 — The Space</p>
          <h2 className="display mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground">
            Architecture you
            <br />
            walk through.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Two levels, cantilevered boxes, exposed bracing and full-height glass — photographed on
          site, exactly as it stands.
        </p>
      </Reveal>

      <div className="relative grid gap-8 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-8 md:col-start-5">
          <figure>
            <Photo
              image={I.exteriorNeon}
              ratio="4 / 5"
              sizes="(max-width: 768px) 100vw, 70vw"
              className="lift"
              position="50% 60%"
            />
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              The container facade at night
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={120} className="md:col-span-4 md:col-start-1 md:row-start-1 md:mt-32">
          <figure>
            <Photo
              image={I.facadeWide}
              ratio="4 / 3"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="lift"
            />
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Elevated dining boxes, full building
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={200} className="md:col-span-5 md:col-start-2 md:-mt-24">
          <figure>
            <Photo
              image={I.exteriorSignage}
              ratio="3 / 4"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="lift"
              position="50% 55%"
            />
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Signage and structure detail
            </figcaption>
          </figure>
        </Reveal>
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
              <p className="eyebrow">03 — After Dark</p>
              <h2 className="display mt-6 max-w-3xl text-[clamp(2.75rem,8vw,7rem)] text-foreground">
                After dark,
                <br />
                Loft 29 comes alive.
              </h2>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-5 px-5 py-20 md:grid-cols-3 md:gap-6 md:px-10 md:py-28">
        {[I.lawnPool, I.containersNight, I.firepit].map((img, i) => (
          <Reveal key={img.src} delay={i * 110}>
            <Photo
              image={img}
              ratio="3 / 4"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="lift"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- food */

export function Food() {
  const featured = I.food.slice(0, 6);
  return (
    <section id="menu" className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-36">
      <Reveal className="mb-12 md:mb-20">
        <p className="eyebrow">04 — The Menu</p>
        <h2 className="display mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground">
          Continental, wok
          <br />
          and open flame.
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {featured.map((dish, i) => (
          <Reveal key={dish.name} delay={(i % 3) * 110} as="figure" className="group">
            <Photo
              image={dish}
              ratio="4 / 3"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="lift"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-4">
              <span>
                <span className="block text-base text-foreground">{dish.name}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {dish.category}
                </span>
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                Rs.{dish.price.toLocaleString("en-PK")}
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <FullMenu />
    </section>
  );
}

function FullMenu() {
  const [openCat, setOpenCat] = useState<string | null>(loft29Menu[0]?.name ?? null);

  return (
    <div className="mt-20 border-t border-border pt-14 md:mt-28">
      <p className="eyebrow">The full list</p>
      <div className="mt-8 grid gap-x-16 gap-y-2 lg:grid-cols-2">
        {loft29Menu.map((cat) => {
          const open = openCat === cat.name;
          return (
            <div key={cat.name} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpenCat(open ? null : cat.name)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="display text-xl text-foreground md:text-2xl">{cat.name}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {open ? "—" : `+${cat.items.length}`}
                </span>
              </button>
              {open && (
                <ul className="pb-6">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between gap-6 py-1.5 text-sm"
                    >
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-mono text-xs text-foreground/70">
                        Rs.{item.price.toLocaleString("en-PK")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- events */

export function Events() {
  return (
    <section id="events" className="relative w-full overflow-hidden">
      <div className="relative min-h-[90svh] w-full">
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
        <div className="relative mx-auto flex min-h-[90svh] max-w-[1600px] items-center px-5 py-24 md:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">05 — Events</p>
            <h2 className="display mt-6 text-[clamp(2.5rem,7vw,6rem)] text-foreground">
              Make it
              <br />a Loft 29 moment.
            </h2>
            <ul className="mt-10 grid max-w-md grid-cols-2 gap-px bg-border">
              {["Birthdays", "Anniversaries", "Private Events", "Celebrations"].map((x) => (
                <li
                  key={x}
                  className="bg-background/70 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm"
                >
                  {x}
                </li>
              ))}
            </ul>
            <a
              href="#reserve"
              className="neon-ring mt-10 inline-block rounded-xs bg-primary px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Plan your event
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- gallery */

export function Gallery() {
  const shots = [
    I.lawnPool,
    I.exteriorSignage,
    I.firepit,
    I.terraceLights,
    I.exteriorNeon,
    I.facadeWide,
    I.containersNight,
    ...I.food.slice(6, 14),
  ];

  return (
    <section id="gallery" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <Reveal className="mb-12 md:mb-16">
        <p className="eyebrow">06 — Gallery</p>
        <h2 className="display mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground">
          Every frame, real.
        </h2>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {shots.length} photographs of Loft 29 — the venue as guests have shot it, and the
          restaurant's own dish photography. Nothing generated, nothing borrowed.
        </p>
      </Reveal>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {shots.map((img, i) => (
          <Reveal key={img.src + i} delay={(i % 4) * 80} as="figure" className="break-inside-avoid">
            <Photo
              image={img}
              ratio={i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "1 / 1" : "4 / 5"}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- reviews */

export function Reviews() {
  const sources = [
    { score: "4.2", of: "5", label: "Google", note: "857 reviews · Block D, Park View CHS" },
    { score: "4.6", of: "5", label: "Foodpanda", note: "242 ratings · Continental & Western" },
    { score: "5.0", of: "5", label: "TripAdvisor", note: "#124 of 631 restaurants in Lahore" },
  ];
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow">07 — What guests rate it</p>
        </Reveal>
        <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
          {sources.map((s, i) => (
            <Reveal key={s.label} delay={i * 110} className="bg-background px-6 py-12 md:px-10">
              <p className="display text-6xl text-primary md:text-7xl">
                {s.score}
                <span className="text-2xl text-muted-foreground">/{s.of}</span>
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                {s.label}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Ratings as published on each platform.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- reserve */

export function Reserve() {
  const [form, setForm] = useState({ name: "", guests: "2", date: "", time: "20:00", note: "" });

  const message = encodeURIComponent(
    `Hi Loft 29 — I'd like to book a table.\nName: ${form.name || "-"}\nGuests: ${form.guests}\nDate: ${
      form.date || "-"
    }\nTime: ${form.time}\n${form.note ? `Note: ${form.note}` : ""}`,
  );

  const field =
    "w-full border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

  return (
    <section id="reserve" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">08 — Reservations</p>
          <h2 className="display mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] text-foreground">
            Hold a table
            <br />
            under the containers.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Send us the details and we'll confirm on WhatsApp. For large groups and event setups,
            call us directly.
          </p>
          <a
            href={CONTACT.phoneHref}
            className="mt-8 inline-block font-mono text-lg tracking-[0.1em] text-accent hover:underline"
          >
            {CONTACT.phone}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.open(`${CONTACT.whatsapp}?text=${message}`, "_blank", "noopener");
            }}
            className="grid gap-6"
          >
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className={field}
              />
            </label>
            <div className="grid gap-6 sm:grid-cols-3">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Guests
                </span>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Date
                </span>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Time
                </span>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className={field}
                />
              </label>
            </div>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Occasion / notes
              </span>
              <input
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Birthday setup, outdoor table…"
                className={field}
              />
            </label>
            <button
              type="submit"
              className="neon-ring mt-2 justify-self-start rounded-xs bg-primary px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Send on WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- location */

export function Location() {
  return (
    <section id="location" className="relative w-full overflow-hidden border-t border-border">
      <div className="grid lg:grid-cols-2">
        <Photo
          image={I.terraceLights}
          ratio="3 / 2"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="h-full w-full lg:aspect-auto"
        />
        <div className="flex items-center bg-card/40 px-5 py-20 md:px-14">
          <Reveal>
            <p className="eyebrow">09 — Find us</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] text-foreground">
              Paragon City,
              <br />
              Lahore.
            </h2>
            <dl className="mt-10 grid gap-7 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Address
                </dt>
                <dd className="mt-2 text-muted-foreground">{CONTACT.address}</dd>
                <dd className="text-muted-foreground">{CONTACT.area}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Hours
                </dt>
                <dd className="mt-2 text-muted-foreground">Sun – Thu · 3:00 PM – 1:30 AM</dd>
                <dd className="text-muted-foreground">Fri – Sat · 3:00 PM – 2:00 AM</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  Contact
                </dt>
                <dd className="mt-2">
                  <a href={CONTACT.phoneHref} className="text-muted-foreground hover:text-accent">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
            </dl>
            <a
              href={CONTACT.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-10 inline-block rounded-xs border border-foreground/40 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Open in Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- footer */

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="display text-4xl text-foreground">
            Loft<span className="text-primary">29</span>
          </p>
          <p className="mt-3 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
            All photography on this site is of the actual Loft 29 in Lahore.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          © {new Date().getFullYear()} Loft 29 · Paragon City, Lahore
        </p>
      </div>
    </footer>
  );
}