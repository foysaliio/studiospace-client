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
        <div onClick={closeMenu}>
          <SiteLogo className="font-heading text-2xl tracking-tight" />
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
          className={`inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-200 hover:bg-accent lg:hidden ${focusStyle}`}
        >
          {menuOpen ? (
            <X size={21} aria-hidden="true" />
          ) : (
            <Menu size={21} aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background shadow-sm lg:hidden"
      >
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
    </header>
  );
}
