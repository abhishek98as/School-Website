
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, University, LogIn, ChevronDown, Home, Building, BookOpen, User, GraduationCap, School, Library, Campus, Camera, Newspaper, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";
import type { IContent } from "@/lib/content";
import Image from "next/image";
import { Separator } from "../ui/separator";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { 
    href: "/about", 
    label: "About Us",
    icon: Building,
    subLinks: [
      { href: "/about/our-aspiration", label: "Our Aspiration", icon: Star },
      { href: "/about/about-us", label: "About The School", icon: School },
      { href: "/about/philosophy", label: "Philosophy", icon: BookOpen },
      { href: "/about/our-motto", label: "Our Motto", icon: Star },
    ]
  },
  { href: "/academics", label: "Academics", icon: BookOpen },
  { href: "/admission", label: "Admission", icon: GraduationCap },
  { href: "/faculty", label: "Our Faculty", icon: User },
  { href: "/infrastructure", label: "Infrastructure", icon: School },
  {
    href: "#",
    label: "More",
    icon: Star,
    subLinks: [
      { href: "/student-life", label: "Student Life", icon: Star },
      { href: "/library", label: "Library", icon: Library },
      { href: "/campus", label: "Campus", icon: Campus },
      { href: "/virtual-tour", label: "Virtual Tour", icon: Camera },
      { href: "/blog", label: "News & Events", icon: Newspaper },
    ]
  }
];

const mobileNavLinks = navLinks.flatMap(link =>
    link.subLinks ? link.subLinks.map(sub => ({ ...sub })) : [{ href: link.href, label: link.label, icon: link.icon }]
);


export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState<IContent | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  const changeLanguage = (lang: string) => {
    const googleTranslateSelect = document.querySelector('#google_translate_element select') as HTMLSelectElement;
    if (googleTranslateSelect) {
      googleTranslateSelect.value = lang;
      googleTranslateSelect.dispatchEvent(new Event('change'));
    }
  };
  
  if (!content) {
    // You can render a loading state or a placeholder header
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <University className="h-8 w-8 text-primary" />
                    <span className="font-bold text-lg hidden sm:inline">Loading...</span>
                </div>
            </div>
        </header>
    );
  }

  const { branding } = content;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 notranslate">
          <Image src={branding.logoUrl} alt={branding.logoText} width={120} height={30} className="h-8 w-auto" />
          <span className="font-bold text-lg hidden sm:inline">{branding.logoText}</span>
           <span className="font-bold text-lg sm:hidden">PMS</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            link.subLinks ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(
                    "transition-colors hover:text-primary notranslate relative px-2",
                    pathname.startsWith(link.href) && link.href !== "#" && "text-primary font-semibold"
                  )}>
                    {link.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.subLinks.map((subLink) => (
                     <DropdownMenuItem key={subLink.href} asChild>
                      <Link href={subLink.href}>{subLink.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary notranslate relative",
                  pathname === link.href && "text-primary font-semibold"
                )}
              >
                {link.label}
                {pathname === link.href && (
                   <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary"></span>
                )}
              </Link>
            )
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="font-bold transition-all hover:scale-110 hover:text-accent-foreground hover:bg-accent">
                <span className="text-xs">हिन्दी | EN</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('hi')}>Hindi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

           <Button asChild variant="secondary" className="hidden lg:flex group transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
            <Link href="/login">
              <LogIn className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              Login
            </Link>
          </Button>

          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs p-0 bg-[#1e2235] text-white border-r-0">
                 <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="p-6 text-center border-b border-white/10">
                    <Image src={branding.logoUrl} alt="User Profile" width={70} height={70} className="w-20 h-20 rounded-full mx-auto border-2 border-white/50" />
                    <h3 className="mt-3 text-lg font-semibold">{branding.logoText}</h3>
                    <p className="text-sm text-white/70">{content.footer.slogan}</p>
                  </div>
                
                  <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {mobileNavLinks.map((link) => (
                         <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                            "text-base font-medium transition-colors hover:bg-white/10 rounded-md flex items-center py-2 px-3 gap-3",
                            pathname === link.href && "bg-primary text-primary-foreground font-bold"
                            )}
                        >
                             <link.icon className="h-5 w-5" /> <span>{link.label}</span>
                        </Link>
                    ))}
                  </nav>
                   <div className="mt-auto p-4 border-t border-white/10">
                        <Button asChild variant="ghost" className="w-full justify-center text-base font-medium hover:bg-white/10 !text-primary hover:!text-primary-foreground" onClick={() => setMenuOpen(false)}>
                            <Link href="/login">
                                <LogIn className="mr-2 h-5 w-5" />
                                Admin Login
                            </Link>
                        </Button>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
