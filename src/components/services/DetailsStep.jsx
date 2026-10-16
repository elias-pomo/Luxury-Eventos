import { motion } from 'motion/react'
import { CalendarX, ConciergeBell, Minus, Plus } from 'lucide-react'
import { site } from '../../config/site'
import { staff } from '../../data/pricing'
import { bookedShifts, isDayFull, isShiftBooked } from '../../utils/availability'
import { formatPrice, todayISO } from '../../utils/format'

export const fieldClass =
  'w-full rounded-sm border border-gold/25 bg-white px-4 py-3 text-base text-ink transition-colors outline-none placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold'
const labelClass = 'mb-2 block text-[11px] font-semibold tracking-[0.2em] text-muted uppercase'

// Paso 2: fecha, turno (según el régimen del evento) e invitados.
export default function DetailsStep({ date, shift, guests, schedule, category, waiters, onChange }) {
  const clamp = (n) => Math.min(site.capacity, Math.max(1, Number(n) || 1))
  const setGuests = (n) => onChange({ guests: clamp(n) })
  const stepGuests = (delta) => onChange((s) => ({ guests: clamp(s.guests + delta) }))

  // Fechas reservadas (data/availability.js): se tachan los turnos y se avisa debajo de la fecha.
  const count = schedule.shifts.length
  const taken = bookedShifts(date, count)
  const notice = isDayFull(date, count)
    ? 'Esa fecha ya está reservada. Probá con otro día o consultanos por WhatsApp por si hay un cambio.'
    : taken.size > 0
      ? `El ${schedule.shifts[[...taken][0]].label.toLowerCase()} de ese día ya está reservado. Elegí el otro turno.`
      : ''

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
            onChange={(e) => {
              const date = e.target.value
              // Si el turno que tenía elegido está reservado en la nueva fecha, se limpia.
              onChange((s) => ({ date, shift: isShiftBooked(date, s.shift, count) ? null : s.shift }))
            }}
            aria-describedby={notice ? 'quote-date-notice' : undefined}
            className={fieldClass}
          />
          {notice && (
            <p id="quote-date-notice" role="status" className="mt-2 flex gap-2 text-xs leading-relaxed text-red-800">
              <CalendarX className="mt-0.5 size-4 shrink-0" />
              <span>{notice}</span>
            </p>
          )}
        </div>

        <fieldset>
          <legend className={labelClass}>Turno</legend>
          <div className="grid grid-cols-2 gap-3">
            {schedule.shifts.map(({ label, time }, i) => {
              const active = shift === i
              const booked = taken.has(i)
              return (
                <motion.button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  disabled={booked}
                  onClick={() => onChange({ shift: active ? null : i })}
                  whileTap={{ scale: booked ? 1 : 0.97 }}
                  className={`relative min-h-12 rounded-sm border px-3 py-2 text-center transition-colors duration-300 ${
                    booked
                      ? 'border-gold/25 bg-sand/40 text-muted'
                      : active
                        ? 'border-gold text-white'
                        : 'border-gold/25 bg-white text-ink hover:border-gold'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="shift-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-[1px] bg-gold shadow-gold"
                    />
                  )}
                  <span className={`relative block text-sm font-medium ${booked ? 'line-through' : ''}`}>{label}</span>
                  <span className={`relative block text-xs ${active ? 'text-white/85' : 'text-muted'}`}>
                    {booked ? 'Reservado' : time}
                  </span>
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
          <ConciergeBell className="size-5 text-gold-dark" />
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
