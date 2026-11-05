import Hero from '../components/home/Hero'
import EventsMarquee from '../components/home/EventsMarquee'
import About from '../components/home/About'
import Highlights from '../components/home/Highlights'
import GalleryPreview from '../components/home/GalleryPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import Testimonials from '../components/home/Testimonials'
import CtaBanner from '../components/home/CtaBanner'
import { reviewsReady } from '../data/reviews'
import { usePageTitle } from '../utils/usePageTitle'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <EventsMarquee />
      <About />
      <ServicesPreview />
      <GalleryPreview />
      <Highlights />
      {reviewsReady && <Testimonials />}
      <CtaBanner />
    </>
  )
}
