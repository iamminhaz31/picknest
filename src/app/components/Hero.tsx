import Image from "next/image";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="grid items-center lg:grid-cols-2">
        <div className="p-6 sm:p-10 lg:p-12">
          <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-800 dark:bg-teal-950 dark:text-teal-200">
            Everyday finds, thoughtfully picked
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Little upgrades.
            <br />
            <span className="text-teal-700 dark:text-teal-300">
              Big possibilities.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            From smart gadgets to fresh styles and home favourites,
            discover your next great find at PickNest.
          </p>

          <a
            href="#featured-products"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500"
          >
            Shop Now
            <span aria-hidden="true">→</span>
          </a>

          <p className="mt-6 text-xs text-muted-foreground">
            Electronics · Fashion · Home & Living · More
          </p>
        </div>

        <div className="p-4 pt-0 sm:p-6 lg:p-6">
          <Image
            src="/picknest-hero.png"
            alt="Headphones, sneakers, a ceramic lamp, a bag and everyday essentials"
            width={1536}
            height={1024}
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}