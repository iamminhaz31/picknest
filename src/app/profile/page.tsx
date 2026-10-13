import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { user } = session;

  const buttonClass =
    "flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="border-b border-border bg-muted px-6 py-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand text-3xl font-bold text-white">
            {Array.from(user.name.trim())[0]?.toUpperCase() || "P"}
          </div>

          <h1 className="mt-4 text-3xl font-bold">My Account</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Your PickNest profile
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <dl className="divide-y divide-border">
            <div className="grid gap-2 py-4 sm:grid-cols-[100px_1fr]">
              <dt className="text-sm text-muted-foreground">
                Full name
              </dt>

              <dd className="min-w-0 break-words font-medium">
                {user.name}
              </dd>
            </div>

            <div className="grid gap-2 py-4 sm:grid-cols-[100px_1fr]">
              <dt className="text-sm text-muted-foreground">
                Email
              </dt>

              <dd className="min-w-0 break-all font-medium">
                {user.email}
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3">
            <Link
              href="/orders"
              className={`${buttonClass} bg-brand text-white hover:bg-brand-hover`}
            >
              <span aria-hidden="true">📦</span>
              My Orders
            </Link>

            <Link
              href="/profile/update"
              className={`${buttonClass} border border-border hover:bg-muted`}
            >
              Edit Profile
            </Link>

            <Link
              href="/products"
              className={`${buttonClass} border border-border hover:bg-muted`}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}