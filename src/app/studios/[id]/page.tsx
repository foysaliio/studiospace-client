import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import type { Studio } from "@/features/home/featured-studios";

type StudioDetails = Studio & {
  overview: string;
  securityDeposit: number;
  maxCapacity: number;
  amenities: string[];
  ownerName: string;
  ownerEmail: string;
};

type StudioPageProps = {
  params: Promise<{ id: string }>;
};

async function getStudio(id: string): Promise<StudioDetails> {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/studios/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (response.status === 400 || response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not load studio details.");
  }

  return response.json();
}

export async function generateMetadata({
  params,
}: StudioPageProps): Promise<Metadata> {
  const { id } = await params;
  const studio = await getStudio(id);

  return {
    title: studio.title,
    description: studio.overview,
  };
}

export default async function StudioDetailsPage({ params }: StudioPageProps) {
  const { id } = await params;
  const studio = await getStudio(id);

  return (
    <main className="site-container py-8 sm:py-12 md:py-16">
      <Link
        href="/studios"
        className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Explore studios
      </Link>

      <header className="mb-7 md:mb-9">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {studio.category}
        </p>

        <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
          {studio.title}
        </h1>

        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {studio.location}
        </p>
      </header>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 94vw"
            className="object-cover"
          />
        </div>

        <section aria-labelledby="space-heading" className="min-w-0">
          <h2
            id="space-heading"
            className="font-heading text-3xl tracking-tight"
          >
            About the space
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {studio.overview}
          </p>

          <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Hourly rate</dt>
              <dd className="font-semibold">${studio.hourlyRate} / hr</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Security deposit</dt>
              <dd>${studio.securityDeposit}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Maximum capacity</dt>
              <dd>{studio.maxCapacity} people</dd>
            </div>
          </dl>

          <h2 className="mt-7 font-heading text-2xl">Amenities</h2>
          {studio.amenities.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {studio.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-sm bg-muted px-3 py-1.5 text-sm"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              No amenities listed yet.
            </p>
          )}

          <h2 className="mt-7 font-heading text-2xl">Your host</h2>
          <p className="mt-2 text-sm font-medium">{studio.ownerName}</p>
          <p className="mt-1 break-words text-sm text-muted-foreground">
            {studio.ownerEmail}
          </p>
        </section>
      </div>
    </main>
  );
}
