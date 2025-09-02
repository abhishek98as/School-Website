import { Card, CardContent } from "@/components/ui/card";
import { IContent } from "@/lib/content";

type AchievementsProps = {
  content: IContent['home']['achievements'];
};

export function Achievements({ content }: AchievementsProps) {
  return (
    <section className="py-12 lg:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {content.title}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative w-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <CardContent className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">{video.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
