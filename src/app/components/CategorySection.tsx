import Link from "next/link";

const categories = [
  { name: "Electronics", icon: "🎧", description: "Smart everyday tech" },
  { name: "Fashion", icon: "👕", description: "Find your next look" },
  { name: "Home & Living", icon: "🏡", description: "Make yourself at home" },
  { name: "Beauty", icon: "🧴", description: "Your daily essentials" },
  { name: "Sports", icon: "🏀", description: "Move your own way" },
  { name: "Accessories", icon: "🎒", description: "The finishing touches" },
];

export default function CategorySection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-foreground">
        Shop by Category
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        A little something for every part of your day.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            className="rounded-2xl border border-border bg-surface p-4 text-center transition hover:border-teal-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500"
          >
            <span
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl"
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