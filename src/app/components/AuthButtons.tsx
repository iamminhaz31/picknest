"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } =
    authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Could not sign out.");
        return;
      }

      toast.success("Signed out successfully.");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Connection failed. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div role="status" aria-label="Loading account">
        <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <button
        type="button"
        onClick={() => refetch()}
        className="rounded-lg border border-border px-3 py-2 text-xs"
      >
        Retry account
      </button>
    );
  }

  if (!session) {
    return (
      <Link
        href="/signin"
        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/profile"
        className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
      >
        Account
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        {signingOut ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}