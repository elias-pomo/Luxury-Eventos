import { AnimatePresence, motion } from 'motion/react'
import { AirVent, ArrowRight, Check, Disc3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { candyBars } from '../../data/candybar'
import { candyBarPrices, extras } from '../../data/pricing'
import { formatPrice } from '../../utils/format'
import ActiveFrame, { inViewOnce, staggerGroup, staggerItem } from './ActiveFrame'
import { Radio } from './EventStep'

// Cada extra con su ícono y cómo se mueve mientras está activo:
// el disco del DJ gira y el aire "sopla" suave.
const toggleIcons = {
  aire: { Icon: AirVent, active: { y: [0, -2, 0], transition: { duration: 1.6, repeat: Infinity } } },
  dj: { Icon: Disc3, active: { rotate: 360, transition: { duration: 2.4, repeat: Infinity, ease: 'linear' } } },
}

// Paso 4: extras que admite el plan elegido (aire, DJ) y candy bar.
export default function ExtrasStep({ plan, category, values, onChange }) {
  if (!plan) {
    return <p className="text-sm text-muted">Elegí un tipo de evento para ver los extras disponibles.</p>
  }

  const toggles = ['aire', 'dj'].filter((id) => plan.extras.includes(id))
  const luxury = category.plans.find((p) => p.id === 'luxury')
  // Con DJ en el plan Premium, el Paquete Luxury cuesta lo mismo e incluye más.
  const suggestLuxury = luxury && plan.id !== luxury.id && values.dj

  return (
    <div className="space-y-8">
      {toggles.length > 0 && (
        <motion.ul variants={staggerGroup} initial="hidden" whileInView="show" viewport={inViewOnce} className="space-y-3">
          {toggles.map((id) => {
            const { name, price, note } = extras[id]
            const { Icon, active: activeMotion } = toggleIcons[id]
            const active = values[id]
            return (
              <motion.li key={id} variants={staggerItem}>
                <motion.button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => onChange({ [id]: !active })}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex w-full items-center gap-4 overflow-hidden card-luxe card-luxe-sm px-4 py-4 text-left sm:px-5 ${
                    active ? 'border-gold! bg-gold/[0.08]! shadow-gold!' : ''
                  }`}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      active ? 'border-gold bg-gold text-ink' : 'border-gold/40 text-gold-dark'
                    }`}
                  >
                    <motion.span animate={active ? activeMotion : { rotate: 0, y: 0 }} className="flex">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </motion.span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl">{name}</span>
                    <span className="block text-xs text-muted">{note}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={active ? 'on' : 'off'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center gap-1 text-sm font-semibold ${active ? 'text-gold-dark' : 'text-muted'}`}
                      >
                        {active ? (
                          <>
                            <Check className="size-3.5" strokeWidth={3} /> Sumado
                          </>
                        ) : (
                          `+${formatPrice(price)}`
                        )}
                      </motion.span>
                    </AnimatePresence>
                    <Switch on={active} />
                  </span>
                </motion.button>
              </motion.li>
            )
          })}
        </motion.ul>
      )}

      <AnimatePresence>
        {suggestLuxury && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-luxe-cream flex flex-col gap-3 rounded-sm border border-gold/50 px-5 py-4 text-sm text-muted sm:flex-row sm:items-center">
              <Sparkles className="hidden size-5 shrink-0 text-gold-dark sm:block" />
              <p className="flex-1">
                Por el mismo precio, el <span className="font-semibold text-gold-dark">{luxury.name}</span> incluye el DJ del
                salón con equipamiento completo.
              </p>
              <motion.button
                type="button"
                onClick={() => onChange({ planId: luxury.id, dj: false })}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 type-label text-ink shadow-gold"
              >
                Pasar a Luxury <ArrowRight className="size-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {plan.extras.includes('candy') && (
        <fieldset>
          <legend className="mb-1 font-display text-2xl">Candy bar</legend>
          <p className="mb-4 text-xs text-muted">
            Exclusivo del salón.{' '}
            <Link to="/galeria#candy-bar" className="font-semibold text-gold-dark underline-offset-4 hover:underline">
              Ver los tamaños en la galería
            </Link>
          </p>
          <motion.div
            role="radiogroup"
            aria-label="Candy bar"
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
            className="grid gap-3 sm:grid-cols-2"
          >
            {[{ id: '', name: 'Sin candy bar', summary: 'Lo podés sumar más adelante' }, ...candyBars].map(({ id, name, summary }) => {
              const active = values.candyId === id
              return (
                <motion.button
                  key={id || 'none'}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onChange({ candyId: id })}
                  variants={staggerItem}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-start gap-3 card-luxe card-luxe-sm px-4 py-3.5 text-left"
                >
                  {active && <ActiveFrame layoutId="candy-frame" />}
                  <span className="relative mt-1">
                    <Radio active={active} />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-xl">{name}</span>
                      {id && <span className="shrink-0 text-sm font-semibold text-gold-dark">{formatPrice(candyBarPrices[id])}</span>}
                    </span>
                    <span className="block text-xs text-muted">{summary}</span>
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </fieldset>
      )}
    </div>
  )
}

function Switch({ on }) {
  return (
    <span className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-300 ${on ? 'bg-gold' : 'bg-sand'}`}>
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        className={`size-5 rounded-full bg-white shadow ${on ? 'ml-auto' : ''}`}
      />
    </span>
  )
}
