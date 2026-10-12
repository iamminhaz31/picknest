export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  stock: number;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "nestsound-wireless-headphones",
    name: "NestSound Wireless Headphones",
    category: "Electronics",
    price: 79.99,
    originalPrice: 99.99,
    image: "/products/nestsound-headphones.png",
    description:
      "Enjoy your everyday playlists with comfortable over-ear cushions and a clean teal-and-cream design.",
    stock: 24,
    featured: true,
  },
  {
    id: "prod-002",
    slug: "neststep-everyday-sneakers",
    name: "NestStep Everyday Sneakers",
    category: "Fashion",
    price: 59.99,
    originalPrice: 74.99,
    image: "/products/neststep-sneakers.png",
    description:
      "Refresh your everyday look with ivory-and-teal sneakers, textured panels, and a comfortable casual silhouette.",
    stock: 18,
    featured: true,
  },
    {
    id: "prod-003",
    slug: "nestglow-ceramic-table-lamp",
    name: "NestGlow Ceramic Table Lamp",
    category: "Home & Living",
    price: 49.99,
    originalPrice: 64.99,
    image: "/products/nestglow-table-lamp.png",
    description:
      "Bring a warm finishing touch to your space with an ivory ceramic table lamp, a dome shade, and elegant brass-tone details.",
    stock: 15,
    featured: true,
  },
    {
    id: "prod-004",
    slug: "nestcare-daily-serum",
    name: "NestCare Daily Serum",
    category: "Beauty",
    price: 24.99,
    originalPrice: 29.99,
    image: "/products/nestcare-daily-serum.png",
    description:
      "A skincare-inspired demo product presented in an amber glass bottle with a teal-and-ivory dropper.",
    stock: 30,
    featured: true,
  },
    {
    id: "prod-005",
    slug: "nestmove-yoga-mat",
    name: "NestMove Yoga Mat",
    category: "Sports",
    price: 34.99,
    originalPrice: 44.99,
    image: "/products/nestmove-yoga-mat.png",
    description:
      "Make space for your daily movement with a textured teal yoga mat and an ivory carrying strap.",
    stock: 20,
    featured: true,
  },
    {
    id: "prod-006",
    slug: "nestcarry-crossbody-bag",
    name: "NestCarry Crossbody Bag",
    category: "Accessories",
    price: 39.99,
    originalPrice: 49.99,
    image: "/products/nestcarry-crossbody-bag.png",
    description:
      "Keep your everyday essentials close with a compact teal crossbody bag, an adjustable strap, and brass-tone details.",
    stock: 22,
    featured: true,
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}