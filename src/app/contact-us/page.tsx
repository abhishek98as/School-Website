'use client';

import { getContent } from "@/lib/content-loader";
import { ParticleCanvas } from "@/components/particle-canvas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { IContent } from "@/lib/content";
import { getEmbeddableFormUrl } from "@/lib/google-forms";

export default function ContactUsPage() {
  const [content, setContent] = useState<IContent | null>(null);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const fetchedContent = await response.json();
        setContent(fetchedContent);
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    };
    
    fetchContent();
  }, []);

  if (!content) {
    return <div className="p-8">Loading...</div>;
  }

  const contactUsContent = content.contactUs;

  if (!contactUsContent) {
    return (
      <div className="bg-background">
        <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Contact Us
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Content is being loaded. Please refresh the page.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Process the Google Form URL to make it embeddable
  const embeddableFormUrl = getEmbeddableFormUrl(contactUsContent.googleFormUrl);

  return (
    <div className="bg-background">
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center">
        <Image 
          src={contactUsContent.hero.image.src}
          alt={contactUsContent.hero.image.alt}
          fill
          style={{objectFit: 'cover'}}
          className="z-0"
          data-ai-hint={contactUsContent.hero.image.hint}
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {contactUsContent.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            {contactUsContent.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {contactUsContent.description}
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full min-h-[600px]">
                  {iframeError ? (
                    <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                      <div className="text-center p-8">
                        <h3 className="text-lg font-semibold mb-2">Contact Form</h3>
                        <p className="text-gray-600 mb-4">Click below to open our contact form</p>
                        <a 
                          href={contactUsContent.googleFormUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Open Contact Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <iframe 
                      src={embeddableFormUrl}
                      width="100%" 
                      height="600" 
                      frameBorder="0" 
                      marginHeight={0} 
                      marginWidth={0}
                      className="w-full rounded-md"
                      title="Contact Us Form"
                      onError={() => setIframeError(true)}
                    >
                      Loading contact form...
                    </iframe>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <a
                    href={contactUsContent.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    Open form in new tab →
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Visit Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{content.footer.reachUs.address}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Call Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{content.footer.reachUs.phone}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Email Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{content.footer.reachUs.email}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
