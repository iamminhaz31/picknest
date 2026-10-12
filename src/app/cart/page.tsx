"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/app/components/CartProvider";
import { formatPrice } from "@/app/data/products";

export default function CartPage() {
  const {
    items,
    ready,
    totalItems,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <div
          role="status"
          aria-label="Loading cart"
          className="mt-8 h-48 animate-pulse rounded-2xl bg-muted"
        />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <section className="rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
          <span aria-hidden="true" className="text-5xl">
            🛒
          </span>

          <h1 className="mt-5 text-3xl font-bold">
            Your cart is empty
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your next great find is waiting for you.
          </p>

          <Link
            href="/#featured-products"
            className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-hover"
          >
            Start Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <section aria-label="Cart items" className="space-y-4">
          {items.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-5 sm:flex-row"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f5f4f0]"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">
                  {product.category}
                </p>

                <Link
                  href={`/products/${product.slug}`}
                  className="mt-1 inline-block font-semibold hover:underline"
                >
                  {product.name}
                </Link>

                <p className="mt-2 text-sm text-muted-foreground">
                  {formatPrice(product.price)} each
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div
                    role="group"
                    aria-label={`Quantity for ${product.name}`}
                    className="flex items-center overflow-hidden rounded-lg border border-border"
                  >
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      disabled={quantity <= 1}
                      onClick={() =>
                        updateQuantity(product.id, quantity - 1)
                      }
                      className="h-10 w-10 hover:bg-muted disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="min-w-10 text-center text-sm font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      disabled={quantity >= product.stock}
                      onClick={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
                      className="h-10 w-10 hover:bg-muted disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from cart`}
                    onClick={() => {
                      removeFromCart(product.id);
                      toast.success("Product removed from cart.");
                    }}
                    className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="shrink-0 font-bold">
                {formatPrice(
                  (Math.round(product.price * 100) * quantity) / 100,
                )}
              </p>
            </article>
          ))}

          <Link
            href="/#featured-products"
            className="inline-block text-sm font-medium text-teal-700 hover:underline dark:text-teal-300"
          >
            ← Continue Shopping
          </Link>
        </section>

        <aside className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">
                Subtotal ({totalItems} items)
              </dt>
              <dd className="font-semibold">
                {formatPrice(subtotal)}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>Calculated at checkout</dd>
            </div>
          </dl>

          <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
            This is a demo cart. Checkout will be added in a later step.
          </p>
        </aside>
      </div>
    </main>
  );
}