
import Link from "next/link";
import { University, Code, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getContent } from "@/lib/content-loader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import { ParticleCanvas } from "../particle-canvas";


export async function Footer() {
  const content = await getContent();
  const { footer, branding } = content;
  const developerWhatsapp = "+917068482741";
  const whatsappLink = `https://wa.me/${developerWhatsapp}`;

  return (
    <footer className="footer-bg text-gray-300 overflow-hidden relative">
      <ParticleCanvas />
      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Branding and Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 notranslate">
               <Image src={branding.logoUrl} alt={branding.logoText} width={48} height={48} className="h-12 w-12 rounded-full bg-white/20 p-1" />
              <div>
                <h2 className="font-bold text-2xl text-white">{footer.collegeName}</h2>
                <p className="text-sm text-gray-400">{footer.slogan}</p>
              </div>
            </Link>
             <p className="text-sm max-w-md pt-4">
              Our institution is dedicated to fostering an environment of academic excellence, innovation, and holistic development. We prepare students to become leaders and contributors in a global society.
            </p>
          </div>
          
          {/* Right Column: Links and Contact */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4 tracking-wider uppercase">{footer.quickLinks.title}</h3>
              <ul className="space-y-2">
                {footer.quickLinks.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link notranslate">
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 tracking-wider uppercase">{footer.reachUs.title}</h3>
              <address className="not-italic space-y-3 text-sm">
                <p className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-0.5 shrink-0"/><span>{footer.reachUs.address}</span></p>
                <p className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0"/><a href={`tel:${footer.reachUs.phone.replace(/\D/g, '')}`} className="footer-link notranslate"><span>{footer.reachUs.phone}</span></a></p>
                <p className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0"/><a href={`mailto:${footer.reachUs.email}`} className="footer-link break-all notranslate"><span>{footer.reachUs.email}</span></a></p>
              </address>
            </div>
          </div>

        </div>
      </div>
      <Separator className="bg-white/10 relative z-10" />
      <div className="container mx-auto px-4 md:px-6 py-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 text-center md:text-left">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
             <Link href="/privacy-policy" className="footer-link notranslate">
                <span>Privacy Policy</span>
             </Link>
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Contact Developer" className="footer-link">
                            <Code className="h-5 w-5" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Developer</p>
                    </TooltipContent>
                </Tooltip>
             </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
}
