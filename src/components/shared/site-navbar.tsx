"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { SiteLogo } from "@/components/shared/site-logo";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const accountLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/add-studio", icon: Plus },
  { label: "My Studio Listings", href: "/my-listings", icon: List },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarDays },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const buttonStyle =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none";

const menuIconStyle =
  "absolute transition-[rotate,scale,opacity] duration-300 ease-in-out motion-reduce:transition-none";

type NavbarUser = {
  name: string;
  image?: string | null;
};

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

function ProfileAvatar({ user }: { user: NavbarUser }) {
  const [failedImage, setFailedImage] = useState("");
  const image = user.image ?? "";
  const isGooglePhoto =
    /^https:\/\/lh\d+\.googleusercontent\.com\/(?:a|a-)\//i.test(image);
  const initial = Array.from(user.name.trim())[0]?.toUpperCase() || "U";

  return (
    <span
      aria-hidden="true"
      className="relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground font-heading text-sm leading-none text-background"
    >
      {isGooglePhoto && failedImage !== image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="28px"
          className="object-cover"
          onError={() => setFailedImage(image)}
        />
      ) : (
        initial
      )}
    </span>
  );
}

type AccountPanelProps = {
  user: NavbarUser;
  pathname: string;
  loggingOut: boolean;
  onNavigate: () => void;
  onLogout: () => void;
};

function AccountPanel({
  user,
  pathname,
  loggingOut,
  onNavigate,
  onLogout,
}: AccountPanelProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-3 px-2 py-2">
        <ProfileAvatar user={user} />

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            Your workspace
          </p>
          <p className="break-words font-heading text-xl leading-tight text-foreground">
            {user.name}
          </p>
        </div>
      </div>

      <nav aria-label="Account navigation" className="grid gap-0.5">
        {accountLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={pathname === href ? "page" : undefined}
              className={`group flex min-h-11 items-center gap-3 rounded-sm px-2.5 text-sm transition-colors duration-200 hover:bg-accent hover:text-foreground ${focusStyle} ${
                active
                  ? "bg-secondary font-medium text-foreground"
                  : "text-foreground"
              }`}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 border-t border-border pt-1.5">
        <button
          type="button"
          disabled={loggingOut}
          onClick={onLogout}
          className={`flex min-h-11 w-full items-center gap-3 rounded-sm px-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground disabled:opacity-60 ${focusStyle}`}
        >
          <LogOut size={16} strokeWidth={1.5} aria-hidden="true" />
          {loggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>
    </div>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [openPanel, setOpenPanel] = useState<"mobile" | "account" | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const accountButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  const mobileOpen = openPanel === "mobile";
  const accountOpen = openPanel === "account";

  function closeMenu() {
    setOpenPanel(null);
  }

  function isActive(href: string) {
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  useEffect(() => {
    if (!openPanel) return;

    function handlePointerDown(event: PointerEvent) {
      const panel =
        openPanel === "account" ? accountRef.current : headerRef.current;

      if (event.target instanceof Node && !panel?.contains(event.target)) {
        setOpenPanel(null);
      }
    }

    const desktop = window.matchMedia("(min-width: 64rem)");
    function handleResize() {
      setOpenPanel(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    desktop.addEventListener("change", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      desktop.removeEventListener("change", handleResize);
    };
  }, [openPanel]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Could not log out. Please try again.");
        return;
      }

      closeMenu();
      toast.success("Logged out");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Could not reach StudioSpace. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const accountPanel = user ? (
    <AccountPanel
      user={user}
      pathname={pathname}
      loggingOut={loggingOut}
      onNavigate={closeMenu}
      onLogout={handleLogout}
    />
  ) : null;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-background"
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !openPanel) return;

        if (mobileOpen) menuButton.current?.focus();
        if (accountOpen) accountButton.current?.focus();
        closeMenu();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <div className="site-container flex min-h-16 items-center justify-between gap-2 lg:grid lg:min-h-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-5">
        <div
          onClick={closeMenu}
          className="flex min-w-0 items-center lg:justify-self-start"
        >
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
              onClick={closeMenu}
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

        <div className="hidden items-center gap-2 lg:flex lg:justify-self-end">
          {isPending ? (
            <span
              role="status"
              className="h-8 w-24 rounded-sm bg-muted motion-safe:animate-pulse"
            >
              <span className="sr-only">Loading account</span>
            </span>
          ) : user ? (
            <div
              ref={accountRef}
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  closeMenu();
              }}
            >
              <button
                ref={accountButton}
                type="button"
                aria-expanded={accountOpen}
                aria-controls="desktop-account-panel"
                onClick={() => setOpenPanel(accountOpen ? null : "account")}
                className={`group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm px-2 text-sm font-medium text-foreground ${focusStyle}`}
              >
                <span
                  className={`inline-flex rounded-full ring-2 ring-offset-2 ring-offset-background transition-shadow duration-300 ease-in-out motion-reduce:transition-none ${
                    accountOpen
                      ? "ring-foreground/30"
                      : "ring-transparent group-hover:ring-foreground/25"
                  }`}
                >
                  <ProfileAvatar user={user} />
                </span>

                <span>Account</span>

                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`shrink-0 transition-[rotate,translate,color] duration-300 ease-in-out motion-reduce:transition-none ${
                    accountOpen
                      ? "rotate-180 translate-y-0 text-foreground"
                      : "rotate-0 translate-y-0 text-muted-foreground motion-safe:group-hover:translate-y-px group-hover:text-foreground"
                  }`}
                />
              </button>

              <div
                id="desktop-account-panel"
                inert={!accountOpen}
                className={`absolute right-0 top-full z-10 mt-2 max-h-[calc(100dvh-5rem)] w-64 origin-top-right overflow-y-auto rounded-sm border border-border bg-background p-3 shadow-md transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${
                  accountOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {accountPanel}
              </div>
            </div>
          ) : (
            <AuthLinks />
          )}
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setOpenPanel(mobileOpen ? null : "mobile")}
          className={`relative grid size-11 shrink-0 place-items-center rounded-sm text-foreground lg:hidden ${focusStyle}`}
        >
          <Menu
            size={22}
            aria-hidden="true"
            className={`${menuIconStyle} ${
              mobileOpen
                ? "rotate-90 scale-75 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            size={22}
            aria-hidden="true"
            className={`${menuIconStyle} ${
              mobileOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-navigation"
        inert={!mobileOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none lg:hidden ${
          mobileOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border">
            <div className="site-container py-3">
              <nav
                aria-label="Mobile navigation"
                className="grid grid-cols-2 gap-1"
              >
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`flex min-h-11 items-center rounded-sm px-2 text-sm font-medium transition-colors duration-200 hover:bg-accent hover:text-foreground ${focusStyle} ${
                      isActive(href)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-3 border-t border-border pt-3">
                {isPending ? (
                  <span
                    role="status"
                    className="block h-9 w-32 rounded-sm bg-muted motion-safe:animate-pulse"
                  >
                    <span className="sr-only">Loading account</span>
                  </span>
                ) : user ? (
                  accountPanel
                ) : (
                  <div onClick={closeMenu} className="grid grid-cols-2 gap-2">
                    <AuthLinks />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
