import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate h-full overflow-hidden rounded-2xl bg-navy text-navy-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl"
      />

      <div className="grid h-full items-center gap-2 md:grid-cols-[1.1fr_1fr]">
        <div className="px-6 pb-6 pt-8 sm:px-8 sm:pt-10 md:py-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold text-orange-200">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-orange-300"
            />
            Your everyday marketplace
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl xl:text-5xl"
          >
            Great finds.
            <br />
            <span className="text-orange-300">
              Everyday possibilities.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-200">
            Discover gadgets, fresh styles and home favourites,
            all in one place. Find your next everyday upgrade
            at PickNest.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Shop Now
              <span aria-hidden="true">→</span>
            </Link>

            <a
              href="#featured-products"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Explore Our Picks
            </a>
          </div>

          <p className="mt-6 text-xs leading-6 text-slate-300">
            Electronics · Fashion · Home &amp; Living · More
          </p>
        </div>

        <div className="min-w-0 px-4 pb-5 sm:px-6 md:py-6 md:pl-0">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#f5f4f0]">
            <Image
              src="/picknest-hero.png"
              alt="A collection of headphones, sneakers, a lamp, a bag and everyday essentials"
              width={1536}
              height={1024}
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}