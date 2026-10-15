import { Hero } from '@/components/home/Hero';
import { MenuPreview } from '@/components/home/MenuPreview';
import { Pillars } from '@/components/home/Pillars';
import { Signatures } from '@/components/home/Signatures';
import { SpacePreview } from '@/components/home/SpacePreview';
import { Story } from '@/components/home/Story';
import { VisitUs } from '@/components/home/VisitUs';

/**
 * Home.
 *
 * The section order is the colour story: a maroon hero, the arched transition,
 * then cream and cream-deep alternating down the page, one maroon band at the
 * pillars to re-anchor the brand, and the maroon footer to close.
 *
 * There is no testimonials section. Real customer quotes do not exist yet, and
 * inventing them would be fabricating reviews for a real business.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Signatures />
      <MenuPreview />
      <SpacePreview />
      <Pillars />
      <VisitUs />
    </>
  );
}
