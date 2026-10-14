import { ArrowRight } from 'lucide-react'
import { images } from '../../data/images'
import Button from '../ui/Button'
import Photo from '../ui/Photo'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const preview = [
  { image: images.ballroom, label: 'Mesas de gala', className: 'col-span-2 sm:row-span-2' },
  { image: images.table, label: 'Noches mágicas' },
  { image: images.party, label: 'Centros de mesa' },
  { image: images.balloons, label: 'Luces de colores' },
  { image: images.toast, label: 'Eventos de día' },
]

export default function GalleryPreview() {
  return (
    <section className="bg-luxe py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Galería"
            title="Momentos que ya vivimos"
            subtitle="Cada evento es único. Mirá cómo se transforma el salón con distintas ambientaciones, desde una tarde luminosa hasta una noche llena de luces."
            align="left"
          />
          <Reveal delay={0.2} className="hidden shrink-0 md:block">
            <Button to="/galeria" variant="outline">
              Ver galería <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-40 grid-cols-2 gap-3 sm:auto-rows-60 sm:grid-cols-4 sm:gap-4">
          {preview.map(({ image, label, className = '' }, i) => (
            <Reveal key={label} delay={i * 0.08} className={className}>
              <figure className="group relative size-full overflow-hidden rounded-sm">
                <Photo
                  image={image}
                  className="size-full transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <figcaption className="absolute inset-0 flex items-end bg-linear-to-t from-ink/70 via-transparent to-transparent p-4 sm:p-6">
                  <span className="font-display text-xl text-white sm:text-2xl">{label}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Button to="/galeria" variant="outline">
            Ver galería <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
