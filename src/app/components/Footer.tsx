import Link from "next/link";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Accessories",
];

export default function Footer() {
  const linkClass =
    "w-fit rounded-sm transition hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  return (
    <footer className="mt-16 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-12">
        <div>
          <Link
            href="/"
            aria-label="PickNest home"
            className="inline-block rounded-sm text-3xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Pick<span className="text-orange-300">Nest</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
            Your next great find starts here. Explore everyday
            essentials, fresh styles and smart gadgets,
            all in one place.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Explore Products
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav aria-label="Footer shopping links">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Your PickNest
          </h2>

          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link href="/products" className={linkClass}>
              All Products
            </Link>

            <Link href="/wishlist" className={linkClass}>
              My Wishlist
            </Link>

            <Link href="/cart" className={linkClass}>
              Shopping Cart
            </Link>

            <Link href="/orders" className={linkClass}>
              My Orders
            </Link>

            <Link href="/profile" className={linkClass}>
              My Account
            </Link>
          </div>
        </nav>

        <nav aria-label="Footer category links">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Categories
          </h2>

          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className={linkClass}
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider">
            About This Store
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-300">
            PickNest is a portfolio ecommerce demo. Products,
            prices and orders are sample data. No real payment
            or delivery takes place.
          </p>

          <div className="mt-5 rounded-xl border border-white/15 bg-white/5 p-4">
            <p className="text-sm font-semibold text-orange-300">
              Designed for everyday discovery
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-300">
              Browse your favourites on mobile, tablet or desktop.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs leading-6 text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} PickNest.
          </p>

          <p>
            Built by{" "}
            <a
              href="https://minhaz-portfolio-sooty.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-orange-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Minhajul Islam Tanjil
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}