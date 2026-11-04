const bookingSteps = [
  {
    title: "Discover Spaces",
    description:
      "Compare studio photos, equipment, and hourly rates to find that fits your project.",
  },
  {
    title: "Select Shoot Hours",
    description:
      "Pick your date and the hours you need, from setup through pack-down.",
  },
  {
    title: "Book Instantly",
    description:
      "Review your studio, session time, and total cost before confirming your booking.",
  },
  {
    title: "Create & Produce",
    description:
      "Bring your team, set up your gear, and start your shoot or recording session.",
  },
];

export default function HowBookingWorks() {
  return (
    <section
      aria-labelledby="booking-heading"
      className="site-container py-12 md:py-16"
    >
      <header>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Booking guide
        </p>

        <h2
          id="booking-heading"
          className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          How booking works
        </h2>

        <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground sm:text-base">
          Plan your next studio session in four steps.
        </p>
      </header>

      <ol className="mt-7 grid gap-x-6 sm:grid-cols-2 sm:gap-y-6 md:mt-8 lg:grid-cols-4">
        {bookingSteps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 border-t border-border py-5 sm:block sm:pb-0"
          >
            <span
              aria-hidden="true"
              className="font-heading text-2xl leading-none tabular-nums text-muted-foreground sm:text-3xl"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 sm:mt-4">
              <h3 className="font-heading text-2xl leading-tight tracking-tight">
                {step.title}
              </h3>

              <p className="mt-2 max-w-[36ch] text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}