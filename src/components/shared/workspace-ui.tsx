import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const eyebrow =
  "text-xs font-medium uppercase tracking-widest text-muted-foreground";

export const entryTitle =
  "break-words font-heading text-2xl leading-tight tracking-tight sm:text-3xl";

export const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export type WorkspaceBooking = {
  _id: string;
  studioTitle: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  startAt?: string;
  endAt?: string;
  hours?: number;
  studioFee?: number;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Dhaka",
});

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function sessionLabel(startAt?: string) {
  if (!startAt) return "Time unavailable";

  const date = new Date(startAt);
  if (!Number.isFinite(date.getTime())) return "Time unavailable";

  return `${dateFormat.format(date)} · ${timeFormat.format(date)}`;
}

export function isActiveSession(booking: WorkspaceBooking, now: number) {
  const open = booking.status === "Pending" || booking.status === "Confirmed";
  const end = Date.parse(booking.endAt || booking.startAt || "");
  return open && end > now;
}

export function byStart(a: WorkspaceBooking, b: WorkspaceBooking) {
  return Date.parse(a.startAt || "") - Date.parse(b.startAt || "");
}

export function WorkspaceHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-6 min-w-0 sm:mb-8">
      <p className={eyebrow}>{label}</p>
      <h1 className="mt-2 break-words font-heading text-4xl leading-tight tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

export function WorkspaceLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-sm text-sm font-medium transition-colors duration-200 ${focusStyle} ${
        primary
          ? "bg-primary px-4 text-primary-foreground hover:bg-primary/85"
          : "text-foreground hover:text-muted-foreground"
      }`}
    >
      {children}
      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5"
      />
    </Link>
  );
}

export function WorkspaceEmpty({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <section className="rounded-sm bg-secondary p-5 sm:p-8">
      <h2 className={entryTitle}>{title}</h2>
      <p className="mb-4 mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <WorkspaceLink href={href} primary>
        {action}
      </WorkspaceLink>
    </section>
  );
}

export function WorkspaceSkeleton({
  label,
  photos = false,
}: {
  label: string;
  photos?: boolean;
}) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className={`grid gap-5 motion-safe:animate-pulse ${
          photos ? "sm:grid-cols-2" : ""
        }`}
      >
        {[1, 2].map((item) => (
          <div key={item} className="min-w-0 space-y-3">
            {photos && <div className="aspect-[16/10] rounded-sm bg-muted" />}
            <div className="h-3 w-20 rounded-sm bg-muted" />
            <div className="h-7 w-2/3 max-w-xs rounded-sm bg-muted" />
            <div className="h-4 w-36 rounded-sm bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
