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
    {
    id: "prod-007",
    slug: "nesttime-smartwatch",
    name: "NestTime Smartwatch",
    category: "Electronics",
    price: 89.99,
    originalPrice: 119.99,
    image: "/products/nesttime-smartwatch.png",
    description:
      "Complete your everyday style with a silver-tone smartwatch, a deep teal silicone strap, and a clean modern watch face.",
    stock: 16,
    featured: true,
  },
    {
    id: "prod-008",
    slug: "nestbeat-portable-speaker",
    name: "NestBeat Portable Speaker",
    category: "Electronics",
    price: 44.99,
    originalPrice: 59.99,
    image: "/products/nestbeat-portable-speaker.png",
    description:
      "Bring a fresh look to your listening setup with a compact teal speaker, woven fabric finish, ivory trim, and a carrying loop.",
    stock: 25,
    featured: false,
  },
    {
    id: "prod-009",
    slug: "nestpods-wireless-earbuds",
    name: "NestPods Wireless Earbuds",
    category: "Electronics",
    price: 54.99,
    originalPrice: 69.99,
    image: "/products/nestpods-wireless-earbuds.png",
    description:
      "Refresh your everyday listening setup with ivory earbuds, teal accents, and a compact matching charging case.",
    stock: 28,
    featured: true,
  },
    {
    id: "prod-010",
    slug: "nestkeys-wireless-keyboard",
    name: "NestKeys Wireless Keyboard",
    category: "Electronics",
    price: 64.99,
    originalPrice: 84.99,
    image: "/products/nestkeys-wireless-keyboard.png",
    description:
      "Give your desk a fresh look with a compact ivory keyboard, teal accent keys, and a brass-tone control knob.",
    stock: 19,
    featured: true,
  },
    {
    id: "prod-011",
    slug: "nestclick-wireless-mouse",
    name: "NestClick Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    originalPrice: 39.99,
    image: "/products/nestclick-wireless-mouse.png",
    description:
      "Complete your desk setup with a smooth teal wireless mouse, ivory trim, and a textured scroll wheel.",
    stock: 32,
    featured: false,
  },
    {
    id: "prod-012",
    slug: "nestwear-everyday-tshirt",
    name: "NestWear Everyday T-Shirt",
    category: "Fashion",
    price: 19.99,
    originalPrice: 27.99,
    image: "/products/nestwear-everyday-tshirt.png",
    description:
      "Keep your everyday look simple with a deep teal crew-neck T-shirt, short sleeves, and a clean casual silhouette.",
    stock: 40,
    featured: true,
  },
    {
    id: "prod-013",
    slug: "nestcozy-pullover-hoodie",
    name: "NestCozy Pullover Hoodie",
    category: "Fashion",
    price: 44.99,
    originalPrice: 59.99,
    image: "/products/nestcozy-pullover-hoodie.png",
    description:
      "Add a relaxed layer to your everyday outfit with an ivory pullover hoodie, teal hood lining, and a roomy front pocket.",
    stock: 26,
    featured: true,
  },
    {
    id: "prod-014",
    slug: "nestdenim-everyday-jeans",
    name: "NestDenim Everyday Jeans",
    category: "Fashion",
    price: 49.99,
    originalPrice: 64.99,
    image: "/products/nestdenim-everyday-jeans.png",
    description:
      "Build a timeless casual outfit with classic blue straight-leg jeans, subtle faded details, and contrast stitching.",
    stock: 23,
    featured: true,
  },
    {
    id: "prod-015",
    slug: "neststyle-casual-shirt",
    name: "NestStyle Casual Shirt",
    category: "Fashion",
    price: 34.99,
    originalPrice: 44.99,
    image: "/products/neststyle-casual-shirt.png",
    description:
      "Refresh your casual wardrobe with a sage green button-up shirt, a classic collar, ivory buttons, and a chest pocket.",
    stock: 27,
    featured: true,
  },
    {
    id: "prod-016",
    slug: "nestlayer-casual-jacket",
    name: "NestLayer Casual Jacket",
    category: "Fashion",
    price: 69.99,
    originalPrice: 89.99,
    image: "/products/nestlayer-casual-jacket.png",
    description:
      "Finish your everyday outfit with a navy bomber jacket, teal ribbed trim, a brass-tone zipper, and practical side pockets.",
    stock: 17,
    featured: true,
  },
    {
    id: "prod-017",
    slug: "nestsip-ceramic-mug",
    name: "NestSip Ceramic Mug",
    category: "Home & Living",
    price: 14.99,
    originalPrice: 19.99,
    image: "/products/nestsip-ceramic-mug.png",
    description:
      "Add a touch of colour to your coffee corner with a teal ceramic mug, an ivory interior, and a rounded handle.",
    stock: 36,
    featured: true,
  },
    {
    id: "prod-018",
    slug: "nestsoft-textured-cushion",
    name: "NestSoft Textured Cushion",
    category: "Home & Living",
    price: 22.99,
    originalPrice: 29.99,
    image: "/products/nestsoft-textured-cushion.png",
    description:
      "Refresh your favourite corner with an ivory cushion featuring teal geometric patterns, a textured finish, and tassel details.",
    stock: 29,
    featured: true,
  },
    {
    id: "prod-019",
    slug: "neststore-woven-basket",
    name: "NestStore Woven Basket",
    category: "Home & Living",
    price: 27.99,
    originalPrice: 36.99,
    image: "/products/neststore-woven-basket.png",
    description:
      "Organise your everyday essentials with an ivory woven basket, a teal base, and two convenient carrying handles.",
    stock: 21,
    featured: true,
  },
    {
    id: "prod-020",
    slug: "nestclock-minimal-wall-clock",
    name: "NestClock Minimal Wall Clock",
    category: "Home & Living",
    price: 32.99,
    originalPrice: 42.99,
    image: "/products/nestclock-minimal-wall-clock.png",
    description:
      "Give your wall a clean finishing touch with a teal-framed clock, an ivory face, and elegant brass-tone hands.",
    stock: 18,
    featured: true,
  },
    {
    id: "prod-021",
    slug: "nestbloom-ceramic-vase",
    name: "NestBloom Ceramic Vase",
    category: "Home & Living",
    price: 25.99,
    originalPrice: 34.99,
    image: "/products/nestbloom-ceramic-vase.png",
    description:
      "Add a decorative finishing touch to your shelf with an ivory ribbed ceramic vase and a rich teal glazed neck.",
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