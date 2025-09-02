import fs from 'fs/promises';
import path from 'path';

export interface IContent {
  global: {
    whatsappNumber: string;
  };
  home: {
    heroSlider: {
      slides: {
        src: string;
        alt: string;
        hint: string;
        title: string;
        subtitle: string;
        cta: {
          text: string;
          href: string;
        };
      }[];
    };
    scrollingText: {
      announcements: string[];
    };
    highlights: {
      sliderImages: {
        src: string;
        alt: string;
        hint: string;
      }[];
      stats: {
        value: string;
        label: string;
      }[];
    };
    virtualTour: {
      image: {
        src: string;
        alt: string;
        hint: string;
      };
      title: string;
      description: string;
      cta: {
        text: string;
      };
    };
    achievements: {
      title: string;
      description: string;
      videos: {
        id: string;
        title: string;
      }[];
    };
    risingStars: {
      title: string;
      description: string;
      cta: {
        text: string;
      };
      stars: {
        name: string;
        achievement: string;
        src: string;
        hint: string;
      }[];
    };
    newsAndEvents: {
      title: string;
      description: string;
      items: {
        type: string;
        title: string;
        date: string;
        location?: string;
        description: string;
        image: {
          src: string;
          hint: string;
        };
      }[];
    };
  };
}

const contentPath = path.join(process.cwd(), 'src/lib/content.json');

export async function getContent(): Promise<IContent> {
  const fileContent = await fs.readFile(contentPath, 'utf8');
  return JSON.parse(fileContent);
}

export async function saveContent(content: IContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf8');
}
