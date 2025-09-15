
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
        className="max-w-[94vw] max-h-[94vh] sm:max-w-[88vw] sm:max-h-[88vh] md:max-w-4xl lg:max-w-5xl md:max-h-[82vh] p-0 border-0 rounded-lg overflow-hidden m-2 sm:m-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Welcome to Galgametrics College</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 z-30 rounded-full p-1.5 sm:p-2 bg-black/70 text-white hover:bg-black/90 transition-colors shadow-lg">
            <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        <Carousel setApi={setApi} className="w-full h-full" opts={{loop: true}}>
          <CarouselContent>
            {content.slides.map((slide, index) => (
                <CarouselItem key={index}>
                    {slide.type === 'table' ? (
                         <div className="relative h-[96vh] w-full flex flex-col items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6">
                            <Image
                                src={slide.image.src}
                                alt={slide.image.alt}
                                data-ai-hint={slide.image.hint}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[94vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-3xl mx-auto">
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 sm:mb-4 md:mb-6 text-primary">
                                    {getIcon(slide.title)}
                                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg text-center">{slide.title}</h2>
                                </div>
                                <Card className="w-full bg-white/95 backdrop-blur-sm shadow-2xl border-0 max-h-[70vh] flex flex-col">
                                    <CardContent className="p-2 sm:p-3 md:p-4 flex-1 min-h-0">
                                        <ScrollArea className="h-[60vh] sm:h-[65vh] md:h-[55vh] lg:h-[50vh]">
                                        <div className="px-1 sm:px-2">
                                        <Table>
                                        <TableHeader>
                                            <TableRow>
                                            <TableHead className="text-left font-bold text-sm sm:text-base md:text-lg text-primary py-2">Class</TableHead>
                                            <TableHead className="text-right font-bold text-sm sm:text-base md:text-lg text-primary py-2">Annual Fee</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {content.feeStructure.map((item) => (
                                            <TableRow key={item.class} className="text-xs sm:text-sm md:text-base">
                                                <TableCell className="font-medium text-gray-800 py-1 sm:py-2">{item.class}</TableCell>
                                                <TableCell className="text-right font-semibold text-gray-900 py-1 sm:py-2">{item.fee}</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                        </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                         <div className="relative h-[96vh] w-full flex items-center justify-center p-1 sm:p-2 md:p-4">
                            <Image
                                src={slide.image.src}
                                alt={slide.image.alt}
                                data-ai-hint={slide.image.hint}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                             <div className="relative text-center text-white p-2 sm:p-4 md:p-6 lg:p-8 bg-black/40 rounded-xl shadow-2xl backdrop-blur-sm max-w-[92vw] sm:max-w-[80vw] md:max-w-lg lg:max-w-xl mx-auto">
                                <div className="flex flex-col items-center">
                                {getIcon(slide.title)}
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight drop-shadow-lg mb-2 sm:mb-3 md:mb-4">{slide.title}</h2>
                                {slide.subtitle && <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-1 sm:mt-2 text-primary-foreground/90 drop-shadow-md mb-2 sm:mb-3">{slide.subtitle}</p>}
                                {slide.description && <p className="mt-1 sm:mt-2 max-w-[90%] mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-primary-foreground/80 leading-relaxed">{slide.description}</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-black/70 hover:bg-black/90 border-0" />
          <CarouselNext className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 bg-black/70 hover:bg-black/90 border-0" />
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white bg-black/70 px-2 sm:px-3 py-1 rounded-full z-20">
            {current} / {count}
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
