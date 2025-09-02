
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
  academics: {
    title: string;
    subtitle: string;
    programs: {
      title: string;
      description: string;
      icon: string;
      image: {
        src: string;
        hint: string;
      };
    }[];
  };
  admission: {
    title: string;
    subtitle: string;
    ageCriteria: {
      class: string;
      age: string;
    }[];
    feeStructure: {
      class: string;
      fee: string;
    }[];
    documentsRequired: string[];
    enquiryFormUrl: string;
  };
  faculty: {
    title: string;
    subtitle: string;
    members: {
      name: string;
      title: string;
      image: {
        src: string;
        hint: string;
      };
      email: string;
      phone: string;
      about: string;
      experience: {
        year: string;
        title: string;
        company: string;
        description: string;
      }[];
    }[];
  };
  infrastructure: {
    title: string;
    subtitle: string;
    facilities: {
      name: string;
      description: string;
      icon: string;
      image: {
        src: string;
        hint: string;
      };
    }[];
  };
  studentLife: {
    title: string;
    subtitle: string;
    hero: {
      image: {
        src: string;
        hint: string;
      };
    };
    activities: {
      name: string;
      description: string;
      icon: string;
      image: {
        src: string;
        hint: string;
      };
    }[];
  };
  library: {
    title: string;
    subtitle: string;
    hero: {
      image: {
        src: string;
        alt: string;
        hint: string;
      };
    };
    stats: {
      icon: string;
      value: string;
      label: string;
    }[];
    catalog: {
      title: string;
      description: string;
      cta: {
        text: string;
        href: string;
      };
    };
  };
  campus: {
    title: string;
    subtitle: string;
    features: {
      name: string;
      description: string;
      icon: string;
      image: {
        src: string;
        hint: string;
      };
    }[];
  };
  virtualTourPage: {
    title: string;
    subtitle: string;
    views: {
      title: string;
      id: string;
      icon: string;
      embedUrl: string;
    }[];
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
