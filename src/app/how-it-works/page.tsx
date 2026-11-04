import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Learn how to choose a studio, calculate your session fee and manage a booking request.",
};

const steps = [
  {
    title: "Find a space that fits.",
    description:
      "Browse by category, then open a listing. Check the photos, location, capacity and amenities against what you need for your session.",
  },
  {
    title: "Choose your session.",
    description:
      "Select Book Workspace Now. Pick a date, set your start time and choose how many hours you need. The studio fee updates as you change the duration.",
  },
  {
    title: "Send your request.",
    description:
      "Log in and select Request booking. Open My Bookings to see the studio, session time, fee and current status in one place.",
  },
];

const questions = [
  {
    question: "What does Pending mean?",
    answer:
      "Your request has been saved. The session is confirmed when its status changes to Confirmed. You can check the latest status in My Bookings.",
  },
  {
    question: "Is the security deposit part of the hourly fee?",
    answer:
      "The booking form shows two separate amounts. The studio fee is the hourly rate multiplied by the number of hours. The listing shows the security deposit separately.",
  },
  {
    question: "How do I cancel a request?",
    answer:
      "Open My Bookings, find the pending session and select Cancel booking. Choose Keep booking to leave it as it is, or confirm to mark it Cancelled.",
  },
];

const eyebrow =
  "text-xs font-medium uppercase tracking-widest text-muted-foreground";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const arrowStyle =
  "shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5";

export default function HowItWorksPage() {
  return (
    <main className="site-container min-w-0 py-9 sm:py-14 lg:py-16">
      <div className="grid min-w-0 items-center gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <header className="min-w-0">
          <p className={eyebrow}>How it works / Booking guide</p>

          <h1 className="mt-3 max-w-[14ch] font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Book your next studio session.
          </h1>

          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
            Start with the room. Choose the hours. See the cost before you send
            a booking request.
          </p>

          <Link
            href="/studios"
            className={`group mt-6 inline-flex min-h-12 items-center gap-4 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 ${focusStyle}`}
          >
            Explore studios
            <ArrowUpRight size={16} aria-hidden="true" className={arrowStyle} />
          </Link>
        </header>

        <aside
          aria-labelledby="example-title"
          className="min-w-0 rounded-sm bg-secondary p-5 sm:p-7"
        >
          <div className="flex items-center justify-between gap-3">
            <p className={eyebrow}>Example reservation</p>
            <Clock3
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
          </div>

          <h2
            id="example-title"
            className="mt-5 font-heading text-3xl leading-tight tracking-tight"
          >
            A two-hour recording
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Music suite · 10:00 AM – 12:00 PM
          </p>

          <dl className="mt-5 border-t border-foreground/20">
            <div className="flex items-baseline justify-between gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">Hourly rate</dt>
              <dd className="tabular-nums">$45 / hr</dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-y border-foreground/20 py-3">
              <dt className="text-sm font-medium">Studio fee</dt>
              <dd className="font-heading text-3xl tabular-nums">$90</dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 pt-3 text-sm">
              <dt className="text-muted-foreground">Security deposit</dt>
              <dd className="tabular-nums">$90</dd>
            </div>
          </dl>

          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Example pricing. Each studio sets its own hourly rate and deposit.
          </p>
        </aside>
      </div>

      <section aria-labelledby="steps-title" className="mt-12 sm:mt-16">
        <p className={eyebrow}>From browsing to booking</p>
        <h2
          id="steps-title"
          className="mt-2 font-heading text-3xl tracking-tight"
        >
          Three steps to your session
        </h2>

        <ol className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="min-w-0 border-t border-border pt-4"
            >
              <span className="text-xs tabular-nums text-muted-foreground">
                0{index + 1}
              </span>
              <h3 className="mt-2 font-heading text-2xl leading-tight tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="questions-title"
        className="mt-12 grid gap-5 border-t border-border pt-6 sm:mt-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12"
      >
        <div>
          <p className={eyebrow}>Before you book</p>
          <h2
            id="questions-title"
            className="mt-2 font-heading text-3xl tracking-tight"
          >
            Booking questions
          </h2>
        </div>

        <div className="divide-y divide-border">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary
                className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-sm font-medium [&::-webkit-details-marker]:hidden ${focusStyle}`}
              >
                {question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg font-normal"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>

              <p className="max-w-xl pb-4 pr-4 text-sm leading-6 text-muted-foreground">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
