import PageHeader from '../components/ui/PageHeader'
import SectionNav from '../components/gallery/SectionNav'
import GallerySection from '../components/gallery/GallerySection'
import CandyBarSection from '../components/gallery/CandyBarSection'
import CtaBanner from '../components/home/CtaBanner'
import { gallerySections } from '../data/gallery'
import { images } from '../data/images'
import { usePageTitle } from '../utils/usePageTitle'
import { pageTitles } from '../config/site'

const CANDY_BAR_ID = 'candy-bar'

const navSections = [
  ...gallerySections.map(({ id, nav }) => ({ id, label: nav })),
  { id: CANDY_BAR_ID, label: 'Candy bar' },
]

export default function Gallery() {
  usePageTitle(pageTitles.galeria)
  return (
    <>
      <PageHeader
        eyebrow="Galería"
        title="Nuestros eventos"
        subtitle="Recorré cada tipo de celebración y descubrí los diseños de candy bar que podés sumar a tu fiesta."
        image={images.ballroom}
      />
      <SectionNav sections={navSections} />
      {gallerySections.map((section) => (
        <GallerySection key={section.id} section={section} />
      ))}
      <CandyBarSection id={CANDY_BAR_ID} />
      <CtaBanner />
    </>
  )
}
