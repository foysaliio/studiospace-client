"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import type { FormEvent } from "react";

import { SiteLogo } from "@/components/shared/site-logo";

const contactEmail = "foysalhossien77@gmail.com";
const portfolioUrl = "https://foysaliio.vercel.app/";

const authorLinks = [
  { label: "GitHub", href: "https://github.com/foysaliio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/foysaliio/" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const popularCategories = [
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Sound Stages", value: "Film Stage" },
  { label: "Podcast Rooms", value: "Podcast Lounge" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Workshop" },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const textLinkStyle =
  `inline-flex min-h-10 items-center rounded-sm text-sm text-muted-foreground ` +
  `transition-colors duration-200 hover:text-foreground ${focusStyle}`;

const headingRow = "mb-3 flex min-h-9 items-center";

const navHeadingStyle = `${headingRow} text-xs font-medium uppercase tracking-widest text-muted-foreground`;

function shareOnX() {
  const shareUrl = new URL("https://twitter.com/intent/tweet");
  shareUrl.searchParams.set("text", "Find a creative studio on StudioSpace.");
  shareUrl.searchParams.set("url", window.location.origin);

  window.open(shareUrl.toString(), "_blank", "noopener,noreferrer");
}

function scrollToPageTop() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.getElementById("site-start")?.focus({ preventScroll: true });

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "instant" : "smooth",
  });
}

function NewsletterForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const subject = encodeURIComponent("StudioSpace newsletter request");
    const body = encodeURIComponent(
      `Hi Foysal,\n\nPlease send StudioSpace updates to ${email}.\n\nThank you!`,
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="min-w-0">
      <label
        htmlFor="footer-email"
        className={`${headingRow} font-heading text-2xl leading-none tracking-tight`}
      >
        Studio newsletter
      </label>

      <p
        id="newsletter-note"
        className="max-w-sm text-sm leading-6 text-muted-foreground"
      >
        Request studio updates by email. This opens your mail app.
      </p>

      <div className="mt-4 flex min-w-0 items-center gap-2 border-b border-foreground/40 pb-2 transition-colors duration-200 focus-within:border-foreground">
        <input
          id="footer-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-describedby="newsletter-note"
          required
          className={`min-h-11 w-0 min-w-0 flex-1 rounded-sm bg-transparent px-1 text-base text-foreground placeholder:text-muted-foreground ${focusStyle}`}
        />

        <button
          type="submit"
          aria-label="Request newsletter updates by email"
          className={`group inline-flex size-11 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/85 ${focusStyle}`}
        >
          <ArrowRight
            size={17}
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="site-container">
        <div className="grid min-w-0 grid-cols-2 items-start gap-x-4 gap-y-7 py-8 sm:gap-x-8 sm:gap-y-9 sm:py-10 lg:grid-cols-[1.2fr_0.75fr_0.9fr_1.2fr] lg:py-14">
          <div className="col-span-2 min-w-0 sm:col-span-1 lg:col-start-1 lg:row-start-1">
            <div className={headingRow}>
              <SiteLogo className="font-heading text-2xl leading-none tracking-tight" />
            </div>

            <p className="max-w-[30ch] text-sm leading-6 text-muted-foreground">
              We help creators find the right room to shoot, record, rehearse,
              and make things together.
            </p>

            <div className="mt-2 flex min-w-0 flex-col items-start">
              <a
                href={`mailto:${contactEmail}`}
                className={`${textLinkStyle} max-w-full gap-2`}
              >
                <Mail
                  size={15}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="shrink-0"
                />
                <span className="min-w-0 break-all">{contactEmail}</span>
              </a>

              <button
                type="button"
                onClick={shareOnX}
                aria-label="Share StudioSpace on X (opens in a new tab)"
                className={`${textLinkStyle} group min-h-11 cursor-pointer gap-2`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-[15px] shrink-0"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.311 17.403Z" />
                </svg>
                Share on X
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </div>

          <div className="col-span-2 min-w-0 sm:col-span-1 lg:col-start-4 lg:row-start-1">
            <NewsletterForm />
          </div>

          <nav
            aria-label="Footer navigation"
            className="min-w-0 lg:col-start-2 lg:row-start-1"
          >
            <h2 className={navHeadingStyle}>Explore</h2>
            <ul>
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={textLinkStyle}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label="Popular studio categories"
            className="min-w-0 lg:col-start-3 lg:row-start-1"
          >
            <h2 className={navHeadingStyle}>Popular categories</h2>
            <ul>
              {popularCategories.map(({ label, value }) => (
                <li key={value}>
                  <Link
                    href={{ pathname: "/studios", query: { category: value } }}
                    className={textLinkStyle}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-4 border-t border-border py-5 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-x-8">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">
              Designed &amp; built by
            </p>

            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Foysal’s portfolio"
              className={`group inline-flex min-h-10 items-center gap-1.5 rounded-sm font-heading text-2xl leading-none tracking-tight text-foreground no-underline transition-colors duration-200 hover:text-muted-foreground ${focusStyle}`}
            >
              Foysal
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              />
            </a>

            <nav
              aria-label="Foysal’s profiles"
              className="flex flex-wrap gap-x-4"
            >
              {authorLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Foysal’s ${label} profile`}
                  className={`${textLinkStyle} text-xs`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="col-span-2 row-start-2 text-xs leading-5 text-muted-foreground lg:col-span-1 lg:col-start-2 lg:row-start-1">
            <p>
              © {new Date().getFullYear()} StudioSpace. All rights reserved.
            </p>
            <p>Booking terms and studio rules apply to each reservation.</p>
          </div>

          <button
            type="button"
            onClick={scrollToPageTop}
            aria-label="Back to top of this page"
            title="Back to top"
            className={`group col-start-2 row-start-1 grid size-11 shrink-0 place-items-center justify-self-end rounded-full border border-border transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground lg:col-start-3 ${focusStyle}`}
          >
            <ArrowUp
              size={18}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
