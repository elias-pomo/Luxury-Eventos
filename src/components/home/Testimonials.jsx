import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { reviews } from '../../data/reviews'
import SectionTitle from '../ui/SectionTitle'
import Reveal from '../ui/Reveal'

const AUTOPLAY_MS = 6000

export default function Testimonials() {
  const [[index, direction], setSlide] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = useCallback((step) => {
    setSlide(([i]) => [(i + step + reviews.length) % reviews.length, step])
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, go, index])

  const review = reviews[index]

  return (
    <section className="bg-luxe-center overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionTitle
          eyebrow="Reseñas"
          title="Lo que dicen nuestros clientes"
          subtitle="La mejor carta de presentación son las familias que ya celebraron con nosotros."
        />

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto mt-14 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
                        <Quote className="mx-auto mb-4 size-10 text-gold/40" strokeWidth={1} />

            <div className="relative min-h-64 sm:min-h-52">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, { offset }) => {
                    if (offset.x < -60) go(1)
                    else if (offset.x > 60) go(-1)
                  }}
                  className="flex cursor-grab flex-col items-center text-center active:cursor-grabbing"
                >
                  <div className="flex gap-1 text-gold" aria-label={`${review.rating} de 5 estrellas`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4" fill={i < review.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-2xl leading-snug text-ink italic sm:text-3xl">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="text-sm font-semibold tracking-wide text-ink">{review.name}</p>
                    <p className="mt-1 text-[11px] tracking-[0.25em] text-gold-dark uppercase">{review.event}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="Reseña anterior"
                className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-colors hover:bg-gold hover:text-white"
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
                className="flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-colors hover:bg-gold hover:text-white"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
