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
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}