import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BrainCircuit, Rocket } from "lucide-react";
import Image from "next/image";
import { getContent } from "@/lib/content-loader";


export default async function AcademicsPage() {
  const content = await getContent();
  const academicsContent = content.academics;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen": return <BookOpen className="h-12 w-12 text-primary" />;
      case "BrainCircuit": return <BrainCircuit className="h-12 w-12 text-primary" />;
      case "Rocket": return <Rocket className="h-12 w-12 text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" dangerouslySetInnerHTML={{ __html: academicsContent.title }}>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {academicsContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academicsContent.programs.map((program, index) => (
              <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                 <div className="relative h-56 w-full">
                  <Image src={program.image.src} alt={program.title} fill style={{objectFit: 'cover'}} data-ai-hint={program.image.hint} />
                </div>
                <CardHeader className="flex-row items-center gap-4">
                  {getIcon(program.icon)}
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
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
