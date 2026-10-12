const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Accessories",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground">
      <section className="mx-auto max-w-5xl rounded-3xl border border-border bg-surface p-8 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
          Welcome to PickNest
        </p>

        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Your next great find starts here.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Discover everyday essentials, fresh styles, and smart gadgets
          — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800 dark:bg-teal-950 dark:text-teal-200"
            >
              {category}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}