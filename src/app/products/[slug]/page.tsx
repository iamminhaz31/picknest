import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, formatPrice } from "@/app/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import WishlistButton from "@/app/components/WishlistButton";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <Link
        href="/#featured-products"
        className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-300"
      >
        ← Back to featured products
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-[#f5f4f0]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        <div className="self-center rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>

            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  <span className="sr-only">Original price: </span>
                  {formatPrice(product.originalPrice!)}
                </span>

                <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900">
                  Save{" "}
                  {formatPrice(product.originalPrice! - product.price)}
                </span>
              </>
            )}
          </div>

          <dl className="mt-8 divide-y divide-border border-y border-border">
            <div className="flex justify-between gap-4 py-4 text-sm">
              <dt className="text-muted-foreground">Availability</dt>
              <dd className="font-medium text-foreground">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </dd>
            </div>

            <div className="flex justify-between gap-4 py-4 text-sm">
              <dt className="text-muted-foreground">
                Available quantity
              </dt>
              <dd className="font-medium text-foreground">
                {product.stock}
              </dd>
            </div>

            <div className="flex justify-between gap-4 py-4 text-sm">
              <dt className="text-muted-foreground">Product code</dt>
              <dd className="font-medium text-foreground">
                {product.id}
              </dd>
            </div>
          </dl>

          <AddToCartButton product={product} />
          <WishlistButton product={product} />

          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            This is a demo product. Prices and availability are
            sample data for the PickNest portfolio store.
          </p>
        </div>
      </section>
    </main>
  );
}