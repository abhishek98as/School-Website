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

export function Highlights() {
  const stats = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      value: "5k+",
      label: "Brilliant Students",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      value: "300+",
      label: "Awards Won",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      value: "20+",
      label: "Years of Excellence",
    },
    {
      icon: <LandPlot className="h-10 w-10 text-primary" />,
      value: "19",
      label: "Acres Campus",
    },
  ];

  const sliderImages = [
    { src: "https://picsum.photos/600/400?random=10", alt: "Students collaborating", hint: "students collaborating" },
    { src: "https://picsum.photos/600/400?random=11", alt: "Modern laboratory", hint: "science laboratory" },
    { src: "https://picsum.photos/600/400?random=12", alt: "Sports facility", hint: "sports facility" },
  ];
  
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
          <div className="w-full max-w-lg mx-auto">
             <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {sliderImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
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
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="pt-6 pb-2">{stat.icon}</div>
                <CardContent className="pb-6">
                  <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
