import { createFileRoute } from "@tanstack/react-router";
import { getCatalog, type Catalog } from "@/lib/ordering.functions";
import {
  SiteNav,
  StickyOrderCta,
  Hero,
  OrderOnline,
  Food,
  Reviews,
  AfterDark,
  Events,
  Contact,
  SiteFooter,
  CONTACT,
} from "@/components/loft/site";

const title = "Loft 29 — Order Online | Restaurant in Paragon City, Lahore";
const description =
  "Order food online from Loft 29, Paragon City, Lahore. Check delivery in your area, browse the menu, and book a table. Open 3 PM till late.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant.restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => getCatalog(),
  component: Index,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Loft 29",
  description,
  servesCuisine: ["Continental", "Western", "Fast Food"],
  priceRange: "$$",
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite Paragon Gate 2, Street 360, Barki Road",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
};

function Index() {
  const { items, zones } = Route.useLoaderData() as Catalog;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <OrderOnline zones={zones} />
        <Food items={items} />
        <Reviews />
        <AfterDark />
        <Events />
        <Contact />
      </main>
      <SiteFooter />
      <StickyOrderCta />
    </>
  );
}
