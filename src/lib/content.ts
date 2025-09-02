
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
  footer: {
    collegeName: string;
    slogan: string;
    quickLinks: {
      title: string;
      links: {
        href: string;
        label: string;
      }[];
    };
    reachUs: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    copyright: string;
  };
}
