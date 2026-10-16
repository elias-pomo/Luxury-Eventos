import { motion } from 'motion/react'
import Reveal from './Reveal'

const Line = ({ origin }) => (
  <motion.span
    aria-hidden="true"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className={`h-px w-8 bg-gold ${origin}`}
  />
)

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false, titleId }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'

  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${light ? 'text-gold-light' : 'text-gold-dark'}`}>
          <Line origin="origin-right" />
          {eyebrow}
          {align === 'center' && <Line origin="origin-left" />}
        </span>
      )}
      <h2 id={titleId} className={`text-4xl leading-tight sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-5 text-sm leading-relaxed sm:text-base ${light ? 'text-white/80' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
