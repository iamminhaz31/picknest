import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-teal-700 dark:text-teal-300"
          >
            PickNest
          </Link>

          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            Your next great find starts here. Explore everyday
            essentials, fresh styles, and smart gadgets.
          </p>
        </div>

        <nav aria-label="Footer shopping links">
          <h2 className="font-semibold">Explore</h2>

          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <Link href="/products" className="hover:underline">
              All Products
            </Link>

            <Link href="/wishlist" className="hover:underline">
              Wishlist
            </Link>

            <Link href="/cart" className="hover:underline">
              Shopping Cart
            </Link>
          </div>
        </nav>

        <div>
          <h2 className="font-semibold">About this store</h2>

          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            PickNest is a portfolio ecommerce demo. Products,
            prices, and orders are for demonstration purposes.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} PickNest.</p>
          <p>Built by Minhajul Islam Tanjil.</p>
        </div>
      </div>
    </footer>
  );
}