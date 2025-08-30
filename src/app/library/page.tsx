import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Clock, Globe, Search } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
  const stats = [
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      value: "100,000+",
      label: "Books & Volumes",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      value: "5,000+",
      label: "E-Journals",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      value: "24/7",
      label: "Digital Access",
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center">
        <Image 
          src="https://picsum.photos/1920/1080?random=80" 
          alt="Library Interior" 
          fill
          objectFit="cover" 
          className="z-0"
          data-ai-hint="library interior"
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            The Knowledge <span className="text-primary">Center</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            A gateway to a world of information, resources, and collaborative learning.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="pt-6 shadow-lg">
                <CardHeader className="p-0">
                  <div className="flex justify-center mb-4">{stat.icon}</div>
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
              <CardTitle className="text-2xl md:text-3xl">Search Our Catalog</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 text-center">
              <p className="max-w-xl text-muted-foreground">
                Access our online public access catalog (OPAC) to search for books, journals, and other materials available in the library.
              </p>
              <Button asChild size="lg">
                <Link href="#">
                  <Search className="mr-2 h-5 w-5" />
                  Search Now
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
