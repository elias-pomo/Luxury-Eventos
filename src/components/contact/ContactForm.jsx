import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Send } from 'lucide-react'
import { contactForm } from '../../data/contact'
import { track } from '../../utils/analytics'
import { todayISO } from '../../utils/format'
import { contactMessage, whatsappLink } from '../../utils/whatsapp'
import Button from '../ui/Button'
import Card from '../ui/Card'

const empty = { name: '', date: '', message: '' }

const field =
  'w-full rounded-sm border border-gold/25 bg-white px-4 py-3 text-base text-ink transition-colors outline-none placeholder:text-muted/60 focus:border-gold focus:ring-1 focus:ring-gold'

// Formulario de consulta breve: no envía nada a un servidor, arma el mensaje y
// abre WhatsApp. El detalle del evento (tipo, extras, invitados) va en el cotizador de Servicios.
export default function ContactForm() {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (key === 'name') setError('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Contanos tu nombre')
      document.getElementById('contact-name')?.focus()
      return
    }
    track('contact_sent')
    window.open(whatsappLink(contactMessage(form)), '_blank', 'noopener,noreferrer')
  }

  return (
    <Card as="form" onSubmit={onSubmit} noValidate className="p-5 sm:p-8">
      <h3 className="text-3xl">{contactForm.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{contactForm.subtitle}</p>

      <div className="mt-6 space-y-5">
        <Field id="name" label="Tu nombre" error={error}>
          <input
            id="contact-name"
            value={form.name}
            onChange={set('name')}
            autoComplete="given-name"
            placeholder="Ej: Ana"
            aria-invalid={!!error}
            aria-describedby={error ? 'contact-name-error' : undefined}
            className={field}
          />
        </Field>

        <Field id="date" label="Fecha que buscás">
          <input id="contact-date" type="date" min={todayISO()} value={form.date} onChange={set('date')} className={field} />
        </Field>

        <Field id="message" label="Mensaje">
          <textarea
            id="contact-message"
            rows={4}
            value={form.message}
            onChange={set('message')}
            placeholder={contactForm.messagePlaceholder}
            className={`${field} resize-none`}
          />
        </Field>
      </div>

      <Button type="submit" className="mt-6 w-full">
        <Send className="size-4" /> {contactForm.submit}
      </Button>
    </Card>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-2 block type-label text-muted">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`contact-${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-red-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
