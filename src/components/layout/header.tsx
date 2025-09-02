
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, University, LogIn, ChevronDown } from "lucide-react";
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
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { 
    href: "/about", 
    label: "About Us",
    subLinks: [
      { href: "/about/our-aspiration", label: "Our Aspiration" },
      { href: "/about/about-us", label: "About The School" },
      { href: "/about/philosophy", label: "Philosophy" },
      { href: "/about/our-motto", label: "Our Motto" },
    ]
  },
  { href: "/academics", label: "Academics" },
  { href: "/admission", label: "Admission" },
  { href: "/faculty", label: "Our Faculty" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/student-life", label: "Student Life" },
  { href: "/library", label: "Library" },
  { href: "/campus", label: "Campus" },
  { href: "/virtual-tour", label: "Virtual Tour" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    const googleTranslateSelect = document.querySelector('#google_translate_element select') as HTMLSelectElement;
    if (googleTranslateSelect) {
      googleTranslateSelect.value = lang;
      googleTranslateSelect.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 notranslate">
          <University className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg hidden sm:inline">GALGOTIAS COLLEGE</span>
           <span className="font-bold text-lg sm:hidden">GCET</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            link.subLinks ? (
              <DropdownMenu key={link.href}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(
                    "transition-colors hover:text-primary notranslate relative px-2",
                    pathname.startsWith(link.href) && "text-primary font-semibold"
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
                <span className="notranslate text-xs">हिन्दी | EN</span>
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
              <SheetContent side="right" className="w-full max-w-sm">
                 <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2 notranslate" onClick={() => setMenuOpen(false)}>
                    <University className="h-8 w-8 text-primary" />
                    <span className="font-bold">GALGOTIAS COLLEGE</span>
                  </Link>
                  <nav className="grid gap-2">
                     <Accordion type="single" collapsible className="w-full">
                        {navLinks.map((link) => (
                        link.subLinks ? (
                            <AccordionItem value={link.href} key={link.href} className="border-b-0">
                                <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary transition-colors py-2">
                                    {link.label}
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                <div className="grid gap-2 pl-7 mt-1">
                                    {link.subLinks.map(subLink => (
                                        <Link
                                            key={subLink.href}
                                            href={subLink.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={cn(
                                                "text-base font-medium transition-colors hover:text-primary notranslate",
                                                pathname === subLink.href && "text-primary font-bold"
                                            )}
                                        >
                                            {subLink.label}
                                        </Link>
                                    ))}
                                </div>
                                </AccordionContent>
                            </AccordionItem>
                        ) : (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                            "text-lg font-medium transition-colors hover:text-primary notranslate flex items-center py-2",
                            pathname === link.href && "text-primary font-bold"
                            )}
                        >
                            {link.label}
                        </Link>
                        )
                        ))}
                     </Accordion>
                     <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary flex items-center pt-4"
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
