import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  List,
  Plus,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your studio bookings and listings on StudioSpace.",
};

const hostActions = [
  {
    title: "My studio listings",
    description:
      "Update the photos, rates, and details of the spaces you host.",
    href: "/my-listings",
    icon: List,
  },
  {
    title: "Add new studio",
    description: "Share a creative space and set its hourly rate.",
    href: "/add-studio",
    icon: Plus,
  },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function DashboardPage() {
  return (
    <>
      <header className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Account overview
        </p>

        <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
          Dashboard
        </h1>
      </header>

      <section
        aria-labelledby="bookings-heading"
        className="rounded-sm bg-foreground p-5 text-background sm:p-8"
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest">
          <CalendarDays size={15} strokeWidth={1.6} aria-hidden="true" />
          Reservations
        </div>

        <h2
          id="bookings-heading"
          className="mt-6 font-heading text-3xl leading-tight tracking-tight sm:text-4xl"
        >
          My bookings
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 opacity-80 sm:text-base">
          Check your studio reservations, see their status, or cancel a pending
          booking.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/my-bookings"
            className={`group inline-flex min-h-11 items-center justify-center gap-3 rounded-sm bg-background px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-background/90 ${focusStyle}`}
          >
            View bookings
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/studios"
            className={`group inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium ${focusStyle}`}
          >
            Explore studios
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      <section aria-labelledby="hosting-heading" className="mt-8 sm:mt-10">
        <h2
          id="hosting-heading"
          className="mb-4 font-heading text-2xl tracking-tight sm:text-3xl"
        >
          For studio hosts
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {hostActions.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`group flex min-w-0 flex-col rounded-sm border border-border p-4 transition-colors duration-200 hover:border-foreground/40 hover:bg-secondary/60 sm:p-5 ${focusStyle}`}
            >
              <span className="mb-4 flex items-center justify-between">
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-muted-foreground"
                />

                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-muted-foreground motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </span>

              <span className="font-heading text-xl leading-tight tracking-tight sm:text-2xl">
                {title}
              </span>

              <span className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
