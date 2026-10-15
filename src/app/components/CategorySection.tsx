import Link from "next/link";

const categories = [
  { name: "Electronics", icon: "🎧", description: "Smart everyday tech" },
  { name: "Fashion", icon: "👕", description: "Find your next look" },
  {
    name: "Home & Living",
    icon: "🏡",
    description: "Make yourself at home",
  },
  { name: "Beauty", icon: "🧴", description: "Your daily essentials" },
  { name: "Sports", icon: "🏀", description: "Move your own way" },
  {
    name: "Accessories",
    icon: "🎒",
    description: "The finishing touches",
  },
];

export default function CategorySection() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="mt-8 rounded-2xl border border-border bg-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-5 sm:px-6">
        <div>
          <h2
            id="categories-heading"
            className="text-xl font-bold text-foreground sm:text-2xl"
          >
            Shop by Category
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Find what you need, all in one place.
          </p>
        </div>

        <Link
          href="/products"
          className="rounded-md text-sm font-semibold text-orange-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:text-orange-300"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:gap-3 sm:p-5 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            className="group flex h-full min-w-0 flex-col items-center rounded-xl border border-transparent px-3 py-5 text-center transition hover:border-orange-400/50 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:transform-none"
            >
              {category.icon}
            </span>

            <h3 className="mt-4 text-sm font-semibold text-foreground">
              {category.name}
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}