"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

type StudioGalleryProps = {
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  galleryImages?: string[];
};

const arrowStyle =
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors duration-200 enabled:hover:border-foreground enabled:hover:bg-foreground enabled:hover:text-background disabled:cursor-default disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none";

export default function StudioGallery({
  title,
  category,
  location,
  imageUrl,
  galleryImages = [],
}: StudioGalleryProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [...new Set([imageUrl, ...galleryImages].filter(Boolean))];
  const hasGallery = images.length > 1;

  return (
    <section aria-label={`${title} studio gallery`} className="min-w-0">
      <div className="relative isolate grid overflow-hidden rounded-sm bg-neutral-900 text-white">
        {images.length > 0 && (
          <Swiper
            slidesPerView={1}
            allowTouchMove={hasGallery}
            rewind={false}
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
            className="absolute! inset-0 h-full w-full"
          >
            {images.map((src, index) => (
              <SwiperSlide key={src}>
                <Image
                  src={src}
                  alt={`${title}, studio photo ${index + 1}`}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="object-cover object-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/25 to-transparent"
        />

        <header className="pointer-events-none relative z-20 flex min-h-64 flex-col justify-end p-5 sm:min-h-80 sm:p-8 lg:min-h-[25rem] lg:p-10">
          <p className="text-xs font-medium uppercase tracking-widest text-white/85">
            {category}
          </p>

          <h1 className="mt-2 max-w-[22ch] break-words font-heading text-4xl leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-3 flex items-start gap-1.5 text-sm leading-5 text-white/90">
            <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
            {location}
          </p>
        </header>
      </div>

      {hasGallery && (
        <div className="mt-3 flex items-center justify-between gap-4">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-xs tabular-nums text-muted-foreground"
          >
            Studio photos
            <span className="ml-2 font-medium text-foreground">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(images.length).padStart(2, "0")}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous studio photo"
              disabled={activeIndex === 0}
              onClick={() => swiperRef.current?.slidePrev()}
              className={arrowStyle}
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Next studio photo"
              disabled={activeIndex === images.length - 1}
              onClick={() => swiperRef.current?.slideNext()}
              className={arrowStyle}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
