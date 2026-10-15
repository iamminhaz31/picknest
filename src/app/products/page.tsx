import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/data/products";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Accessories",
];

type SearchParams = {
  q?: string | string[];
  category?: string | string[];
  sort?: string | string[];
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = firstValue(params.q).trim();
  const category = firstValue(params.category);
  const requestedSort = firstValue(params.sort);

  const sort =
    requestedSort === "asc" || requestedSort === "desc"
      ? requestedSort
      : "default";

  const searchText = query.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !category || product.category === category;

    const matchesSearch =
      !searchText ||
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(searchText);

    return matchesCategory && matchesSearch;
  });

  if (sort === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-accent/25";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground">
        Explore Products
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Find your favourites across every category.
      </p>

      <form
        key={`${query}-${category}-${sort}`}
        action="/products"
        method="get"
        className="mt-8 grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]"
      >
        <div>
          <label
            htmlFor="catalog-search"
            className="text-sm font-medium"
          >
            Search
          </label>

          <input
            id="catalog-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search products..."
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="catalog-category"
            className="text-sm font-medium"
          >
            Category
          </label>

          <select
            id="catalog-category"
            name="category"
            defaultValue={category}
            className={inputClass}
          >
            <option value="">All Categories</option>

            {!categories.includes(category) && category && (
              <option value={category}>{category}</option>
            )}

            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="catalog-sort"
            className="text-sm font-medium"
          >
            Sort by
          </label>

          <select
            id="catalog-sort"
            name="sort"
            defaultValue={sort}
            className={inputClass}
          >
            <option value="default">Featured order</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <button
          type="submit"
          className="self-end rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Apply
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm text-muted-foreground">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </p>

        {(query || category || sort !== "default") && (
          <Link
            href="/products"
            className="text-sm font-medium text-orange-800 hover:underline dark:text-orange-300"
          >
            Reset filters
          </Link>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <section className="mt-6 rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <h2 className="text-xl font-bold">No products found</h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Try another search or choose a different category.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            View All Products
          </Link>
        </section>
      )}
    </main>
  );
}