
'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import type { IContent } from "@/lib/content";
import { BlogCard } from "@/components/blog-card";

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
            {allPosts.map((item, index) => (
               <BlogCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
