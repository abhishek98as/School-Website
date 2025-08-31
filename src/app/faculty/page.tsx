

'use client';

import Image from 'next/image';
import { Mail, Phone, Briefcase, User, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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
        'card max-w-sm mx-auto overflow-hidden relative z-10 bg-card flex flex-col rounded-lg shadow-lg transition-all duration-300 ease-in-out',
        activeSection === 'about' && 'h-[450px]',
        activeSection === 'experience' && 'h-[550px]',
        activeSection === 'contact' && 'h-[450px]'
      )}
    >
      <div
        className={cn(
          'card-header relative flex shrink-0 w-full transition-all duration-300 ease-in-out',
          isActive ? 'h-20' : 'h-52'
        )}
      >
        <div
          className="card-cover w-full h-full absolute top-0 left-0 bg-cover bg-center filter blur-xl scale-125 transition-all duration-500 ease-in-out"
          style={{ backgroundImage: `url(${faculty.image.src})` }}
        />
        <Image
          className={cn(
            'card-avatar object-cover object-center absolute left-1/2 shadow-lg rounded-full transition-all duration-300 ease-in-out',
            isActive
              ? 'w-[50px] h-[50px] bottom-2.5 left-5 transform-none'
              : 'w-24 h-24 bottom-0 transform -translate-x-1/2 translate-y-[-64px]'
          )}
          src={faculty.image.src}
          alt={`Photo of ${faculty.name}`}
          width={100}
          height={100}
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
        <h2
          className={cn(
            'card-jobtitle absolute whitespace-nowrap font-medium text-white/80 uppercase tracking-widest transition-all duration-300 ease-in-out',
            isActive
              ? 'bottom-4 left-[86px] text-[10px] letter-spacing-[1px] transform-none'
              : 'bottom-0 left-1/2 text-xs transform -translate-x-1/2 -translate-y-[7px]'
          )}
        >
          {faculty.title}
        </h2>
      </div>
      <div className="card-main relative flex-1 flex flex-col pt-2.5">
        <div
          className={cn(
            'card-section p-5',
            activeSection === 'about' ? 'block animate-fadeIn' : 'hidden'
          )}
        >
          <div className="card-subtitle font-bold text-sm mb-2 text-card-foreground">ABOUT</div>
          <p className="card-desc text-sm text-muted-foreground leading-relaxed">
            {faculty.about}
          </p>
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
                   <div className="absolute top-0 left-[37px] w-4 h-4 rounded-full border-2 border-card bg-primary z-10"></div>
                   <div className="font-medium text-sm mb-1">{item.title} at <span className="font-bold">{item.company}</span></div>
                   <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
             ))}
           </div>
        </div>

        <div
          className={cn(
            'card-section p-5',
            activeSection === 'contact' ? 'block animate-fadeIn' : 'hidden'
          )}
        >
          <div className="card-subtitle font-bold text-sm mb-2 text-card-foreground">CONTACT</div>
          <div className="mt-5 space-y-4">
             <div className="card-contact flex items-center text-sm text-muted-foreground">
                <Mail className="shrink-0 w-7 h-7 mr-3 pr-3 border-r border-border" />
                 <a href={`mailto:${faculty.email}`} className="hover:text-primary break-all">{faculty.email}</a>
             </div>
             <div className="card-contact flex items-center text-sm text-muted-foreground">
                <Phone className="shrink-0 w-7 h-7 mr-3 pr-3 border-r border-border" />
                <a href={`tel:${faculty.phone.replace(/\s/g, '')}`} className="hover:text-primary">{faculty.phone}</a>
             </div>
             <div className="card-contact flex items-center text-sm text-muted-foreground">
                 <MapPin className="shrink-0 w-7 h-7 mr-3 pr-3 border-r border-border" />
                 <span>Greater Noida, UP, India</span>
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
          <button
            onClick={() => handleSectionChange('contact')}
            className={cn(
              'flex-1 text-sm py-4 px-1.5 cursor-pointer text-muted-foreground transition-all duration-300 font-medium border-b-2 border-transparent focus:outline-none',
              activeSection === 'contact' && 'text-primary font-semibold border-primary bg-primary/10'
            )}
          >
            CONTACT
          </button>
        </div>
      </div>
    </div>
  );
};


export default function FacultyPage() {
  const faculty = [
    {
      name: "Dr. Evelyn Reed",
      title: "Professor, Computer Science",
      image: { src: "https://picsum.photos/400/400?random=101", hint: "female professor" },
      email: "e.reed@galgotiacollege.edu",
      phone: "+91 98765 43210",
      about: "Dr. Reed is an expert in artificial intelligence and machine learning, with over 15 years of experience in both academia and industry. Her research focuses on natural language processing.",
      experience: [
        { year: "2018", title: "Professor", company: "Galgametrics College", description: "Leading the AI research department."},
        { year: "2012", title: "Senior Scientist", company: "TechNova Inc.", description: "Developed cutting-edge NLP models."},
        { year: "2008", title: "Post-doc Researcher", company: "MIT", description: "Published foundational papers on neural networks."},
      ]
    },
    {
      name: "Dr. Marcus Thorne",
      title: "Head of Mechanical Engineering",
      image: { src: "https://picsum.photos/400/400?random=102", hint: "male professor" },
      email: "m.thorne@galgotiacollege.edu",
      phone: "+91 98765 43211",
      about: "Dr. Thorne specializes in robotics and mechatronics. He is passionate about building autonomous systems and has led multiple award-winning student projects.",
      experience: [
        { year: "2015", title: "Head of Department", company: "Galgametrics College", description: "Overseeing curriculum and research initiatives."},
        { year: "2010", title: "Associate Professor", company: "State University", description: "Taught advanced robotics courses."},
        { year: "2006", title: "Design Engineer", company: "RoboCorp", description: "Designed robotic arms for manufacturing."},
      ]
    },
    {
      name: "Dr. Elena Vance",
      title: "Associate Professor, Physics",
      image: { src: "https://picsum.photos/400/400?random=103", hint: "female professor" },
      email: "e.vance@galgotiacollege.edu",
      phone: "+91 98765 43212",
      about: "With a Ph.D. in quantum physics, Dr. Vance's work on quantum computing has been published in several prestigious journals. She enjoys making complex topics accessible.",
       experience: [
        { year: "2020", title: "Associate Professor", company: "Galgametrics College", description: "Researching quantum entanglement."},
        { year: "2016", title: "Lecturer", company: "Institute of Science", description: "Taught undergraduate physics."},
        { year: "2014", title: "Junior Scientist", company: "QuantumLeap", description: "Contributed to quantum processor design."},
      ]
    },
    {
      name: "Dr. Julian Croft",
      title: "Professor, Business Administration",
      image: { src: "https://picsum.photos/400/400?random=104", hint: "male professor" },
      email: "j.croft@galgotiacollege.edu",
      phone: "+91 98765 43213",
      about: "Dr. Croft is a seasoned expert in strategic management and entrepreneurship. He brings a wealth of real-world business experience to the classroom.",
       experience: [
        { year: "2017", title: "Professor", company: "Galgametrics College", description: "Mentoring student startups."},
        { year: "2010", title: "Management Consultant", company: "Stratagem Consulting", description: "Advised Fortune 500 companies."},
        { year: "2005", title: "MBA", company: "Harvard Business School", description: "Graduated with honors."},
      ]
    },
    {
      name: "Dr. Ananya Sharma",
      title: "Professor, Biotechnology",
      image: { src: "https://picsum.photos/400/400?random=105", hint: "female professor" },
      email: "a.sharma@galgotiacollege.edu",
      phone: "+91 98765 43214",
      about: "Dr. Sharma's research in genetic engineering has led to significant breakthroughs in crop improvement. She is a strong advocate for sustainable science.",
       experience: [
        { year: "2019", title: "Professor", company: "Galgametrics College", description: "Focused on gene-editing technologies."},
        { year: "2014", title: "Research Lead", company: "BioGen Solutions", description: "Led a team in developing drought-resistant plants."},
        { year: "2010", title: "PhD in Biotechnology", company: "Cambridge University", description: "Specialized in molecular biology."},
      ]
    },
    {
      name: "Dr. Rohan Gupta",
      title: "Head of Civil Engineering",
      image: { src: "https://picsum.photos/400/400?random=106", hint: "male professor" },
      email: "r.gupta@galgotiacollege.edu",
      phone: "+91 98765 43215",
      about: "Dr. Gupta is a leading authority on sustainable infrastructure and smart city design. He has consulted on major urban development projects across the country.",
       experience: [
        { year: "2018", title: "Head of Department", company: "Galgametrics College", description: "Integrating green technologies in curriculum."},
        { year: "2012", title: "Senior Structural Engineer", company: "Urban Planners Inc.", description: "Designed bridges and public buildings."},
        { year: "2007", title: "Masters in Civil Eng.", company: "IIT Delhi", description: "Specialized in structural engineering."},
      ]
    },
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Our Esteemed <span className="text-primary">Faculty</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the brilliant minds and dedicated mentors who form the backbone of our institution.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <FacultyCard key={index} faculty={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
