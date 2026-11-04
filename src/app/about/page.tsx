import type { Metadata } from "next";
import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Discover StudioSpace, a place for creators to find creative workspaces and for hosts to share their studios.",
};

const spaces = [
  {
    label: "Photo studio",
    category: "Photo Studio",
    detail: "Light, backdrops and room to frame a shot.",
  },
  {
    label: "Sound stage",
    category: "Film Stage",
    detail: "Space for a set, a crew and the next take.",
  },
  {
    label: "Podcast room",
    category: "Podcast Lounge",
    detail: "A quiet table for interviews and conversation.",
  },
  {
    label: "Music suite",
    category: "Music Suite",
    detail: "A room to record, listen and work on a mix.",
  },
  {
    label: "Art workshop",
    category: "Workshop",
    detail: "A hands-on space for materials, tools and making.",
  },
];

const eyebrow =
  "text-xs font-medium uppercase tracking-widest text-muted-foreground";

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const arrowStyle =
  "shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5";

export default function AboutPage() {
  return (
    <main className="site-container min-w-0 py-9 sm:py-14 lg:py-16">
      <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <header className="min-w-0">
          <div className="flex items-center gap-2">
            <Aperture size={16} strokeWidth={1.5} aria-hidden="true" />
            <p className={eyebrow}>About StudioSpace</p>
          </div>

          <h1 className="mt-4 max-w-[13ch] font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            A place for the work you make.
          </h1>

          <div className="mt-5 max-w-md space-y-3 text-base leading-7 text-muted-foreground">
            <p>
              A photographer might need a room with daylight for just two hours.
              A podcast team might need four microphones around one table. The
              right space depends on the work.
            </p>
            <p>
              StudioSpace brings creative studios into one directory. Hosts
              describe their rooms, equipment and rates. Creators can see what’s
              available and request the hours they need.
            </p>
          </div>
        </header>

        <section aria-labelledby="index-title" className="min-w-0">
          <div className="flex items-baseline justify-between gap-3 border-b border-foreground/35 pb-3">
            <h2
              id="index-title"
              className="font-heading text-2xl tracking-tight"
            >
              Space index
            </h2>
            <span className="text-xs text-muted-foreground">
              {spaces.length} categories
            </span>
          </div>

          <ul className="divide-y divide-border border-b border-border">
            {spaces.map((space, index) => (
              <li key={space.category}>
                <Link
                  href={{
                    pathname: "/studios",
                    query: { category: space.category },
                  }}
                  aria-label={`Explore ${space.label.toLowerCase()} listings`}
                  className={`group grid min-h-16 grid-cols-[1.25rem_minmax(0,1fr)_1rem] items-center gap-2 rounded-sm px-1 py-3 transition-colors duration-200 hover:bg-secondary sm:gap-3 sm:px-2 ${focusStyle}`}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs tabular-nums text-muted-foreground"
                  >
                    0{index + 1}
                  </span>

                  <span className="min-w-0">
                    <span className="block font-heading text-2xl leading-tight tracking-tight">
                      {space.label}
                    </span>
                    <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                      {space.detail}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className={arrowStyle}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        aria-labelledby="host-title"
        className="mt-10 grid min-w-0 items-center gap-5 rounded-sm bg-foreground px-5 py-6 text-background sm:mt-14 sm:px-8 sm:py-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-background/75">
            For studio hosts
          </p>
          <h2
            id="host-title"
            className="mt-2 font-heading text-3xl tracking-tight"
          >
            Have a space to share?
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-background/80">
            Show creators what your studio looks like, what’s included and what
            an hour costs.
          </p>
        </div>

        <Link
          href="/add-studio"
          className="group inline-flex min-h-12 w-fit items-center gap-4 rounded-sm bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          List your studio
          <ArrowUpRight size={16} aria-hidden="true" className={arrowStyle} />
        </Link>
      </section>
    </main>
  );
}
