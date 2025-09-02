import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Clock, Globe, Search } from "lucide-react";
import Link from "next/link";
import { getContent } from "@/lib/content-loader";

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'Book': return <Book className="h-10 w-10 text-primary" />;
        case 'Globe': return <Globe className="h-10 w-10 text-primary" />;
        case 'Clock': return <Clock className="h-10 w-10 text-primary" />;
        default: return null;
    }
}

export default async function LibraryPage() {
  const content = await getContent();
  const libraryContent = content.library;

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center">
        <Image 
          src={libraryContent.hero.image.src}
          alt={libraryContent.hero.image.alt}
          fill
          style={{objectFit: 'cover'}}
          className="z-0"
          data-ai-hint={libraryContent.hero.image.hint}
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" dangerouslySetInnerHTML={{ __html: libraryContent.title }}>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {libraryContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mb-16">
            {libraryContent.stats.map((stat, index) => (
              <Card key={index} className="pt-6 shadow-lg">
                <CardHeader className="p-0">
                  <div className="flex justify-center mb-4">{getIcon(stat.icon)}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-md text-muted-foreground mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">{libraryContent.catalog.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 text-center">
              <p className="max-w-xl text-muted-foreground">
                {libraryContent.catalog.description}
              </p>
              <Button asChild size="lg">
                <Link href={libraryContent.catalog.cta.href}>
                  <Search className="mr-2 h-5 w-5" />
                  {libraryContent.catalog.cta.text}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
