import { Card, CardContent } from "@/components/ui/card";
import { Library, FlaskConical, Computer, Building } from "lucide-react";
import Image from "next/image";
import { getContent } from "@/lib/content-loader";

const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'FlaskConical': return <FlaskConical className="h-10 w-10 text-primary" />;
        case 'Computer': return <Computer className="h-10 w-10 text-primary" />;
        case 'Library': return <Library className="h-10 w-10 text-primary" />;
        case 'Building': return <Building className="h-10 w-10 text-primary" />;
        default: return null;
    }
}

export default async function InfrastructurePage() {
  const content = await getContent();
  const infrastructureContent = content.infrastructure;

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" dangerouslySetInnerHTML={{ __html: infrastructureContent.title }}>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {infrastructureContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {infrastructureContent.facilities.map((facility, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                 <div className="relative h-56 w-full">
                    <Image 
                      src={facility.image.src} 
                      alt={facility.name} 
                      fill 
                      style={{objectFit: 'cover'}}
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={facility.image.hint}
                    />
                 </div>
                <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">{getIcon(facility.icon)}</div>
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
