import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/app/components/UpdateProfileForm";

export const runtime = "nodejs";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <section className="mx-auto max-w-md rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <h1 className="text-3xl font-bold">
          Update Profile
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Update the name shown on your PickNest account.
        </p>

        <UpdateProfileForm initialName={session.user.name} />
      </section>
    </main>
  );
}