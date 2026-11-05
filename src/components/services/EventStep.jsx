import { AnimatePresence, motion } from 'motion/react'
import { Check, Sparkles } from 'lucide-react'
import { eventTypes } from '../../data/events'
import { formatPrice } from '../../utils/format'
import { findCategory, startingPrice } from '../../utils/quote'
import ActiveFrame, { inViewOnce, staggerGroup, staggerItem } from './ActiveFrame'
import { ease } from '../../utils/motion'

// Pequeño salto del ícono al elegir una opción.
const pop = { scale: [1, 1.25, 1], rotate: [0, -10, 8, 0], transition: { duration: 0.5 } }

// Paso 1: tipo de evento y, si la categoría tiene más de uno, el plan.
export default function EventStep({ eventId, plan, onEventChange, onPlanChange }) {
  const category = findCategory(eventId)

  return (
    <>
      <motion.div
        role="radiogroup"
        aria-label="Tipo de evento"
        variants={staggerGroup}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {eventTypes.map(({ id, name, tagline, perks, icon: Icon }) => {
          const active = id === eventId
          return (
            <motion.button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onEventChange(id)}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex flex-col items-start overflow-hidden card-luxe card-luxe-sm p-4 text-left sm:p-5"
            >
              {active && <ActiveFrame layoutId="event-frame" />}
              <Icon
                aria-hidden="true"
                strokeWidth={1}
                className={`pointer-events-none absolute -right-4 -bottom-4 size-24 rotate-12 transition-all duration-700 group-hover:rotate-0 group-hover:text-gold/20 ${active ? 'text-gold/25' : 'text-gold/10'}`}
              />
              {/* Línea dorada superior que crece al pasar el mouse o al elegirla */}
              <span
                className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-linear-to-r from-gold-dark via-gold to-gold-light transition-transform duration-500 ${
                  active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
              <motion.span
                animate={active ? pop : { scale: 1, rotate: 0 }}
                className={`relative flex size-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                  active ? 'border-gold bg-gold text-ink' : 'border-gold/40 text-gold-dark group-hover:bg-gold/10'
                }`}
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </motion.span>

              <span className="relative mt-3 font-display text-xl leading-tight">{name}</span>
              <span className="relative mt-0.5 font-display text-sm text-gold-dark italic">{tagline}</span>

              <ul className="relative mt-3 mb-4 space-y-1.5 text-xs leading-snug text-muted">
                {perks.map((perk) => (
                  <li key={perk} className="flex gap-1.5">
                    <Check className="mt-px size-3 shrink-0 text-gold-dark" strokeWidth={2.5} />
                    {perk}
                  </li>
                ))}
              </ul>

              <span className="relative mt-auto flex w-full items-baseline justify-between gap-2 border-t border-gold/25 pt-3">
                <span className="type-label text-muted">Desde</span>
                <span className={`font-display text-lg leading-none transition-colors ${active ? 'text-gold-dark' : 'text-ink'}`}>
                  {formatPrice(startingPrice(id))}
                </span>
              </span>
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-gold text-ink"
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {category && (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
            className="mt-8"
          >
            {category.plans.length > 1 ? (
              <PlanPicker plans={category.plans} selected={plan} onChange={onPlanChange} />
            ) : (
              <Includes items={plan.includes} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function PlanPicker({ plans, selected, onChange }) {
  return (
    <div id="elegi-tu-plan" className="scroll-mt-28">
      <p className="mb-4 type-label text-muted">Elegí tu plan</p>
      <motion.div
        role="radiogroup"
        aria-label="Plan"
        variants={staggerGroup}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2"
      >
        {plans.map((plan) => {
          const active = plan.id === selected.id
          return (
            <motion.button
              key={plan.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(plan.id)}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col card-luxe p-5 text-left"
            >
              {active && <ActiveFrame layoutId="plan-frame" />}
              {plan.badge && (
                <span className="absolute -top-3 right-4 flex items-center gap-1 overflow-hidden rounded-full bg-ink px-3 py-1 type-label text-gold-light shadow-gold">
                  <motion.span
                    animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.6, delay: 0.4 }}
                  >
                    <Sparkles className="size-3" />
                  </motion.span>
                  {plan.badge}
                </span>
              )}
              <span className="relative flex items-center gap-3">
                <Radio active={active} />
                <span className="font-display text-2xl">{plan.name}</span>
              </span>
              <span className="relative mt-2 font-display text-3xl text-gold-dark">{formatPrice(plan.price)}</span>
              <ul className="relative mt-4 space-y-2 text-sm text-muted">
                {plan.includes.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.04 }}
                    className="flex gap-2"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-gold-dark" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

function Includes({ items }) {
  return (
    <div className="rounded-sm border border-gold/30 bg-cream/50 p-5">
      <p className="type-label text-gold-dark">El salón incluye</p>
      <ul className="mt-3 grid gap-2 text-sm text-ink sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex gap-2"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-gold-dark" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

// Indicador de opción única (círculo con punto) que se llena con un rebote.
export function Radio({ active }) {
  return (
    <span
      className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
        active ? 'border-gold bg-gold' : 'border-gold/25 bg-white'
      }`}
    >
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 20 }}
            className="size-2 rounded-full bg-white"
          />
        )}
      </AnimatePresence>
    </span>
  )
}
