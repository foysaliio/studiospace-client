import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowUpRight, CalendarDays, Layers, Plus } from "lucide-react";

import {
  WorkspaceHeader,
  byStart,
  eyebrow,
  focusStyle,
  isActiveSession,
  sessionLabel,
  type WorkspaceBooking,
} from "@/components/shared/workspace-ui";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your next studio session and host workspace.",
};

const hostLinks = [
  {
    title: "My studio listings",
    text: "See how your spaces appear to creators.",
    href: "/my-listings",
    icon: Layers,
  },
  {
    title: "Add new studio",
    text: "Publish a space and set your hourly rate.",
    href: "/add-studio",
    icon: Plus,
  },
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/bookings/mine`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    },
  );

  if (response.status === 401) redirect("/login?next=/dashboard");
  if (!response.ok) throw new Error("Could not load your dashboard.");

  const bookings: WorkspaceBooking[] = await response.json();
  const now = Date.now();
  const next = bookings
    .filter((item) => isActiveSession(item, now))
    .sort(byStart)[0];

  return (
    <>
      <WorkspaceHeader
        label="Account overview"
        title="Dashboard"
        description="Your next session and the spaces you host."
      />

      <section
        aria-labelledby="next-session-heading"
        className="relative isolate overflow-hidden rounded-sm bg-foreground px-5 py-6 text-background sm:px-8 sm:py-8"
      >
        {/* A quiet aperture detail, drawn with the site's own colors. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 -z-10 size-52 rounded-full border border-background/10 sm:size-72"
        >
          <div className="absolute inset-5 rounded-full border border-background/10" />
          <div className="absolute inset-10 rounded-full border border-background/10" />
          <div className="absolute inset-16 rounded-full border border-background/10" />
        </div>

        <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest">
          <CalendarDays size={15} aria-hidden="true" />
          Next session
        </p>

        <h2
          id="next-session-heading"
          className="mt-5 max-w-lg break-words font-heading text-3xl leading-tight tracking-tight sm:text-4xl"
        >
          {next ? next.studioTitle : "Plan your next session"}
        </h2>

        <p className="mt-2 max-w-lg text-sm leading-6 text-background/80">
          {next
            ? `${sessionLabel(next.startAt)} · Dhaka time`
            : "Find a studio for your next shoot, recording or workshop."}
        </p>

        {next && (
          <p className="mt-1 text-xs text-background/75">
            Booking status · {next.status}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href={next ? "/my-bookings" : "/studios"}
            className={`group inline-flex min-h-11 items-center gap-3 rounded-sm bg-background px-4 text-sm font-medium text-foreground hover:bg-background/90 ${focusStyle}`}
          >
            {next ? "View bookings" : "Explore studios"}
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href={next ? "/studios" : "/my-bookings"}
            className={`inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-background/85 hover:text-background ${focusStyle}`}
          >
            {next ? "Explore studios" : "My bookings"}
          </Link>
        </div>
      </section>

      <section aria-labelledby="host-tools-heading" className="mt-8 sm:mt-10">
        <h2 id="host-tools-heading" className={eyebrow}>
          For studio hosts
        </h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {hostLinks.map(({ title, text, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`group min-w-0 rounded-sm border border-border p-4 transition-colors duration-200 hover:border-foreground/35 hover:bg-secondary sm:p-5 ${focusStyle}`}
            >
              <div className="flex items-center justify-between">
                <Icon size={17} aria-hidden="true" />
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-muted-foreground motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </div>
              <h3 className="mt-4 font-heading text-2xl tracking-tight">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
