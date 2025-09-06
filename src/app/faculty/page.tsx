
'use client';

import Image from 'next/image';
import { Mail, Phone, Briefcase, User, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { IContent } from '@/lib/content';


// New FacultyCard component
const FacultyCard = ({ faculty }: { faculty: any }) => {
  const [activeSection, setActiveSection] = useState('about');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const isActive = activeSection !== 'about';

  return (
    <div
      className={cn(
        'card max-w-sm mx-auto relative z-10 bg-card flex flex-col rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden'
      )}
    >
      <div
        className={cn(
          'card-header relative flex shrink-0 w-full transition-all duration-300 ease-in-out',
          isActive ? 'h-20' : 'h-56'
        )}
      >
        <div
          className="card-cover w-full h-full absolute left-0 bg-cover bg-center filter blur-xl scale-125 transition-all duration-500 ease-in-out"
          style={{ backgroundImage: `url(${faculty.image.src})`, top: '0' }}
        />
        <Image
          className={cn(
            'card-avatar object-cover object-center absolute left-1/2 shadow-lg rounded-full transition-all duration-300 ease-in-out',
            isActive
              ? 'w-[50px] h-[50px] bottom-2.5 left-5 transform-none'
              : 'w-40 h-40 bottom-0 transform -translate-x-1/2 -translate-y-[120px]'
          )}
          src={faculty.image.src}
          alt={`Photo of ${faculty.name}`}
          width={160}
          height={160}
          data-ai-hint={faculty.image.hint}
        />
        <h1
          className={cn(
            'card-fullname absolute font-bold text-white whitespace-nowrap transition-all duration-300 ease-in-out',
            isActive
              ? 'bottom-[34px] left-[86px] text-lg transform-none'
              : 'bottom-0 left-1/2 text-2xl transform -translate-x-1/2 -translate-y-2.5'
          )}
        >
          {faculty.name}
        </h1>
      </div>
      <div className="card-main relative flex-1 flex flex-col pt-2.5">
        <div
          className={cn(
            'card-section p-5',
            activeSection === 'about' ? 'block animate-fadeIn' : 'hidden'
          )}
        >
          <div className="card-subtitle font-bold text-sm mb-2 text-card-foreground">ABOUT</div>
           <p className="card-jobtitle text-sm text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
            {faculty.title}
          </p>
          <p className="card-desc text-sm text-muted-foreground leading-relaxed">
            {faculty.about}
          </p>
          <div className="mt-5 space-y-4">
             <div className="card-contact flex items-center text-sm text-muted-foreground">
                <Mail className="shrink-0 w-7 h-7 mr-3 pr-3 border-r border-border" />
                 <a href={`mailto:${faculty.email}`} className="hover:text-primary break-all">{faculty.email}</a>
             </div>
             <div className="card-contact flex items-center text-sm text-muted-foreground">
                <Phone className="shrink-0 w-7 h-7 mr-3 pr-3 border-r border-border" />
                <a href={`tel:${faculty.phone.replace(/\s/g, '')}`} className="hover:text-primary">{faculty.phone}</a>
             </div>
          </div>
        </div>

        <div
          className={cn(
            'card-section p-5',
            activeSection === 'experience' ? 'block animate-fadeIn' : 'hidden'
          )}
        >
          <div className="card-subtitle font-bold text-sm mb-2 text-card-foreground">WORK EXPERIENCE</div>
           <div className="card-timeline mt-7 relative">
             <div className="absolute top-0 w-0.5 h-full bg-gradient-to-t from-transparent via-primary/50 to-primary" style={{left: '2.625rem'}}></div>
             {faculty.experience.map((item: any, index: number) => (
                <div key={index} className="card-item relative pl-16 pb-7 z-10" data-year={item.year}>
                   <div className="absolute top-[3px] left-[37px] w-4 h-4 rounded-full border-2 border-card bg-primary z-10"></div>
                   <div className="font-medium text-sm mb-1">{item.title} at <span className="font-bold">{item.company}</span></div>
                   <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
             ))}
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
            onClick={() => handleSectionChange('about')}
            className={cn(
              'flex-1 text-sm py-4 px-1.5 cursor-pointer text-muted-foreground transition-all duration-300 font-medium border-b-2 border-transparent focus:outline-none',
              activeSection === 'about' && 'text-primary font-semibold border-primary bg-primary/10'
            )}
          >
            ABOUT
          </button>
          <button
            onClick={() => handleSectionChange('experience')}
            className={cn(
              'flex-1 text-sm py-4 px-1.5 cursor-pointer text-muted-foreground transition-all duration-300 font-medium border-b-2 border-transparent focus:outline-none',
              activeSection === 'experience' && 'text-primary font-semibold border-primary bg-primary/10'
            )}
          >
            EXPERIENCE
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
        setContent(data.faculty);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !content) {
    return <div className="p-8">Loading faculty...</div>;
  }

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {content.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.members.map((member, index) => (
              <FacultyCard key={index} faculty={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
