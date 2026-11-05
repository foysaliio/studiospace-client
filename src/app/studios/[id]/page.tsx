import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight, Check, Star } from "lucide-react";

import type { Studio } from "@/features/home/featured-studios";
import BookingModal from "./booking-modal";
import StudioGallery from "./studio-gallery";
import ReviewForm from "./review-form";

type StudioDetails = Studio & {
  overview: string;
  securityDeposit: number;
  maxCapacity: number;
  amenities: string[];
  ownerName: string;
  ownerEmail: string;
  galleryImages?: string[];
};

type StudioPageProps = {
  params: Promise<{ id: string }>;
};

type Review = {
  _id: string;
  reviewerName: string;
  rating: number;
  comment: string;
};

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const labelStyle =
  "text-xs font-medium uppercase tracking-widest text-muted-foreground";

const headingStyle =
  "font-heading text-2xl leading-tight tracking-tight sm:text-3xl";

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

async function StudioReviews({ studioId }: { studioId: string }) {
  let reviews: Review[];

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/studios/${encodeURIComponent(studioId)}/reviews`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error("Could not load studio reviews.");
    }

    reviews = await response.json();
  } catch {
    return (
      <p className="text-sm leading-6 text-muted-foreground">
        Reviews are unavailable right now. Please try again later.
      </p>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="text-sm leading-6 text-muted-foreground">No reviews yet.</p>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {reviews.map((review) => (
        <li key={review._id} className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="break-words text-sm font-semibold">
              {review.reviewerName}
            </p>

            <span className="inline-flex items-center gap-1.5 text-sm">
              <Star size={13} className="fill-current" aria-hidden="true" />
              <span className="sr-only">Rating </span>
              {review.rating} / 5
            </span>
          </div>

          <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-muted-foreground">
            {review.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ReviewsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading reviews</span>
      <div
        aria-hidden="true"
        className="max-w-sm space-y-2 motion-safe:animate-pulse"
      >
        <div className="h-4 w-24 rounded-sm bg-muted" />
        <div className="h-3 w-3/4 rounded-sm bg-muted" />
      </div>
    </div>
  );
}

export default async function StudioDetailsPage({ params }: StudioPageProps) {
  const { id } = await params;
  const studio = await getStudio(id);

  return (
    <main className="site-container min-w-0 pb-10 pt-2 sm:pb-14 sm:pt-4 lg:pb-16">
      <Link
        href="/studios"
        className={`group mb-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground sm:mb-3 ${focusStyle}`}
      >
        <ArrowLeft
          size={15}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-x-0.5"
        />
        Explore studios
      </Link>

      <StudioGallery
        key={studio._id}
        title={studio.title}
        category={studio.category}
        location={studio.location}
        imageUrl={studio.imageUrl}
        galleryImages={studio.galleryImages}
      />

      <section
        aria-label="Booking information"
        className="mt-4 grid items-center gap-4 rounded-sm bg-secondary p-4 text-secondary-foreground sm:gap-5 sm:px-6 sm:py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-12 lg:px-8"
      >
        <dl className="grid min-w-0 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-1">
          {[
            { label: "Hourly rate", value: `$${studio.hourlyRate}` },
            {
              label: "Capacity",
              value: `${studio.maxCapacity} ${studio.maxCapacity === 1 ? "person" : "people"}`,
            },
            { label: "Security deposit", value: `$${studio.securityDeposit}` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 border-b border-border py-2.5 first:pt-0 last:border-b-0 last:pb-0 sm:row-span-2 sm:grid-cols-1 sm:grid-rows-subgrid sm:items-stretch sm:border-0 sm:py-0"
            >
              <dt className="text-sm leading-5 text-muted-foreground sm:self-end sm:text-xs sm:leading-4">
                {label}
              </dt>
              <dd className="min-w-0 break-words text-right font-heading text-xl leading-7 tracking-tight tabular-nums sm:text-left sm:text-2xl sm:leading-8">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="min-w-0 sm:justify-self-end">
          <BookingModal
            key={studio._id}
            title={studio.title}
            studioId={studio._id}
            hourlyRate={studio.hourlyRate}
            securityDeposit={studio.securityDeposit}
          />
        </div>
      </section>

      <div className="grid min-w-0 gap-7 py-8 sm:gap-9 sm:py-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16 lg:py-12">
        <section aria-labelledby="about-heading" className="min-w-0">
          <h2 id="about-heading" className={headingStyle}>
            About the space
          </h2>

          <p className="mt-3 max-w-prose whitespace-pre-line break-words text-base leading-7 text-muted-foreground">
            {studio.overview}
          </p>

          <div className="mt-6">
            <p className={labelStyle}>Your host</p>

            <p className="mt-1 break-words font-heading text-xl tracking-tight">
              {studio.ownerName}
            </p>

            <a
              href={`mailto:${studio.ownerEmail}`}
              className={`group inline-flex min-h-11 max-w-full items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground ${focusStyle}`}
            >
              <span className="min-w-0 break-all">{studio.ownerEmail}</span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </section>

        <section aria-labelledby="amenities-heading" className="min-w-0">
          <h2 id="amenities-heading" className={headingStyle}>
            Amenities
          </h2>

          {studio.amenities.length > 0 ? (
            <ul className="mt-2 divide-y divide-border">
              {studio.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="flex items-baseline justify-between gap-3 py-2.5 text-sm leading-6"
                >
                  <span className="min-w-0 break-words">{amenity}</span>
                  <Check
                    size={15}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 self-center text-muted-foreground"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No amenities listed yet.
            </p>
          )}
        </section>
      </div>

      <section
        aria-labelledby="reviews-heading"
        className="grid min-w-0 gap-3 border-t border-border pt-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
      >
        <h2 id="reviews-heading" className={headingStyle}>
          Reviews
        </h2>

        <div className="min-w-0">
          <Suspense key={studio._id} fallback={<ReviewsSkeleton />}>
            <StudioReviews studioId={studio._id} />
          </Suspense>
          <ReviewForm studioId={studio._id} />
        </div>
      </section>
    </main>
  );
}
