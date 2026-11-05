import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowUpRight, Heart } from "lucide-react";

import { WorkspaceHeader } from "@/components/shared/workspace-ui";
import { StudioCard, type Studio } from "@/features/home/featured-studios";

export const metadata: Metadata = {
  title: "Saved studios",
  description: "View the creative spaces you have saved for later.",
};

export default async function SavedStudiosPage() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/saved-studios`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    redirect("/login?next=/saved-studios");
  }

  if (!response.ok) {
    throw new Error("Could not load your saved studios.");
  }

  const studios: Studio[] = await response.json();

  return (
    <>
      <WorkspaceHeader
        label="Your workspace"
        title="Saved studios"
        description="The spaces you’ve saved for your next session."
      />

      {studios.length > 0 ? (
        <ul
          aria-label="Your saved studios"
          className="grid gap-x-6 gap-y-9 sm:grid-cols-2"
        >
          {studios.map((studio) => (
            <li key={studio._id} className="min-w-0">
              <StudioCard studio={studio} />
            </li>
          ))}
        </ul>
      ) : (
        <section
          aria-labelledby="empty-saved-heading"
          className="rounded-sm bg-secondary px-5 py-8 sm:px-8 sm:py-10"
        >
          <Heart
            size={26}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mb-5 text-muted-foreground"
          />

          <h2
            id="empty-saved-heading"
            className="font-heading text-3xl leading-tight tracking-tight"
          >
            No saved studios yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Tap the heart on a studio you like. You’ll find it here when you’re
            ready to book.
          </p>

          <Link
            href="/studios"
            className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Explore studios
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </section>
      )}
    </>
  );
}
