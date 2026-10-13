import Link from "next/link";

export default function NotFound() {
  const buttonClass =
    "inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500";

  return (
    <main className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
      <section className="w-full max-w-xl rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
          Page not found
        </p>

        <p className="mt-4 text-8xl font-bold tracking-tight text-teal-700 dark:text-teal-300">
          404
        </p>

        <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
          This find is out of reach
        </h1>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          We couldn’t find this page or product.
          Head back home or explore something new at PickNest.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className={`${buttonClass} bg-brand text-white hover:bg-brand-hover`}
          >
            Back to Home
          </Link>

          <Link
            href="/products"
            className={`${buttonClass} border border-border hover:bg-muted`}
          >
            Explore Products
          </Link>
        </div>
      </section>
    </main>
  );
}