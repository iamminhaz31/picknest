import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/app/data/products";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const originalPrice = product.originalPrice;

  const hasDiscount =
    originalPrice !== undefined && originalPrice > product.price;

  const discount = hasDiscount
    ? Math.round(
        ((originalPrice - product.price) / originalPrice) * 100,
      )
    : 0;

  const inStock = product.stock > 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface transition duration-200 hover:border-orange-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f5f4f0]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 320px"
          className="object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
        />

        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-brand px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
            −{discount}%
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 px-3 py-2 text-center text-xs font-semibold text-white">
            Out of stock
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-[10px] font-medium text-muted-foreground sm:text-xs">
          {product.category}
        </p>

        <h3 className="mt-1.5 min-h-10 break-words text-sm font-semibold leading-5 text-foreground sm:min-h-12 sm:text-base sm:leading-6">
          {product.name}
        </h3>

        <div className="mt-3">
          <p className="text-lg font-bold tracking-tight text-orange-800 sm:text-2xl dark:text-orange-300">
            {formatPrice(product.price)}
          </p>

          <div className="mt-1 flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1">
            {hasDiscount && (
              <>
                <span className="text-[11px] text-muted-foreground line-through sm:text-xs">
                  <span className="sr-only">Original price: </span>
                  {formatPrice(originalPrice)}
                </span>

                <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                  Save {formatPrice(originalPrice - product.price)}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground sm:text-xs">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                inStock ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {inStock ? "In stock" : "Unavailable"}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground sm:text-xs">
            View details
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}