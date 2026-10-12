import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import ProductCard from "./components/ProductCard";
import { products } from "@/app/data/products";

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured);

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

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}