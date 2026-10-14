import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

// Barra fija con las secciones de la página. Se ubica justo debajo del Navbar
// y marca la sección visible. `sections`: [{ id, label }].
export default function SectionNav({ sections }) {
  const [active, setActive] = useState(sections[0].id)
  const [top, setTop] = useState(64)
  const navRef = useRef(null)

  // El alto del Navbar y de esta barra cambian con el tamaño de pantalla: se miden.
  // `--scroll-offset` (Navbar + barra) lo usan las secciones como scroll-margin,
  // para que al saltar a una queden justo debajo de la barra.
  useEffect(() => {
    const header = document.querySelector('header')
    const nav = navRef.current
    if (!header || !nav) return
    const root = document.documentElement
    const observer = new ResizeObserver(() => {
      setTop(header.offsetHeight)
      root.style.setProperty('--scroll-offset', `${header.offsetHeight + nav.offsetHeight}px`)
    })
    observer.observe(header)
    observer.observe(nav)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--scroll-offset')
    }
  }, [])

  // La sección activa es la última cuyo inicio ya pasó la mitad de la pantalla
  // (arriba de todo, la primera).
  useEffect(() => {
    let frame
    const update = () => {
      frame = null
      const line = window.innerHeight * 0.5
      const current = sections.filter(({ id }) => document.getElementById(id)?.getBoundingClientRect().top <= line).at(-1)
      setActive((current ?? sections[0]).id)
    }
    const onScroll = () => (frame ??= requestAnimationFrame(update))
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sections])

  const goTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView()
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav
      ref={navRef}
      aria-label="Secciones de la galería"
      style={{ top }}
      className="sticky z-30 border-b border-sand bg-ivory/95 backdrop-blur-md"
    >
      {/* Celular: tres columnas iguales, sin scroll horizontal. Desde sm: centrado. */}
      <ul className="container-page grid grid-cols-3 sm:flex sm:justify-center sm:gap-12">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => goTo(e, id)}
              aria-current={active === id ? 'true' : undefined}
              className={`relative flex h-full items-center justify-center px-1 py-3.5 text-center text-[10px] leading-tight font-medium tracking-[0.1em] whitespace-nowrap uppercase transition-colors sm:px-0 sm:py-4 sm:text-[11px] sm:tracking-[0.25em] ${
                active === id ? 'text-gold-dark' : 'text-muted hover:text-ink'
              }`}
            >
              {label}
              {active === id && (
                <motion.span layoutId="section-nav-indicator" className="absolute inset-x-0 bottom-0 h-0.5 bg-gold" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
