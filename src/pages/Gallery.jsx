import PageHeader from '../components/ui/PageHeader'
import EventExplorer from '../components/gallery/EventExplorer'
import CandyBarShowcase from '../components/gallery/CandyBarShowcase'
import CtaBanner from '../components/home/CtaBanner'
import { images } from '../data/images'
import { usePageTitle } from '../utils/usePageTitle'
import { pageTitles } from '../config/site'

export default function Gallery() {
  usePageTitle(pageTitles.galeria)
  return (
    <>
      <PageHeader
        eyebrow="Galería"
        title="Nuestros eventos"
        subtitle="Recorré cada celebración y descubrí los candy bar que podés sumar a tu fiesta."
        image={images.ballroom}
      />
      <EventExplorer />
      {/* El ancla #candy-bar la usan el cotizador y los links de "Ver candy bar" */}
      <CandyBarShowcase id="candy-bar" />
      <CtaBanner />
    </>
  )
}
