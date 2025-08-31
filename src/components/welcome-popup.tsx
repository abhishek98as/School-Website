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

const feeStructure = [
    { class: "Nursery", fee: "₹ 30,000" },
    { class: "KG-I", fee: "₹ 32,000" },
    { class: "KG-II", fee: "₹ 32,000" },
    { class: "I", fee: "₹ 35,000" },
    { class: "II", fee: "₹ 35,000" },
    { class: "III", fee: "₹ 38,000" },
    { class: "IV", fee: "₹ 38,000" },
    { class: "V", fee: "₹ 40,000" },
    { class: "VI", fee: "₹ 42,000" },
    { class: "VII", fee: "₹ 42,000" },
    { class: "VIII", fee: "₹ 45,000" },
    { class: "IX", fee: "₹ 50,000" },
];

export function WelcomePopup() {
  const [open, setOpen] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    // Open the popup on component mount
    setOpen(true);
  }, []);
  
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
        className="max-w-5xl p-0 border-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Welcome to Galgamtrics College</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button className="absolute top-4 right-4 z-20 rounded-full p-2 bg-black/50 text-white hover:bg-black/70 transition-colors">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        <Carousel setApi={setApi} className="w-full" opts={{loop: true}}>
          <CarouselContent>
            {/* Slide 1: Admissions Open */}
            <CarouselItem>
              <div className="relative h-[80vh] w-full flex items-center justify-center p-4" style={{ perspective: '1000px' }}>
                <Image
                  src="https://picsum.photos/1200/800?random=110"
                  alt="Students studying"
                  data-ai-hint="students campus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div 
                  className="relative text-center text-white p-8 bg-black/40 rounded-xl shadow-2xl backdrop-blur-sm transform-gpu transition-transform hover:scale-105"
                  style={{ transform: 'rotateY(-10deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}
                >
                    <School className="h-16 w-16 mx-auto text-primary mb-4" />
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter drop-shadow-lg">Admissions Open</h2>
                    <p className="text-lg md:text-2xl mt-2 text-primary-foreground/90 drop-shadow-md">2025-2026</p>
                    <p className="mt-4 max-w-sm mx-auto text-primary-foreground/80">Join our vibrant community and start your journey towards excellence.</p>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 2: Fee Structure */}
            <CarouselItem>
                 <div className="relative h-[80vh] w-full flex flex-col items-center justify-center p-6 md:p-10">
                    <Image
                        src="https://picsum.photos/1200/800?random=111"
                        alt="Students in a classroom"
                        data-ai-hint="students classroom"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl">
                        <div className="flex items-center gap-4 mb-6 text-primary">
                            <IndianRupee className="h-12 w-12" />
                            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Fee Structure</h2>
                        </div>
                        <Card className="w-full bg-white/90 backdrop-blur-sm shadow-2xl border-0">
                            <CardContent className="p-0">
                                <ScrollArea className="h-96">
                                <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="text-left font-bold text-lg text-primary">Class</TableHead>
                                    <TableHead className="text-right font-bold text-lg text-primary">Annual Fee</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feeStructure.map((item) => (
                                    <TableRow key={item.class} className="text-base">
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
            </CarouselItem>

            {/* Slide 3: Music Event */}
            <CarouselItem>
              <div className="relative h-[80vh] w-full text-white">
                <Image
                  src="https://picsum.photos/1200/800?random=112"
                  alt="Music Event"
                  data-ai-hint="college concert"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                   <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
                    <Music className="h-16 w-16 mx-auto text-primary mb-4 animate-pulse" />
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter drop-shadow-lg">RHYTHM NIGHT</h2>
                    <p className="text-lg md:text-xl mt-2 text-primary-foreground/90">An evening of unforgettable melodies.</p>
                    <div className="mt-6 font-semibold text-lg bg-primary/80 text-primary-foreground py-2 px-6 rounded-full inline-block">
                        October 28th, 2024 | 7:00 PM Onwards
                    </div>
                   </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white bg-black/50 px-3 py-1 rounded-full">
            {current} / {count}
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
