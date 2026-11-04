import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowUpRight,
  Ban,
  CalendarDays,
  Check,
  CheckCheck,
  Clock3,
} from "lucide-react";

import CancelBooking from "./cancel-booking";

export const metadata: Metadata = {
  title: "My bookings",
  description: "View your studio reservations and booking status.",
};

type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Booking = {
  _id: string;
  studioTitle: string;
  status: BookingStatus;
  startAt?: string;
  hours?: number;
  studioFee?: number;
};

const statusStyles = {
  Pending: {
    icon: Clock3,
    color: "text-amber-800 dark:text-amber-300",
  },
  Confirmed: {
    icon: Check,
    color: "text-emerald-800 dark:text-emerald-300",
  },
  Completed: {
    icon: CheckCheck,
    color: "text-foreground",
  },
  Cancelled: {
    icon: Ban,
    color: "text-muted-foreground",
  },
};

const studioTimeZone = "Asia/Dhaka";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: studioTimeZone,
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: studioTimeZone,
});

const feeFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const sessionGrid =
  "mt-3 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_9rem_7rem] lg:items-baseline lg:gap-6";

function BookingTicket({ booking }: { booking: Booking }) {
  const start = booking.startAt ? new Date(booking.startAt) : null;
  const date = start && Number.isFinite(start.getTime()) ? start : null;
  const { icon: StatusIcon, color } = statusStyles[booking.status];

  return (
    <article className="min-w-0 border-b border-border py-5 sm:py-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="text-xs font-medium tracking-wide text-muted-foreground">
          {date ? (
            <time dateTime={date.toISOString()}>{dateFormat.format(date)}</time>
          ) : (
            "Date unavailable"
          )}
        </div>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${color}`}
        >
          <StatusIcon size={14} aria-hidden="true" />
          {booking.status}
        </span>
      </div>

      <div className={sessionGrid}>
        <h2 className="min-w-0 break-words font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
          {booking.studioTitle}
        </h2>

        <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 lg:contents">
          <div>
            <dt className="text-xs text-muted-foreground">Session time</dt>
            <dd className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-sm font-medium tabular-nums">
              <span>{date ? timeFormat.format(date) : "—"}</span>
              {typeof booking.hours === "number" && (
                <span className="font-normal text-muted-foreground">
                  · {booking.hours} {booking.hours === 1 ? "hr" : "hrs"}
                </span>
              )}
            </dd>
          </div>

          <div className="text-right">
            <dt className="text-xs text-muted-foreground">Studio fee</dt>
            <dd className="mt-1 text-sm font-semibold tabular-nums">
              {typeof booking.studioFee === "number"
                ? feeFormat.format(booking.studioFee)
                : "—"}
            </dd>
          </div>
        </dl>
      </div>

      {booking.status === "Pending" && (
        <div className="mt-2 flex justify-end">
          <CancelBooking
            bookingId={booking._id}
            studioTitle={booking.studioTitle}
          />
        </div>
      )}
    </article>
  );
}

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
      className="min-w-0 border-t border-border"
    >
      {bookings.map((booking) => (
        <li key={booking._id} className="min-w-0">
          <BookingTicket booking={booking} />
        </li>
      ))}
    </ul>
  );
}

function BookingsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading your bookings</span>

      <div
        aria-hidden="true"
        className="border-t border-border motion-safe:animate-pulse"
      >
        {[1, 2, 3].map((item) => (
          <div key={item} className="border-b border-border py-5 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-28 rounded-sm bg-muted" />
              <div className="h-3 w-16 rounded-sm bg-muted" />
            </div>

            <div className={sessionGrid}>
              <div className="h-9 w-4/5 max-w-xs rounded-sm bg-muted" />

              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 lg:contents">
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded-sm bg-muted" />
                  <div className="h-4 w-24 rounded-sm bg-muted" />
                </div>

                <div className="space-y-2 justify-self-end">
                  <div className="h-3 w-14 rounded-sm bg-muted" />
                  <div className="ml-auto h-4 w-10 rounded-sm bg-muted" />
                </div>
              </div>
            </div>
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

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Session times are shown in Dhaka time.
        </p>
      </header>

      <Suspense fallback={<BookingsSkeleton />}>
        <BookingList />
      </Suspense>
    </>
  );
}
