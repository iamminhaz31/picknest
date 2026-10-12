import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/app/data/products";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100,
        )
      : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-teal-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f5f4f0]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
        />

        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-900">
            {discount}% off
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-muted-foreground">
          {product.category}
        </p>

        <h3 className="mt-2 text-base font-semibold text-foreground">
          {product.name}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>

          {discount > 0 && product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              <span className="sr-only">Original price: </span>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </span>

          <span className="text-sm font-semibold text-teal-700 dark:text-teal-300">
            View details <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}