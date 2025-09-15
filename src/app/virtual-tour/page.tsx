
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Library, Microscope, SwatchBook, Camera } from "lucide-react";
import { ParticleCanvas } from "@/components/particle-canvas";
import { useEffect, useState } from "react";
import type { IContent } from "@/lib/content";

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'Building': return <Building className="h-8 w-8 text-primary" />;
        case 'Library': return <Library className="h-8 w-8 text-primary" />;
        case 'Microscope': return <Microscope className="h-8 w-8 text-primary" />;
        case 'SwatchBook': return <SwatchBook className="h-8 w-8 text-primary" />;
        case 'Camera': return <Camera className="h-8 w-8 text-primary" />;
        default: return null;
    }
}

export default function VirtualTourPage() {
  const [content, setContent] = useState<IContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const fetchedContent = await response.json();
        setContent(fetchedContent);
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    };
    
    fetchContent();
  }, []);

  if (!content) {
    return <div className="p-8">Loading tour...</div>;
  }

  const virtualTourContent = content.virtualTourPage;

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {virtualTourContent.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {virtualTourContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {virtualTourContent.views.map((view) => (
              <Card key={view.id} className="overflow-hidden shadow-lg">
                <CardHeader className="flex-row items-center gap-4">
                  {getIcon(view.icon)}
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
                        title={`Google Maps view of ${view.title}`}
                    ></iframe>
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href="https://maps.app.goo.gl/y7GEcpwLcAP2nYKR9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      Open in Google Maps →
                    </a>
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
