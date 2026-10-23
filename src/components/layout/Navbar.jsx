import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../../config/site'
import Button from '../ui/Button'
import { ease } from '../../utils/motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Solo el Inicio tiene hero a pantalla completa: ahí la barra arranca transparente.
  const transparent = pathname === '/' && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const [brand, ...rest] = site.name.split(' ')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent ? 'bg-transparent py-6' : 'bg-ivory/95 py-3 shadow-soft backdrop-blur-md'
      }`}
    >
      <nav className="container-page flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className={`font-display text-2xl tracking-wide sm:text-3xl ${transparent ? 'text-white' : 'text-ink'}`}>
            {brand}
          </span>
          <span className="text-[10px] tracking-[0.5em] text-gold uppercase">{rest.join(' ')}</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `group relative text-xs font-medium tracking-[0.2em] uppercase transition-colors ${
                    isActive ? 'text-gold' : transparent ? 'text-white hover:text-gold-light' : 'text-ink hover:text-gold'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button to="/servicios" className="px-6! py-3!">Cotizá tu evento</Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className={`md:hidden ${transparent ? 'text-white' : 'text-ink'}`}
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: ease }}
            className="overflow-hidden bg-ivory md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 pt-16">
              {navLinks.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `font-display text-4xl ${isActive ? 'text-gold' : 'text-ink'}`}
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-4">
                <Button to="/servicios">Cotizá tu evento</Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
