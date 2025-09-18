
'use client';

import Image from 'next/image';
import { Phone, Briefcase, User, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { IContent } from '@/lib/content';
import { ParticleCanvas } from '@/components/particle-canvas';


// New FacultyCard component
const FacultyCard = ({ faculty }: { faculty: any }) => {
  return (
    <div
      className={cn(
        'card max-w-sm mx-auto relative z-10 bg-card flex flex-col rounded-lg shadow-lg transition-all duration-300 ease-in-out'
      )}
    >
      <div
        className={cn(
          'card-header relative flex shrink-0 w-full transition-all duration-300 ease-in-out h-56'
        )}
      >
        <div
          className="card-cover w-full h-full absolute left-0 bg-cover bg-center filter blur-xl scale-125 transition-all duration-500 ease-in-out"
          style={{ backgroundImage: `url(${faculty.image.src})` }}
        />
        <div className={cn(
          'absolute transition-all duration-300 ease-in-out bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-[70px]'
        )}>
            <Image
              className={cn(
                'card-avatar object-cover object-top shadow-lg rounded-full transition-all duration-300 ease-in-out w-40 h-40'
              )}
              src={faculty.image.src}
              alt={`Photo of ${faculty.name}`}
              width={160}
              height={160}
              data-ai-hint={faculty.image.hint}
            />
        </div>
        <h1
          className={cn(
            'card-fullname absolute font-bold text-white whitespace-nowrap transition-all duration-300 ease-in-out bottom-0 left-1/2 text-2xl transform -translate-x-1/2 -translate-y-2.5'
          )}
        >
          {faculty.name}
        </h1>
      </div>
      <div className="card-main relative flex-1 flex flex-col pt-2.5">
        <div className="card-section p-5 animate-fadeIn">
          <div className="card-subtitle font-bold text-sm mb-2 text-card-foreground">ABOUT</div>
           <p className="card-jobtitle text-sm text-muted-foreground uppercase tracking-wider font-semibold">
            {faculty.title}
          </p>
          <p className="card-desc text-sm text-muted-foreground leading-relaxed">
            {faculty.about}
          </p>
          <div className="mt-5 space-y-4">
             <div className="card-contact flex items-center text-sm text-muted-foreground">
                <Phone className="shrink-0 w-7 h-7 mr-3 pr-3 border-r border-border" />
                <a href={`tel:${faculty.phone.replace(/\s/g, '')}`} className="hover:text-primary">{faculty.phone}</a>
             </div>
          </div>
        </div>
        
        <div className="card-buttons flex bg-card mt-auto sticky bottom-0 left-0">
            <style jsx>{`
              .animate-fadeIn {
                animation: fadeIn 0.6s both;
              }
              @keyframes fadeIn {
                0% {
                  opacity: 0;
                  transform: translateY(40px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          <button
            className={cn(
              'w-full text-sm py-4 px-1.5 cursor-pointer text-primary font-semibold border-b-2 border-primary bg-primary/10 transition-all duration-300 focus:outline-none'
            )}
          >
            ABOUT
          </button>
        </div>
      </div>
    </div>
  );
};


export default function FacultyPage() {
  const [content, setContent] = useState<IContent['faculty'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        console.log('Faculty data loaded:', {
          totalMembers: data.faculty.members.length,
          memberNames: data.faculty.members.map((m: any) => m.name)
        });
        setContent(data.faculty);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading faculty data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !content) {
    return <div className="p-8">Loading faculty...</div>;
  }

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10 overflow-hidden">
        <ParticleCanvas />
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {content.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.subtitle}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Meet our {content.members.length} distinguished faculty members
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {content.members.map((member, index) => {
              console.log(`Rendering faculty member ${index + 1}: ${member.name}`);
              return <FacultyCard key={index} faculty={member} />;
            })}
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {content.members.length} out of {content.members.length} faculty members
          </div>
        </div>
      </section>
    </div>
  );
}
