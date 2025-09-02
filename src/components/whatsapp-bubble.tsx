import Link from "next/link";
import { Button } from "./ui/button";

const WhatsAppIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 md:h-7 md:w-7"
    >
      <path
        d="M19.2,4.8C17.1,2.7,14.6,1.6,12,1.6C6.3,1.6,1.6,6.3,1.6,12c0,1.9,0.5,3.7,1.5,5.3L1.6,22.4l5.5-1.4c1.5,0.9,3.2,1.4,5,1.4h0c5.7,0,10.4-4.7,10.4-10.4C22.4,9.4,21.3,6.9,19.2,4.8z M12,20.5c-1.6,0-3.2-0.5-4.5-1.3l-0.3-0.2l-3.3,0.9l0.9-3.2l-0.2-0.3c-0.9-1.4-1.4-3-1.4-4.7c0-4.6,3.8-8.4,8.4-8.4c2.2,0,4.3,0.9,5.9,2.5s2.5,3.7,2.5,5.9C20.4,16.8,16.6,20.5,12,20.5z M16.9,13.7c-0.3-0.1-1.6-0.8-1.8-0.9c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.7,0.9-0.8,1.1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.2-0.4c0.1-0.1,0-0.3-0.1-0.4c-0.1-0.1-0.6-1.4-0.8-1.9c-0.2-0.5-0.4-0.5-0.6-0.5h-0.5c-0.2,0-0.5,0.1-0.7,0.3c-0.2,0.2-0.8,0.7-0.8,1.8c0,1,0.8,2.1,0.9,2.2c0.1,0.1,1.6,2.5,4,3.5c0.6,0.2,1,0.4,1.4,0.5c0.6,0.2,1.2,0.2,1.6,0.1c0.5-0.1,1.6-0.7,1.8-1.3c0.2-0.6,0.2-1.2,0.1-1.3C17.4,13.9,17.2,13.8,16.9,13.7z"
        fill="currentColor"
      />
    </svg>
);


export function WhatsappBubble({ phoneNumber }: { phoneNumber: string }) {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Button
        asChild
        className="rounded-full h-14 w-14 md:h-16 md:w-auto md:px-6 shadow-lg bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center gap-2 md:gap-3 transition-all duration-300 transform hover:scale-105 animate-float hover:animate-none"
      >
        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          <span className="hidden md:inline text-base md:text-lg font-semibold">Get Query</span>
        </Link>
      </Button>
    </div>
  );
}
