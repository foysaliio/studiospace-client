import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ResetPasswordForm from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type PageProps = {
  searchParams: Promise<{
    token?: string | string[];
    error?: string | string[];
  }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token, error } = await searchParams;
  const resetToken = typeof token === "string" && !error ? token : "";

  return (
    <main className="site-container py-8 sm:py-12 lg:py-16">
      <section
        aria-labelledby="reset-heading"
        className="mx-auto w-full max-w-lg"
      >
        <Link
          href="/login"
          className="group mb-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ArrowLeft
            size={15}
            aria-hidden="true"
            className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-x-0.5"
          />
          Back to login
        </Link>

        <header className="mb-6 sm:mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            StudioSpace membership
          </p>

          <h1
            id="reset-heading"
            className="font-heading text-[clamp(1.375rem,6.5vw,2.625rem)] leading-tight tracking-tight"
          >
            {resetToken ? "Choose a new password" : "Request a new link"}
          </h1>
        </header>

        {resetToken ? (
          <ResetPasswordForm token={resetToken} />
        ) : (
          <p className="text-sm leading-6 text-muted-foreground">
            This reset link is invalid or has expired. Go back to login and
            select “Forgot password?” to request a new one.
          </p>
        )}
      </section>
    </main>
  );
}
