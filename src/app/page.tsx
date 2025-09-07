import { HeroSlider } from '@/components/hero-slider';
import { ScrollingText } from '@/components/scrolling-text';
import { Highlights } from '@/components/highlights';
import { VirtualTour } from '@/components/virtual-tour';
import { Achievements } from '@/components/achievements';
import { RisingStars } from '@/components/rising-stars';
import { NewsAndEvents } from '@/components/news-and-events';
import { WelcomePopup } from '@/components/welcome-popup';
import { getContent } from '@/lib/content-loader';
import { Facilities } from '@/components/facilities';

export default async function Home() {
  const content = await getContent();
  
  return (
    <>
      <WelcomePopup content={content.welcomePopup} />
      <HeroSlider content={content.home.heroSlider} />
      <ScrollingText content={content.home.scrollingText} />
      <Highlights content={content.home.highlights} />
      <VirtualTour content={content.home.virtualTour} />
      <Facilities />
      <Achievements content={content.home.achievements} />
      <RisingStars content={content.home.risingStars} />
      <NewsAndEvents content={content.home.newsAndEvents} />
    </>
  );
}
