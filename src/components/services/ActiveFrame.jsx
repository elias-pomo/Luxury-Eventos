import { motion } from 'motion/react'
import { ease } from '../../utils/motion'

// Marco dorado de la opción elegida. Las opciones de un mismo grupo comparten
// `layoutId`, así el marco se desliza de una a otra al cambiar la elección.
// El contenido de la opción tiene que ir con `relative` para quedar encima.
export default function ActiveFrame({ layoutId, className = '' }) {
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden="true"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={`pointer-events-none absolute inset-0 rounded-sm border-2 border-gold bg-gold/[0.07] shadow-gold ${className}`}
    />
  )
}

// Variantes para que las opciones de una grilla aparezcan una tras otra.
export const staggerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease } },
}
export const inViewOnce = { once: true, margin: '0px 0px -60px 0px' }
