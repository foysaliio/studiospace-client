"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { mutationFetch } from "@/lib/mutation-fetch";

type SaveStudioButtonProps = {
  studioId: string;
  title: string;
  saved: boolean;
  signedIn: boolean;
};

export default function SaveStudioButton({
  studioId,
  title,
  saved,
  signedIn,
}: SaveStudioButtonProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [refreshing, startTransition] = useTransition();
  const busy = saving || refreshing;

  function goToLogin() {
    const next = window.location.pathname + window.location.search;
    router.push(`/login?next=${encodeURIComponent(next)}`);
  }

  async function handleClick() {
    if (busy) return;

    if (!signedIn) {
      goToLogin();
      return;
    }

    setSaving(true);

    try {
      const response = await mutationFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/saved-studios/${encodeURIComponent(studioId)}`,
        {
          method: saved ? "DELETE" : "PUT",
          credentials: "include",
        },
      );

      if (response.status === 401) {
        goToLogin();
        return;
      }

      if (!response.ok) {
        toast.error("Could not update your saved studios. Please try again.");
        return;
      }

      toast.success(saved ? "Studio removed from saved." : "Studio saved.");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-label={`Save ${title}`}
      aria-pressed={saved}
      aria-busy={busy}
      title={saved ? "Remove from saved studios" : "Save studio"}
      className="absolute right-3 top-3 z-10 grid size-11 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors duration-200 hover:border-foreground/40 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-wait disabled:opacity-75"
    >
      <Heart
        size={18}
        strokeWidth={1.6}
        aria-hidden="true"
        className={saved ? "fill-current" : "fill-none"}
      />
    </button>
  );
}
