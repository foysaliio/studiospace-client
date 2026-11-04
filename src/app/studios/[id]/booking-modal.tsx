"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";

type BookingModalProps = {
  title: string;
  hourlyRate: number;
  securityDeposit: number;
};

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const iconButton = `inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-30 ${focusStyle}`;

const labelStyle = "text-sm font-medium";

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const dayFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const fullDateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minuteOptions = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function TimeSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block min-w-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-11 w-full cursor-pointer appearance-none rounded-sm bg-muted pl-3 pr-7 text-base font-medium tabular-nums text-foreground ${focusStyle}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </label>
  );
}

export default function BookingModal({
  title,
  hourlyRate,
  securityDeposit,
}: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [firstDay, setFirstDay] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [duration, setDuration] = useState(1);

  // Five days keep each date readable on a narrow phone.
  const days = today
    ? Array.from({ length: 5 }, (_, i) => addDays(today, firstDay + i))
    : [];

  function openModal() {
    const localToday = addDays(new Date(), 0);
    const date =
      selectedDay && selectedDay >= localToday ? selectedDay : localToday;

    setToday(localToday);
    setSelectedDay(date);

    // Use calendar dates so daylight-saving changes don't shift the strip.
    const dayNumber = (d: Date) =>
      Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000;
    const offset = dayNumber(date) - dayNumber(localToday);
    setFirstDay(Math.floor(offset / 5) * 5);

    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`group inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-5 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:w-fit ${focusStyle}`}
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
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_1.5rem)] max-w-lg overflow-y-auto overscroll-contain rounded-md border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/55"
      >
        <div className="p-4 sm:p-7">
          <header className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Plan your session
              </p>
              <h2
                id="booking-heading"
                className="mt-2 break-words font-heading text-3xl leading-tight tracking-tight sm:text-4xl"
              >
                {title}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close booking dialog"
              onClick={() => dialogRef.current?.close()}
              className={iconButton}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <fieldset className="mt-6 min-w-0">
            <legend className={labelStyle}>Booking date</legend>

            {days.length > 0 && (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p aria-live="polite" className="font-heading text-xl">
                    {monthFormat.format(days[0])}
                    {days[0].getMonth() !== days[4].getMonth() && (
                      <> – {monthFormat.format(days[4])}</>
                    )}
                  </p>
                  <div className="flex shrink-0">
                    <button
                      type="button"
                      aria-label="Previous five dates"
                      disabled={firstDay === 0}
                      onClick={() => setFirstDay((day) => Math.max(0, day - 5))}
                      className={iconButton}
                    >
                      <ChevronLeft size={17} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next five dates"
                      onClick={() => setFirstDay((day) => day + 5)}
                      className={iconButton}
                    >
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </div>

                <div className="mt-1 grid grid-cols-5 gap-1.5">
                  {days.map((date) => {
                    const active = selectedDay?.getTime() === date.getTime();

                    return (
                      <button
                        key={date.getTime()}
                        type="button"
                        aria-label={fullDateFormat.format(date)}
                        aria-pressed={active}
                        onClick={() => setSelectedDay(date)}
                        className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm transition-colors ${focusStyle} ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground hover:bg-accent"
                        }`}
                      >
                        <span className="text-xs">
                          {dayFormat.format(date)}
                        </span>
                        <span className="font-heading text-2xl leading-none">
                          {date.getDate()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-7">
            <fieldset className="min-w-0">
              <legend className={labelStyle}>Start time</legend>
              <div className="mt-2 grid grid-cols-[1fr_auto_1fr_1.15fr] items-center gap-1">
                <TimeSelect
                  label="Hour"
                  value={hour}
                  options={hourOptions}
                  onChange={setHour}
                />
                <span aria-hidden="true">:</span>
                <TimeSelect
                  label="Minute"
                  value={minute}
                  options={minuteOptions}
                  onChange={setMinute}
                />
                <TimeSelect
                  label="AM or PM"
                  value={period}
                  options={["AM", "PM"]}
                  onChange={setPeriod}
                />
              </div>
            </fieldset>

            <div>
              <p className={labelStyle}>Duration</p>
              <div className="mt-2 inline-flex items-center rounded-sm border border-border">
                <button
                  type="button"
                  aria-label="Decrease duration by one hour"
                  disabled={duration === 1}
                  onClick={() => setDuration((value) => Math.max(1, value - 1))}
                  className={iconButton}
                >
                  <Minus size={15} />
                </button>
                <span className="min-w-10 text-center text-sm font-medium tabular-nums">
                  {duration} {duration === 1 ? "hr" : "hrs"}
                </span>
                <button
                  type="button"
                  aria-label="Increase duration by one hour"
                  onClick={() => setDuration((value) => value + 1)}
                  className={iconButton}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-muted px-4 py-5 sm:px-7">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
            <div>
              <p className={labelStyle}>Studio fee</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {money.format(hourlyRate)} / hr × {duration}
              </p>
            </div>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="font-heading text-3xl tabular-nums"
            >
              <span className="sr-only">Studio fee </span>
              {money.format(hourlyRate * duration)}
            </p>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-border pt-3 text-sm">
            <span className="text-muted-foreground">Security deposit</span>
            <span className="font-medium tabular-nums">
              {money.format(securityDeposit)}
            </span>
          </div>
        </footer>
      </dialog>
    </>
  );
}
