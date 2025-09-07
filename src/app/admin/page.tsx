

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { IContent } from '@/lib/content';
import { saveContent } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';


export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState<IContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = sessionStorage.getItem('isAdmin');
      if (isAdmin === 'true') {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated, toast]);

  const handleInputChange = (path: string, value: any) => {
    if (!content) return;

    const newContent = JSON.parse(JSON.stringify(content));
    let current: any = newContent;
    const keys = path.split('.');

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        let nextKey: string | number = keys[i + 1];

        if (!isNaN(parseInt(key, 10))) {
            current = current[parseInt(key, 10)];
        } else {
            if (!current[key]) {
                if (!isNaN(parseInt(String(nextKey), 10))) {
                    current[key] = [];
                } else {
                    current[key] = {};
                }
            }
            current = current[key];
        }
    }
    
    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current) && !isNaN(parseInt(lastKey, 10))) {
        current[parseInt(lastKey, 10)] = value;
    } else {
        current[lastKey] = value;
    }
    
    setContent(newContent);
  };

  const handleArrayAction = (path: string, action: 'add' | 'remove', index?: number, newItem?: any) => {
    if (!content) return;

    const newContent = JSON.parse(JSON.stringify(content));
    let current = newContent;

    const keys = path.split('.');
    const parentPath = keys.slice(0, -1);
    const arrayKey = keys[keys.length - 1];

    let parent = newContent;
    parentPath.forEach(key => {
        if (!isNaN(parseInt(key, 10))) {
            parent = parent[parseInt(key, 10)];
        } else {
            parent = parent[key];
        }
    });

    if (action === 'add' && newItem) {
        parent[arrayKey].push(newItem);
    } else if (action === 'remove' && index !== undefined) {
        parent[arrayKey].splice(index, 1);
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

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }
  
  if (isLoading) {
    return <div className="p-8">Loading Content...</div>;
  }
  
  if (!content) {
    return <div className="p-8">Could not load content.</div>;
  }
    
  const newFacultyMemberTemplate = {
      name: "New Faculty Member",
      title: "Title/Position",
      image: { src: "https://picsum.photos/400/500?random=99", hint: "person portrait" },
      email: "new.member@example.com",
      phone: "+91 00000 00000",
      about: "A brief bio about the new faculty member.",
      experience: [
        { year: "2024", title: "Job Title", company: "Company Name", description: "Description of experience." }
      ]
  };

  const newPopupSlideTemplate = {
    type: "image",
    title: "New Slide Title",
    subtitle: "New Slide Subtitle",
    description: "New slide description.",
    image: { src: "https://picsum.photos/1200/800?random=999", alt: "New Slide Image", hint: "slide image" }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-background shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold">Admin Panel</h1>
             <Button onClick={handleSave}>Save Changes</Button>
          </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
        
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Global Settings</AccordionTrigger>
             <AccordionContent>
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
             </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-branding">
            <AccordionTrigger className="text-xl font-semibold">Branding</AccordionTrigger>
             <AccordionContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Branding</CardTitle>
                        <CardDescription>Manage your site logo and favicon.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="logoText">Logo Text</Label>
                            <Input
                              id="logoText"
                              value={content.branding.logoText}
                              onChange={(e) => handleInputChange('branding.logoText', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logoUrl">Logo URL</Label>
                             <CardDescription>Recommended size: 160x40 pixels</CardDescription>
                            <Input
                              id="logoUrl"
                              value={content.branding.logoUrl}
                              onChange={(e) => handleInputChange('branding.logoUrl', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="faviconUrl">Favicon URL</Label>
                            <CardDescription>Recommended size: 32x32 pixels (.ico or .png)</CardDescription>
                            <Input
                              id="faviconUrl"
                              value={content.branding.faviconUrl}
                              onChange={(e) => handleInputChange('branding.faviconUrl', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
             </AccordionContent>
          </AccordionItem>

           <AccordionItem value="item-popup">
                <AccordionTrigger className="text-xl font-semibold">Welcome Popup</AccordionTrigger>
                <AccordionContent>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Manage Welcome Popup</CardTitle>
                                <CardDescription>Edit the slides and fee structure for the welcome popup.</CardDescription>
                            </div>
                            <Button onClick={() => handleArrayAction('welcomePopup.slides', 'add', undefined, newPopupSlideTemplate)}>
                                Add New Slide
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {content.welcomePopup.slides.map((slide, index) => (
                                <Accordion key={index} type="single" collapsible className="p-4 border rounded-md">
                                    <AccordionItem value={`slide-${index}`}>
                                        <AccordionTrigger className="font-semibold flex justify-between items-center w-full">
                                            <span>Slide {index + 1}: {slide.title}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-4">
                                            <div className="flex justify-end">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" />Remove Slide</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>This will permanently delete this slide.</AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleArrayAction('welcomePopup.slides', 'remove', index)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Type</Label>
                                                <Select
                                                    value={slide.type}
                                                    onValueChange={(value) => handleInputChange(`welcomePopup.slides.${index}.type`, value)}
                                                >
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="image">Image Background</SelectItem>
                                                        <SelectItem value="table">Fee Structure Table</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input value={slide.title} onChange={(e) => handleInputChange(`welcomePopup.slides.${index}.title`, e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Subtitle</Label>
                                                <Input value={slide.subtitle} onChange={(e) => handleInputChange(`welcomePopup.slides.${index}.subtitle`, e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Description</Label>
                                                <Textarea value={slide.description} onChange={(e) => handleInputChange(`welcomePopup.slides.${index}.description`, e.target.value)} rows={3} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Image URL</Label>
                                                <Input value={slide.image.src} onChange={(e) => handleInputChange(`welcomePopup.slides.${index}.image.src`, e.target.value)} />
                                            </div>
                                             <div className="space-y-2">
                                                <Label>Image Alt Text</Label>
                                                <Input value={slide.image.alt} onChange={(e) => handleInputChange(`welcomePopup.slides.${index}.image.alt`, e.target.value)} />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}

                            <h3 className="font-semibold pt-4 text-lg">Fee Structure Table</h3>
                            {content.welcomePopup.feeStructure.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center p-2 border rounded-md">
                                    <Input className="flex-1" placeholder="Class" value={item.class} onChange={(e) => handleInputChange(`welcomePopup.feeStructure.${index}.class`, e.target.value)} />
                                    <Input className="flex-1" placeholder="Fee" value={item.fee} onChange={(e) => handleInputChange(`welcomePopup.feeStructure.${index}.fee`, e.target.value)} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>
          
          <AccordionItem value="item-about">
            <AccordionTrigger className="text-xl font-semibold">About Pages</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Our Aspiration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Title</Label>
                            <Input value={content.about.ourAspiration.title} onChange={(e) => handleInputChange('about.ourAspiration.title', e.target.value)} />
                            <Label>Content</Label>
                            <Textarea
                                value={content.about.ourAspiration.content.join('\n\n')}
                                onChange={(e) => handleInputChange('about.ourAspiration.content', e.target.value.split('\n\n'))}
                                rows={5}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>About The School</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Title</Label>
                            <Input value={content.about.aboutUs.title} onChange={(e) => handleInputChange('about.aboutUs.title', e.target.value)} />
                            <Label>Content</Label>
                            <Textarea
                                value={content.about.aboutUs.content.join('\n\n')}
                                onChange={(e) => handleInputChange('about.aboutUs.content', e.target.value.split('\n\n'))}
                                rows={5}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Philosophy</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Title</Label>
                            <Input value={content.about.philosophy.title} onChange={(e) => handleInputChange('about.philosophy.title', e.target.value)} />
                            <Label>Content</Label>
                            <Textarea
                                value={content.about.philosophy.content.join('\n\n')}
                                onChange={(e) => handleInputChange('about.philosophy.content', e.target.value.split('\n\n'))}
                                rows={5}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Our Motto</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Title</Label>
                            <Input value={content.about.ourMotto.title} onChange={(e) => handleInputChange('about.ourMotto.title', e.target.value)} />
                            <Label>Content</Label>
                            <Textarea
                                value={content.about.ourMotto.content.join('\n\n')}
                                onChange={(e) => handleInputChange('about.ourMotto.content', e.target.value.split('\n\n'))}
                                rows={5}
                            />
                        </CardContent>
                    </Card>
                </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">Home Page</AccordionTrigger>
            <AccordionContent>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Hero Slider</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {content.home.heroSlider.slides.map((slide, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-2">
                                    <h3 className="font-semibold">Slide {index + 1}</h3>
                                    <Label>Title</Label>
                                    <Input value={slide.title} onChange={(e) => handleInputChange(`home.heroSlider.slides.${index}.title`, e.target.value)} />
                                    <Label>Subtitle</Label>
                                    <Input value={slide.subtitle} onChange={(e) => handleInputChange(`home.heroSlider.slides.${index}.subtitle`, e.target.value)} />
                                    <Label>Image URL</Label>
                                    <Input value={slide.image.src} onChange={(e) => handleInputChange(`home.heroSlider.slides.${index}.image.src`, e.target.value)} />
                                    <Label>Image Alt Text</Label>
                                    <Input value={slide.image.alt} onChange={(e) => handleInputChange(`home.heroSlider.slides.${index}.image.alt`, e.target.value)} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Scrolling Text</CardTitle></CardHeader>
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
                        <CardHeader><CardTitle>Highlights Section</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           {content.home.highlights.sliderImages.map((image, index) => (
                               <div key={index} className="p-2 border rounded-md">
                                   <h3 className="font-semibold">Highlight Image {index + 1}</h3>
                                   <Label>Image URL</Label>
                                   <Input value={image.src} onChange={(e) => handleInputChange(`home.highlights.sliderImages.${index}.src`, e.target.value)} />
                                   <Label>Image Alt Text</Label>
                                   <Input value={image.alt} onChange={(e) => handleInputChange(`home.highlights.sliderImages.${index}.alt`, e.target.value)} />
                               </div>
                           ))}
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
                        <CardHeader><CardTitle>Achievements Section</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Label>Title</Label>
                            <Input value={content.home.achievements.title} onChange={(e) => handleInputChange('home.achievements.title', e.target.value)} />
                            <Label>Description</Label>
                             <Textarea value={content.home.achievements.description} onChange={(e) => handleInputChange('home.achievements.description', e.target.value)} />
                           {content.home.achievements.videos.map((video, index) => (
                               <div key={index} className="p-4 border rounded-md space-y-2">
                                   <h3 className="font-semibold">Video {index + 1}</h3>
                                   <Label>Title</Label>
                                   <Input value={video.title} onChange={(e) => handleInputChange(`home.achievements.videos.${index}.title`, e.target.value)} />
                                   <Label>YouTube Video URL</Label>
                                   <Input type="url" value={video.id} onChange={(e) => handleInputChange(`home.achievements.videos.${index}.id`, e.target.value)} />
                               </div>
                           ))}
                       </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>Virtual Tour Section</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.home.virtualTour.title} onChange={(e) => handleInputChange('home.virtualTour.title', e.target.value)} />
                            <Label>Description</Label>
                            <Textarea value={content.home.virtualTour.description} onChange={(e) => handleInputChange('home.virtualTour.description', e.target.value)} />
                            <Label>Button Text</Label>
                            <Input value={content.home.virtualTour.cta.text} onChange={(e) => handleInputChange('home.virtualTour.cta.text', e.target.value)} />
                            <Label>Image URL</Label>
                            <Input value={content.home.virtualTour.image.src} onChange={(e) => handleInputChange('home.virtualTour.image.src', e.target.value)} />
                             <Label>Image Alt Text</Label>
                            <Input value={content.home.virtualTour.image.alt} onChange={(e) => handleInputChange('home.virtualTour.image.alt', e.target.value)} />
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><CardTitle>Rising Stars Section</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {content.home.risingStars.stars.map((star, index) => (
                                <div key={index} className="p-4 border rounded-md space-y-2">
                                    <h3 className="font-semibold">Star {index + 1}</h3>
                                    <Label>Name</Label>
                                    <Input value={star.name} onChange={(e) => handleInputChange(`home.risingStars.stars.${index}.name`, e.target.value)} />
                                    <Label>Achievement</Label>
                                    <Input value={star.achievement} onChange={(e) => handleInputChange(`home.risingStars.stars.${index}.achievement`, e.target.value)} />
                                    <Label>Image URL</Label>
                                    <Input value={star.image.src} onChange={(e) => handleInputChange(`home.risingStars.stars.${index}.image.src`, e.target.value)} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-news">
            <AccordionTrigger className="text-xl font-semibold">News &amp; Events (Blog)</AccordionTrigger>
            <AccordionContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Manage News &amp; Events</CardTitle>
                        <CardDescription>Edit the posts that appear on your blog and homepage.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {content.home.newsAndEvents.items.map((item, index) => (
                            <Accordion key={index} type="single" collapsible className="p-4 border rounded-md space-y-2">
                                <AccordionItem value={`news-${index}`}>
                                    <AccordionTrigger className="font-semibold">
                                        Item {index + 1}: {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Type</Label>
                                                <Select
                                                    value={item.type}
                                                    onValueChange={(value) => handleInputChange(`home.newsAndEvents.items.${index}.type`, value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="News">News</SelectItem>
                                                        <SelectItem value="Event">Event</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>URL Slug</Label>
                                                <Input value={item.slug} onChange={(e) => handleInputChange(`home.newsAndEvents.items.${index}.slug`, e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input value={item.title} onChange={(e) => handleInputChange(`home.newsAndEvents.items.${index}.title`, e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Short Description (for card)</Label>
                                            <Textarea value={item.description} onChange={(e) => handleInputChange(`home.newsAndEvents.items.${index}.description`, e.target.value)} rows={3} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Full Blog Content</Label>
                                            <Textarea value={item.content} onChange={(e) => handleInputChange(`home.newsAndEvents.items.${index}.content`, e.target.value)} rows={10} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Image URL</Label>
                                            <Input value={item.image.src} onChange={(e) => handleInputChange(`home.newsAndEvents.items.${index}.image.src`, e.target.value)} />
                                        </div>

                                        {item.type === 'Event' && (
                                            <div className="space-y-2">
                                                <Label>Google Form Embed URL (for events only)</Label>
                                                <Input value={item.googleFormUrl || ''} onChange={(e) => handleInputChange(`home.newsAndEvents.items.${index}.googleFormUrl`, e.target.value)} />
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold">Academics Page</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader><CardTitle>Academics Page</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Label>Title</Label>
                  <Input value={content.academics.title} onChange={(e) => handleInputChange('academics.title', e.target.value)} />
                  <Label>Subtitle</Label>
                  <Textarea value={content.academics.subtitle} onChange={(e) => handleInputChange('academics.subtitle', e.target.value)} />
                  {content.academics.programs.map((program, index) => (
                    <div key={index} className="p-4 border rounded-md space-y-2">
                        <h3 className="font-semibold">Program {index + 1}</h3>
                        <Label>Title</Label>
                        <Input value={program.title} onChange={(e) => handleInputChange(`academics.programs.${index}.title`, e.target.value)} />
                        <Label>Description</Label>
                        <Textarea value={program.description} onChange={(e) => handleInputChange(`academics.programs.${index}.description`, e.target.value)} />
                        <Label>Image URL</Label>
                        <Input value={program.image.src} onChange={(e) => handleInputChange(`academics.programs.${index}.image.src`, e.target.value)} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-semibold">Admission Page</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader><CardTitle>Admission Page</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Label>Title</Label>
                  <Input value={content.admission.title} onChange={(e) => handleInputChange('admission.title', e.target.value)} />
                  <Label>Subtitle</Label>
                  <Textarea value={content.admission.subtitle} onChange={(e) => handleInputChange('admission.subtitle', e.target.value)} />
                  
                  <h3 className="font-semibold pt-4">Age Criteria</h3>
                   {content.admission.ageCriteria.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center p-2 border rounded-md">
                        <Input className="flex-1" placeholder="Class" value={item.class} onChange={(e) => handleInputChange(`admission.ageCriteria.${index}.class`, e.target.value)} />
                        <Input className="flex-1" placeholder="Age" value={item.age} onChange={(e) => handleInputChange(`admission.ageCriteria.${index}.age`, e.target.value)} />
                    </div>
                  ))}

                  <h3 className="font-semibold pt-4">Fee Structure</h3>
                   {content.admission.feeStructure.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center p-2 border rounded-md">
                        <Input className="flex-1" placeholder="Class" value={item.class} onChange={(e) => handleInputChange(`admission.feeStructure.${index}.class`, e.target.value)} />
                        <Input className="flex-1" placeholder="Fee" value={item.fee} onChange={(e) => handleInputChange(`admission.feeStructure.${index}.fee`, e.target.value)} />
                    </div>
                  ))}

                  <h3 className="font-semibold pt-4">Documents Required</h3>
                   <Textarea
                        value={content.admission.documentsRequired.join('\n')}
                        onChange={(e) => handleInputChange('admission.documentsRequired', e.target.value.split('\n'))}
                        rows={5}
                        placeholder="Enter one document requirement per line."
                    />
                     <h3 className="font-semibold pt-4">Enquiry Form URL</h3>
                    <Input placeholder="Google Form Embed URL" value={content.admission.enquiryFormUrl} onChange={(e) => handleInputChange(`admission.enquiryFormUrl`, e.target.value)} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl font-semibold">Faculty Page</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Faculty Page</CardTitle>
                        <CardDescription>Manage your faculty members.</CardDescription>
                    </div>
                    <Button onClick={() => handleArrayAction('faculty.members', 'add', undefined, newFacultyMemberTemplate)}>
                        Add New Member
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Title</Label>
                  <Input value={content.faculty.title} onChange={(e) => handleInputChange('faculty.title', e.target.value)} />
                  <Label>Subtitle</Label>
                  <Textarea value={content.faculty.subtitle} onChange={(e) => handleInputChange('faculty.subtitle', e.target.value)} />
                  {content.faculty.members.map((member, memberIndex) => (
                    <Accordion key={memberIndex} type="single" collapsible className="p-4 border rounded-md space-y-2">
                       <AccordionItem value={`faculty-${memberIndex}`}>
                        <AccordionTrigger className="font-semibold flex justify-between items-center w-full">
                          <span>Faculty Member: {member.name}</span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2">
                           <div className="flex justify-end">
                               <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Remove
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete this faculty member.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleArrayAction('faculty.members', 'remove', memberIndex)}>
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                           </div>
                           <Label>Name</Label>
                           <Input value={member.name} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.name`, e.target.value)} />
                           <Label>Title</Label>
                           <Input value={member.title} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.title`, e.target.value)} />
                           <Label>Email</Label>
                           <Input type="email" value={member.email} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.email`, e.target.value)} />
                           <Label>Phone</Label>
                           <Input value={member.phone} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.phone`, e.target.value)} />
                           <Label>About</Label>
                           <Textarea value={member.about} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.about`, e.target.value)} rows={4}/>
                            <Label>Image URL</Label>
                           <Input value={member.image.src} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.image.src`, e.target.value)} />
                           
                           <h4 className="font-semibold pt-2">Experience</h4>
                           {member.experience.map((exp, expIndex) => (
                               <div key={expIndex} className="p-2 border rounded-md space-y-1">
                                    <Label>Year</Label>
                                    <Input value={exp.year} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.experience.${expIndex}.year`, e.target.value)} />
                                    <Label>Title</Label>
                                    <Input value={exp.title} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.experience.${expIndex}.title`, e.target.value)} />
                                    <Label>Company</Label>
                                    <Input value={exp.company} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.experience.${expIndex}.company`, e.target.value)} />
                                    <Label>Description</Label>
                                    <Input value={exp.description} onChange={(e) => handleInputChange(`faculty.members.${memberIndex}.experience.${expIndex}.description`, e.target.value)} />
                               </div>
                           ))}
                        </AccordionContent>
                       </AccordionItem>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-xl font-semibold">Infrastructure Page</AccordionTrigger>
            <AccordionContent>
                <Card>
                  <CardHeader><CardTitle>Infrastructure Page</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Title</Label>
                    <Input value={content.infrastructure.title} onChange={(e) => handleInputChange('infrastructure.title', e.target.value)} />
                    <Label>Subtitle</Label>
                    <Textarea value={content.infrastructure.subtitle} onChange={(e) => handleInputChange('infrastructure.subtitle', e.target.value)} />
                     {content.infrastructure.facilities.map((facility, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-2">
                            <h3 className="font-semibold">Facility {index + 1}</h3>
                            <Label>Name</Label>
                            <Input value={facility.name} onChange={(e) => handleInputChange(`infrastructure.facilities.${index}.name`, e.target.value)} />
                            <Label>Description</Label>
                            <Textarea value={facility.description} onChange={(e) => handleInputChange(`infrastructure.facilities.${index}.description`, e.target.value)} />
                             <Label>Image URL</Label>
                            <Input value={facility.image.src} onChange={(e) => handleInputChange(`infrastructure.facilities.${index}.image.src`, e.target.value)} />
                        </div>
                     ))}
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-xl font-semibold">Student Life Page</AccordionTrigger>
            <AccordionContent>
                <Card>
                  <CardHeader><CardTitle>Student Life Page</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Title</Label>
                    <Input value={content.studentLife.title} onChange={(e) => handleInputChange('studentLife.title', e.target.value)} />
                    <Label>Subtitle</Label>
                    <Textarea value={content.studentLife.subtitle} onChange={(e) => handleInputChange('studentLife.subtitle', e.target.value)} />
                    <Label>Hero Image URL</Label>
                    <Input value={content.studentLife.hero.image.src} onChange={(e) => handleInputChange('studentLife.hero.image.src', e.target.value)} />

                     {content.studentLife.activities.map((activity, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-2">
                            <h3 className="font-semibold">Activity {index + 1}</h3>
                            <Label>Name</Label>
                            <Input value={activity.name} onChange={(e) => handleInputChange(`studentLife.activities.${index}.name`, e.target.value)} />
                            <Label>Description</Label>
                            <Textarea value={activity.description} onChange={(e) => handleInputChange(`studentLife.activities.${index}.description`, e.target.value)} />
                            <Label>Image URL</Label>
                            <Input value={activity.image.src} onChange={(e) => handleInputChange(`studentLife.activities.${index}.image.src`, e.target.value)} />
                        </div>
                     ))}
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-xl font-semibold">Library Page</AccordionTrigger>
            <AccordionContent>
                <Card>
                  <CardHeader><CardTitle>Library Page</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Title</Label>
                    <Input value={content.library.title} onChange={(e) => handleInputChange('library.title', e.target.value)} />
                    <Label>Subtitle</Label>
                    <Textarea value={content.library.subtitle} onChange={(e) => handleInputChange('library.subtitle', e.target.value)} />
                    <Label>Hero Image URL</Label>
                    <Input value={content.library.hero.image.src} onChange={(e) => handleInputChange('library.hero.image.src', e.target.value)} />
                    <Label>Hero Image Alt Text</Label>
                    <Input value={content.library.hero.image.alt} onChange={(e) => handleInputChange('library.hero.image.alt', e.target.value)} />

                     {content.library.stats.map((stat, index) => (
                        <div key={index} className="p-2 border rounded-md">
                           <Label>Stat {index+1} Label</Label>
                           <Input value={stat.label} onChange={(e) => handleInputChange(`library.stats.${index}.label`, e.target.value)} />
                           <Label>Stat {index+1} Value</Label>
                           <Input value={stat.value} onChange={(e) => handleInputChange(`library.stats.${index}.value`, e.target.value)} />
                       </div>
                     ))}
                     <h3 className="font-semibold pt-4">Catalog Section</h3>
                     <Label>Title</Label>
                     <Input value={content.library.catalog.title} onChange={(e) => handleInputChange('library.catalog.title', e.target.value)} />
                     <Label>Description</Label>
                     <Textarea value={content.library.catalog.description} onChange={(e) => handleInputChange('library.catalog.description', e.target.value)} />
                     <Label>Button Text</Label>
                     <Input value={content.library.catalog.cta.text} onChange={(e) => handleInputChange('library.catalog.cta.text', e.target.value)} />
                     <Label>Button Link</Label>
                     <Input value={content.library.catalog.cta.href} onChange={(e) => handleInputChange('library.catalog.cta.href', e.target.value)} />
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="text-xl font-semibold">Campus Page</AccordionTrigger>
            <AccordionContent>
                <Card>
                  <CardHeader><CardTitle>Campus Page</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Title</Label>
                    <Input value={content.campus.title} onChange={(e) => handleInputChange('campus.title', e.target.value)} />
                    <Label>Subtitle</Label>
                    <Textarea value={content.campus.subtitle} onChange={(e) => handleInputChange('campus.subtitle', e.target.value)} />
                     {content.campus.features.map((feature, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-2">
                            <h3 className="font-semibold">Feature {index + 1}</h3>
                            <Label>Name</Label>
                            <Input value={feature.name} onChange={(e) => handleInputChange(`campus.features.${index}.name`, e.target.value)} />
                            <Label>Description</Label>
                            <Textarea value={feature.description} onChange={(e) => handleInputChange(`campus.features.${index}.description`, e.target.value)} />
                            <Label>Image URL</Label>
                            <Input value={feature.image.src} onChange={(e) => handleInputChange(`campus.features.${index}.image.src`, e.target.value)} />
                        </div>
                     ))}
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="text-xl font-semibold">Virtual Tour Page</AccordionTrigger>
            <AccordionContent>
                <Card>
                  <CardHeader><CardTitle>Virtual Tour Page</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Title</Label>
                    <Input value={content.virtualTourPage.title} onChange={(e) => handleInputChange('virtualTourPage.title', e.target.value)} />
                    <Label>Subtitle</Label>
                    <Textarea value={content.virtualTourPage.subtitle} onChange={(e) => handleInputChange('virtualTourPage.subtitle', e.target.value)} />
                     {content.virtualTourPage.views.map((view, index) => (
                        <div key={index} className="p-4 border rounded-md space-y-2">
                            <h3 className="font-semibold">View {index + 1}: {view.title}</h3>
                            <Label>Title</Label>
                            <Input value={view.title} onChange={(e) => handleInputChange(`virtualTourPage.views.${index}.title`, e.target.value)} />
                            <Label>Embed URL (Google Maps)</Label>
                            <Input value={view.embedUrl} onChange={(e) => handleInputChange(`virtualTourPage.views.${index}.embedUrl`, e.target.value)} />
                        </div>
                     ))}
                  </CardContent>
                </Card>
            </AccordionContent>
          </AccordionItem>
          
           <AccordionItem value="item-11">
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
