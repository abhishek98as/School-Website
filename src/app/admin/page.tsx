
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { IContent } from '@/lib/content';
import { saveContent } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<IContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/login');
    } else {
      const fetchContent = async () => {
        try {
          const response = await fetch('/api/content');
          if (!response.ok) {
            throw new Error('Failed to fetch content');
          }
          const data = await response.json();
          setContent(data);
        } catch (error) {
           toast({ variant: 'destructive', title: 'Error', description: 'Failed to load content.' });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchContent();
    }
  }, [router, toast]);

  const handleInputChange = (path: string, value: any) => {
    if (!content) return;
    
    // Create a deep copy to avoid direct state mutation
    const newContent = JSON.parse(JSON.stringify(content));
    let current: any = newContent;
    
    const keys = path.split('.');
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
            // If a key doesn't exist, create it. This is useful for nested objects.
            const nextKey = keys[i+1];
            current[key] = isNaN(parseInt(nextKey, 10)) ? {} : [];
        }
        if (Array.isArray(current)) {
            current = current[parseInt(key)];
        } else {
            current = current[key];
        }
    }
    
    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current)) {
        current[parseInt(lastKey)] = value;
    } else {
        current[lastKey] = value;
    }

    setContent(newContent);
  };
  
  const handleSave = async () => {
    if (!content) return;
    try {
      const result = await saveContent(content);
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Content saved successfully!',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save content.',
      });
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }
  
  if (!content) {
    return <div className="p-8">Could not load content.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-background shadow-sm">
          <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold">Admin Panel</h1>
             <Button onClick={handleSave}>Save Changes</Button>
          </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <ScrollArea className="h-[calc(100vh-10rem)]">
        <Card>
            <CardHeader>
                <CardTitle>Global Settings</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                    <Input
                      id="whatsappNumber"
                      value={content.global.whatsappNumber}
                      onChange={(e) => handleInputChange('global.whatsappNumber', e.target.value)}
                    />
                </div>
            </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full mt-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Home Page Content</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Slider</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {content.home.heroSlider.slides.map((slide, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-2">
                                    <h3 className="font-semibold">Slide {index + 1}</h3>
                                    <Label>Title</Label>
                                    <Input value={slide.title} onChange={(e) => handleInputChange(`home.heroSlider.slides.${index}.title`, e.target.value)} />
                                    <Label>Subtitle</Label>
                                    <Input value={slide.subtitle} onChange={(e) => handleInputChange(`home.heroSlider.slides.${index}.subtitle`, e.target.value)} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Scrolling Text</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>Announcements (comma-separated)</Label>
                            <Textarea
                                value={content.home.scrollingText.announcements.join(', ')}
                                onChange={(e) => handleInputChange('home.scrollingText.announcements', e.target.value.split(',').map(s => s.trim()))}
                                rows={3}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Highlights Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {content.home.highlights.stats.map((stat, index) => (
                                <div key={index} className="p-2 border rounded-md">
                                    <Label>Stat {index+1} Label</Label>
                                    <Input value={stat.label} onChange={(e) => handleInputChange(`home.highlights.stats.${index}.label`, e.target.value)} />
                                    <Label>Stat {index+1} Value</Label>
                                    <Input value={stat.value} onChange={(e) => handleInputChange(`home.highlights.stats.${index}.value`, e.target.value)} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Virtual Tour Section</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>Title</Label>
                            <Input value={content.home.virtualTour.title} onChange={(e) => handleInputChange('home.virtualTour.title', e.target.value)} />
                            <Label>Description</Label>
                            <Textarea value={content.home.virtualTour.description} onChange={(e) => handleInputChange('home.virtualTour.description', e.target.value)} />
                            <Label>Button Text</Label>
                            <Input value={content.home.virtualTour.cta.text} onChange={(e) => handleInputChange('home.virtualTour.cta.text', e.target.value)} />
                        </CardContent>
                    </Card>
                </div>
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">Footer Content</AccordionTrigger>
            <AccordionContent>
                <Card>
                    <CardHeader><CardTitle>Footer</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Label>College Name</Label>
                        <Input value={content.footer.collegeName} onChange={(e) => handleInputChange('footer.collegeName', e.target.value)} />
                        <Label>Slogan</Label>
                        <Input value={content.footer.slogan} onChange={(e) => handleInputChange('footer.slogan', e.target.value)} />
                        <Label>Address</Label>
                        <Input value={content.footer.reachUs.address} onChange={(e) => handleInputChange('footer.reachUs.address', e.target.value)} />
                        <Label>Phone</Label>
                        <Input value={content.footer.reachUs.phone} onChange={(e) => handleInputChange('footer.reachUs.phone', e.target.value)} />
                        <Label>Email</Label>
                        <Input value={content.footer.reachUs.email} onChange={(e) => handleInputChange('footer.reachUs.email', e.target.value)} />
                        <Label>Copyright</Label>
                        <Input value={content.footer.copyright} onChange={(e) => handleInputChange('footer.copyright', e.target.value)} />
                    </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </ScrollArea>
      </main>
    </div>
  );
}
