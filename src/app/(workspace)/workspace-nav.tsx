"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Heart,
  LayoutDashboard,
  List,
  Plus,
} from "lucide-react";

const links = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My bookings", href: "/my-bookings", icon: CalendarDays },
  { label: "Saved studios", href: "/saved-studios", icon: Heart },
  { label: "My studio listings", href: "/my-listings", icon: List },
  { label: "Add new studio", href: "/add-studio", icon: Plus },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export default function WorkspaceNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mobileNav = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const sectionPath = pathname.startsWith("/studios/edit/")
    ? "/my-listings"
    : pathname;

  const activeLink = links.find(
    ({ href }) => sectionPath === href || sectionPath.startsWith(`${href}/`),
  );

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePress(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !mobileNav.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [open]);

  return (
    <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
      <nav aria-label="Workspace navigation">
        <div
          ref={mobileNav}
          className="relative lg:hidden"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && open) {
              setOpen(false);
              trigger.current?.focus();
            }
          }}
        >
          <button
            ref={trigger}
            type="button"
            aria-expanded={open}
            aria-controls="workspace-page-links"
            onClick={() => setOpen((current) => !current)}
            className={`flex min-h-12 w-full items-center justify-between gap-4 rounded-sm border-b border-border px-3 text-left transition-colors duration-200 hover:bg-secondary motion-reduce:transition-none ${focusStyle} ${
              open ? "bg-secondary" : "bg-secondary/50"
            }`}
          >
            <span className="shrink-0 text-xs text-muted-foreground">
              Workspace
            </span>

            <span className="inline-flex min-w-0 items-center justify-end gap-2 text-right text-sm font-medium text-foreground">
              <span>{activeLink?.label ?? "Choose page"}</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                  open ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          <div
            id="workspace-page-links"
            inert={!open}
            className={`absolute inset-x-0 top-full z-30 mt-1 rounded-sm border border-border bg-popover p-1 text-popover-foreground shadow-md transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 items-center justify-between gap-3 rounded-sm px-3 text-sm transition-colors duration-150 hover:bg-accent ${focusStyle} ${
                  activeLink?.href === href ? "bg-secondary font-medium" : ""
                }`}
              >
                {label}
                {activeLink?.href === href && (
                  <Check size={15} aria-hidden="true" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="mb-5 px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Your workspace
          </p>

          <ul className="grid gap-1">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-medium transition-colors duration-200 ${focusStyle} ${
                    activeLink?.href === href
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
