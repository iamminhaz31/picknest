"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function getSignInPath() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  const allowedPaths = [
    "/checkout",
    "/orders",
    "/profile",
    "/profile/update",
  ];

  return next && allowedPaths.includes(next)
    ? `/signin?next=${encodeURIComponent(next)}`
    : "/signin";
}

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
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

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || cleanName.length > 100) {
      showError("Enter a name between 1 and 100 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      showError("Enter a valid email address.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      showError("Password must be between 8 and 128 characters.");
      return;
    }

    const signInPath = getSignInPath();

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
      });

      if (error) {
        showError(error.message || "Could not create your account.");
        return;
      }

      toast.success("Registration complete. Please sign in.");
      router.push(signInPath);
    } catch {
      showError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
          Welcome to PickNest
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your next great find is just a few clicks away.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="signup-name"
              className="text-sm font-medium"
            >
              Full name
            </label>

            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              maxLength={100}
              disabled={loading}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="text-sm font-medium"
            >
              Email address
            </label>

            <input
              id="signup-email"
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
              htmlFor="signup-password"
              className="text-sm font-medium"
            >
              Password
            </label>

            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              maxLength={128}
              disabled={loading}
              required
              className={inputClass}
            />

            <p className="mt-2 text-xs text-muted-foreground">
              Use between 8 and 128 characters.
            </p>
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

            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            onClick={(event) => {
              event.preventDefault();
              router.push(getSignInPath());
            }}
            className="font-semibold text-teal-700 hover:underline dark:text-teal-300"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}