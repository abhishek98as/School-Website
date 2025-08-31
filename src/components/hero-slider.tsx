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

export function HeroSlider() {
  const slides = [
    { 
      src: "https://picsum.photos/1920/1080?random=1", 
      alt: "University Campus", 
      hint: "university campus",
      title: "Excellence in Education",
      subtitle: "Discover a place where knowledge meets innovation.",
      cta: {
        text: "Explore Programs",
        href: "/academics"
      }
    },
    { 
      src: "https://picsum.photos/1920/1080?random=2", 
      alt: "Students in a classroom", 
      hint: "students classroom",
      title: "Vibrant Campus Life",
      subtitle: "Join a community of learners and leaders.",
       cta: {
        text: "Student Life",
        href: "/student-life"
      }
    },
    { 
      src: "https://picsum.photos/1920/1080?random=3", 
      alt: "University Library", 
      hint: "university library",
       title: "State-of-the-Art Facilities",
      subtitle: "Learn in an environment built for success.",
       cta: {
        text: "View Infrastructure",
        href: "/infrastructure"
      }
    },
    { 
      src: "https://picsum.photos/1920/1080?random=4", 
      alt: "Graduation ceremony", 
      hint: "graduation ceremony",
      title: "Your Future Starts Here",
      subtitle: "Begin your journey towards a successful career.",
       cta: {
        text: "Apply Now",
        href: "/admission"
      }
    },
  ];

  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="w-full relative">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[60vh] md:h-[80vh] lg:h-[95vh] w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                  data-ai-hint={slide.hint}
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
