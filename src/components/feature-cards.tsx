import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IContent } from "@/lib/content";

type FeatureCardsProps = {
  content: IContent['home']['featureCards'];
};

export function FeatureCards({ content }: FeatureCardsProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium italic leading-relaxed">
            {content.subtitle}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="mx-4 p-2 rounded-full bg-primary/10">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.cards.map((card, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-transparent hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="absolute inset-[2px] bg-white dark:bg-slate-800 rounded-[6px] z-10" />
              
              <CardContent className="relative z-20 p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="relative w-full h-48 group-hover:scale-110 transition-transform duration-700 ease-out">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-500"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {card.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 transition-all duration-700 ease-out rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/30 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
