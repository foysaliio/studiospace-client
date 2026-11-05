"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCw } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="site-container py-12 sm:py-20">
      <section
        aria-labelledby="page-error-heading"
        className="mx-auto max-w-xl border-y border-border py-8 sm:py-10"
      >
        <h1
          id="page-error-heading"
          className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          This page couldn’t load.
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Try loading the page again. If the problem continues, you can return
          to the homepage.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
          >
            Try again
            <RotateCw
              size={16}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:rotate-45"
            />
          </button>

          <Link
            href="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-sm px-3 text-sm font-medium transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
          >
            Back to home
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
