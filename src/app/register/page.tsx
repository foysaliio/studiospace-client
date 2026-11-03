import type { Metadata } from "next";
import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";

import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Join StudioSpace to discover creative studios and book your next session.",
};

export default function RegisterPage() {
  return (
    <main className="site-container py-7 sm:py-12 lg:py-20">
      <div className="mx-auto grid max-w-5xl gap-y-7 sm:gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-x-20">
        <header className="min-w-0 lg:sticky lg:top-28 lg:py-3">
          <div className="mb-4 flex items-center gap-2.5 lg:mb-9">
            <span className="grid size-8 place-items-center rounded-full bg-foreground text-background lg:size-10">
              <Aperture
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 lg:size-6"
              />
            </span>

            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              StudioSpace membership
            </p>
          </div>

          <h1 className="max-w-lg font-heading text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] tracking-tight">
            Create your <span className="italic lg:block">account.</span>
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base lg:mt-6">
            Book a room for your next shoot, recording, or rehearsal.
          </p>

          <div
            aria-hidden="true"
            className="mt-12 hidden h-24 items-center text-foreground lg:flex"
          >
            <Aperture className="size-24 shrink-0" strokeWidth={0.7} />
            <Aperture
              className="-ml-2 size-16 shrink-0 opacity-55"
              strokeWidth={1}
            />
            <Aperture
              className="-ml-1 size-10 shrink-0 opacity-35"
              strokeWidth={1.3}
            />
          </div>
        </header>

        <section aria-label="Registration form" className="min-w-0 lg:pt-3">
          <RegisterForm />

          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            Already have an account?
            <Link
              href="/login"
              className="group inline-flex min-h-11 items-center gap-1.5 rounded-sm font-medium text-foreground no-underline transition-colors duration-200 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Log in
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
              />
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
