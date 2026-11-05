import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Ban, Check, CheckCheck, Clock3 } from "lucide-react";

import CancelBooking from "./cancel-booking";
import DownloadInvoice from "./download-invoice";
import {
  WorkspaceEmpty,
  WorkspaceHeader,
  money,
  sessionLabel,
  type WorkspaceBooking,
} from "@/components/shared/workspace-ui";

export const metadata: Metadata = {
  title: "My bookings",
  description: "View your studio reservations, session times and invoices.",
};

const statusStyle = {
  Pending: { icon: Clock3, color: "text-amber-800 dark:text-amber-300" },
  Confirmed: { icon: Check, color: "text-emerald-800 dark:text-emerald-300" },
  Completed: { icon: CheckCheck, color: "text-foreground" },
  Cancelled: { icon: Ban, color: "text-muted-foreground" },
};

const timeZone = "Asia/Dhaka";

const bookingDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone,
});

const bookingTime = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone,
});

// Both row buttons use the same style. The cancel dialog has its own controls.
const actionStyle = `
  [&_button:not(dialog_button)]:inline-flex!
  [&_button:not(dialog_button)]:min-h-11!
  [&_button:not(dialog_button)]:w-40!
  [&_button:not(dialog_button)]:items-center!
  [&_button:not(dialog_button)]:justify-center!
  [&_button:not(dialog_button)]:gap-2!
  [&_button:not(dialog_button)]:rounded-sm!
  [&_button:not(dialog_button)]:border!
  [&_button:not(dialog_button)]:border-border!
  [&_button:not(dialog_button)]:bg-background!
  [&_button:not(dialog_button)]:px-3!
  [&_button:not(dialog_button)]:text-sm!
  [&_button:not(dialog_button)]:font-medium!
  [&_button:not(dialog_button)]:text-foreground!
  [&_button:not(dialog_button)]:no-underline!
  [&_button:not(dialog_button)]:transition-colors!
  [&_button:not(dialog_button)]:duration-200!
  [&_button:not(dialog_button):enabled:hover]:border-foreground!
  [&_button:not(dialog_button):enabled:hover]:bg-foreground!
  [&_button:not(dialog_button):enabled:hover]:text-background!
  [&_button:not(dialog_button):focus-visible]:outline-2!
  [&_button:not(dialog_button):focus-visible]:outline-offset-2!
  [&_button:not(dialog_button):focus-visible]:outline-ring!
  [&_button:not(dialog_button)_svg]:order-last!
  [&_button:not(dialog_button)_svg]:size-4!
  [&_button:not(dialog_button)_svg]:shrink-0!
  [&_button:not(dialog_button)_svg]:translate-x-0!
  [&_button:not(dialog_button)_svg]:translate-y-0!
  [&_button:not(dialog_button)_svg]:transition-transform!
  [&_button:not(dialog_button)_svg]:duration-200!
  motion-safe:[&_button:not(dialog_button):enabled:hover_svg]:translate-x-0.5!
  motion-reduce:[&_button:not(dialog_button)]:transition-none!
  motion-reduce:[&_button:not(dialog_button)_svg]:transition-none!
`;

function BookingRow({ booking }: { booking: WorkspaceBooking }) {
  const { icon: StatusIcon, color } = statusStyle[booking.status];

  const start = booking.startAt ? new Date(booking.startAt) : null;
  const date = start && Number.isFinite(start.getTime()) ? start : null;

  const parts = date ? bookingDate.formatToParts(date) : [];
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  const duration =
    typeof booking.hours === "number"
      ? `${booking.hours} ${booking.hours === 1 ? "hour" : "hours"}`
      : null;

  const fee =
    typeof booking.studioFee === "number"
      ? money.format(booking.studioFee)
      : null;

  return (
    <li className="min-w-0 border-b border-border py-5 transition-colors duration-200 motion-reduce:transition-none sm:grid sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-5 sm:py-6 sm:hover:bg-secondary/60 sm:focus-within:bg-secondary/60">
      {/* Desktop calendar */}
      <div className="hidden self-start border-r border-border pr-5 text-center sm:block">
        {date ? (
          <time dateTime={date.toISOString()}>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {month}
            </span>
            <span className="my-1 block font-heading text-4xl leading-none tabular-nums">
              {day}
            </span>
            <span className="block text-xs tabular-nums text-muted-foreground">
              {year}
            </span>
          </time>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:justify-start">
          {/* Mobile date */}
          <span className="text-xs font-medium text-muted-foreground sm:hidden">
            {date ? (
              <time dateTime={date.toISOString()}>
                {bookingDate.format(date)}
              </time>
            ) : (
              "Date unavailable"
            )}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${color}`}
          >
            <StatusIcon size={14} aria-hidden="true" />
            {booking.status}
          </span>
        </div>

        <h2 className="mt-2 break-words font-heading text-2xl leading-tight tracking-tight sm:mt-1 sm:text-3xl">
          {booking.studioTitle}
        </h2>

        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>{date ? bookingTime.format(date) : "Time unavailable"}</span>
          {duration && (
            <>
              <span aria-hidden="true">·</span>
              <span>{duration}</span>
            </>
          )}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:mt-0 sm:flex-col sm:items-end">
        <p className="flex items-baseline gap-1.5">
          <span className="text-xs text-muted-foreground">Studio fee</span>
          <strong className="text-base font-semibold tabular-nums">
            {fee ?? "—"}
          </strong>
        </p>

        {booking.status === "Pending" && (
          <div className={actionStyle}>
            <CancelBooking
              bookingId={booking._id}
              studioTitle={booking.studioTitle}
            />
          </div>
        )}

        {booking.status === "Confirmed" && (
          <div className={actionStyle}>
            <DownloadInvoice
              bookingId={booking._id}
              studioTitle={booking.studioTitle}
              session={date ? sessionLabel(booking.startAt) : "Unavailable"}
              duration={duration ?? "Unavailable"}
              studioFee={fee ?? "Unavailable"}
            />
          </div>
        )}
      </div>
    </li>
  );
}

function BookingsSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading your bookings</span>

      <div aria-hidden="true" className="motion-safe:animate-pulse">
        <div className="h-11 rounded-sm bg-secondary" />

        {[0, 1].map((row) => (
          <div
            key={row}
            className="border-b border-border py-5 sm:grid sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-5 sm:py-6"
          >
            <div className="hidden h-16 rounded-sm bg-muted sm:block" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-20 rounded-sm bg-muted" />
                <div className="h-3 w-16 rounded-sm bg-muted sm:hidden" />
              </div>
              <div className="h-6 w-3/4 max-w-64 rounded-sm bg-muted" />
              <div className="h-3 w-28 rounded-sm bg-muted" />
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 sm:mt-0 sm:flex-col sm:items-end">
              <div className="h-4 w-16 rounded-sm bg-muted" />
              <div className="h-11 w-40 rounded-sm bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
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

  const bookings: WorkspaceBooking[] = await response.json();

  if (bookings.length === 0) {
    return (
      <WorkspaceEmpty
        title="Your first session"
        description="Choose a studio for your next project. Your reservation will appear here."
        href="/studios"
        action="Explore studios"
      />
    );
  }

  return (
    <section aria-label="Your reservations">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm bg-secondary px-3 py-3 sm:px-5">
        <p className="text-sm font-medium">
          {bookings.length}{" "}
          {bookings.length === 1 ? "reservation" : "reservations"}
        </p>
        <p className="text-xs text-muted-foreground">Newest bookings first</p>
      </div>

      <ul>
        {bookings.map((booking) => (
          <BookingRow key={booking._id} booking={booking} />
        ))}
      </ul>
    </section>
  );
}

export default function MyBookingsPage() {
  return (
    <>
      <WorkspaceHeader
        label="Reservations"
        title="My bookings"
        description="Your studio sessions and fees. Times are shown in Dhaka time."
      />

      <Suspense fallback={<BookingsSkeleton />}>
        <BookingList />
      </Suspense>
    </>
  );
}
