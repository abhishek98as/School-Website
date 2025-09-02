import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Paintbrush, Music, Dumbbell, Users } from "lucide-react";
import { getContent } from "@/lib/content-loader";

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'Paintbrush': return <Paintbrush className="h-8 w-8 text-primary" />;
        case 'Music': return <Music className="h-8 w-8 text-primary" />;
        case 'Dumbbell': return <Dumbbell className="h-8 w-8 text-primary" />;
        case 'Users': return <Users className="h-8 w-8 text-primary" />;
        default: return null;
    }
}

export default async function StudentLifePage() {
  const content = await getContent();
  const studentLifeContent = content.studentLife;

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-cover bg-center" style={{ backgroundImage: `url('${studentLifeContent.hero.image.src}')` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container relative mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" dangerouslySetInnerHTML={{ __html: studentLifeContent.title }}>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {studentLifeContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {studentLifeContent.activities.map((activity, index) => (
              <Card key={index} className="flex flex-col sm:flex-row items-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative w-full sm:w-1/3 h-48 sm:h-full">
                  <Image src={activity.image.src} alt={activity.name} fill style={{objectFit: 'cover'}} data-ai-hint={activity.image.hint} />
                </div>
                <CardContent className="p-6 w-full sm:w-2/3">
                  <div className="flex items-center gap-4 mb-3">
                    {getIcon(activity.icon)}
                    <h3 className="text-xl md:text-2xl font-bold">{activity.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
