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
      aria-labelledby="host-support-heading"
      className="bg-primary text-primary-foreground"
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

          <p className="mt-3 max-w-xs text-sm leading-6 text-primary-foreground/75 sm:text-base">
            Know who’s hosting, what’s covered, and where to turn for help.
          </p>
        </header>

        <ul className="mt-7 grid gap-x-10 md:mt-8 md:grid-cols-2">
          {supportItems.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-4 border-t border-primary-foreground/25 py-5 sm:py-6"
            >
              <Icon
                aria-hidden="true"
                size={22}
                strokeWidth={1.5}
                className="mt-1"
              />

              <div>
                <h3 className="font-heading text-2xl leading-tight tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 max-w-[48ch] text-sm leading-6 text-primary-foreground/75">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
