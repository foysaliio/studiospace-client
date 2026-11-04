import type { Metadata } from "next";
import Link from "next/link";
import { Aperture, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="site-container grid min-h-[60dvh] place-items-center py-12 sm:py-16">
      <section
        aria-labelledby="not-found-heading"
        className="w-full max-w-lg text-center"
      >
        <div
          aria-hidden="true"
          className="relative mx-auto grid aspect-[2/1] w-full max-w-80 place-items-center rounded-sm bg-secondary sm:max-w-96"
        >
          <span className="absolute left-3 top-3 size-5 border-l border-t border-foreground/40" />
          <span className="absolute right-3 top-3 size-5 border-r border-t border-foreground/40" />
          <span className="absolute bottom-3 left-3 size-5 border-b border-l border-foreground/40" />
          <span className="absolute bottom-3 right-3 size-5 border-b border-r border-foreground/40" />

          <div className="flex items-center justify-center gap-1 font-heading text-7xl leading-none text-foreground sm:text-8xl">
            <span>4</span>
            <Aperture strokeWidth={1.25} className="size-14 sm:size-16" />
            <span>4</span>
          </div>
        </div>

        <p className="mt-7 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>

        <h1
          id="not-found-heading"
          className="mt-2 font-heading text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          This link may be incorrect, or the page may have been removed.
        </p>

        <Link
          href="/"
          className="group mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-x-0.5"
          />
          Return to Home
        </Link>
      </section>
    </main>
  );
}
