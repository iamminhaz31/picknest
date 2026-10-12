"use client";

import toast from "react-hot-toast";
import type { Product } from "@/app/data/products";
import { useWishlist } from "./WishlistProvider";

export default function WishlistButton({
  product,
}: {
  product: Product;
}) {
  const { ready, isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(product.id);

  function handleToggle() {
    if (!ready) return;

    toggleWishlist(product.id);

    toast.success(
      saved ? "Removed from wishlist." : "Saved to wishlist.",
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!ready}
      aria-pressed={saved}
      className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 disabled:opacity-50"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-5 w-5 text-teal-700 dark:text-teal-300"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>

      {!ready
        ? "Loading wishlist..."
        : saved
          ? "Saved to Wishlist"
          : "Save to Wishlist"}
    </button>
  );
}