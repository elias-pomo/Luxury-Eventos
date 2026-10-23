import { motion, useReducedMotion } from 'motion/react'
import { ease } from '../../utils/motion'


// Texto que sube palabra por palabra desde una "máscara" (efecto de título de revista).
// `wordClassName` se aplica a cada palabra (ej: el dorado con brillo).
export default function SplitText({ text, delay = 0, stagger = 0.08, className = '', wordClassName = '' }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.14em] inline-block overflow-hidden pr-[0.04em] pb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: reduce ? 0 : '115%', opacity: reduce ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * stagger, ease }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
