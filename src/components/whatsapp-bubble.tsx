import Link from "next/link";
import { Button } from "./ui/button";

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.75 13.96C17.07 14.28 17.07 14.82 16.75 15.14L15.42 16.47C14.76 17.13 13.79 17.29 12.98 16.91C11.39 16.14 9.51 14.81 8.1 13.39C6.69 11.98 5.36 10.1 4.59 8.51C4.21 7.7 4.37 6.73 5.03 6.07L6.36 4.74C6.68 4.42 7.23 4.42 7.54 4.74L9.21 6.41C9.53 6.73 9.53 7.27 9.21 7.59L8.23 8.58C8.09 8.72 8.09 8.95 8.23 9.09C8.94 9.8 9.91 10.77 10.72 11.58C11.53 12.39 12.5 13.35 13.21 14.07C13.35 14.21 13.58 14.21 13.72 14.07L14.71 13.08C15.03 12.76 15.57 12.76 15.89 13.08L16.75 13.96ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);


export function WhatsappBubble({ phoneNumber }: { phoneNumber: string }) {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        className="rounded-full h-16 w-auto px-6 shadow-lg bg-green-500 hover:bg-green-600 text-white flex items-center gap-3 animate-bounce"
      >
        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          <span className="text-lg font-semibold">Get Query</span>
        </Link>
      </Button>
    </div>
  );
}
