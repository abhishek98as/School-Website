
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTranslate } from '@/components/google-translate';
import { WhatsappBubble } from '@/components/whatsapp-bubble';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
import { getContent } from '@/lib/content-loader';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const { branding, footer } = content;

  return {
    title: `${branding.logoText} | ${footer.slogan}`,
    description: 'A professional college website built with Next.js. Fostering excellence, innovation, and a passion for learning.',
    keywords: 'Galgametrics, college, education, university, engineering, business, computer science, higher education, innovation',
    authors: [{ name: branding.logoText }],
    icons: {
      icon: branding.faviconUrl,
    },
    openGraph: {
      title: `${branding.logoText} | Hub`,
      description: 'Fostering excellence, innovation, and a passion for learning.',
      url: 'https://galgotiacollege.edu', // Replace with your actual domain
      siteName: branding.logoText,
      images: [
        {
          url: 'https://picsum.photos/1200/630?random=1', // Replace with a link to your college's logo or a hero image
          width: 1200,
          height: 630,
          alt: `${branding.logoText} Campus`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${branding.logoText} | Hub`,
      description: 'Fostering excellence, innovation, and a passion for learning.',
      images: ['https://picsum.photos/1200/630?random=1'], // Replace with a link to your college's logo or a hero image
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics Tag */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-74XD9TXWT1" strategy="afterInteractive"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-74XD9TXWT1');
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <GoogleTranslate />
          <WhatsappBubble phoneNumber={content.global.whatsappNumber} />
        </ThemeProvider>
      </body>
    </html>
  );
}
