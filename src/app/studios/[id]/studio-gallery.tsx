"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";

type StudioGalleryProps = {
  title: string;
  imageUrl: string;
  galleryImages?: string[];
};

const arrowStyle =
  "inline-flex size-11 items-center justify-center rounded-full border border-input text-foreground transition-colors duration-200 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-primary-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none";

export default function StudioGallery({
  title,
  imageUrl,
  galleryImages = [],
}: StudioGalleryProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [...new Set([imageUrl, ...galleryImages].filter(Boolean))];
  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/3] place-items-center rounded-sm bg-muted text-sm text-muted-foreground">
        No studio photos available.
      </div>
    );
  }

  return (
    <section aria-label={`${title} photo gallery`} className="min-w-0">
      <Swiper
        slidesPerView={1}
        rewind={false}
        allowTouchMove={hasMultipleImages}
        speed={350}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            swiper.params.speed = 0;
          }
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="aspect-[4/3] w-full rounded-sm bg-muted"
      >
        {images.map((src, index) => (
          <SwiperSlide key={src}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={`${title}, photo ${index + 1}`}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 94vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultipleImages && (
        <div className="mt-4 flex items-center justify-between sm:mt-6">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="text-sm tabular-nums text-muted-foreground"
          >
            <span className="sr-only">Photo </span>
            <span className="font-medium text-foreground">
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
              <ArrowLeft size={18} aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Next studio photo"
              disabled={activeIndex === images.length - 1}
              onClick={() => swiperRef.current?.slideNext()}
              className={arrowStyle}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
