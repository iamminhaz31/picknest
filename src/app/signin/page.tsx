"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function getReturnPath() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  const allowedPaths = [
    "/checkout",
    "/orders",
    "/profile",
    "/profile/update",
  ];

  return next && allowedPaths.includes(next) ? next : "/";
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function showError(message: string) {
    setErrorMessage(message);
    toast.error(message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      showError("Enter a valid email address.");
      return;
    }

    if (!password) {
      showError("Enter your password.");
      return;
    }

    const returnPath = getReturnPath();

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: cleanEmail,
        password,
      });

      if (error) {
        showError(error.message || "Could not sign in.");
        setLoading(false);
        return;
      }

      toast.success("Signed in successfully.");
      window.location.replace(returnPath);
    } catch {
      showError("Connection failed. Please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
          Welcome back to PickNest
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Continue exploring your favourite finds.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="signin-email"
              className="text-sm font-medium"
            >
              Email address
            </label>

            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="signin-password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              disabled={loading}
              required
              className={inputClass}
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 disabled:opacity-60"
          >
            {loading && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}

            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to PickNest?{" "}
          <Link
            href="/signup"
            className="font-semibold text-teal-700 hover:underline dark:text-teal-300"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}