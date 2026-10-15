"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function getReturnPath() {
  const next = new URLSearchParams(window.location.search).get("next");

  const allowedPaths = [
    "/checkout",
    "/orders",
    "/profile",
    "/profile/update",
  ];

  return next && allowedPaths.includes(next) ? next : "/";
}

export default function GoogleLoginButton({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);

  async function handleGoogleLogin() {
    if (disabled || submitting.current) return;

    submitting.current = true;
    setLoading(true);

    try {
      const returnPath = getReturnPath();

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: returnPath,
        errorCallbackURL: `/signin?reason=google-error&next=${encodeURIComponent(
          returnPath,
        )}`,
      });

      if (result.error) {
        toast.error(
          result.error.message || "Could not sign in with Google.",
        );

        submitting.current = false;
        setLoading(false);
      }
    } catch {
      toast.error("Connection failed. Please try again.");
      submitting.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">
          or continue with
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={disabled || loading}
        aria-busy={loading}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-brand"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-5 w-5 shrink-0"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.8 23.8 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
        )}

        {loading ? "Redirecting to Google..." : "Continue with Google"}
      </button>
    </div>
  );
}