"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import ProductCard from "@/app/components/ProductCard";
import AddToCartButton from "@/app/components/AddToCartButton";
import { useWishlist } from "@/app/components/WishlistProvider";

export default function WishlistPage() {
  const { items, ready, removeFromWishlist } = useWishlist();

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>

        <div
          role="status"
          aria-label="Loading wishlist"
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              aria-hidden="true"
              className="h-80 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <section className="rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
          <span aria-hidden="true" className="text-5xl">
            ♡
          </span>

          <h1 className="mt-5 text-3xl font-bold">
            Your wishlist is empty
          </h1>

          <p className="mt-3 text-muted-foreground">
            Save your favourite finds and come back to them later.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-hover"
          >
            Explore Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">My Wishlist</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {items.length} saved{" "}
        {items.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <div key={product.id} className="min-w-0">
            <ProductCard product={product} />

            <AddToCartButton product={product} />

            <button
              type="button"
              aria-label={`Remove ${product.name} from wishlist`}
              onClick={() => {
                removeFromWishlist(product.id);
                toast.success("Removed from wishlist.");
              }}
              className="mt-3 w-full rounded-xl border border-border px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:text-red-400"
            >
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}