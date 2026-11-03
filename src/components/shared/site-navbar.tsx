"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";

import { SiteLogo } from "@/components/shared/site-logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const buttonStyle =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none";

const menuIconStyle =
  "absolute transition-[rotate,scale,opacity] duration-300 ease-in-out motion-reduce:transition-none";

function AuthLinks() {
  return (
    <>
      <Link
        href="/login"
        className={`${buttonStyle} ${focusStyle} border-input text-foreground hover:border-foreground hover:bg-accent`}
      >
        Login
      </Link>

      <Link
        href="/register"
        className={`${buttonStyle} ${focusStyle} border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-background hover:text-foreground`}
      >
        Register
      </Link>
    </>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function isActive(href: string) {
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          closeMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="site-container flex min-h-16 items-center justify-between gap-4 lg:min-h-20">
        <div onClick={closeMenu} className="max-lg:flex max-lg:items-center">
          <SiteLogo className="font-heading text-xl tracking-tight max-lg:h-11 max-lg:gap-1.5 max-lg:leading-none max-lg:[&_svg]:size-[26px] lg:text-2xl" />
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`group relative inline-flex min-h-11 items-center text-sm font-medium transition-colors duration-200 hover:text-foreground ${focusStyle} ${
                isActive(href) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-1.5 h-px origin-left bg-current transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none ${
                  isActive(href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <AuthLinks />
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className={`relative inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-foreground lg:hidden ${focusStyle}`}
        >
          <Menu
            size={22}
            aria-hidden="true"
            className={`${menuIconStyle} ${
              menuOpen
                ? "rotate-90 scale-75 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />

          <X
            size={22}
            aria-hidden="true"
            className={`${menuIconStyle} ${
              menuOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-navigation"
        inert={!menuOpen}
        className={`absolute inset-x-0 top-full grid bg-background transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none lg:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border">
            <div className="site-container py-4">
              <nav aria-label="Mobile navigation" className="grid gap-1">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors duration-200 hover:bg-accent hover:text-foreground ${focusStyle} ${
                      isActive(href)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div
                className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4"
                onClick={closeMenu}
              >
                <AuthLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
