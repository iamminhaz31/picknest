"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/app/data/products";
import { placeOrder } from "@/app/checkout/actions";

export default function CheckoutForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const { items, ready, subtotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const request = useRef({
    fingerprint: "",
    id: "",
  });

  const submitting = useRef(false);

  const subtotalCents = Math.round(subtotal * 100);
  const shippingCents = subtotalCents >= 10000 ? 0 : 500;
  const total = (subtotalCents + shippingCents) / 100;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ready || submitting.current || items.length === 0) return;

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const details = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      address: String(data.get("address") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      postalCode: String(data.get("postalCode") ?? "").trim(),
      items: items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      })),
    };

    const fingerprint = JSON.stringify(details);

    if (request.current.fingerprint !== fingerprint) {
      request.current = {
        fingerprint,
        id: crypto.randomUUID(),
      };
    }

    submitting.current = true;
    setLoading(true);
    setError("");

    try {
      const result = await placeOrder({
        ...details,
        requestId: request.current.id,
      });

      if (!result.success) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      setOrderId(result.orderId);
      clearCart();
      toast.success("Demo order placed successfully.");
    } catch {
      const message = "Connection failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-accent/25 disabled:opacity-60";

  if (orderId) {
    return (
      <section className="rounded-3xl border border-border bg-surface p-8 text-center">
        <p
          className="text-4xl text-orange-800 dark:text-orange-300"
          aria-hidden="true"
        >
          ✓
        </p>

        <h2 className="mt-4 text-2xl font-bold">
          Your demo order is confirmed!
        </h2>

        <p className="mt-3 text-muted-foreground">
          Your order has been saved. No payment has been collected.
        </p>

        <p className="mt-4 break-all text-sm">
          Order ID: {orderId}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/orders"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            View My Orders
          </Link>

          <Link
            href="/products"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (!ready) {
    return (
      <div
        role="status"
        aria-label="Loading checkout"
        className="h-80 animate-pulse rounded-2xl bg-muted"
      />
    );
  }

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>

        <Link
          href="/products"
          className="mt-5 inline-block text-orange-800 hover:underline dark:text-orange-300"
        >
          Explore Products →
        </Link>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={loading}
      className="grid items-start gap-6 lg:grid-cols-[1fr_360px]"
    >
      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-xl font-bold">Delivery Details</h2>

        <fieldset disabled={loading} className="mt-6 space-y-5">
          <div>
            <label htmlFor="checkout-name">Full name</label>

            <input
              id="checkout-name"
              name="name"
              autoComplete="name"
              defaultValue={initialName}
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="checkout-email">Account email</label>

            <input
              id="checkout-email"
              type="email"
              value={email}
              readOnly
              className={`${inputClass} opacity-70`}
            />
          </div>

          <div>
            <label htmlFor="checkout-phone">Phone number</label>

            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={25}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="checkout-address">Street address</label>

            <textarea
              id="checkout-address"
              name="address"
              autoComplete="street-address"
              maxLength={300}
              rows={3}
              required
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="checkout-city">City</label>

              <input
                id="checkout-city"
                name="city"
                autoComplete="address-level2"
                maxLength={100}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="checkout-postal">Postal code</label>

              <input
                id="checkout-postal"
                name="postalCode"
                autoComplete="postal-code"
                maxLength={20}
                required
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>
      </section>

      <aside className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-xl font-bold">Order Summary</h2>

        <ul className="mt-5 space-y-4">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex justify-between gap-3 text-sm"
            >
              <span>
                {product.name} × {quantity}
              </span>

              <span className="shrink-0 font-medium">
                {formatPrice(
                  (Math.round(product.price * 100) * quantity) / 100,
                )}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotalCents / 100)}</dd>
          </div>

          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>
              {shippingCents === 0
                ? "Free"
                : formatPrice(shippingCents / 100)}
            </dd>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>

        <p className="mt-4 text-xs text-muted-foreground">
          Demo shipping: $5, free on orders of $100 or more.
        </p>

        <div className="mt-5 rounded-xl bg-muted p-4 text-sm">
          <p className="font-semibold">Cash on Delivery — Demo</p>

          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            This portfolio store creates sample orders only.
            No real payment or delivery takes place.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600 dark:text-red-300"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 min-h-12 w-full rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-60"
        >
          {loading ? "Placing order..." : "Place Demo Order"}
        </button>

        <Link
          href="/cart"
          className="mt-4 block text-center text-sm hover:underline"
        >
          Back to Cart
        </Link>
      </aside>
    </form>
  );
}