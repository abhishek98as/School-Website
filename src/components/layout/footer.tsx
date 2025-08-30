import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, University } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/academics", label: "Academics" },
  { href: "/admission", "label": "Admission" },
  { href: "/faculty", "label": "Our Faculty" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/student-life", label: "Student Life" },
  { href: "/library", label: "Library" },
  { href: "/campus", label: "Campus" },
];

const socialLinks = [
  { href: "#", icon: <Facebook className="h-5 w-5" /> },
  { href: "#", icon: <Twitter className="h-5 w-5" /> },
  { href: "#", icon: <Instagram className="h-5 w-5" /> },
  { href: "#", icon: <Linkedin className="h-5 w-5" /> },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <University className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg text-white">GALGOTIAS COLLEGE</span>
            </Link>
            <p className="text-sm">
              Fostering excellence, innovation, and a passion for learning since 2004.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Reach Us</h3>
            <address className="not-italic space-y-2 text-sm">
              <p>1, Knowledge Park, Phase-II, Greater Noida, Uttar Pradesh 201306</p>
              <p>Phone: <a href="tel:+911204370000" className="hover:text-primary transition-colors">(+91) 120-4370000</a></p>
              <p>Email: <a href="mailto:info@galgotiacollege.edu" className="hover:text-primary transition-colors">info@galgotiacollege.edu</a></p>
            </address>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="text-gray-400 hover:text-primary transition-colors">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-700" />
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© Copyright 2024, all rights reserved with GALGOTIA COLLEGE</p>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors mt-2 md:mt-0">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
