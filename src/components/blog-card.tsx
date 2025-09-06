
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import type { IContent } from '@/lib/content';

type BlogCardProps = {
  item: IContent['home']['newsAndEvents']['items'][0];
  index: number;
};

export function BlogCard({ item, index }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (!cardRef.current || isAnimated) return;

    const card = cardRef.current;
    const computedStyle = getComputedStyle(card);
    const bgColor = computedStyle.backgroundColor;
    
    const fillLayer = document.createElement('div');
    
    const style = document.createElement('style');
    style.textContent = `
        .fill-layer-${index} {
            animation: fill-${index} 1s ease-in-out forwards;  
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: -1;
            background-color: ${bgColor};
        }

        @keyframes fill-${index} {
            0% {
                border-radius: 50%;
                transform: translateY(150%) translateX(150%) scale(2);
            }
            100% {
                border-radius: 0;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    fillLayer.classList.add(`fill-layer-${index}`);
    
    card.style.backgroundColor = 'transparent';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.style.zIndex = '1';

    const timeout = setTimeout(() => {
      card.appendChild(fillLayer);
      setIsAnimated(true);
    }, index * 200); // Stagger animation

    return () => {
        clearTimeout(timeout);
        document.head.removeChild(style);
        if (card.contains(fillLayer)) {
            card.removeChild(fillLayer);
        }
    };
  }, [index, isAnimated]);

  return (
    <Link href={`/blog/${item.slug}`} className="group block">
      <div ref={cardRef} className="blog-card h-full rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-border bg-card transition-all duration-300 ease-in-out">
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
  );
}
