import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Library, Microscope, SwatchBook } from "lucide-react";

export default function VirtualTourPage() {
  const views = [
    {
      title: "Main Campus Entrance",
      id: "streetview",
      icon: <Building className="h-8 w-8 text-primary" />,
      embedUrl: "https://www.google.com/maps/embed?pb=!4v1628624953931!6m8!1m7!1sCAoSLEFGMVFpcE5qVlZuVnBKM2pYVEx3X1F3S0Y2dG9wWWhwNExwWmpFNEp2V2st!2m2!1d28.5355161!2d77.3910265!3f326.5!4f0!5f0.7820865899450742"
    },
    {
      title: "Central Library",
      id: "library",
      icon: <Library className="h-8 w-8 text-primary" />,
      embedUrl: "https://www.google.com/maps/embed?pb=!4v1721303102143!6m8!1m7!1sCAoSLEFGMVFpcE5MS1I2dFJMMkxuZDA2Z0RCejQzY0lRNTNOeGdXNk1xZkY0UjZ3!2m2!1d28.4244243!2d77.0267499!3f314.15!4f0!5f0.7820865899450742"
    },
    {
      title: "Engineering Labs",
      id: "labs",
      icon: <Microscope className="h-8 w-8 text-primary" />,
      embedUrl: "https://www.google.com/maps/embed?pb=!4v1721303195229!6m8!1m7!1sCAoSLEFGMVFpcE9xLWlQX0d6bVl6U3dGRVdQSmF3ZE5uS1hIN1FmeTdpUmx1X1VI!2m2!1d28.6139391!2d77.2090212!3f324.78!4f-1.55!5f0.7820865899450742"
    },
    {
      title: "Art & Design Studio",
      id: "studio",
      icon: <SwatchBook className="h-8 w-8 text-primary" />,
      embedUrl: "https://www.google.com/maps/embed?pb=!4v1721303254215!6m8!1m7!1sCAoSLEFGMVFpcE94eDR2X2FNZ2VVS09vX0dxX2NfQ3VHeEZHRWY3Zmc3R4enMtdy!2m2!1d28.5355161!2d77.3910265!3f278.31!4f-12.8!5f0.7820865899450742"
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            360° <span className="text-primary">Virtual Tour</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our campus from anywhere in the world. Click and drag to look around.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {views.map((view) => (
              <Card key={view.id} className="overflow-hidden shadow-lg">
                <CardHeader className="flex-row items-center gap-4">
                  {view.icon}
                  <CardTitle className="text-2xl">{view.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-md overflow-hidden border">
                    <iframe
                      src={view.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`360 View of ${view.title}`}
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
