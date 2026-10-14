import { motion } from 'motion/react'
import Photo from './Photo'

// Encabezado para las páginas internas (Galería, Servicios, Contacto).
export default function PageHeader({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative flex min-h-[50vh] items-end overflow-hidden pt-32 pb-16">
      {image && <Photo image={image} alt="" loading="eager" className="absolute inset-0 size-full" />}
      <div className={`absolute inset-0 ${image ? 'bg-ink/65' : 'bg-luxe-cream'}`} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`container-page relative z-10 text-center ${image ? 'text-white' : 'text-ink'}`}
      >
        {eyebrow && <span className="text-xs tracking-[0.4em] text-gold uppercase">{eyebrow}</span>}
        <h1 className="mt-4 text-5xl sm:text-6xl">{title}</h1>
        {subtitle && <p className={`mx-auto mt-5 max-w-xl text-sm sm:text-base ${image ? 'text-white/80' : 'text-muted'}`}>{subtitle}</p>}
      </motion.div>
    </section>
  )
}
