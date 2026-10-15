import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Highlights from '../components/home/Highlights'
import GalleryPreview from '../components/home/GalleryPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import Testimonials from '../components/home/Testimonials'
import CtaBanner from '../components/home/CtaBanner'
import { usePageTitle } from '../utils/usePageTitle'

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <About />
      <Highlights />
      <GalleryPreview />
      <ServicesPreview />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
