import Link from "next/link";
import { University } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IContent, getContent } from "@/lib/content";

export async function Footer() {
  const content = await getContent();
  const footerContent = content.footer;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 notranslate">
              <University className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg text-white">{footerContent.collegeName}</span>
            </Link>
            <p className="text-sm">
              {footerContent.slogan}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">{footerContent.quickLinks.title}</h3>
            <ul className="space-y-2">
              {footerContent.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors text-sm notranslate">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">{footerContent.reachUs.title}</h3>
            <address className="not-italic space-y-2 text-sm">
              <p>{footerContent.reachUs.address}</p>
              <p>Phone: <a href={`tel:${footerContent.reachUs.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors notranslate">{footerContent.reachUs.phone}</a></p>
              <p>Email: <a href={`mailto:${footerContent.reachUs.email}`} className="hover:text-primary transition-colors break-all notranslate">{footerContent.reachUs.email}</a></p>
            </address>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-700" />
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 text-center md:text-left">
          <p>{footerContent.copyright}</p>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors mt-2 md:mt-0 notranslate">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
