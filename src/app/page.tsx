import Link from "next/link";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import ProductCard from "./components/ProductCard";
import { products } from "@/app/data/products";

const categories = [
  { name: "Electronics", icon: "⌘" },
  { name: "Fashion", icon: "✦" },
  { name: "Home & Living", icon: "⌂" },
  { name: "Beauty", icon: "❋" },
  { name: "Sports", icon: "◎" },
  { name: "Accessories", icon: "◇" },
];

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured);

  const discountedProducts = products
    .filter(
      (product) =>
        product.originalPrice !== undefined &&
        product.originalPrice > product.price,
    )
    .slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6">
      <div className="grid items-stretch gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden overflow-hidden rounded-2xl border border-border bg-surface lg:block">
          <h2 className="border-b border-border bg-muted px-5 py-4 text-sm font-bold">
            Shop by Category
          </h2>

          <nav aria-label="Shop by category" className="p-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${encodeURIComponent(
                  category.name,
                )}`}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-lg text-foreground"
                >
                  {category.icon}
                </span>

                <span className="flex-1">{category.name}</span>

                <span
                  aria-hidden="true"
                  className="text-muted-foreground transition group-hover:translate-x-1"
                >
                  ›
                </span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <Hero />
        </div>
      </div>

      <section
        aria-label="Explore PickNest"
        className="mt-5 grid gap-3 sm:grid-cols-3"
      >
        {[
          {
            title: "Everyday Finds",
            description: "Discover something for your daily routine.",
            href: "/products",
          },
          {
            title: "Style Your Space",
            description: "Explore home essentials and finishing touches.",
            href: "/products?category=Home%20%26%20Living",
          },
          {
            title: "Move Your Way",
            description: "Find your next workout companion.",
            href: "/products?category=Sports",
          },
        ].map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group rounded-2xl border p-5 transition hover:-translate-y-1 motion-reduce:transform-none ${
              index === 0
                ? "border-transparent bg-navy text-navy-foreground"
                : "border-border bg-surface text-foreground"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                index === 0
                  ? "text-orange-300"
                  : "text-orange-800 dark:text-orange-300"
              }`}
            >
              Discover PickNest
            </p>

            <h2 className="mt-2 text-lg font-bold">{item.title}</h2>

            <p
              className={`mt-2 text-sm leading-6 ${
                index === 0
                  ? "text-slate-200"
                  : "text-muted-foreground"
              }`}
            >
              {item.description}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
              Explore
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>

      <CategorySection />

      {discountedProducts.length > 0 && (
        <section
          aria-labelledby="offers-heading"
          className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-5 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-800 dark:text-orange-300">
                Explore the savings
              </p>

              <h2
                id="offers-heading"
                className="mt-1 text-xl font-bold sm:text-2xl"
              >
                Featured Offers
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-5 lg:grid-cols-4">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section
        id="featured-products"
        aria-labelledby="featured-heading"
        className="mt-10 scroll-mt-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-800 dark:text-orange-300">
              Discover your next great find
            </p>

            <h2
              id="featured-heading"
              className="mt-2 text-2xl font-bold text-foreground"
            >
              Just for You
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Explore our picks across your favourite categories.
            </p>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold text-orange-800 hover:underline dark:text-orange-300"
          >
            Browse All Products →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </main>
  );
}