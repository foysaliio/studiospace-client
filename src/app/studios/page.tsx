import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { Suspense } from "react";

import { StudioCard, type Studio } from "@/features/home/featured-studios";

export const metadata: Metadata = {
  title: "Explore Studios",
  description:
    "Browse creative studios by category, location, and hourly rate to find a space for your next session.",
};

const categories = [
  { label: "All studios", value: "" },
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Sound Stages", value: "Film Stage" },
  { label: "Podcast Rooms", value: "Podcast Lounge" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Workshop" },
];

const gridClass = "grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3";

type StudiosPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function CategoryPicker({ category }: { category: string }) {
  const selected = categories.find((item) => item.value === category);
  const selectedLabel = selected?.label ?? category;

  return (
    <details
      key={category}
      className="group relative w-fit max-w-full md:justify-self-end"
    >
      <summary
        aria-label={`Choose a studio category. Current selection: ${selectedLabel}`}
        className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 rounded-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:flex-col md:items-start md:justify-center md:gap-0.5 [&::-webkit-details-marker]:hidden"
      >
        <span className="text-xs leading-4 text-muted-foreground">
          Category
        </span>

        <span className="inline-flex items-center gap-1.5 text-sm font-medium leading-5">
          {selectedLabel}
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          />
        </span>
      </summary>

      <nav
        aria-label="Choose a studio category"
        className="absolute left-0 top-full z-20 mt-2 w-56 max-w-[80vw] rounded-md bg-popover p-1.5 text-popover-foreground shadow-lg ring-1 ring-border md:right-0 md:left-auto"
      >
        {categories.map(({ label, value }) => {
          const active = category === value;

          return (
            <Link
              key={label}
              href={
                value
                  ? { pathname: "/studios", query: { category: value } }
                  : "/studios"
              }
              scroll={false}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center justify-between gap-4 rounded-sm px-3 text-sm transition-colors duration-200 hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring ${
                active ? "bg-muted font-medium" : ""
              }`}
            >
              {label}
              {active && <Check size={15} aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
    </details>
  );
}

async function StudioResults({ category }: { category: string }) {
  const url = new URL("/api/studios", process.env.API_BASE_URL);

  if (category) {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not load studios.");
  }

  const studios: Studio[] = await response.json();

  if (studios.length === 0) {
    return (
      <div className="py-8">
        <h2 className="font-heading text-2xl">No studios found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {category
            ? "Choose another category to explore more spaces."
            : "New studio listings will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading studios</span>

      <div aria-hidden="true" className={gridClass}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="motion-safe:animate-pulse">
            <div className="aspect-[4/3] rounded-sm bg-muted" />
            <div className="mt-3 h-6 w-2/3 rounded-sm bg-muted" />
            <div className="mt-2 h-4 w-1/3 rounded-sm bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function StudiosPage({ searchParams }: StudiosPageProps) {
  const params = await searchParams;
  const category =
    typeof params.category === "string" ? params.category.trim() : "";

  return (
    <main className="site-container min-w-0 py-8 sm:py-12 md:py-16">
      <header className="mb-5 grid items-end gap-3 sm:mb-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Studio directory
          </p>

          <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
            Explore studios
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Find a space for your next shoot, recording, or workshop.
          </p>
        </div>

        <CategoryPicker category={category} />
      </header>

      <Suspense key={category} fallback={<ResultsSkeleton />}>
        <StudioResults category={category} />
      </Suspense>
    </main>
  );
}
