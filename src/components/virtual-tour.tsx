import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function VirtualTour() {
  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[300px] md:min-h-full">
              <Image
                src="https://picsum.photos/800/600?random=20"
                alt="360 view of campus"
                fill
                className="object-cover"
                data-ai-hint="college campus"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Explore Our Campus
              </h2>
              <p className="text-muted-foreground mb-6 max-w-prose mx-auto md:mx-0">
                Take a virtual tour and experience our state-of-the-art
                infrastructure, vibrant student life, and the serene environment
                of our sprawling 19-acre campus. See for yourself why we are
                one of the top choices for higher education.
              </p>
              <Button asChild size="lg" className="self-center md:self-start">
                <Link href="/virtual-tour">
                  View 360° Tour
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
