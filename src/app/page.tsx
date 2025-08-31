import { HeroSlider } from '@/components/hero-slider';
import { ScrollingText } from '@/components/scrolling-text';
import { Highlights } from '@/components/highlights';
import { VirtualTour } from '@/components/virtual-tour';
import { Achievements } from '@/components/achievements';
import { RisingStars } from '@/components/rising-stars';
import { NewsAndEvents } from '@/components/news-and-events';
import { WelcomePopup } from '@/components/welcome-popup';

export default function Home() {
  return (
    <>
      <WelcomePopup />
      <HeroSlider />
      <ScrollingText />
      <Highlights />
      <VirtualTour />
      <Achievements />
      <RisingStars />
      <NewsAndEvents />
    </>
  );
}
