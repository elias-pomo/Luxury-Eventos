import { AnimatePresence, motion } from 'motion/react'
import { CalendarDays, Clock, RotateCcw, Share2, Sparkles, Users } from 'lucide-react'
import { pricesUpdatedAt, quoteNotes } from '../../data/pricing'
import { formatDate, formatPrice } from '../../utils/format'
import { WhatsAppIcon } from '../icons/SocialIcons'
import AnimatedPrice from '../ui/AnimatedPrice'
import { fieldClass } from './DetailsStep'

// Paso 5: el presupuesto armado, con el total y el envío por WhatsApp.
// Tarjeta marfil con doble marco dorado (como el arco de "Nosotros") y el total
// sobre una franja crema con el enrejado art déco del sitio.
const secondaryButton =
  'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-gold/60 px-2 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-gold-dark uppercase transition-colors hover:bg-gold hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

export default function QuoteSummary({ ref, quote, date, shift, guests, name, error, onNameChange, onSend, onShare, shareStatus, onReset }) {
  return (
    <div ref={ref} className="bg-luxe-center relative rounded-sm border border-gold/50 bg-ivory p-6 shadow-soft sm:p-8">
      <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[1px] border border-gold/25" />

      <p className="relative flex items-center justify-center gap-3 text-xs tracking-[0.35em] text-gold-dark uppercase">
        <span className="h-px w-8 bg-gold" />
        Tu presupuesto
        <span className="h-px w-8 bg-gold" />
      </p>

      {!quote ? (
        <div className="relative mt-6 flex flex-col items-center text-center">
          <motion.span
            animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
            className="flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold"
          >
            <Sparkles className="size-5" />
          </motion.span>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Elegí un tipo de evento y vas a ver acá el presupuesto armándose en tiempo real.
          </p>
        </div>
      ) : (
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h2
              key={`${quote.event.id}-${quote.plan.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 text-center text-3xl leading-tight"
            >
              {quote.event.name}
              {quote.category.plans.length > 1 && <span className="block text-xl text-gold-dark italic">{quote.plan.name}</span>}
            </motion.h2>
          </AnimatePresence>

          <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted">
            <li className="flex items-center gap-1.5">
              <Users className="size-3.5 text-gold" /> {guests} invitados
            </li>
            {date && (
              <li className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-gold" /> {formatDate(date)}
              </li>
            )}
            {shift && (
              <li className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-gold" /> {shift.time}
              </li>
            )}
          </ul>

          <ul className="mt-6 space-y-3 border-t border-sand pt-5 text-sm">
            <AnimatePresence initial={false}>
              {quote.lines.map(({ label, amount, included }) => (
                <motion.li
                  key={label}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-muted">{label}</span>
                  <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-gold/40" />
                  {included ? (
                    <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.15em] text-gold-dark uppercase">
                      Incluidos
                    </span>
                  ) : (
                    <span className="shrink-0 text-ink">{formatPrice(amount)}</span>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {/* Franja del total: brilla un instante cada vez que cambia. */}
          <div className="bg-luxe-cream relative -mx-4 mt-6 overflow-hidden border-y border-gold/30 px-4 py-5 sm:-mx-6 sm:px-6">
            <motion.span
              key={quote.total}
              aria-hidden="true"
              initial={{ opacity: 0.7, x: '-100%' }}
              animate={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-gold-light/60 to-transparent"
            />
            <div className="relative flex items-end justify-between gap-4">
              <span className="text-[11px] tracking-[0.25em] text-muted uppercase">Total estimado</span>
              <AnimatedPrice value={quote.total} className="font-display text-4xl text-gold-gradient sm:text-5xl" />
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSend()
        }}
        noValidate
        className="relative mt-7"
      >
        <label htmlFor="quote-name" className="mb-2 block text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
          Tu nombre
        </label>
        <input
          id="quote-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          autoComplete="given-name"
          placeholder="Ej: Ana"
          aria-invalid={!!error}
          aria-describedby={error ? 'quote-error' : undefined}
          className={fieldClass}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              id="quote-error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-xs text-red-700"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-gold transition-colors duration-300 hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <WhatsAppIcon className="size-4" /> Enviar por WhatsApp
        </motion.button>
      </form>

      {quote && (
        <div className="relative mt-3 grid grid-cols-2 gap-3">
          <button type="button" onClick={onShare} className={secondaryButton}>
            <Share2 className="size-4" /> {shareStatus || 'Compartir'}
          </button>
          <button type="button" onClick={onReset} className={secondaryButton}>
            <RotateCcw className="size-4" /> Empezar de nuevo
          </button>
        </div>
      )}

      <ul className="relative mt-6 space-y-1.5 text-[11px] leading-relaxed text-muted/80">
        <li>Total estimado. Precios actualizados a {pricesUpdatedAt}; la reserva se confirma por WhatsApp.</li>
        {quoteNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  )
}
