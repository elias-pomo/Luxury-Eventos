import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DetailsStep, { fieldClass } from '../components/services/DetailsStep'
import EventStep from '../components/services/EventStep'
import ExtrasStep from '../components/services/ExtrasStep'
import MobileTotalBar from '../components/services/MobileTotalBar'
import QuoteSummary from '../components/services/QuoteSummary'
import Step from '../components/services/Step'
import PageHeader from '../components/ui/PageHeader'
import { pageTitles, site } from '../config/site'
import { usePageTitle } from '../utils/usePageTitle'
import { candyBars } from '../data/candybar'
import { images } from '../data/images'
import { buildQuote, findCategory } from '../utils/quote'
import { quoteMessage, whatsappLink } from '../utils/whatsapp'

// Lo elegido al entrar puede venir en la URL: ?tipo=<evento> (Inicio, Galería) y
// ?candy=<candy bar> (botón "Sumalo a tu evento" de la Galería).
const initialSelection = (eventId, candyId) => ({
  eventId: findCategory(eventId) ? eventId : '',
  planId: '',
  date: '',
  shift: null, // índice dentro del régimen de turnos del evento
  guests: 50,
  theme: '',
  aire: false,
  dj: false,
  candyId: candyBars.some((c) => c.id === candyId) ? candyId : '',
})

export default function Services() {
  usePageTitle(pageTitles.servicios)
  const [params] = useSearchParams()
  const [selection, setSelection] = useState(() => initialSelection(params.get('tipo'), params.get('candy')))
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const summaryRef = useRef(null)
  const showBar = useSummaryBelow(summaryRef)

  // `patch` puede ser un objeto o una función del estado actual (para clics seguidos).
  const update = (patch) => setSelection((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }))
  const quote = useMemo(() => buildQuote(selection), [selection])
  const category = quote?.category
  const schedule = site.shiftSchedules[category?.schedule ?? 'standard']
  const shift = selection.shift === null ? null : schedule.shifts[selection.shift]

  // Guía el recorrido: al elegir el evento baja al paso 2 (o primero al plan, si
  // el evento tiene Premium/Luxury) y al elegir el candy bar baja al presupuesto.
  const onEventChange = (eventId) => {
    // Al cambiar de categoría vuelve al primer plan (ej: Premium).
    const next = findCategory(eventId)
    update({ eventId, planId: next === category ? selection.planId : '' })
    setError('')
    scrollToStep(next.plans.length > 1 ? 'elegi-tu-plan' : 'paso-2')
  }

  const onPlanChange = (planId) => {
    update({ planId })
    scrollToStep('paso-2')
  }

  const onExtrasChange = (patch) => {
    update(patch)
    // En escritorio el presupuesto ya está a la vista, fijo al costado.
    if ('candyId' in patch && !window.matchMedia('(min-width: 1024px)').matches) scrollToStep('presupuesto')
  }

  const onSend = () => {
    if (!quote) return setError('Elegí el tipo de evento para armar tu presupuesto.')
    if (!name.trim()) {
      document.getElementById('quote-name')?.focus()
      return setError('Contanos tu nombre para enviar el presupuesto.')
    }
    const message = quoteMessage({ quote, name, date: selection.date, shift, guests: selection.guests, theme: selection.theme })
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  const scrollToSummary = () => scrollToStep('presupuesto', 0)

  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Armá tu evento"
        subtitle="Elegí tu fiesta, la fecha y los extras: el presupuesto se arma en tiempo real y nos lo enviás por WhatsApp."
        image={images.party}
      />

      <section className="bg-luxe py-14 sm:py-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="space-y-10">
            <Step number={1} title="¿Qué vas a festejar?" subtitle="Elegí el tipo de evento para ver qué incluye y su precio.">
              <EventStep
                eventId={selection.eventId}
                plan={quote?.plan}
                onEventChange={onEventChange}
                onPlanChange={onPlanChange}
              />
            </Step>

            <Step number={2} title="Fecha, turno e invitados" subtitle={schedule.label && `Turnos para ${schedule.label.toLowerCase()}.`}>
              <DetailsStep
                date={selection.date}
                shift={selection.shift}
                guests={selection.guests}
                schedule={schedule}
                category={category}
                waiters={quote?.waiters ?? 1}
                onChange={update}
              />
            </Step>

            <Step
              number={3}
              title="Temática y decoración"
              subtitle={`Contanos qué te imaginás. Los detalles de la decoración los charlás con ${site.owner.split(' ')[0]} por WhatsApp.`}
            >
              <label htmlFor="quote-theme" className="sr-only">
                Temática deseada
              </label>
              <textarea
                id="quote-theme"
                rows={3}
                value={selection.theme}
                onChange={(e) => update({ theme: e.target.value })}
                placeholder="Ej: Frozen en celeste y blanco, boho en tonos tierra, París con detalles dorados…"
                className={`${fieldClass} resize-none`}
              />
            </Step>

            <Step number={4} title="Extras" subtitle="Sumá lo que quieras: el total se actualiza al instante.">
              <ExtrasStep plan={quote?.plan} category={category} values={selection} onChange={onExtrasChange} />
            </Step>
          </div>

          {/* En escritorio queda fijo al costado; si no entra en la pantalla, scrollea por dentro. */}
          <div id="presupuesto" className="scroll-mt-24 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto">
            <QuoteSummary
              ref={summaryRef}
              quote={quote}
              date={selection.date}
              shift={shift}
              guests={selection.guests}
              name={name}
              error={error}
              onNameChange={(value) => {
                setName(value)
                setError('')
              }}
              onSend={onSend}
            />
          </div>
        </div>
      </section>

      <MobileTotalBar total={quote?.total ?? 0} visible={!!quote && showBar} onView={scrollToSummary} />
    </>
  )
}

// Baja hasta una sección del cotizador. La pequeña espera deja que termine de
// aparecer lo que se acaba de elegir antes de medir; si todavía no existe (ej: las
// tarjetas de plan esperan a que salga el bloque anterior), reintenta un momento.
function scrollToStep(id, delay = 350, retries = 10) {
  setTimeout(() => {
    const target = document.getElementById(id)
    if (!target) {
      if (retries > 0) scrollToStep(id, 100, retries - 1)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, delay)
}

// true mientras el resumen todavía está más abajo de lo visible (para mostrar
// la barra del total en celular); false cuando ya entró en pantalla o quedó arriba.
function useSummaryBelow(ref) {
  const [below, setBelow] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setBelow(!entry.isIntersecting && entry.boundingClientRect.top > 0)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
  return below
}
