"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSlider() {
  const images = [
    { src: "https://picsum.photos/1920/800?random=1", alt: "University Campus", hint: "university campus" },
    { src: "https://picsum.photos/1920/800?random=2", alt: "Students in a classroom", hint: "students classroom" },
    { src: "https://picsum.photos/1920/800?random=3", alt: "University Library", hint: "university library" },
    { src: "https://picsum.photos/1920/800?random=4", alt: "Graduation ceremony", hint: "graduation ceremony" },
  ];

  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 1000); // As per user request for 1 sec interval

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="w-full relative">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[600px] lg:h-[800px] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                  data-ai-hint={image.hint}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      </Carousel>
    </section>
  );
}
