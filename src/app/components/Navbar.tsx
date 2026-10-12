"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Accessories",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const iconClass =
    "rounded-lg p-2 transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500";

  return (
    <header className="border-b border-border bg-surface text-foreground">
      <div className="bg-brand px-4 py-2 text-center text-xs font-medium text-white">
        Discover something great for every day.
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-4 sm:grid-cols-[auto_1fr] sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
        <Link href="/" aria-label="PickNest home" className="w-fit">
          <Image
            src="/picknest-logo.png"
            alt="PickNest"
            width={2048}
            height={704}
            priority
            sizes="(max-width: 640px) 150px, 180px"
            className="h-auto w-[150px] sm:w-[180px] dark:brightness-150"
          />
        </Link>

        <form
          action="/products"
          method="get"
          role="search"
          className="order-3 flex min-w-0 items-center rounded-xl border border-border bg-muted focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 sm:col-span-2 lg:order-none lg:col-span-1"
        >
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>

          <input
            id="product-search"
            name="q"
            type="search"
            placeholder="Search for products..."
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />

          <button
            type="submit"
            aria-label="Search"
            className="m-1 rounded-lg bg-brand p-3 text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
          </button>
        </form>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <ThemeToggle />

          <Link
            href="/signin"
            className="hidden text-sm font-medium hover:underline sm:block"
          >
            Sign in
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={iconClass}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className={iconClass}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-6 w-6"
            >
              <path d="M3 3h2l2.4 12h11.2l2-8H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((previous) => !previous)}
            className={`${iconClass} lg:hidden`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-6 w-6"
            >
              {menuOpen ? (
                <path d="m6 6 12 12M6 18 18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        aria-label="Product categories"
        className="hidden border-t border-border lg:block"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-7 px-6 py-3 text-sm font-medium">
          <Link
            href="/products"
            className="text-teal-700 hover:underline dark:text-teal-300"
          >
            All Products
          </Link>

          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="hover:underline"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="border-t border-border px-4 py-4 lg:hidden"
      >
        <div className="grid gap-1">
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-3 text-sm font-semibold text-teal-700 hover:bg-muted dark:text-teal-300"
          >
            All Products
          </Link>

          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
            >
              {category}
            </Link>
          ))}

          <Link
            href="/signin"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-lg bg-brand px-3 py-3 text-center text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}