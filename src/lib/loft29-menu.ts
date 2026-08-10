// Loft 29 menu — transcribed from the restaurant's live listing (Foodpanda vendor u8mn).
// Dishes and prices are the restaurant's own; nothing here is invented.

export type MenuCategory = { name: string; items: { name: string; price: number }[] };

export const loft29Menu: MenuCategory[] = [
  {
    "name": "Appetizers",
    "items": [
      {
        "name": "French Fries",
        "price": 899
      },
      {
        "name": "Chicago Fire Fries",
        "price": 999
      },
      {
        "name": "Sesame Honey Wings",
        "price": 999
      },
      {
        "name": "Korean Fried Chicken",
        "price": 1299
      },
      {
        "name": "Mac And Cheese Ball",
        "price": 1399
      },
      {
        "name": "Dynamite Shrimp",
        "price": 1799
      },
      {
        "name": "Tempura Prawns",
        "price": 2399
      },
      {
        "name": "Fish And Chips",
        "price": 2299
      }
    ]
  },
  {
    "name": "Soups",
    "items": [
      {
        "name": "Thai Clear Soap",
        "price": 699
      },
      {
        "name": "Seafood Chowder Soup",
        "price": 899
      },
      {
        "name": "Hot And Sour Soup",
        "price": 699
      },
      {
        "name": "Cream Of Mushroom Soup",
        "price": 899
      },
      {
        "name": "Loft Special Soup",
        "price": 999
      }
    ]
  },
  {
    "name": "Salads",
    "items": [
      {
        "name": "Caesar Salad",
        "price": 1399
      },
      {
        "name": "Signature Prawn Salad",
        "price": 1499
      }
    ]
  },
  {
    "name": "From the Wok",
    "items": [
      {
        "name": "Loft Signature Chicken",
        "price": 2199
      },
      {
        "name": "Sesame Crusted Chicken",
        "price": 2199
      },
      {
        "name": "Mongolian Chicken",
        "price": 2199
      },
      {
        "name": "Chilli Dry",
        "price": 2199
      },
      {
        "name": "Cashewnut Chicken",
        "price": 2199
      },
      {
        "name": "Kung Pao Chicken",
        "price": 2199
      },
      {
        "name": "SunTzu",
        "price": 2199
      },
      {
        "name": "Crispy Honey Chicken",
        "price": 2199
      }
    ]
  },
  {
    "name": "Mains",
    "items": [
      {
        "name": "Parmesan Chicken",
        "price": 2199
      },
      {
        "name": "Stuffed Chicken",
        "price": 2199
      },
      {
        "name": "Bellagio Chicken",
        "price": 1999
      },
      {
        "name": "Mushroom Roulade",
        "price": 2199
      },
      {
        "name": "Swiss Polo",
        "price": 2199
      },
      {
        "name": "Moroccan Chicken",
        "price": 2499
      }
    ]
  },
  {
    "name": "Sea Food",
    "items": [
      {
        "name": "Sesame crusted Prawn",
        "price": 1850
      },
      {
        "name": "Fish Cashewnut",
        "price": 1850
      },
      {
        "name": "Kung Pao Prawns",
        "price": 1850
      },
      {
        "name": "Crispy Honey Prawn",
        "price": 1850
      }
    ]
  },
  {
    "name": "Beef",
    "items": [
      {
        "name": "Sesame Beef",
        "price": 1750
      },
      {
        "name": "Mongolian Beef",
        "price": 1850
      },
      {
        "name": "Cashew Nuts Beef",
        "price": 1850
      },
      {
        "name": "Beef Chilli Dry",
        "price": 1750
      }
    ]
  },
  {
    "name": "Noodles",
    "items": [
      {
        "name": "Chicken Chowmein",
        "price": 1599
      },
      {
        "name": "Beef Diablo Noodles",
        "price": 1799
      }
    ]
  },
  {
    "name": "Sandwiches",
    "items": [
      {
        "name": "Supreme Chicken Sandwich",
        "price": 1799
      },
      {
        "name": "Club Sandwich",
        "price": 1699
      },
      {
        "name": "Roasted Beef Sandwich",
        "price": 1899
      }
    ]
  },
  {
    "name": "Burgers",
    "items": [
      {
        "name": "Grilled Beef Burger",
        "price": 1699
      },
      {
        "name": "Double Decker Burger",
        "price": 1999
      },
      {
        "name": "Crispy Fried Chicken Burger",
        "price": 1399
      },
      {
        "name": "Stuffed Chicken Burger",
        "price": 1499
      }
    ]
  },
  {
    "name": "Platters",
    "items": [
      {
        "name": "Beef Steak Platter",
        "price": 3599
      },
      {
        "name": "Sea Food Platter",
        "price": 3699
      },
      {
        "name": "Grilled Chicken Fillet Platter",
        "price": 2999
      }
    ]
  },
  {
    "name": "Steaks",
    "items": [
      {
        "name": "Loft Signature Beef Steak",
        "price": 3899
      },
      {
        "name": "Black Pepper Beef Steak",
        "price": 3499
      },
      {
        "name": "Wild Mushroom Beef Steak",
        "price": 3599
      }
    ]
  },
  {
    "name": "Pasta",
    "items": [
      {
        "name": "Penne Arrabiata",
        "price": 1899
      },
      {
        "name": "Fettuccine Alfredo Pasta",
        "price": 1999
      },
      {
        "name": "Fettucine Florentine Pasta",
        "price": 1899
      }
    ]
  },
  {
    "name": "Beverages",
    "items": [
      {
        "name": "Lemonade",
        "price": 595
      },
      {
        "name": "Mint Margarita",
        "price": 595
      },
      {
        "name": "Cold Coffee",
        "price": 795
      },
      {
        "name": "Aquafina Water - 500 ml",
        "price": 195
      },
      {
        "name": "Nutella Shake",
        "price": 895
      },
      {
        "name": "Cappuccino",
        "price": 795
      },
      {
        "name": "Tea",
        "price": 595
      },
      {
        "name": "Red Bull 250 ml",
        "price": 995
      },
      {
        "name": "Aquafina Water - 1.5 Litre",
        "price": 295
      },
      {
        "name": "Kiwi Fruit Mojito",
        "price": 795
      },
      {
        "name": "Strawberry Fruit Mojito",
        "price": 795
      },
      {
        "name": "Passion Fruit Mojito With Strawberry",
        "price": 795
      },
      {
        "name": "Raspberry Lemonade with Blue Lagoon",
        "price": 795
      },
      {
        "name": "Peach Iced Tea",
        "price": 695
      },
      {
        "name": "Americano",
        "price": 695
      }
    ]
  }
];
