import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Trees, Utensils, Bus, ShieldCheck } from "lucide-react";

export default function CampusPage() {
  const features = [
    {
      name: "Green & Serene",
      description: "A lush, eco-friendly campus that provides a tranquil environment for learning.",
      icon: <Trees className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=91", hint: "green campus" },
    },
    {
      name: "Cafeteria & Dining",
      description: "Hygienic and diverse food options to cater to all tastes.",
      icon: <Utensils className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=92", hint: "college cafeteria" },
    },
    {
      name: "Transport Facility",
      description: "Safe and reliable transport services connecting various parts of the city.",
      icon: <Bus className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=93", hint: "college bus" },
    },
    {
      name: "Secure Environment",
      description: "24/7 security and surveillance to ensure a safe campus for all.",
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=94", hint: "security camera" },
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Explore Our <span className="text-primary">Campus</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A sprawling 19-acre campus designed to provide a holistic educational experience.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-56 w-full">
                  <Image 
                    src={feature.image.src} 
                    alt={feature.name} 
                    fill
                    objectFit="cover" 
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={feature.image.hint}
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
