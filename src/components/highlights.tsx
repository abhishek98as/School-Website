
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Award, GraduationCap, LandPlot, Users } from "lucide-react";
import React from "react";
import { IContent } from "@/lib/content";

type HighlightsProps = {
  content: IContent['home']['highlights']
}

export function Highlights({ content }: HighlightsProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
        if (api.canScrollNext()) api.scrollNext();
        else api.scrollTo(0);
    }, 3000);
    return () => clearInterval(interval);
  }, [api]);


  return (
    <section className="py-12 lg:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="w-full max-w-lg mx-auto" style={{ perspective: "1000px" }}>
             <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {content.sliderImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden rounded-xl shadow-2xl transform-style-3d transition-transform duration-500 hover:scale-105 hover:rotate-y-2">
                      <CardContent className="p-0">
                         <Image
                          src={image.src}
                          alt={image.alt}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover aspect-[3/2]"
                          data-ai-hint={image.hint}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {content.stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {index === 0 && <GraduationCap className="h-10 w-10 text-primary" />}
                    {index === 1 && <Award className="h-10 w-10 text-primary" />}
                    {index === 2 && <Users className="h-10 w-10 text-primary" />}
                    {index === 3 && <LandPlot className="h-10 w-10 text-primary" />}
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
