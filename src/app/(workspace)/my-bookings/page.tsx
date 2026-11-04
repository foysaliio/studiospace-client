import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Ban, Check, CheckCheck, Clock3 } from "lucide-react";

import CancelBooking from "./cancel-booking";
import {
  WorkspaceEmpty,
  WorkspaceHeader,
  WorkspaceSkeleton,
  money,
  sessionLabel,
  type WorkspaceBooking,
} from "@/components/shared/workspace-ui";

export const metadata: Metadata = {
  title: "My bookings",
  description: "View your studio reservations, session times and fees.",
};

const statusStyle = {
  Pending: { icon: Clock3, color: "text-amber-800 dark:text-amber-300" },
  Confirmed: { icon: Check, color: "text-emerald-800 dark:text-emerald-300" },
  Completed: { icon: CheckCheck, color: "text-foreground" },
  Cancelled: { icon: Ban, color: "text-muted-foreground" },
};

function BookingRow({ booking }: { booking: WorkspaceBooking }) {
  const { icon: StatusIcon, color } = statusStyle[booking.status];

  return (
    <li className="min-w-0 py-5 sm:py-6">
      <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6 sm:gap-y-2">
        <div className="min-w-0 sm:col-start-1 sm:row-start-1">
          <p
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${color}`}
          >
            <StatusIcon size={14} aria-hidden="true" />
            {booking.status}
          </p>

          <h2 className="mt-1.5 break-words font-heading text-3xl leading-tight tracking-tight">
            {booking.studioTitle}
          </h2>

          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm leading-5 text-muted-foreground">
            <span>{sessionLabel(booking.startAt)}</span>

            {typeof booking.hours === "number" && (
              <span>
                · {booking.hours} {booking.hours === 1 ? "hour" : "hours"}
              </span>
            )}
          </p>
        </div>

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 sm:col-start-2 sm:row-start-1 sm:flex-col sm:items-end sm:justify-start">
          <p className="inline-flex items-baseline gap-2 sm:flex-col sm:items-end sm:gap-1">
            <span className="text-xs text-muted-foreground">Studio fee</span>
            <strong className="text-lg font-semibold tabular-nums">
              {typeof booking.studioFee === "number"
                ? money.format(booking.studioFee)
                : "—"}
            </strong>
          </p>

          {booking.status === "Pending" && (
            <CancelBooking
              bookingId={booking._id}
              studioTitle={booking.studioTitle}
            />
          )}
        </div>
      </div>
    </li>
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

  if (response.status === 401) redirect("/login?next=/my-bookings");
  if (!response.ok) throw new Error("Could not load your bookings.");

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
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-foreground/30 pb-3">
        <p className="text-sm font-medium">
          {bookings.length}{" "}
          {bookings.length === 1 ? "reservation" : "reservations"}
        </p>
        <p className="text-xs text-muted-foreground">Newest bookings first</p>
      </div>

      <ul className="divide-y divide-border border-b border-border">
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

      <Suspense fallback={<WorkspaceSkeleton label="Loading your bookings" />}>
        <BookingList />
      </Suspense>
    </>
  );
}
