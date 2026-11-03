"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

function getCallbackURL() {
  const current = new URL(window.location.href);
  const home = `${current.origin}/`;
  const next = current.searchParams.get("next");

  if (!next?.startsWith("/")) return home;

  try {
    const target = new URL(next, current.origin);
    return target.origin === current.origin ? target.href : home;
  } catch {
    return home;
  }
}

export default function GoogleAuthButton() {
  const { data: session, isPending: checkingSession } = authClient.useSession();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending || checkingSession) return;
    setPending(true);

    try {
      const options = {
        provider: "google" as const,
        callbackURL: getCallbackURL(),
      };

      const result = session
        ? await authClient.linkSocial(options)
        : await authClient.signIn.social(options);

      if (result.error) {
        toast.error(result.error.message || "Could not connect to Google.");
        setPending(false);
      }
    } catch {
      toast.error("Could not reach StudioSpace. Please try again.");
      setPending(false);
    }
  }

  let label = session ? "Link Google account" : "Continue with Google";
  if (pending) label = "Opening Google…";
  if (checkingSession) label = "Checking session…";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending || checkingSession}
      aria-busy={pending || checkingSession}
      className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-sm border border-input bg-background px-5 text-sm font-medium text-foreground transition-colors duration-200 enabled:hover:border-foreground/50 enabled:hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-60"
    >
      {pending || checkingSession ? (
        <LoaderCircle
          size={18}
          aria-hidden="true"
          className="motion-safe:animate-spin"
        />
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            fill="#4285F4"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15z"
          />
          <path
            fill="#34A853"
            d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20.4 20.4 0 0 0 24 44z"
          />
          <path
            fill="#FBBC05"
            d="M12.6 27.5a12 12 0 0 1 0-7.1v-5.3H5.8a20 20 0 0 0 0 17.7z"
          />
          <path
            fill="#EA4335"
            d="M24 12c3 0 5.6 1 7.7 3l5.8-5.8A19.7 19.7 0 0 0 24 4 20.4 20.4 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12z"
          />
        </svg>
      )}

      {label}
    </button>
  );
}
