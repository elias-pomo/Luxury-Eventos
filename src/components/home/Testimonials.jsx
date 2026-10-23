import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { reviews } from '../../data/reviews'
import SectionTitle from '../ui/SectionTitle'
import Reveal from '../ui/Reveal'
import Sparkles from '../ui/Sparkles'
import { ease } from '../../utils/motion'
import Section from '../ui/Section'
import Card from '../ui/Card'

export default function Testimonials() {
  const [[index, direction], setSlide] = useState([0, 1])

  const go = useCallback((step) => {
    setSlide(([i]) => [(i + step + reviews.length) % reviews.length, step])
  }, [])

  const review = reviews[index]

  return (
    <Section tone="light" className="overflow-hidden">
      <div className="container-page">
        <SectionTitle
          eyebrow="Reseñas"
          title="Lo que dicen nuestros clientes"
          subtitle="La mejor carta de presentación son las familias que ya celebraron con nosotros."
        />

        <Reveal delay={0.1}>
          <Card className="mx-auto mt-16 max-w-3xl px-6 pt-14 pb-10 sm:px-12">
                        {/* Sello con comillas montado sobre el borde superior de la tarjeta */}
            <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease }}
                className="flex size-16 items-center justify-center rounded-full border-4 border-ivory bg-ink text-gold-light shadow-soft"
              >
                <Quote className="size-6" strokeWidth={1.5} />
              </motion.div>
            </div>

            <div className="relative min-h-64 sm:min-h-52">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.5, ease: ease }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, { offset }) => {
                    if (offset.x < -60) go(1)
                    else if (offset.x > 60) go(-1)
                  }}
                  className="flex cursor-grab flex-col items-center text-center active:cursor-grabbing"
                >
                  <div className="flex gap-1 text-gold-dark" aria-label={`${review.rating} de 5 estrellas`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4" fill={i < review.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-2xl leading-snug text-ink italic sm:text-3xl">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="text-sm font-semibold tracking-wide text-ink">{review.name}</p>
                    <p className="mt-1 type-label text-gold-dark">{review.event}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="Reseña anterior"
                className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-colors hover:bg-gold hover:text-ink"
              >
                <ChevronLeft className="size-5" />
              </button>

              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide([i, i > index ? 1 : -1])}
                    aria-label={`Ver reseña ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? 'w-8 bg-gold' : 'w-1.5 bg-gold/30 hover:bg-gold/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Reseña siguiente"
                className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-colors hover:bg-gold hover:text-ink"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
