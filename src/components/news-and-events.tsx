import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export function NewsAndEvents() {
  const items = [
    {
      type: "Event",
      title: "Annual Convocation Ceremony 2024",
      date: "25th December 2024",
      location: "Main Auditorium",
      description: "Join us in celebrating the achievements of our graduating class.",
      image: { src: "https://picsum.photos/600/400?random=41", hint: "convocation ceremony" },
    },
    {
      type: "News",
      title: "GCET secures top spot in National Innovation Rankings",
      date: "18th November 2024",
      description: "Our commitment to research and development has been recognized once again.",
      image: { src: "https://picsum.photos/600/400?random=42", hint: "award trophy" },
    },
    {
      type: "Event",
      title: "Inter-College Sports Meet 'Ignite '24'",
      date: "10th - 12th January 2025",
      location: "Sports Complex",
      description: "Witness thrilling competitions and sportsmanship.",
      image: { src: "https://picsum.photos/600/400?random=43", hint: "sports competition" },
    },
  ];

  return (
    <section className="py-12 lg:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            News &amp; <span className="text-primary">Events</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Stay updated with the latest happenings at our college.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative">
                <Image
                  src={item.image.src}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-[3/2]"
                  data-ai-hint={item.image.hint}
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${item.type === 'Event' ? 'bg-primary' : 'bg-black/60'}`}>
                  {item.type}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="h-14">{item.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-2">
                       <MapPin className="h-4 w-4" />
                       <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0 h-auto text-primary">
                    <Link href="#">
                        Read More <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
