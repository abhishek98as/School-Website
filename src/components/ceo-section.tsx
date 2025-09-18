import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IContent } from "@/lib/content";

type CeoSectionProps = {
  content: IContent['home']['ceoSection'];
};

export function CeoSection({ content }: CeoSectionProps) {
  return (
    <section className="py-12 lg:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light italic leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* CEO Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {content.cards.map((card: any, index: number) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-none transition-all duration-500 animate-pulse group-hover:animate-none" />
              
              {/* Card content */}
              <Card className="relative h-full bg-card/95 backdrop-blur-sm rounded-2xl overflow-hidden border-0 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
                {/* Card image */}
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={card.image.hint}
                  />
                  
                  {/* Floating title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-white text-xl lg:text-2xl font-bold mb-1 drop-shadow-lg">
                      {card.name}
                    </h3>
                    <p className="text-white/90 text-sm lg:text-base font-medium drop-shadow-md">
                      {card.position}
                    </p>
                  </div>
                </div>

                {/* Card content */}
                <CardContent className="p-6 lg:p-8">
                  {/* Quote or description */}
                  <blockquote className="text-muted-foreground text-sm lg:text-base leading-relaxed italic mb-4 border-l-4 border-primary/50 pl-4">
                    "{card.description}"
                  </blockquote>
                  
                  {/* Achievements or highlights */}
                  {card.highlights && card.highlights.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-primary mb-3">Key Achievements</h4>
                      <ul className="space-y-1">
                        {card.highlights.map((highlight: string, idx: number) => (
                          <li key={idx} className="text-xs lg:text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
