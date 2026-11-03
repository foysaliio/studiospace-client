import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "My bookings",
  description: "View your studio reservations and booking status.",
};

type Booking = {
  _id: string;
  studioTitle: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

async function BookingList() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/bookings/mine`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    redirect("/login?next=/my-bookings");
  }

  if (!response.ok) {
    throw new Error("Could not load your bookings.");
  }

  const bookings: Booking[] = await response.json();

  if (bookings.length === 0) {
    return (
      <section
        aria-labelledby="empty-bookings-heading"
        className="rounded-sm bg-secondary px-5 py-8 sm:px-8 sm:py-10"
      >
        <CalendarDays
          size={26}
          strokeWidth={1.5}
          aria-hidden="true"
          className="mb-5 text-muted-foreground"
        />

        <h2
          id="empty-bookings-heading"
          className="font-heading text-3xl leading-tight tracking-tight"
        >
          No bookings yet
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Once you reserve a studio, you can check its booking status here.
        </p>

        <Link
          href="/studios"
          className="group mt-5 inline-flex min-h-12 items-center justify-center gap-4 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Explore studios
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          />
        </Link>
      </section>
    );
  }

  return (
    <ul
      aria-label="Your reservations"
      className="divide-y divide-border border-y border-border"
    >
      {bookings.map((booking) => (
        <li
          key={booking._id}
          className="flex flex-wrap items-center justify-between gap-3 py-4"
        >
          <h2 className="min-w-0 break-words font-heading text-xl tracking-tight sm:text-2xl">
            {booking.studioTitle}
          </h2>

          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {booking.status}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BookingsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading your bookings</span>

      <div aria-hidden="true" className="space-y-4 motion-safe:animate-pulse">
        {[0, 1].map((item) => (
          <div
            key={item}
            className="flex min-h-16 items-center justify-between gap-4 rounded-sm bg-muted px-4"
          >
            <div className="h-4 w-2/5 rounded-sm bg-background" />
            <div className="h-5 w-16 rounded-full bg-background" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <>
      <header className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Reservations
        </p>

        <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
          My bookings
        </h1>
      </header>

      <Suspense fallback={<BookingsSkeleton />}>
        <BookingList />
      </Suspense>
    </>
  );
}
