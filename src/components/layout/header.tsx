"use client";

import Link from "next/link";
import { Menu, University, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/academics", label: "Academics" },
  { href: "/admission", label: "Admission" },
  { href: "/faculty", label: "Our Faculty" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/student-life", label: "Student Life" },
  { href: "/library", label: "Library" },
  { href: "/campus", label: "Campus" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary notranslate"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Translate</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('hi')}>Hindi</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                 <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2 notranslate" onClick={() => setMenuOpen(false)}>
                    <University className="h-8 w-8 text-primary" />
                    <span className="font-bold">GALGOTIAS COLLEGE</span>
                  </Link>
                  <nav className="grid gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-lg font-medium transition-colors hover:text-primary notranslate"
                      >
                        {link.label}
                      </Link>
                    ))}
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