const bookingSteps = [
  {
    title: "Discover spaces",
    description:
      "Compare photos, equipment, and hourly rates to find a studio that fits your project.",
  },
  {
    title: "Choose your hours",
    description:
      "Pick a date, start time, and duration. Leave enough time for setup and pack-down.",
  },
  {
    title: "Request your booking",
    description:
      "Check the studio fee and deposit, then send your request. Track its status in My bookings.",
  },
  {
    title: "Create & produce",
    description:
      "Once your booking is confirmed, bring your team and gear to the studio for your session.",
  },
];

export default function HowBookingWorks() {
  return (
    <section
      id="how-booking-works"
      aria-labelledby="how-booking-works-heading"
      className="site-container scroll-mt-24 py-12 md:py-16"
    >
      <header>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Booking guide
        </p>

        <h2
          id="how-booking-works-heading"
          className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl"
        >
          How booking works
        </h2>
      </header>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-8 lg:grid-cols-4">
        {bookingSteps.map((step, index) => (
          <li
            key={step.title}
            className="group grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 rounded-sm border border-border bg-background p-4 transition-[translate,background-color,border-color] duration-300 ease-in-out hover:border-foreground/30 hover:bg-secondary motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none sm:flex sm:flex-col sm:gap-6 sm:p-5"
          >
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border font-heading text-xl leading-none tabular-nums transition-colors duration-300 ease-out group-hover:border-foreground group-hover:bg-foreground group-hover:text-background motion-reduce:transition-none"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <h3 className="font-heading text-2xl leading-tight tracking-tight">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
