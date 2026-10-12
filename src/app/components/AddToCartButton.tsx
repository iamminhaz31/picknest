"use client";

import toast from "react-hot-toast";
import type { Product } from "@/app/data/products";
import { useCart } from "./CartProvider";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { items, ready, addToCart } = useCart();

  const quantityInCart =
    items.find((item) => item.product.id === product.id)?.quantity ?? 0;

  const outOfStock = product.stock < 1;
  const stockLimitReached = quantityInCart >= product.stock;

  function handleAdd() {
    if (!ready || outOfStock || stockLimitReached) return;

    addToCart(product);
    toast.success(`${product.name} added to cart.`);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!ready || outOfStock || stockLimitReached}
      className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 disabled:opacity-50"
    >
      {!ready
        ? "Loading cart..."
        : outOfStock
          ? "Out of stock"
          : stockLimitReached
            ? "Maximum quantity added"
            : "Add to Cart"}
    </button>
  );
}