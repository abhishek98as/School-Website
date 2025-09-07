
import Link from "next/link";
import { University, Code, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getContent } from "@/lib/content-loader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import { ParticleCanvas } from "../particle-canvas";

const WhatsAppIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.2,4.8C17.1,2.7,14.6,1.6,12,1.6C6.3,1.6,1.6,6.3,1.6,12c0,1.9,0.5,3.7,1.5,5.3L1.6,22.4l5.5-1.4c1.5,0.9,3.2,1.4,5,1.4h0c5.7,0,10.4-4.7,10.4-10.4C22.4,9.4,21.3,6.9,19.2,4.8z M12,20.5c-1.6,0-3.2-0.5-4.5-1.3l-0.3-0.2l-3.3,0.9l0.9-3.2l-0.2-0.3c-0.9-1.4-1.4-3-1.4-4.7c0-4.6,3.8-8.4,8.4-8.4c2.2,0,4.3,0.9,5.9,2.5s2.5,3.7,2.5,5.9C20.4,16.8,16.6,20.5,12,20.5z M16.9,13.7c-0.3-0.1-1.6-0.8-1.8-0.9c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.7,0.9-0.8,1.1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.1,0-0.3-0.1-0.4c-0.1-0.1-0.6-1.4-0.8-1.9c-0.2-0.5-0.4-0.5-0.6-0.5h-0.5c-0.2,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.8,0.7-0.8,1.8c0,1,0.8,2.1,0.9,2.2c0.1,0.1,1.6,2.5,4,3.5c0.6,0.2,1,0.4,1.4,0.5c0.6,0.2,1.2,0.2,1.6,0.1c0.5-0.1,1.6-0.7,1.8-1.3c0.2-0.6,0.2-1.2,0.1-1.3C17.4,13.9,17.2,13.8,16.9,13.7z"
        fill="currentColor"
      />
    </svg>
);


export async function Footer() {
  const content = await getContent();
  const { footer, branding } = content;
  const developerWhatsapp = "+917068482741";
  const whatsappLink = `https://wa.me/${developerWhatsapp}?text=Hello!%20I'm%20contacting%20you%20from%20the%20${footer.collegeName}%20website.`;

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
          <p className="mb-2 md:mb-0">{footer.copyright}</p>
          <div className="flex items-center gap-4">
             <Link href="/privacy-policy" className="footer-link notranslate">
                <span>Privacy Policy</span>
             </Link>
          </div>
        </div>
      </div>
       <Separator className="bg-white/10 relative z-10" />
       <div className="container mx-auto px-4 md:px-6 py-2 relative z-10">
           <div className="flex justify-center items-center">
                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Contact Developer on WhatsApp" className="footer-link flex items-center gap-2 notranslate text-xs">
                    <WhatsAppIcon />
                    <span>Contact Developer</span>
                </Link>
           </div>
       </div>
    </footer>
  );
}
