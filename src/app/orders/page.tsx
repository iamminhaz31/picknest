import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/app/data/products";

export const runtime = "nodejs";

type OrderItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  priceCents: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  status: string;
  created_at: Date;
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusColors: Record<string, string> = {
  pending:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  processing:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  delivered:
    "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  cancelled:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Dhaka",
});

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?next=/orders");
  }

  let orders: Order[];

  try {
    const result = await db.query<Order>(
      `SELECT
         id,
         items,
         subtotal_cents,
         shipping_cents,
         total_cents,
         status,
         created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [session.user.id],
    );

    orders = result.rows;
  } catch {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <section className="rounded-2xl border border-border bg-surface p-8 text-center">
          <h1 className="text-2xl font-bold">
            Orders could not be loaded
          </h1>

          <p className="mt-3 text-muted-foreground">
            Please try again in a moment.
          </p>

          <a
            href="/orders"
            className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-hover"
          >
            Try Again
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            View your demo orders and their current status.
          </p>
        </div>

        <Link
          href="/products"
          className="text-sm font-semibold text-teal-700 hover:underline dark:text-teal-300"
        >
          Continue Shopping →
        </Link>
      </div>

      {orders.length === 0 ? (
        <section className="mt-8 rounded-3xl border border-border bg-surface p-8 text-center sm:p-12">
          <span aria-hidden="true" className="text-5xl">
            📦
          </span>

          <h2 className="mt-5 text-2xl font-bold">
            No orders yet
          </h2>

          <p className="mt-3 text-muted-foreground">
            Your orders will appear here after checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-hover"
          >
            Explore Products
          </Link>
        </section>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((order) => {
            const orderItems = Array.isArray(order.items)
              ? order.items
              : [];

            return (
              <section
                key={order.id}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border bg-muted p-5 sm:p-6">
                  <div className="min-w-0">
                    <h2 className="font-semibold">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {dateFormatter.format(
                        new Date(order.created_at),
                      )}{" "}
                      · Bangladesh time
                    </p>

                    <p className="mt-2 break-all text-xs text-muted-foreground">
                      Order ID: {order.id}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColors[order.status] ??
                      "bg-muted text-foreground"
                    }`}
                  >
                    {statusLabels[order.status] ?? order.status}
                  </span>
                </div>

                <ul className="divide-y divide-border px-5 sm:px-6">
                  {orderItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap items-center gap-4 py-5"
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5f4f0]"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-semibold hover:underline"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatPrice(item.priceCents / 100)} each
                          · Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        {formatPrice(
                          (item.priceCents * item.quantity) / 100,
                        )}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border p-5 sm:p-6">
                  <dl className="ml-auto max-w-sm space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">
                        Subtotal
                      </dt>

                      <dd>
                        {formatPrice(order.subtotal_cents / 100)}
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">
                        Shipping
                      </dt>

                      <dd>
                        {order.shipping_cents === 0
                          ? "Free"
                          : formatPrice(
                              order.shipping_cents / 100,
                            )}
                      </dd>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-border pt-3 text-base font-bold">
                      <dt>Total</dt>

                      <dd>
                        {formatPrice(order.total_cents / 100)}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-5 text-xs text-muted-foreground">
                    Demo order · No payment collected.
                  </p>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}