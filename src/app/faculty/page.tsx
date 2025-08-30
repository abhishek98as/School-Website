import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function FacultyPage() {
  const faculty = [
    {
      name: "Dr. Evelyn Reed",
      title: "Professor, Computer Science",
      image: { src: "https://picsum.photos/400/400?random=101", hint: "female professor" },
      email: "e.reed@galgotiacollege.edu",
      phone: "+91 98765 43210",
    },
    {
      name: "Dr. Marcus Thorne",
      title: "Head of Mechanical Engineering",
      image: { src: "https://picsum.photos/400/400?random=102", hint: "male professor" },
      email: "m.thorne@galgotiacollege.edu",
      phone: "+91 98765 43211",
    },
    {
      name: "Dr. Elena Vance",
      title: "Associate Professor, Physics",
      image: { src: "https://picsum.photos/400/400?random=103", hint: "female professor" },
      email: "e.vance@galgotiacollege.edu",
      phone: "+91 98765 43212",
    },
    {
      name: "Dr. Julian Croft",
      title: "Professor, Business Administration",
      image: { src: "https://picsum.photos/400/400?random=104", hint: "male professor" },
      email: "j.croft@galgotiacollege.edu",
      phone: "+91 98765 43213",
    },
    {
      name: "Dr. Ananya Sharma",
      title: "Professor, Biotechnology",
      image: { src: "https://picsum.photos/400/400?random=105", hint: "female professor" },
      email: "a.sharma@galgotiacollege.edu",
      phone: "+91 98765 43214",
    },
    {
      name: "Dr. Rohan Gupta",
      title: "Head of Civil Engineering",
      image: { src: "https://picsum.photos/400/400?random=106", hint: "male professor" },
      email: "r.gupta@galgotiacollege.edu",
      phone: "+91 98765 43215",
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Our Esteemed <span className="text-primary">Faculty</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the brilliant minds and dedicated mentors who form the backbone of our institution.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image
                      src={member.image.src}
                      alt={`Photo of ${member.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={member.image.hint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium mt-1">{member.title}</CardDescription>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${member.email}`} className="hover:text-primary break-all">{member.email}</a>
                    </div>
                     <div className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
                         <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="hover:text-primary">{member.phone}</a>
                    </div>
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
