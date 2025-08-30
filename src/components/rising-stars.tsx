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

export function RisingStars() {
  const stars = [
    { name: "Priya Sharma", achievement: "Winner, National Robotics Olympiad", src: "https://picsum.photos/400/500?random=31", hint: "student portrait" },
    { name: "Rahul Verma", achievement: "Published Research in IEEE", src: "https://picsum.photos/400/500?random=32", hint: "student portrait" },
    { name: "Anjali Mehta", achievement: "Top Rank in University Exams", src: "https://picsum.photos/400/500?random=33", hint: "student portrait" },
    { name: "Sameer Khan", achievement: "Best Athlete of the Year", src: "https://picsum.photos/400/500?random=34", hint: "student portrait" },
    { name: "Neha Gupta", achievement: "Founded a Successful Startup", src: "https://picsum.photos/400/500?random=35", hint: "student portrait" },
    { name: "Vikram Singh", achievement: "International Chess Champion", src: "https://picsum.photos/400/500?random=36", hint: "student portrait" },
  ];

  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our <span className="text-primary">Rising Stars</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Meet the brilliant minds shaping the future.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/rising-stars">
              View All
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
            {stars.map((star, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="p-0 relative">
                      <Image
                        src={star.src}
                        alt={`Photo of ${star.name}`}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={star.hint}
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
