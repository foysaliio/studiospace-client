import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Headphones,
  Mic,
  Palette,
} from "lucide-react";

const categories = [
  { label: "Photo Studios", value: "Photo Studio", icon: Camera },
  { label: "Sound Stages", value: "Film Stage", icon: Clapperboard },
  { label: "Podcast Rooms", value: "Podcast Lounge", icon: Mic },
  { label: "Music Suites", value: "Music Suite", icon: Headphones },
  { label: "Art Workshops", value: "Workshop", icon: Palette },
];

export default function StudioCategories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="border-y border-border bg-muted/40 text-foreground"
    >
      <div className="site-container grid gap-7 py-12 md:py-16 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <header>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Studio categories
          </p>

          <h2
            id="categories-heading"
            className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl"
          >
            Browse by category
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground sm:text-base">
            Find a space for your next shoot, recording session, or workshop.
          </p>
        </header>

        <ul className="min-w-0 divide-y divide-border border-y border-border">
          {categories.map(({ label, value, icon: Icon }) => (
            <li key={value}>
              <Link
                href={{ pathname: "/studios", query: { category: value } }}
                className="group flex min-h-16 items-center gap-3 rounded-sm px-1 py-3 transition-colors duration-200 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none sm:min-h-20 sm:gap-5 sm:px-3"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-border bg-background text-foreground">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1 font-heading text-xl leading-tight tracking-tight sm:text-2xl">
                  {label}
                </span>

                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors duration-200 group-hover:bg-primary/85 motion-reduce:transition-none">
                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                    className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
