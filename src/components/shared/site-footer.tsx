"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";

import { SiteLogo } from "@/components/shared/site-logo";

const contactEmail = "foysalhossien77@gmail.com";
const repositoryUrl = "https://github.com/foysaliio/studiospace-client";
const linkedinUrl = "https://www.linkedin.com/in/foysaliio/";

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
  `inline-flex min-h-9 items-center rounded-sm text-sm text-muted-foreground ` +
  `transition-colors duration-200 hover:text-foreground ${focusStyle}`;

const headingRow = "mb-3 flex min-h-9 items-center";

const navHeadingStyle = `${headingRow} text-xs font-medium uppercase tracking-widest text-muted-foreground`;

function handleBackToTop(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    window.location.pathname !== "/" ||
    window.location.search ||
    window.location.hash
  ) {
    return;
  }

  event.preventDefault();

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "instant" : "smooth",
  });

  document.getElementById("site-start")?.focus({ preventScroll: true });
}

function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent("StudioSpace newsletter request");
    const body = encodeURIComponent(
      `Please send StudioSpace newsletter updates to ${email.trim()}.`,
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="footer-email"
        className={`${headingRow} font-heading text-2xl leading-none`}
      >
        Studio newsletter
      </label>

      <p
        id="newsletter-note"
        className="text-sm leading-6 text-muted-foreground"
      >
        Request studio updates by email. This opens your mail app.
      </p>

      <div className="mt-4 flex min-w-0 items-center gap-2 border-b border-foreground/40 pb-2 focus-within:border-foreground">
        <input
          id="footer-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-describedby="newsletter-note"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`min-h-11 min-w-0 flex-1 rounded-sm bg-transparent px-1 text-base text-foreground placeholder:text-muted-foreground ${focusStyle}`}
        />

        <button
          type="submit"
          aria-label="Request newsletter updates by email"
          className={`group inline-flex size-11 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-colors hover:bg-primary/85 ${focusStyle}`}
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
        <div className="grid items-start gap-x-8 gap-y-8 py-10 sm:grid-cols-2 md:py-14 lg:grid-cols-[1.2fr_0.75fr_0.85fr_1.2fr]">
          <div className="min-w-0">
            <div className={headingRow}>
              <SiteLogo className="font-heading text-2xl leading-none tracking-tight" />
            </div>

            <p className="max-w-[30ch] text-sm leading-6 text-muted-foreground">
              We help creators find the right room to shoot, record, rehearse,
              and make things together.
            </p>

            <a
              href={`mailto:${contactEmail}`}
              className={`${textLinkStyle} mt-3 max-w-full break-all`}
            >
              {contactEmail}
            </a>
          </div>

          <nav aria-label="Footer navigation">
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

          <nav aria-label="Popular studio categories">
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

          <div className="min-w-0">
            <NewsletterForm />

            <div className="mt-4 flex flex-wrap items-center gap-x-5">
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textLinkStyle} gap-1.5`}
              >
                GitHub
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textLinkStyle} gap-1.5`}
              >
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>

              <a
                href="https://twitter.com/intent/tweet?text=StudioSpace"
                onClick={(event) => {
                  const share = new URL(event.currentTarget.href);
                  share.searchParams.set("url", window.location.origin);
                  event.currentTarget.href = share.toString();
                }}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textLinkStyle} gap-2`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-3.5"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.311 17.403Z" />
                </svg>
                Share on X
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-border py-5 sm:items-center">
          <div className="min-w-0 text-xs leading-6 text-muted-foreground">
            <p>
              © {new Date().getFullYear()} StudioSpace. All rights reserved.
            </p>
            <p>Booking terms and studio rules apply to each reservation.</p>
            <p className="mt-1">
              Designed &amp; built by{" "}
              <a
                href={`mailto:${contactEmail}`}
                className={`rounded-sm font-medium text-foreground no-underline transition-colors duration-200 ease-in-out hover:text-muted-foreground motion-reduce:transition-none ${focusStyle}`}
              >
                Foysal
              </a>
            </p>
          </div>

          <Link
            href="/"
            scroll
            onClick={handleBackToTop}
            aria-label="Go to the top of the home page"
            title="Back to top"
            className={`group inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground ${focusStyle}`}
          >
            <ArrowUp
              size={18}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
