import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BrainCircuit, Rocket } from "lucide-react";
import Image from "next/image";

export default function AcademicsPage() {
  const programs = [
    {
      title: "Undergraduate Programs",
      description: "Explore our diverse range of bachelor's degrees designed to prepare you for a successful career.",
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      image: {
        src: "https://picsum.photos/600/400?random=51",
        hint: "students studying"
      }
    },
    {
      title: "Postgraduate Programs",
      description: "Advance your knowledge and career with our specialized master's and doctoral programs.",
      icon: <BrainCircuit className="h-12 w-12 text-primary" />,
       image: {
        src: "https://picsum.photos/600/400?random=52",
        hint: "research lab"
      }
    },
    {
      title: "Research & Innovation",
      description: "Join our community of innovators and contribute to cutting-edge research and development.",
      icon: <Rocket className="h-12 w-12 text-primary" />,
       image: {
        src: "https://picsum.photos/600/400?random=53",
        hint: "technology innovation"
      }
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Academics at <span className="text-primary">Galgametrics</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering minds through a comprehensive and innovative curriculum, fostering both intellectual and personal growth.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                 <div className="relative h-56 w-full">
                  <Image src={program.image.src} alt={program.title} layout="fill" objectFit="cover" data-ai-hint={program.image.hint} />
                </div>
                <CardHeader className="flex-row items-center gap-4">
                  {program.icon}
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
