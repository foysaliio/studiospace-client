"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

type BookingModalProps = {
  title: string;
  hourlyRate: number;
  securityDeposit: number;
};

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const inputStyle =
  "mt-2 block min-h-11 w-full min-w-0 rounded-sm border border-input bg-background px-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-ring";

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function BookingModal({
  title,
  hourlyRate,
  securityDeposit,
}: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hours, setHours] = useState("1");
  const [today, setToday] = useState("");

  const duration = Number(hours);
  const validHours = Number.isInteger(duration) && duration >= 1;
  const studioFee = validHours ? `$${(hourlyRate * duration).toFixed(2)}` : "—";

  function openModal() {
    setToday(getToday());
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`group inline-flex min-h-12 w-full items-center justify-center gap-5 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:w-fit ${focusStyle}`}
      >
        Book Workspace Now
        <ArrowUpRight
          size={17}
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="booking-heading"
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-sm border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/50"
      >
        <div className="p-5 sm:p-7">
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Book a workspace
              </p>
              <h2
                id="booking-heading"
                className="mt-2 break-words font-heading text-3xl leading-tight tracking-tight"
              >
                {title}
              </h2>
            </div>

            <button
              type="button"
              aria-label="Close booking dialog"
              onClick={() => dialogRef.current?.close()}
              className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-muted ${focusStyle}`}
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="min-w-0 text-sm font-medium">
              Booking date
              <input type="date" min={today} className={inputStyle} />
            </label>

            <label className="min-w-0 text-sm font-medium">
              Start time
              <input type="time" className={inputStyle} />
            </label>

            <label className="min-w-0 text-sm font-medium sm:col-span-2">
              Duration in hours
              <input
                type="number"
                min={1}
                step={1}
                value={hours}
                onChange={(event) => setHours(event.target.value)}
                className={inputStyle}
              />
            </label>
          </div>

          <dl className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Hourly rate</dt>
              <dd>${hourlyRate} / hr</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Studio fee</dt>
              <dd className="font-semibold tabular-nums">{studioFee}</dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Security deposit</dt>
              <dd>${securityDeposit}</dd>
            </div>
          </dl>
        </div>
      </dialog>
    </>
  );
}
