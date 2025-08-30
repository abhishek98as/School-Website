import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Paintbrush, Music, Dumbbell, Users } from "lucide-react";

export default function StudentLifePage() {
  const activities = [
    {
      name: "Arts & Culture",
      description: "Express your creativity through various art forms and cultural events.",
      icon: <Paintbrush className="h-8 w-8 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=71", hint: "students painting" },
    },
    {
      name: "Music & Performing Arts",
      description: "Join bands, choirs, and theatre groups to showcase your talents.",
      icon: <Music className="h-8 w-8 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=72", hint: "student concert" },
    },
    {
      name: "Sports & Fitness",
      description: "Stay active with our excellent sports facilities and fitness programs.",
      icon: <Dumbbell className="h-8 w-8 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=73", hint: "college sports" },
    },
    {
      name: "Clubs & Organizations",
      description: "Connect with like-minded peers and develop leadership skills.",
      icon: <Users className="h-8 w-8 text-primary" />,
      image: { src: "https://picsum.photos/600/400?random=74", hint: "student club" },
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=70')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container relative mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            Vibrant <span className="text-primary">Student Life</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Experience a rich and diverse campus life beyond academics.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {activities.map((activity, index) => (
              <Card key={index} className="flex flex-col md:flex-row items-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative w-full md:w-1/3 h-48 md:h-full">
                  <Image src={activity.image.src} alt={activity.name} layout="fill" objectFit="cover" data-ai-hint={activity.image.hint} />
                </div>
                <CardContent className="p-6 w-full md:w-2/3">
                  <div className="flex items-center gap-4 mb-3">
                    {activity.icon}
                    <h3 className="text-2xl font-bold">{activity.name}</h3>
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
