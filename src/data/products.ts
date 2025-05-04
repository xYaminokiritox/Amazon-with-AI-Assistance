
import { Product, Category } from "../types";

export const products: Product[] = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 398.00,
    description: "Industry-leading noise canceling headphones with Auto Noise Canceling Optimizer, precise voice pickup technology, and long battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.8,
      count: 1550
    }
  },
  {
    id: "2",
    title: "Apple MacBook Air M2 Chip (13-inch, 8GB RAM, 256GB SSD)",
    price: 999.00,
    description: "Strikingly thin design, incredible performance with the M2 chip, up to 18 hours of battery life, and a stunning Liquid Retina display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2000&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.7,
      count: 1230
    }
  },
  {
    id: "3",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 89.99,
    description: "Combines 7 kitchen appliances in one: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    category: "home",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=2071&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.6,
      count: 85000
    }
  },
  {
    id: "4",
    title: "Samsung 65-Inch Class QLED 4K Smart TV (QN65Q60A)",
    price: 949.99,
    description: "Experience 100% Color Volume with Quantum Dot technology, Quantum HDR, and AirSlim design. Powered by Tizen Smart TV.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.5,
      count: 3200
    }
  },
  {
    id: "5",
    title: "Levi's Men's 501 Original Fit Jeans",
    price: 59.50,
    description: "The iconic straight fit jean with an all-American style. Features a button fly and sits at the waist.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=1974&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.4,
      count: 15000
    }
  },
  {
    id: "6",
    title: "Canon EOS R6 Mark II Mirrorless Camera Body",
    price: 2499.00,
    description: "High-performance full-frame mirrorless camera with 24.2MP sensor, advanced autofocus, and 6K RAW video recording.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.9,
      count: 450
    }
  },
  {
    id: "7",
    title: "Fitbit Charge 5 Advanced Fitness & Health Tracker",
    price: 149.95,
    description: "Optimize your routine with Daily Readiness Score, track stress with EDA Scan app, monitor heart health with ECG app & SpO2.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.3,
      count: 25000
    }
  },
  {
    id: "8",
    title: "Keurig K-Elite Single-Serve K-Cup Pod Coffee Maker",
    price: 139.99,
    description: "Brews multiple K-Cup pod sizes (4, 6, 8, 10, 12 oz). Features Strong Brew button, iced setting, and large 75oz water reservoir.",
    category: "home",
    image: "https://images.unsplash.com/photo-1565452344118-476f7839aadd?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.6,
      count: 35000
    }
  },
  {
    id: "9",
    title: "Bose SoundLink Revolve+ Portable Bluetooth Speaker",
    price: 329.00,
    description: "Delivers deep, loud, and immersive sound with true 360-degree coverage. Up to 17 hours of playtime from a rechargeable battery.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2031&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.7,
      count: 18000
    }
  },
  {
    id: "10",
    title: "Ninja AF101 Air Fryer, 4 Quart Capacity",
    price: 99.99,
    description: "Enjoy guilt-free food with up to 75% less fat than traditional frying methods. Wide temperature range: 105°F–400°F.",
    category: "home",
    image: "https://images.unsplash.com/photo-1606991201860-44adf14eec64?q=80&w=1974&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.8,
      count: 45000
    }
  },
  {
    id: "11",
    title: "Hydro Flask Standard Mouth Water Bottle with Flex Cap, 24 oz",
    price: 34.95,
    description: "Keeps beverages cold up to 24 hours and hot up to 12 hours. Durable 18/8 Pro-Grade Stainless Steel construction.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.8,
      count: 55000
    }
  },
  {
    id: "12",
    title: "Casper Original Mattress, Queen Size",
    price: 1095.00,
    description: "Zoned Support™ for alignment and comfort. AirScape™ layer helps prevent overheating. Made with durable, resilient foam.",
    category: "home",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.5,
      count: 12000
    }
  },
  {
    id: "13",
    title: "Logitech MX Master 3S Wireless Performance Mouse",
    price: 99.99,
    description: "Ultra-fast MagSpeed scrolling, ergonomic design, 8K DPI sensor tracks anywhere, quiet clicks, and customizable buttons.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.7,
      count: 9500
    }
  },
  {
    id: "14",
    title: "Anker PowerCore 10000 Portable Charger",
    price: 25.99,
    description: "One of the smallest and lightest 10000mAh portable chargers. Provides almost three-and-a-half iPhone 8 charges.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.6,
      count: 75000
    }
  },
  {
    id: "15",
    title: "Dyson V11 Torque Drive Cordless Vacuum Cleaner",
    price: 599.99,
    description: "Intelligently optimizes suction and run time. High Torque cleaner head automatically adapts to different floor types.",
    category: "home",
    image: "https://images.unsplash.com/photo-1575024358667-e9b514b1106f?q=80&w=1974&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.7,
      count: 11000
    }
  },
  {
    id: "16",
    title: "KitchenAid Artisan Series 5 Quart Tilt-Head Stand Mixer",
    price: 449.95,
    description: "Choose from over 20 different colors. 10-speed settings. Includes flat beater, dough hook, and wire whip.",
    category: "home",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1968&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.9,
      count: 28000
    }
  },
  {
    id: "17",
    title: "Patagonia Men's Better Sweater Quarter-Zip Fleece",
    price: 119.00,
    description: "Made of 100% recycled polyester fleece with a sweater-knit face, fleece interior and heathered yarns.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1964&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.8,
      count: 6500
    }
  },
  {
    id: "18",
    title: "Weber Spirit II E-310 3-Burner Liquid Propane Grill",
    price: 549.00,
    description: "GS4 Grilling System, porcelain-enameled cast-iron cooking grates, and built-in lid thermometer.",
    category: "home", // Could also be 'outdoor' or 'garden'
    image: "https://images.unsplash.com/photo-1595107888384-235f66219d54?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.7,
      count: 4200
    }
  },
  {
    id: "19",
    title: "Apple Watch Series 8 [GPS 41mm] Smart Watch",
    price: 399.00,
    description: "Advanced health sensors including temperature sensing, ECG, and Blood Oxygen. Crash Detection and Fall Detection safety features.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.8,
      count: 11500
    }
  },
  {
    id: "20",
    title: "Amazon Echo Dot (5th Gen) Smart speaker with Alexa",
    price: 49.99,
    description: "Our best sounding Echo Dot yet - clearer vocals, deeper bass, and vibrant sound. Control compatible smart home devices.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1626542200038-9a870a6f6750?q=80&w=2070&auto=format&fit=crop", // Placeholder image
    rating: {
      rate: 4.7,
      count: 150000
    }
  }
];

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e1af847d3961?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1576723648995-57a07515c6dd?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "backpacks", // Kept for consistency with original data, though fewer items fit now
    name: "Backpacks & Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb68c6a62?q=80&w=1974&auto=format&fit=crop"
  }
];
