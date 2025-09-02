import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Trees, Utensils, Bus, ShieldCheck } from "lucide-react";
import { getContent } from "@/lib/content-loader";


const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'Trees': return <Trees className="h-10 w-10 text-primary" />;
        case 'Utensils': return <Utensils className="h-10 w-10 text-primary" />;
        case 'Bus': return <Bus className="h-10 w-10 text-primary" />;
        case 'ShieldCheck': return <ShieldCheck className="h-10 w-10 text-primary" />;
        default: return null;
    }
}

export default async function CampusPage() {
  const content = await getContent();
  const campusContent = content.campus;

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {campusContent.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {campusContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {campusContent.features.map((feature, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-56 w-full">
                  <Image 
                    src={feature.image.src} 
                    alt={feature.name} 
                    fill
                    style={{objectFit: 'cover'}}
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={feature.image.hint}
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{getIcon(feature.icon)}</div>
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
