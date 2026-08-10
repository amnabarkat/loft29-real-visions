import { loft29Images, type Loft29Image } from "./loft29-images";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

const byName = new Map<string, Loft29Image>(
  loft29Images.food.map((f) => [
    norm(f.name),
    { src: f.src, srcSet: f.srcSet, lqip: f.lqip, alt: f.alt },
  ]),
);

/** Authentic Loft 29 dish photography, matched by dish name. */
export function dishImage(name: string): Loft29Image | null {
  return byName.get(norm(name)) ?? null;
}

export const formatPkr = (paisaFreeRupees: number) =>
  `Rs. ${paisaFreeRupees.toLocaleString("en-PK")}`;
