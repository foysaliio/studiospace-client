import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Studio } from "@/features/home/featured-studios";
import {
  WorkspaceEmpty,
  WorkspaceHeader,
  WorkspaceLink,
  WorkspaceSkeleton,
  focusStyle,
  money,
} from "@/components/shared/workspace-ui";

export const metadata: Metadata = {
  title: "My studio listings",
  description: "View the studios you host and their published details.",
};

function StudioRow({ studio }: { studio: Studio }) {
  return (
    <li className="min-w-0">
      <Link
        href={`/studios/${studio._id}`}
        aria-label={`View ${studio.title}`}
        className={`group grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-sm border border-transparent px-2 py-4 transition-colors duration-200 hover:border-foreground/30 hover:bg-secondary focus-visible:bg-secondary sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-x-5 sm:px-3 sm:py-5 ${focusStyle}`}
      >
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
          <p className="text-xs font-medium leading-4 text-muted-foreground">
            {studio.category}
          </p>

          <h2 className="mt-1 break-words font-heading text-2xl leading-tight tracking-tight sm:text-3xl">
            {studio.title}
          </h2>

          <p className="mt-1 break-words text-sm leading-5 text-muted-foreground">
            {studio.location}
          </p>
        </div>

        <div className="col-span-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:col-span-1 sm:flex-col sm:items-end sm:gap-2">
          <p className="flex items-baseline gap-1.5">
            <strong className="text-lg font-semibold tabular-nums">
              {money.format(studio.hourlyRate)}
            </strong>
            <span className="text-xs text-muted-foreground">/ hr</span>
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-medium">
            View studio
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </li>
  );
}

async function StudioList() {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.API_BASE_URL}/api/studios/mine`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (response.status === 401) redirect("/login?next=/my-listings");
  if (!response.ok) throw new Error("Could not load your studio listings.");

  const studios: Studio[] = await response.json();

  if (studios.length === 0) {
    return (
      <WorkspaceEmpty
        title="List your first studio"
        description="Give creators a look at your space, its equipment and your hourly rate."
        href="/add-studio"
        action="Add new studio"
      />
    );
  }

  return (
    <section aria-label="Your published studios">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-foreground/30 pb-3">
        <p className="text-sm font-medium">
          {studios.length} published{" "}
          {studios.length === 1 ? "studio" : "studios"}
        </p>

        <WorkspaceLink href="/add-studio" primary>
          Add new studio
        </WorkspaceLink>
      </div>

      <ul className="divide-y divide-border border-b border-border">
        {studios.map((studio) => (
          <StudioRow key={studio._id} studio={studio} />
        ))}
      </ul>
    </section>
  );
}

export default function MyListingsPage() {
  return (
    <>
      <WorkspaceHeader
        label="Host workspace"
        title="My studio listings"
        description="The spaces you host, with their locations and hourly rates."
      />

      <Suspense fallback={<WorkspaceSkeleton label="Loading your studios" />}>
        <StudioList />
      </Suspense>
    </>
  );
}
