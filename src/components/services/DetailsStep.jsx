import { motion } from 'motion/react'
import { ConciergeBell, Minus, Plus } from 'lucide-react'
import { site } from '../../config/site'
import { staff } from '../../data/pricing'
import { formatPrice, todayISO } from '../../utils/format'

export const fieldClass =
  'w-full rounded-sm border border-sand bg-white px-4 py-3 text-base text-ink transition-colors outline-none placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold'
const labelClass = 'mb-2 block text-[11px] font-semibold tracking-[0.2em] text-muted uppercase'

// Paso 2: fecha, turno (según el régimen del evento) e invitados.
export default function DetailsStep({ date, shift, guests, schedule, category, waiters, onChange }) {
  const clamp = (n) => Math.min(site.capacity, Math.max(1, Number(n) || 1))
  const setGuests = (n) => onChange({ guests: clamp(n) })
  const stepGuests = (delta) => onChange((s) => ({ guests: clamp(s.guests + delta) }))

  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-date" className={labelClass}>
            Fecha
          </label>
          <input
            id="quote-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => onChange({ date: e.target.value })}
            className={fieldClass}
          />
        </div>

        <fieldset>
          <legend className={labelClass}>Turno</legend>
          <div className="grid grid-cols-2 gap-3">
            {schedule.shifts.map(({ label, time }, i) => {
              const active = shift === i
              return (
                <motion.button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ shift: active ? null : i })}
                  whileTap={{ scale: 0.97 }}
                  className={`relative min-h-12 rounded-sm border px-3 py-2 text-center transition-colors duration-300 ${
                    active ? 'border-gold text-white' : 'border-sand bg-white text-ink hover:border-gold'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="shift-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-[1px] bg-gold shadow-gold"
                    />
                  )}
                  <span className="relative block text-sm font-medium">{label}</span>
                  <span className={`relative block text-xs ${active ? 'text-white/85' : 'text-muted'}`}>{time}</span>
                </motion.button>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor="quote-guests" className={labelClass}>
          Invitados <span className="font-normal tracking-normal normal-case">(máximo {site.capacity})</span>
        </label>
        <div className="flex items-center gap-4">
          <StepperButton label="Menos invitados" icon={Minus} disabled={guests <= 1} onClick={() => stepGuests(-1)} />
          <output htmlFor="quote-guests" className="w-20 overflow-hidden text-center font-display text-5xl leading-none text-ink">
            <motion.span
              key={guests}
              initial={{ y: -10, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              {guests}
            </motion.span>
          </output>
          <StepperButton label="Más invitados" icon={Plus} disabled={guests >= site.capacity} onClick={() => stepGuests(1)} />
        </div>
        <input
          id="quote-guests"
          type="range"
          min="1"
          max={site.capacity}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          style={{ '--fill': `${((guests - 1) / (site.capacity - 1)) * 100}%` }}
          className="range-gold mt-6 w-full"
        />
      </div>

      {/* Se resalta (y suena la campanita) cada vez que cambia la cantidad de mozos. */}
      <motion.div
        key={category?.staffIncluded ? 'incluidos' : waiters}
        initial={{ backgroundColor: 'rgb(197 160 89 / 0.28)' }}
        animate={{ backgroundColor: 'rgb(244 237 225 / 0.7)' }}
        transition={{ duration: 1.2 }}
        className="flex gap-3 rounded-sm px-4 py-3.5 text-sm text-muted"
      >
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -18, 14, -8, 0] }}
          transition={{ duration: 0.7 }}
          className="mt-0.5 shrink-0 origin-top"
        >
          <ConciergeBell className="size-5 text-gold" />
        </motion.span>
        <p>
          {category?.staffIncluded ? (
            <>
              <span className="font-semibold text-ink">Mozos y ayudante de cocina incluidos.</span> Trabajamos solo con
              personal del salón.
            </>
          ) : (
            <>
              Con {guests} {guests === 1 ? 'invitado' : 'invitados'} van{' '}
              <span className="font-semibold text-ink">
                {waiters} {waiters === 1 ? 'mozo' : 'mozos'} y un ayudante de cocina
              </span>{' '}
              ({formatPrice(staff.waiter.price)} por mozo y {formatPrice(staff.kitchenHelper.price)} el ayudante), personal
              exclusivo del salón.
            </>
          )}
        </p>
      </motion.div>
    </div>
  )
}

function StepperButton({ label, icon: Icon, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold-dark transition-colors hover:bg-gold hover:text-white active:bg-gold active:text-white disabled:pointer-events-none disabled:opacity-30"
      {...props}
    >
      <Icon className="size-5" />
    </button>
  )
}
