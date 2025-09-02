
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { IContent } from "@/lib/content";

type HeroSliderProps = {
  content: IContent['home']['heroSlider']
}

export function HeroSlider({ content }: HeroSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section 
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {content.slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[60vh] md:h-[80vh] lg:h-[95vh] w-full">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                  data-ai-hint={slide.image.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                   <div className="bg-black/40 p-6 md:p-10 rounded-lg shadow-2xl backdrop-blur-sm">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg animate-fade-in-down">
                        {slide.title}
                    </h1>
                    <p className="mt-4 text-md md:text-xl lg:text-2xl max-w-3xl mx-auto drop-shadow-md animate-fade-in-up">
                        {slide.subtitle}
                    </p>
                    <Button asChild size="lg" className="mt-8 animate-fade-in-up">
                        <Link href={slide.cta.href}>
                            {slide.cta.text} <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                   </div>
                </div>
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

    