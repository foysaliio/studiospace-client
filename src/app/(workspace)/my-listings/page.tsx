import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

import type { Studio } from "@/features/home/featured-studios";

export const metadata: Metadata = {
  title: "My studio listings",
  description: "View the studios you have published on StudioSpace.",
};

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const arrowStyle =
  "motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5";

const rowStyle =
  "grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-x-5";

function AddStudioLink() {
  return (
    <Link
      href="/add-studio"
      className={`inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 ${focusStyle}`}
    >
      <Plus size={16} aria-hidden="true" />
      Add new studio
    </Link>
  );
}

async function StudioList() {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.API_BASE_URL}/api/studios/mine`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/login?next=/my-listings");
  }

  if (!response.ok) {
    throw new Error("Could not load your studio listings.");
  }

  const studios: Studio[] = await response.json();

  if (studios.length === 0) {
    return (
      <section className="rounded-sm bg-secondary px-5 py-8 sm:px-8">
        <h2 className="font-heading text-3xl tracking-tight">
          Your first listing
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Add a studio to show creators your space, equipment and hourly rate.
        </p>
        <div className="mt-5">
          <AddStudioLink />
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <p className="text-sm text-muted-foreground">
          {studios.length} published{" "}
          {studios.length === 1 ? "studio" : "studios"}
        </p>
        <AddStudioLink />
      </div>

      <ul
        aria-label="Your published studios"
        className="divide-y divide-border border-y border-border"
      >
        {studios.map((studio) => (
          <li key={studio._id} className={rowStyle}>
            <div className="relative aspect-square overflow-hidden rounded-sm bg-muted sm:aspect-[4/3]">
              <Image
                src={studio.imageUrl}
                alt=""
                fill
                sizes="(min-width: 640px) 112px, 72px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{studio.category}</p>
              <h2 className="mt-1 break-words font-heading text-2xl leading-tight tracking-tight sm:text-3xl">
                {studio.title}
              </h2>
              <p className="mt-1 break-words text-sm text-muted-foreground">
                {studio.location}
              </p>
            </div>

            <div className="col-span-2 flex flex-wrap items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end sm:gap-1">
              <p className="text-sm text-muted-foreground">
                <strong className="text-lg font-semibold tabular-nums text-foreground">
                  ${studio.hourlyRate}
                </strong>{" "}
                / hr
              </p>

              <Link
                href={`/studios/${studio._id}`}
                aria-label={`View listing for ${studio.title}`}
                className={`group inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium transition-colors hover:text-muted-foreground ${focusStyle}`}
              >
                View listing
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className={arrowStyle}
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function ListingsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading your studio listings</span>

      <div aria-hidden="true" className="motion-safe:animate-pulse">
        <div className="mb-4 flex min-h-11 items-center justify-between gap-3">
          <div className="h-4 w-28 rounded-sm bg-muted" />
          <div className="h-11 w-32 rounded-sm bg-muted" />
        </div>

        {[1, 2, 3].map((item) => (
          <div key={item} className={`${rowStyle} border-t border-border`}>
            <div className="aspect-square rounded-sm bg-muted sm:aspect-[4/3]" />
            <div className="min-w-0 space-y-2">
              <div className="h-3 w-16 rounded-sm bg-muted" />
              <div className="h-6 w-3/4 max-w-xs rounded-sm bg-muted" />
              <div className="h-3 w-2/3 max-w-32 rounded-sm bg-muted" />
            </div>
            <div className="col-span-2 flex min-h-11 items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end">
              <div className="h-4 w-14 rounded-sm bg-muted" />
              <div className="h-4 w-20 rounded-sm bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <>
      <header className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Host workspace
        </p>
        <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
          My studio listings
        </h1>
      </header>

      <Suspense fallback={<ListingsSkeleton />}>
        <StudioList />
      </Suspense>
    </>
  );
}
