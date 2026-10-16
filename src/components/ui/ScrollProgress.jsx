import { motion, useScroll, useSpring } from 'motion/react'

// Hilo dorado arriba de todo que se llena a medida que se baja por la página.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-gold-dark via-gold-light to-gold-dark"
    />
  )
}
