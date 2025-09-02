
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IContent } from "@/lib/content";

type RisingStarsProps = {
  content: IContent['home']['risingStars'];
};

export function RisingStars({ content }: RisingStarsProps) {
  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">
              {content.title}
            </h2>
            <p className="text-muted-foreground mt-2">
              {content.description}
            </p>
          </div>
          <Button asChild variant="outline" className="flex-shrink-0">
            <Link href="/rising-stars">
              {content.cta.text}
            </Link>
          </Button>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {content.stars.map((star, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0 relative">
                      <Image
                        src={star.image.src}
                        alt={`Photo of ${star.name}`}
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={star.image.hint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold text-white">{star.name}</h3>
                        <p className="text-sm text-gray-200">{star.achievement}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

    