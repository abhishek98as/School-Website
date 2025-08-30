import { Card, CardContent } from "@/components/ui/card";
import { Library, FlaskConical, Computer, Building } from "lucide-react";
import Image from "next/image";

export default function InfrastructurePage() {
  const facilities = [
    {
      name: "State-of-the-Art Labs",
      description: "Equipped with the latest technology for practical learning.",
      icon: <FlaskConical className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=61", hint: "science lab" },
    },
    {
      name: "Modern Classrooms",
      description: "Smart classrooms that foster an interactive learning environment.",
      icon: <Computer className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=62", hint: "modern classroom" },
    },
    {
      name: "Rich Library",
      description: "A vast collection of books, journals, and digital resources.",
      icon: <Library className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=63", hint: "library interior" },
    },
     {
      name: "Expansive Campus",
      description: "Lush green campus with sports facilities and open spaces.",
      icon: <Building className="h-10 w-10 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=64", hint: "college campus" },
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Our <span className="text-primary">Infrastructure</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            World-class facilities to support a world-class education.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                 <div className="relative h-56 w-full">
                    <Image 
                      src={facility.image.src} 
                      alt={facility.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={facility.image.hint}
                    />
                 </div>
                <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">{facility.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                    <p className="text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
