
import { Product, Category } from "../types";

export const products: Product[] = [
  {
    id: "1",
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "backpacks",
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=2013&auto=format&fit=crop",
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: "2",
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=2070&auto=format&fit=crop",
    rating: {
      rate: 4.1,
      count: 259
    }
  },
  {
    id: "3",
    title: "Wireless Noise Cancelling Headphones",
    price: 199.99,
    description: "Experience the best in audio with these premium noise cancelling headphones, featuring 30-hour battery life and comfortable over-ear design.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    rating: {
      rate: 4.8,
      count: 342
    }
  },
  {
    id: "4",
    title: "Smart LED TV 55-inch 4K Ultra HD",
    price: 499.99,
    description: "Immerse yourself in stunning 4K picture quality with this smart TV featuring built-in streaming apps and voice control.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop",
    rating: {
      rate: 4.6,
      count: 128
    }
  },
  {
    id: "5",
    title: "Non-Stick Cooking Set with 10 Pieces",
    price: 89.99,
    description: "Complete cookware set with non-stick coating, includes pots, pans, and utensils for all your cooking needs.",
    category: "home",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=2071&auto=format&fit=crop",
    rating: {
      rate: 4.3,
      count: 89
    }
  },
  {
    id: "6",
    title: "Professional DSLR Camera with 24MP Sensor",
    price: 799.99,
    description: "Capture stunning photos and videos with this professional-grade camera featuring a high-resolution sensor and advanced autofocus.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    rating: {
      rate: 4.9,
      count: 217
    }
  },
  {
    id: "7",
    title: "Luxury Watch with Stainless Steel Band",
    price: 299.95,
    description: "Elegant timepiece featuring precision quartz movement, water resistance, and durable stainless steel construction.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    rating: {
      rate: 4.7,
      count: 156
    }
  },
  {
    id: "8",
    title: "Portable Bluetooth Speaker Waterproof",
    price: 59.95,
    description: "Take your music anywhere with this compact, waterproof speaker offering 12 hours of playback and rich, immersive sound.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2031&auto=format&fit=crop",
    rating: {
      rate: 4.4,
      count: 231
    }
  }
];

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2701&auto=format&fit=crop"
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "backpacks",
    name: "Backpacks",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2070&auto=format&fit=crop"
  }
];
