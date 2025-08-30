import { Card, CardContent } from "@/components/ui/card";

export function Achievements() {
  const videos = [
    {
      id: "dQw4w9WgXcQ",
      title: "Annual Cultural Fest Highlights",
    },
    {
      id: "3JZ_D3pSS4U",
      title: "Tech Symposium 2023 Recap",
    },
    {
      id: "C0DPdy98e4c",
      title: "Convocation Ceremony Moments",
    },
    {
      id: "L_LUpnjgPso",
      title: "Student Project Showcase",
    },
  ];

  return (
    <section className="py-12 lg:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-primary">Achievements</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Celebrating the milestones and successes of our students and faculty.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
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
