
'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { IContent } from "@/lib/content";

export default function BlogIndexPage() {
  const [content, setContent] = useState<IContent | null>(null);

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
        console.error("Failed to load blog content:", error);
      }
    };
    
    fetchContent();
  }, []);

  if (!content) {
    // You can return a loading state here
    return (
        <div className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">News & Events</h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Loading posts...
                </p>
            </div>
      </div>
    );
  }

  const allPosts = [...content.home.newsAndEvents.items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="blog-index-bg">
        <style jsx>{`
            .blog-index-bg {
                background:
                    radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--primary) / 0.1), transparent),
                    radial-gradient(ellipse 80% 50% at 50% 120%, hsl(var(--secondary) / 0.1), transparent);
            }
            .blog-card {
                position: relative;
                border: 1px solid hsl(var(--border));
                background-color: hsl(var(--card));
                transition: all 0.3s ease-in-out;
            }
            .blog-card::before,
            .blog-card::after {
                content: '';
                position: absolute;
                inset: -1px;
                z-index: -1;
                background: conic-gradient(
                    from 90deg at 40% -25%,
                    hsl(var(--primary)),
                    hsl(var(--primary) / 0.8),
                    hsl(var(--secondary)),
                    hsl(var(--accent)),
                    hsl(var(--primary)),
                    hsl(var(--primary) / 0.8)
                );
                background-size: 200% 200%;
                border-radius: inherit;
                opacity: 0;
                transition: opacity 0.4s ease-in-out, animation 2s infinite linear;
            }
            .blog-card:hover::before {
                opacity: 1;
                animation: bg-spin 5s linear infinite;
            }

            @keyframes bg-spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}</style>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">News & Events</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest happenings, announcements, and stories from our vibrant community.
          </p>
        </div>
      </section>

      <section className="pb-12 lg:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="group block">
                <div className="blog-card h-full rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                        <Image
                            src={item.image.src}
                            alt={item.title}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={item.image.hint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <Badge
                            className={`absolute top-3 right-3 text-white border-0 ${item.type === 'Event' ? 'bg-primary' : 'bg-secondary-foreground'}`}
                            >
                            {item.type}
                        </Badge>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 h-16 transition-colors group-hover:text-primary">{item.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{item.date}</span>
                            </div>
                            {item.location && (
                                <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3 flex-grow">{item.description}</p>
                        <div className="mt-6 font-semibold text-primary flex items-center">
                            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
