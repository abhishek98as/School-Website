
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { X, Music, IndianRupee, School } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import type { IContent } from "@/lib/content";

type WelcomePopupProps = {
    content: IContent['welcomePopup'];
}

const getIcon = (title: string) => {
    if (title.toLowerCase().includes('admission')) return <School className="h-12 w-12 md:h-16 md:w-16 mx-auto text-primary mb-4" />;
    if (title.toLowerCase().includes('fee')) return <IndianRupee className="h-10 w-10 md:h-12 md:w-12" />;
    if (title.toLowerCase().includes('music') || title.toLowerCase().includes('rhythm')) return <Music className="h-12 w-12 md:h-16 md:w-16 mx-auto text-primary mb-4 animate-pulse" />;
    return null;
}


export function WelcomePopup({ content }: WelcomePopupProps) {
  const [open, setOpen] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    // Open the popup on component mount
    const hasSeenPopup = sessionStorage.getItem("welcomePopupSeen");
    if (!hasSeenPopup) {
      setOpen(true);
      sessionStorage.setItem("welcomePopupSeen", "true");
    }
  }, []);
  
  React.useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
        if (api.canScrollNext()) {
            api.scrollNext();
        } else {
            api.scrollTo(0);
        }
    }, 3000); // Changed interval to 3s for better user experience

    return () => clearInterval(interval);
  }, [api, isHovered]);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="max-w-[95vw] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl p-0 border-0 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Welcome to Galgametrics College</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button className="absolute top-2 right-2 md:top-4 md:right-4 z-20 rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors">
            <X className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        <Carousel setApi={setApi} className="w-full" opts={{loop: true}}>
          <CarouselContent>
            {content.slides.map((slide, index) => (
                <CarouselItem key={index}>
                    {slide.type === 'table' ? (
                         <div className="relative h-[90svh] md:h-[80vh] w-full flex flex-col items-center justify-center p-4 md:p-10">
                            <Image
                                src={slide.image.src}
                                alt={slide.image.alt}
                                data-ai-hint={slide.image.hint}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm md:max-w-2xl">
                                <div className="flex items-center gap-4 mb-4 md:mb-6 text-primary">
                                    {getIcon(slide.title)}
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">{slide.title}</h2>
                                </div>
                                <Card className="w-full bg-white/90 backdrop-blur-sm shadow-2xl border-0">
                                    <CardContent className="p-0">
                                        <ScrollArea className="h-[60svh] md:h-96">
                                        <Table>
                                        <TableHeader>
                                            <TableRow>
                                            <TableHead className="text-left font-bold text-base md:text-lg text-primary">Class</TableHead>
                                            <TableHead className="text-right font-bold text-base md:text-lg text-primary">Annual Fee</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {content.feeStructure.map((item) => (
                                            <TableRow key={item.class} className="text-sm md:text-base">
                                                <TableCell className="font-medium text-gray-800">{item.class}</TableCell>
                                                <TableCell className="text-right font-semibold text-gray-900">{item.fee}</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                         <div className="relative h-[90svh] md:h-[80vh] w-full flex items-center justify-center p-4">
                            <Image
                                src={slide.image.src}
                                alt={slide.image.alt}
                                data-ai-hint={slide.image.hint}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                             <div className="relative text-center text-white p-6 md:p-8 bg-black/40 rounded-xl shadow-2xl backdrop-blur-sm">
                                {getIcon(slide.title)}
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter drop-shadow-lg">{slide.title}</h2>
                                {slide.subtitle && <p className="text-base md:text-xl lg:text-2xl mt-2 text-primary-foreground/90 drop-shadow-md">{slide.subtitle}</p>}
                                {slide.description && <p className="mt-4 max-w-xs md:max-w-sm mx-auto text-sm md:text-base text-primary-foreground/80">{slide.description}</p>}
                            </div>
                        </div>
                    )}
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white bg-black/50 px-3 py-1 rounded-full z-10">
            {current} / {count}
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
