import { createFileRoute } from "@tanstack/react-router";
import {
  SiteNav,
  Hero,
  Experience,
  Architecture,
  AfterDark,
  Food,
  Events,
  Gallery,
  Reviews,
  Reserve,
  Location,
  SiteFooter,
  CONTACT,
} from "@/components/loft/site";

const title = "Loft 29 — Container Dining & Nights in Paragon City, Lahore";
const description =
  "Loft 29 is a two-storey shipping-container restaurant in Paragon City, Lahore. Continental plates, steaks and late nights on the lawn. Open 3 PM till late.";

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <Experience />
        <Architecture />
        <AfterDark />
        <Food />
        <Events />
        <Gallery />
        <Reviews />
        <Reserve />
        <Location />
      </main>
      <SiteFooter />
    </>
  );
}
