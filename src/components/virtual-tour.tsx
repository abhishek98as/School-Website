import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { IContent } from "@/lib/content";

type VirtualTourProps = {
  content: IContent['home']['virtualTour']
}

export function VirtualTour({ content }: VirtualTourProps) {
  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[300px] md:min-h-full">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                className="object-cover"
                data-ai-hint={content.image.hint}
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {content.title}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-prose mx-auto md:mx-0">
                {content.description}
              </p>
              <Button asChild size="lg" className="self-center md:self-start">
                <Link href="/virtual-tour">
                  {content.cta.text}
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
