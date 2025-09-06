
import { ReactNode } from 'react';
import Link from 'next/link';
import { getContent } from '@/lib/content-loader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ParticleCanvas } from '@/components/particle-canvas';

const aboutLinks = [
    { href: "/about/our-aspiration", label: "Our Aspiration" },
    { href: "/about/about-us", label: "About The School" },
    { href: "/about/philosophy", label: "Philosophy" },
    { href: "/about/our-motto", label: "Our Motto" },
];

export default async function AboutLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-background">
             <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
                <ParticleCanvas />
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    About Us
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Learn more about our mission, vision, and values.
                </p>
                </div>
            </section>

            <section className="py-12 lg:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <aside className="md:col-span-1">
                            <Card>
                                <CardContent className="p-4">
                                    <nav className="flex flex-col gap-2">
                                        {aboutLinks.map(link => (
                                            <Button key={link.href} variant="ghost" asChild className="justify-start">
                                                 <Link href={link.href} >
                                                    {link.label}
                                                </Link>
                                            </Button>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>
                        </aside>
                        <main className="md:col-span-3">
                            {children}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}
