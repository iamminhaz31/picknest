"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
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

    if (!cleanName || cleanName.length > 100) {
      showError("Enter a name between 1 and 100 characters.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: cleanName,
      });

      if (error) {
        showError(error.message || "Could not update your profile.");
        return;
      }

      toast.success("Profile updated successfully.");
      router.replace("/profile");
      router.refresh();
    } catch {
      showError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={loading}
      className="mt-6 space-y-5"
    >
      <div>
        <label htmlFor="profile-name" className="text-sm font-medium">
          Full name
        </label>

        <input
          id="profile-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={100}
          disabled={loading}
          required
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-xl bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      <Link
        href="/profile"
        className="block text-center text-sm text-teal-700 hover:underline dark:text-teal-300"
      >
        Back to My Account
      </Link>
    </form>
  );
}