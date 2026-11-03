import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

type Studio = {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  imageUrl: string;
  rating: number;
};

const gridClass = "grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3";

function StudioCard({ studio }: { studio: Studio }) {
  return (
    <article className="min-w-0">
      <Link
        href={`/studios/${studio._id}`}
        aria-label={`View details for ${studio.title}`}
        className="group flex h-full flex-col rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 94vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.035]"
          />

          <span className="absolute bottom-0 left-0 bg-background py-1.5 pr-3 text-xs font-medium text-foreground">
            {studio.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 font-heading text-2xl leading-tight tracking-tight">
              {studio.title}
            </h3>

            <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
              {studio.rating > 0 ? (
                <>
                  <Star aria-hidden="true" className="size-3 fill-current" />
                  {studio.rating.toFixed(1)}
                </>
              ) : (
                "New"
              )}
            </span>
          </div>

          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            {studio.location}
          </p>

          <div className="mt-auto flex min-h-12 items-center justify-between gap-3 border-t border-border pt-2">
            <p className="text-sm text-muted-foreground">
              <strong className="text-lg font-semibold text-foreground">
                ${studio.hourlyRate}
              </strong>{" "}
              / hr
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-medium">
              View Details
              <span className="grid size-8 place-items-center rounded-full bg-foreground text-background transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

async function StudioGrid() {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/studios/featured`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Could not load featured studios.");
  }

  const studios: Studio[] = await response.json();

  if (studios.length === 0) {
    return <p className="py-6 text-muted-foreground">No studios listed yet.</p>;
  }

  return (
    <div className={gridClass}>
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

function StudioGridSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading featured studios</span>

      <div aria-hidden="true" className={gridClass}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="motion-safe:animate-pulse">
            <div className="aspect-[4/3] rounded-sm bg-muted" />
            <div className="mt-3 h-6 w-2/3 rounded-sm bg-muted" />
            <div className="mt-2 h-4 w-1/3 rounded-sm bg-muted" />
            <div className="mt-4 flex min-h-12 items-center justify-between border-t border-border pt-2">
              <div className="h-4 w-14 bg-muted" />
              <div className="size-8 rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="site-container grid grid-cols-1 gap-y-7 py-12 md:grid-cols-[1fr_auto] md:items-center md:gap-x-6 md:gap-y-8 md:py-16"
    >
      <h2
        id="featured-heading"
        className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl md:col-start-1 md:row-start-1"
      >
        Featured Studios
      </h2>

      <div className="min-w-0 md:col-span-2 md:row-start-2">
        <Suspense fallback={<StudioGridSkeleton />}>
          <StudioGrid />
        </Suspense>
      </div>

      <Link
        href="/studios"
        className="group inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:w-auto sm:justify-center"
      >
        Explore all studios
        <ArrowUpRight
          size={17}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
        />
      </Link>
    </section>
  );
}
