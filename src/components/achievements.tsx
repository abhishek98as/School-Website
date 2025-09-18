
import { Card, CardContent } from "@/components/ui/card";
import { IContent } from "@/lib/content";
import { getYouTubeId, getYouTubeEmbedUrl, isValidYouTubeUrl } from "@/lib/youtube-utils";

type AchievementsProps = {
  content: IContent['home']['achievements'];
};

export function Achievements({ content }: AchievementsProps) {
  // Debug: Log the content to see what we're working with
  console.log('Achievements content:', content);

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
          {content.videos && content.videos.length > 0 ? (
            content.videos.map((video, index) => {
              const videoId = getYouTubeId(video.id);
              console.log(`Processing video ${index}:`, { originalId: video.id, extractedId: videoId, title: video.title });
              
              if (!videoId) {
                console.warn('No valid video ID found for:', video.id);
                return (
                  <Card key={video.id || index} className="overflow-hidden shadow-lg bg-muted">
                    <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-muted-foreground text-sm mb-2">⚠️ Invalid YouTube URL</p>
                        <p className="text-xs text-muted-foreground">Please check the URL format</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-muted-foreground">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 break-all">URL: {video.id}</p>
                    </CardContent>
                  </Card>
                );
              }

              const embedUrl = getYouTubeEmbedUrl(video.id, {
                modestbranding: true,
                rel: false
              });

              return (
                <Card key={video.id || index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                      loading="lazy"
                      onError={(e) => console.error('YouTube iframe error:', e)}
                    ></iframe>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">ID: {videoId}</p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No achievement videos available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
