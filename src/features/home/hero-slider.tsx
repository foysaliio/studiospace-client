"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const studios = [
  {
    label: "Photo",
    category: "Photography studios",
    title: "Find your light.",
    description:
      "Find the right backdrop and enough room to step back, frame the shot, and make it yours.",
    image: "/images/hero/photo-studio.jpg",
    alt: "A camera on a tripod facing a cream backdrop and studio softbox.",
    position: "object-[50%_55%]",
  },
  {
    label: "Podcast",
    category: "Podcast rooms",
    title: "Pull up a chair.",
    description:
      "Settle in across from your guest, bring the microphones close, and let the conversation unfold.",
    image: "/images/hero/podcast-room.jpg",
    alt: "Two cream armchairs and microphones around a small podcast table.",
    position: "object-[50%_68%]",
  },
  {
    label: "Music",
    category: "Music suites",
    title: "Play it together.",
    description:
      "Bring the whole band into one room, from the first sound check to the final take.",
    image: "/images/hero/music-studio.jpg",
    alt: "A drum kit between two guitars in a sound-treated rehearsal room.",
    position: "object-[50%_62%]",
  },
];

const focusStyle =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const arrowStyle =
  "inline-flex size-11 items-center justify-center rounded-full " +
  "border border-input text-foreground transition-colors " +
  "hover:border-primary hover:bg-primary hover:text-primary-foreground " +
  "active:bg-secondary active:text-secondary-foreground";

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const current = studios[activeIndex];

  function selectStudio(index: number) {
    setActiveIndex(index);

    const swiper = swiperRef.current;

    if (swiper && !swiper.destroyed) {
      swiper.slideTo(index);
    }
  }

  return (
    <section
      aria-label="Discover creative studios"
      aria-roledescription="carousel"
      className="bg-background text-foreground"
    >
      <div className="site-container grid min-w-0 gap-0 py-5 sm:py-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:items-center lg:gap-10 lg:py-14">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {current.category}
          </p>

          <h1 className="mt-2 font-heading text-[clamp(2.4rem,9vw,4rem)] font-normal leading-[1.02] tracking-[-0.045em] lg:mt-5 lg:max-w-[12ch] lg:text-[clamp(2.8rem,6vw,6rem)]">
            {current.title}
          </h1>

          {/* Mobile and tablet photo with fixed navigation controls */}
          <div className="mt-4 lg:hidden">
            <Swiper
              modules={[EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              rewind
              speed={350}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;

                if (
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ) {
                  swiper.params.speed = 0;
                }
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="aspect-[1/1] w-full bg-muted sm:aspect-[3/2]"
            >
              {studios.map((studio, index) => (
                <SwiperSlide key={studio.image}>
                  <div className="relative h-full w-full">
                    <Image
                      src={studio.image}
                      alt={studio.alt}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 1px, 94vw"
                      className={`object-cover ${studio.position}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-2 flex items-center justify-between">
              <span
                aria-hidden="true"
                className="text-sm tabular-nums text-muted-foreground"
              >
                <span className="font-medium text-foreground">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                {" / "}
                {String(studios.length).padStart(2, "0")}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous studio"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className={`${arrowStyle} ${focusStyle}`}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  aria-label="Next studio"
                  onClick={() => swiperRef.current?.slideNext()}
                  className={`${arrowStyle} ${focusStyle}`}
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 max-w-[36ch] text-base leading-7 text-muted-foreground lg:mt-5">
            {current.description}
          </p>

          <Link
            href="/studios"
            className="group mx-auto mt-5 flex min-h-12 w-fit items-center justify-center gap-5 rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:mx-0"
          >
            Explore Studios
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </Link>
        </div>

        {/* Desktop expanding gallery */}
        <div
          role="group"
          aria-label="Choose a studio collection"
          className="hidden min-w-0 gap-3 lg:col-start-2 lg:row-start-1 lg:flex"
        >
          {studios.map((studio, index) => {
            const selected = activeIndex === index;

            return (
              <button
                key={studio.image}
                type="button"
                aria-label={`Show ${studio.category.toLowerCase()}`}
                aria-pressed={selected}
                onClick={() => selectStudio(index)}
                style={{ flexGrow: selected ? 3.2 : 1 }}
                className={`group min-w-0 basis-0 text-left transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none ${focusStyle}`}
              >
                <span className="relative block h-[clamp(23rem,36vw,32rem)] overflow-hidden bg-muted">
                  <Image
                    src={studio.image}
                    alt={studio.alt}
                    fill
                    sizes="(min-width: 1280px) 450px, (min-width: 1024px) 36vw, 1px"
                    className={`object-cover ${studio.position}`}
                  />
                </span>

                <span
                  className={`mt-3 block text-sm transition-colors ${
                    selected
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {studio.label}
                </span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {activeIndex + 1} of {studios.length}. {current.category}.
        </p>
      </div>
    </section>
  );
}
