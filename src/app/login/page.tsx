import type { Metadata } from "next";
import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";
import GoogleAuthButton from "@/components/shared/google-auth-button";

import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to StudioSpace to book a studio and manage your bookings.",
};

export default function LoginPage() {
  return (
    <main className="site-container py-7 sm:py-12 lg:py-20">
      <div className="mx-auto grid max-w-5xl gap-7 sm:gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
        <header className="min-w-0 lg:py-3">
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

          <h1 className="font-heading text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.02] tracking-tight">
            Welcome <span className="italic lg:block">back.</span>
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base lg:mt-6">
            Log in to book your next session or check an upcoming reservation.
          </p>
        </header>

        <section aria-label="Account access" className="min-w-0 lg:pt-3">
          <LoginForm />

          <div className="mt-3">
            <GoogleAuthButton />
          </div>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            New to StudioSpace?
            <Link
              href="/register"
              className="group inline-flex min-h-11 items-center gap-1.5 rounded-sm font-medium text-foreground no-underline transition-colors duration-200 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Create an account
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
