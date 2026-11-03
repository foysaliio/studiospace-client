"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  List,
  Plus,
} from "lucide-react";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My bookings", href: "/my-bookings", icon: CalendarDays },
  { label: "My studio listings", href: "/my-listings", icon: List },
  { label: "Add new studio", href: "/add-studio", icon: Plus },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function WorkspaceNav() {
  const pathname = usePathname();
  const router = useRouter();

  const activeHref = pathname.startsWith("/studios/edit/")
    ? "/my-listings"
    : links.find(
        ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
      )?.href;

  return (
    <aside className="min-w-0 lg:self-start lg:sticky lg:top-28">
      <nav aria-label="Workspace navigation">
        <div className="flex items-center justify-between gap-3 rounded-sm bg-secondary px-3 py-1 lg:hidden">
          <label
            htmlFor="workspace-destination"
            className="shrink-0 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Go to
          </label>

          <div className="relative min-w-0">
            <select
              id="workspace-destination"
              value={activeHref ?? "/dashboard"}
              onChange={(event) => router.push(event.target.value)}
              className={`min-h-11 max-w-full cursor-pointer appearance-none rounded-sm bg-secondary pl-2 pr-7 text-sm font-medium text-secondary-foreground ${focusStyle}`}
            >
              {links.map(({ label, href }) => (
                <option key={href} value={href}>
                  {label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="mb-5 px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Your workspace
          </p>

          <ul className="grid gap-1">
            {links.map(({ label, href, icon: Icon }) => {
              const active = activeHref === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-medium transition-colors duration-200 ${focusStyle} ${
                      active
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
