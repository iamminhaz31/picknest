import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import CheckoutForm from "@/app/components/CheckoutForm";

export const runtime = "nodejs";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?next=/checkout");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Review your items and enter delivery details for your demo order.
      </p>

      <div className="mt-8">
        <CheckoutForm
          initialName={session.user.name}
          email={session.user.email}
        />
      </div>
    </main>
  );
}