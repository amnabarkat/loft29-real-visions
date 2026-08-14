// Centralised image configuration for Loft 29.
// Every photograph below is authentic Loft 29 photography:
//  - Venue photography: visitor photographs of Loft 29, Lahore (TripAdvisor listing d23113291)
//  - Food photography: Loft 29's own official menu photography (Foodpanda vendor u8mn)
// Images were only resized, converted to WebP and lightly graded (contrast/saturation).
// No AI-generated or stock imagery is used anywhere on this site.

export type Loft29Image = { src: string; srcSet: string; lqip: string; alt: string };

export const loft29Images = {
  "hero": {
    "src": "/images/hero-2400.webp",
    "srcSet": "/images/hero-1000.webp 1000w, /images/hero-1600.webp 1600w, /images/hero-2400.webp 2400w",
    "lqip": "/images/hero-lqip.webp",
    "alt": "Loft 29 in Lahore at night: stacked shipping containers framed in green steel, glass dining rooms glowing magenta and purple above a lantern-lit deck and reflecting pool",
    "mobileSrc": "/images/hero-mobile-1200.webp",
    "mobileLqip": "/images/hero-mobile-lqip.webp"
  },
  "nightBand": {
    "src": "/images/night-band-2000.webp",
    "srcSet": "/images/night-band-1200.webp 1200w, /images/night-band-2000.webp 2000w",
    "lqip": "/images/night-band-lqip.webp",
    "alt": "Loft 29 after dark, the container facade and neon signage glowing across the walkway"
  },
  "exteriorNeon": {
    "src": "/images/exterior-neon-1800.webp",
    "srcSet": "/images/exterior-neon-800.webp 800w, /images/exterior-neon-1200.webp 1200w, /images/exterior-neon-1800.webp 1800w",
    "lqip": "/images/exterior-neon-lqip.webp",
    "alt": "Loft 29's stacked shipping-container facade lit in green and magenta at night, with the LOFT 29 neon sign glowing beside the walkway"
  },
  "exteriorSignage": {
    "src": "/images/exterior-signage-1800.webp",
    "srcSet": "/images/exterior-signage-800.webp 800w, /images/exterior-signage-1200.webp 1200w, /images/exterior-signage-1800.webp 1800w",
    "lqip": "/images/exterior-signage-lqip.webp",
    "alt": "The illuminated LOFT 29 sign in front of the restaurant's two-storey container structure surrounded by planting"
  },
  "facadeWide": {
    "src": "/images/facade-wide-1200.webp",
    "srcSet": "/images/facade-wide-800.webp 800w, /images/facade-wide-1200.webp 1200w",
    "lqip": "/images/facade-wide-lqip.webp",
    "alt": "Wide night view of the full Loft 29 building, its steel frame and glass dining boxes glowing above the lawn"
  },
  "lawnPool": {
    "src": "/images/lawn-pool-1800.webp",
    "srcSet": "/images/lawn-pool-800.webp 800w, /images/lawn-pool-1200.webp 1200w, /images/lawn-pool-1800.webp 1800w",
    "lqip": "/images/lawn-pool-lqip.webp",
    "alt": "Loft 29's outdoor deck and water feature washed in purple and magenta light, with open-air seating and palms"
  },
  "containersNight": {
    "src": "/images/containers-night-1800.webp",
    "srcSet": "/images/containers-night-800.webp 800w, /images/containers-night-1200.webp 1200w, /images/containers-night-1800.webp 1800w",
    "lqip": "/images/containers-night-lqip.webp",
    "alt": "Red and magenta lighting across the Loft 29 lawn with the container dining levels behind"
  },
  "firepit": {
    "src": "/images/firepit-1800.webp",
    "srcSet": "/images/firepit-800.webp 800w, /images/firepit-1200.webp 1200w, /images/firepit-1800.webp 1800w",
    "lqip": "/images/firepit-lqip.webp",
    "alt": "An open fire pit burning on the patterned terrace at Loft 29 under red ambient light"
  },
  "terraceLights": {
    "src": "/images/terrace-lights-800.webp",
    "srcSet": "/images/terrace-lights-720.webp 720w, /images/terrace-lights-800.webp 800w",
    "lqip": "/images/terrace-lights-lqip.webp",
    "alt": "Covered outdoor seating at Loft 29 with festoon string lights strung above the tables"
  },
  "food": [
    {
      "name": "Loft Signature Beef Steak",
      "category": "Steaks",
      "price": 3899,
      "src": "/images/food-loft-signature-beef-steak-1000.webp",
      "srcSet": "/images/food-loft-signature-beef-steak-600.webp 600w, /images/food-loft-signature-beef-steak-1000.webp 1000w",
      "lqip": "/images/food-loft-signature-beef-steak-lqip.webp",
      "alt": "Loft Signature Beef Steak as served at Loft 29, Lahore"
    },
    {
      "name": "Parmesan Chicken",
      "category": "Mains",
      "price": 2199,
      "src": "/images/food-parmesan-chicken-1000.webp",
      "srcSet": "/images/food-parmesan-chicken-600.webp 600w, /images/food-parmesan-chicken-1000.webp 1000w",
      "lqip": "/images/food-parmesan-chicken-lqip.webp",
      "alt": "Parmesan Chicken as served at Loft 29, Lahore"
    },
    {
      "name": "Fettuccine Alfredo Pasta",
      "category": "Pasta",
      "price": 1999,
      "src": "/images/food-fettuccine-alfredo-pasta-1000.webp",
      "srcSet": "/images/food-fettuccine-alfredo-pasta-600.webp 600w, /images/food-fettuccine-alfredo-pasta-1000.webp 1000w",
      "lqip": "/images/food-fettuccine-alfredo-pasta-lqip.webp",
      "alt": "Fettuccine Alfredo Pasta as served at Loft 29, Lahore"
    },
    {
      "name": "Penne Arrabiata",
      "category": "Pasta",
      "price": 1899,
      "src": "/images/food-penne-arrabiata-1000.webp",
      "srcSet": "/images/food-penne-arrabiata-600.webp 600w, /images/food-penne-arrabiata-1000.webp 1000w",
      "lqip": "/images/food-penne-arrabiata-lqip.webp",
      "alt": "Penne Arrabiata as served at Loft 29, Lahore"
    },
    {
      "name": "Cream of Mushroom Soup",
      "category": "Soups",
      "price": 899,
      "src": "/images/food-cream-of-mushroom-soup-1000.webp",
      "srcSet": "/images/food-cream-of-mushroom-soup-600.webp 600w, /images/food-cream-of-mushroom-soup-1000.webp 1000w",
      "lqip": "/images/food-cream-of-mushroom-soup-lqip.webp",
      "alt": "Cream of Mushroom Soup as served at Loft 29, Lahore"
    },
    {
      "name": "Dynamite Shrimp",
      "category": "Appetizers",
      "price": 1799,
      "src": "/images/food-dynamite-shrimp-1000.webp",
      "srcSet": "/images/food-dynamite-shrimp-600.webp 600w, /images/food-dynamite-shrimp-1000.webp 1000w",
      "lqip": "/images/food-dynamite-shrimp-lqip.webp",
      "alt": "Dynamite Shrimp as served at Loft 29, Lahore"
    },
    {
      "name": "Korean Fried Chicken",
      "category": "Appetizers",
      "price": 1299,
      "src": "/images/food-korean-fried-chicken-1000.webp",
      "srcSet": "/images/food-korean-fried-chicken-600.webp 600w, /images/food-korean-fried-chicken-1000.webp 1000w",
      "lqip": "/images/food-korean-fried-chicken-lqip.webp",
      "alt": "Korean Fried Chicken as served at Loft 29, Lahore"
    },
    {
      "name": "Sea Food Platter",
      "category": "Platters",
      "price": 3699,
      "src": "/images/food-sea-food-platter-1000.webp",
      "srcSet": "/images/food-sea-food-platter-600.webp 600w, /images/food-sea-food-platter-1000.webp 1000w",
      "lqip": "/images/food-sea-food-platter-lqip.webp",
      "alt": "Sea Food Platter as served at Loft 29, Lahore"
    },
    {
      "name": "Kung Pao Chicken",
      "category": "From the Wok",
      "price": 2199,
      "src": "/images/food-kung-pao-chicken-1000.webp",
      "srcSet": "/images/food-kung-pao-chicken-600.webp 600w, /images/food-kung-pao-chicken-1000.webp 1000w",
      "lqip": "/images/food-kung-pao-chicken-lqip.webp",
      "alt": "Kung Pao Chicken as served at Loft 29, Lahore"
    },
    {
      "name": "Double Decker Burger",
      "category": "Burgers",
      "price": 1999,
      "src": "/images/food-double-decker-burger-1000.webp",
      "srcSet": "/images/food-double-decker-burger-600.webp 600w, /images/food-double-decker-burger-1000.webp 1000w",
      "lqip": "/images/food-double-decker-burger-lqip.webp",
      "alt": "Double Decker Burger as served at Loft 29, Lahore"
    },
    {
      "name": "Caesar Salad",
      "category": "Salads",
      "price": 1399,
      "src": "/images/food-caesar-salad-1000.webp",
      "srcSet": "/images/food-caesar-salad-600.webp 600w, /images/food-caesar-salad-1000.webp 1000w",
      "lqip": "/images/food-caesar-salad-lqip.webp",
      "alt": "Caesar Salad as served at Loft 29, Lahore"
    },
    {
      "name": "Signature Prawn Salad",
      "category": "Salads",
      "price": 1499,
      "src": "/images/food-signature-prawn-salad-1000.webp",
      "srcSet": "/images/food-signature-prawn-salad-600.webp 600w, /images/food-signature-prawn-salad-1000.webp 1000w",
      "lqip": "/images/food-signature-prawn-salad-lqip.webp",
      "alt": "Signature Prawn Salad as served at Loft 29, Lahore"
    },
    {
      "name": "Beef Steak Platter",
      "category": "Platters",
      "price": 3599,
      "src": "/images/food-beef-steak-platter-1000.webp",
      "srcSet": "/images/food-beef-steak-platter-600.webp 600w, /images/food-beef-steak-platter-1000.webp 1000w",
      "lqip": "/images/food-beef-steak-platter-lqip.webp",
      "alt": "Beef Steak Platter as served at Loft 29, Lahore"
    },
    {
      "name": "Chicago Fire Fries",
      "category": "Appetizers",
      "price": 999,
      "src": "/images/food-chicago-fire-fries-1000.webp",
      "srcSet": "/images/food-chicago-fire-fries-600.webp 600w, /images/food-chicago-fire-fries-1000.webp 1000w",
      "lqip": "/images/food-chicago-fire-fries-lqip.webp",
      "alt": "Chicago Fire Fries as served at Loft 29, Lahore"
    },
    {
      "name": "Sesame Honey Wings",
      "category": "Appetizers",
      "price": 999,
      "src": "/images/food-sesame-honey-wings-1000.webp",
      "srcSet": "/images/food-sesame-honey-wings-600.webp 600w, /images/food-sesame-honey-wings-1000.webp 1000w",
      "lqip": "/images/food-sesame-honey-wings-lqip.webp",
      "alt": "Sesame Honey Wings as served at Loft 29, Lahore"
    },
    {
      "name": "Mint Margarita",
      "category": "Beverages",
      "price": 595,
      "src": "/images/food-mint-margarita-1000.webp",
      "srcSet": "/images/food-mint-margarita-600.webp 600w, /images/food-mint-margarita-1000.webp 1000w",
      "lqip": "/images/food-mint-margarita-lqip.webp",
      "alt": "Mint Margarita as served at Loft 29, Lahore"
    },
    {
      "name": "Nutella Shake",
      "category": "Beverages",
      "price": 895,
      "src": "/images/food-nutella-shake-1000.webp",
      "srcSet": "/images/food-nutella-shake-600.webp 600w, /images/food-nutella-shake-1000.webp 1000w",
      "lqip": "/images/food-nutella-shake-lqip.webp",
      "alt": "Nutella Shake as served at Loft 29, Lahore"
    }
  ]
} as const;
