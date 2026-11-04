"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { mutationFetch } from "@/lib/mutation-fetch";

type CancelBookingProps = {
  bookingId: string;
  studioTitle: string;
};

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function CancelBooking({
  bookingId,
  studioTitle,
}: CancelBookingProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const keepButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const descriptionId = useId();

  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");

  function openDialog() {
    setError("");
    dialogRef.current?.showModal();
    keepButtonRef.current?.focus();
  }

  async function cancelBooking() {
    if (isCancelling) return;

    setIsCancelling(true);
    setError("");

    try {
      const response = await mutationFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/${encodeURIComponent(bookingId)}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (response.status === 401) {
        dialogRef.current?.close();
        toast.error("Please log in to cancel your booking.");
        router.push("/login?next=/my-bookings");
        return;
      }

      const result = await response.json();

      if (response.status === 409) {
        dialogRef.current?.close();
        toast.error(
          result.message || "This booking can no longer be cancelled.",
        );
        router.refresh();
        return;
      }

      if (!response.ok) {
        setError(result.message || "Could not cancel your booking.");
        return;
      }

      dialogRef.current?.close();
      toast.success("Booking cancelled.");
      router.refresh();
    } catch {
      setError("Could not complete the request. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-label={`Cancel booking for ${studioTitle}`}
        className={`group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-sm px-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:text-foreground ${focusStyle}`}
      >
        Cancel booking
        <ArrowUpRight
          size={15}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          if (isCancelling) event.preventDefault();
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-sm overflow-y-auto rounded-md border border-border bg-background p-5 text-foreground shadow-xl backdrop:bg-black/50 sm:p-7"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Your reservation
        </p>

        <h2
          id={headingId}
          className="mt-2 font-heading text-3xl leading-tight tracking-tight"
        >
          Cancel this booking?
        </h2>

        <p
          id={descriptionId}
          className="mt-3 break-words text-sm leading-6 text-muted-foreground"
        >
          Your booking for{" "}
          <strong className="font-medium text-foreground">{studioTitle}</strong>{" "}
          will be marked as cancelled.
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            ref={keepButtonRef}
            type="button"
            disabled={isCancelling}
            onClick={() => dialogRef.current?.close()}
            className={`min-h-11 cursor-pointer rounded-sm border border-input px-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60 ${focusStyle}`}
          >
            Keep booking
          </button>

          <button
            type="button"
            disabled={isCancelling}
            onClick={cancelBooking}
            className={`min-h-11 cursor-pointer rounded-sm bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 disabled:cursor-wait disabled:opacity-60 ${focusStyle}`}
          >
            {isCancelling ? "Cancelling…" : "Yes, cancel"}
          </button>
        </div>
      </dialog>
    </>
  );
}
