import { site } from '../config/site'
import { formatDate, formatPrice } from './format'

// Arma el link de WhatsApp con un mensaje precargado.
export const whatsappLink = (message = '') => {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${site.whatsapp}${text}`
}

// Mensaje del formulario de Contacto. Los campos vacíos no se incluyen.
// `date` viene del input como 'AAAA-MM-DD'.
export const contactMessage = ({ name, date, message }) => {
  const when = date ? ` para el ${formatDate(date)}` : ''
  const lines = [`¡Hola ${site.name}! Soy ${name.trim()} y quería consultar disponibilidad${when}.`]
  if (message.trim()) lines.push('', message.trim())
  return lines.join('\n')
}

// Intl usa un espacio duro después del "$": en WhatsApp queda mejor uno común.
const price = (value) => formatPrice(value).replace(/\s/g, ' ')

// Mensaje del cotizador de Servicios. `quote` es el resultado de buildQuote()
// y `shift` el turno elegido ({ label, time }) o null.
export const quoteMessage = ({ quote, name, date, shift, guests, theme }) => {
  const { event, category, plan, lines: quoteLines, total } = quote
  const eventName = category.plans.length > 1 ? `${event.name} (${plan.name})` : event.name
  const when = [date && formatDate(date), shift && `${shift.label.toLowerCase()} (${shift.time})`].filter(Boolean).join(', ')

  const lines = [`¡Hola ${site.name}! Soy ${name.trim()} y armé mi presupuesto en la web:`, '']
  lines.push(`• Evento: ${eventName}`)
  if (when) lines.push(`• Fecha: ${when}`)
  lines.push(`• Invitados: ${guests}`)
  if (theme.trim()) lines.push(`• Temática: ${theme.trim()}`)

  lines.push('', '*Presupuesto estimado*')
  quoteLines.forEach(({ label, amount, included }) => lines.push(`- ${label}: ${included ? 'incluidos' : price(amount)}`))
  lines.push(`*Total: ${price(total)}*`, '', '¿Tienen disponibilidad para esa fecha?')
  return lines.join('\n')
}
