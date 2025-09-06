
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/content-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Newspaper } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  const content = await getContent();
  return content.home.newsAndEvents.items.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const content = await getContent();
  const post = content.home.newsAndEvents.items.find((p) => p.slug === params.slug);
  const otherPosts = content.home.newsAndEvents.items.filter((p) => p.slug !== params.slug).slice(0, 5);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Main Content */}
          <main className="lg:col-span-3">
            <article>
              <Card className="overflow-hidden">
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src={post.image.src}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    data-ai-hint={post.image.hint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <CardHeader>
                  <div className={`inline-block self-start px-3 py-1 rounded-full text-sm font-semibold text-white ${post.type === 'Event' ? 'bg-primary' : 'bg-secondary-foreground'}`}>
                    {post.type}
                  </div>
                  <CardTitle className="text-3xl md:text-4xl mt-4">{post.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    {post.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{post.location}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none text-base md:text-lg text-foreground/90 leading-relaxed">
                    {post.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {post.type === 'Event' && post.googleFormUrl && (
                    <div className="mt-12">
                      <Separator />
                      <div className="py-8">
                         <h2 className="text-2xl font-bold text-center mb-6">Register for this Event</h2>
                         <div className="aspect-w-16 aspect-h-9 min-h-[500px] border rounded-lg overflow-hidden">
                            <iframe
                                src={post.googleFormUrl}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                marginHeight={0}
                                marginWidth={0}
                                className="w-full h-full"
                            >
                                Loading…
                            </iframe>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-primary"/>
                    <span>Other Posts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {otherPosts.map((otherPost) => (
                    <li key={otherPost.slug}>
                      <Link href={`/blog/${otherPost.slug}`} className="group">
                        <p className="font-semibold group-hover:text-primary transition-colors">{otherPost.title}</p>
                        <p className="text-sm text-muted-foreground">{otherPost.date}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
