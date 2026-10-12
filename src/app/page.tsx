import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <Hero />
      <CategorySection />

      <section
        id="featured-products"
        className="mt-12 scroll-mt-6"
      >
        <h2 className="text-2xl font-bold text-foreground">
          Featured Products
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Explore our picks across your favourite categories.
        </p>
      </section>
    </main>
  );
}