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
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}