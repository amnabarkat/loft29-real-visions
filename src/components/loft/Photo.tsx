import { useState } from "react";
import { cn } from "@/lib/utils";

type PhotoProps = {
  image: { src: string; srcSet: string; lqip: string; alt: string };
  /** CSS aspect-ratio for the fixed-size container, e.g. "3 / 4" */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Vertical focal point of the crop, e.g. "center", "top", "35%" */
  position?: string;
};

/**
 * Blur-up photograph with a fixed aspect-ratio box (no layout shift),
 * responsive srcset and lazy loading below the fold.
 */
export function Photo({
  image,
  ratio = "3 / 4",
  sizes = "100vw",
  priority = false,
  className,
  imgClassName,
  position = "center",
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden bg-secondary", className)}
      style={{ aspectRatio: ratio }}
    >
      <img
        aria-hidden="true"
        src={image.lqip}
        alt=""
        className={cn(
          "absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
        style={{ objectPosition: position }}
      />
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
        style={{ objectPosition: position }}
      />
    </div>
  );
}