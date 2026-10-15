import { motion, useReducedMotion } from 'motion/react'

// Anima la aparición de su contenido al entrar en pantalla.
export default function Reveal({ children, delay = 0, y = 30, className = '', as = 'div', ...props }) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
