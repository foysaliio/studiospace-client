import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, Pencil } from "lucide-react";

import DeleteStudio from "./delete-studio";
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
  description: "View and edit the studios you host.",
};

// Only the Edit link and the outer Delete button are direct children.
// The buttons inside the confirmation dialog use their own styles.
const rowActions = `
  flex flex-wrap items-center justify-between gap-2 px-2
  sm:flex-col sm:items-end

  [&>:is(a,button)]:inline-flex
  [&>:is(a,button)]:min-h-11
  [&>:is(a,button)]:cursor-pointer
  [&>:is(a,button)]:items-center
  [&>:is(a,button)]:justify-center
  [&>:is(a,button)]:gap-2
  [&>:is(a,button)]:rounded-sm
  [&>:is(a,button)]:border
  [&>:is(a,button)]:border-border
  [&>:is(a,button)]:bg-background
  [&>:is(a,button)]:px-3
  [&>:is(a,button)]:text-sm
  [&>:is(a,button)]:font-medium
  [&>:is(a,button)]:text-foreground
  [&>:is(a,button)]:transition-colors
  [&>:is(a,button)]:duration-200
  sm:[&>:is(a,button)]:w-40

  [&>:is(a,button):hover]:border-foreground
  [&>:is(a,button):hover]:bg-foreground
  [&>:is(a,button):hover]:text-background

  [&>:is(a,button)>svg]:order-last
  [&>:is(a,button)>svg]:size-4
  [&>:is(a,button)>svg]:shrink-0
  motion-safe:[&>:is(a,button)>svg]:transition-transform
  motion-safe:[&>:is(a,button)>svg]:duration-200
  motion-safe:[&>:is(a,button):hover>svg]:translate-x-0.5
  motion-reduce:[&>:is(a,button)]:transition-none
`;

function StudioRow({ studio }: { studio: Studio }) {
  const id = encodeURIComponent(studio._id);

  return (
    <li className="grid min-w-0 gap-3 py-4 transition-colors duration-200 motion-reduce:transition-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:py-5 sm:hover:bg-secondary/60 sm:focus-within:bg-secondary/60">
      <Link
        href={`/studios/${id}`}
        aria-label={`View ${studio.title}`}
        className={`group grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 rounded-sm border border-transparent p-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5 ${focusStyle}`}
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
          <p className="text-xs font-medium text-muted-foreground">
            {studio.category}
          </p>

          <h2 className="mt-1 break-words font-heading text-2xl leading-tight tracking-tight sm:text-3xl">
            {studio.title}
          </h2>

          <p className="mt-1 break-words text-sm text-muted-foreground">
            {studio.location}
          </p>

          <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium">
            View studio
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>

      <div className={rowActions}>
        <p className="flex items-baseline gap-1.5">
          <strong className="text-lg font-semibold tabular-nums">
            {money.format(studio.hourlyRate)}
          </strong>
          <span className="text-xs text-muted-foreground">/ hr</span>
        </p>

        <Link
          href={`/studios/edit/${id}`}
          aria-label={`Edit ${studio.title}`}
          className={focusStyle}
        >
          Edit studio
          <Pencil size={16} aria-hidden="true" />
        </Link>

        <DeleteStudio studioId={studio._id} title={studio.title} />
      </div>
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

  if (!studios.length) {
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/30 pb-3">
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
