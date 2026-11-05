import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const supportItems = [
  {
    title: "Liability protection",
    description:
      "Before you book, review the studio’s liability terms so you know what the host covers and what you’re responsible for.",
    icon: ShieldCheck,
  },
  {
    title: "Verified profiles",
    description:
      "Check the host’s verified profile to see who manages the space you’re booking.",
    icon: BadgeCheck,
  },
  {
    title: "Equipment safety",
    description:
      "Review the equipment list and ask your host about setup and safe handling before your session.",
    icon: SlidersHorizontal,
  },
  {
    title: "24/7 host support",
    description:
      "Reach out for help with studio access, equipment questions, or a booking issue at any hour.",
    icon: Headphones,
  },
];

export default function HostSupport() {
  return (
    <section
      id="host-guarantee"
      aria-labelledby="host-support-heading"
      className="scroll-mt-24 bg-primary text-primary-foreground"
    >
      <div className="site-container py-12 md:py-16">
        <header>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary-foreground/75">
            Studio assurances
          </p>

          <h2
            id="host-support-heading"
            className="max-w-[24ch] text-balance font-heading text-4xl leading-tight tracking-tight sm:text-5xl"
          >
            Host guarantee &amp; creator support
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/75 sm:text-base">
            Know who’s hosting, what’s covered, and where to turn for help.
          </p>
        </header>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-8">
          {supportItems.map(({ title, description, icon: Icon }) => (
            <li key={title} className="group min-w-0">
              <div className="grid h-full grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3 rounded-sm border border-primary-foreground/20 bg-primary-foreground/5 p-4 transition-[translate,background-color,border-color] duration-300 ease-in-out group-hover:border-primary-foreground/40 group-hover:bg-primary-foreground/10 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none sm:gap-4 sm:p-5 lg:p-6">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full border border-primary-foreground/25 transition-colors duration-300 ease-in-out group-hover:border-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary motion-reduce:transition-none"
                >
                  <Icon size={19} strokeWidth={1.5} />
                </span>

                <div className="min-w-0">
                  <h3 className="font-heading text-2xl leading-tight tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-2 max-w-[48ch] text-sm leading-6 text-primary-foreground/75">
                    {description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
