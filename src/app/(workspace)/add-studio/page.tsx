import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import StudioForm from "./studio-form";

export const metadata: Metadata = {
  title: "Add new studio",
  description: "Publish a creative space on StudioSpace.",
};

type HostSession = {
  user: {
    name: string;
    email: string;
  };
};

export default async function AddStudioPage() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/auth/get-session`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    redirect("/login?next=/add-studio");
  }

  if (!response.ok) {
    throw new Error("Could not load your account.");
  }

  const session: HostSession | null = await response.json();

  if (!session?.user) {
    redirect("/login?next=/add-studio");
  }

  return (
    <>
      <header className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Host workspace
        </p>

        <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
          Add new studio
        </h1>

        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Add the photos, equipment, and session details guests need to plan
          their visit.
        </p>
      </header>

      <StudioForm
        ownerName={session.user.name}
        ownerEmail={session.user.email}
      />
    </>
  );
}