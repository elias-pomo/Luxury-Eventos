import { site } from '../config/site'

// Arma el link de WhatsApp con un mensaje precargado.
export const whatsappLink = (message = '') => {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${site.whatsapp}${text}`
}

// Mensaje del formulario de Contacto. Los campos vacíos no se incluyen.
// `date` viene del input como 'AAAA-MM-DD'.
export const contactMessage = ({ name, date, message }) => {
  const when = date ? ` para el ${date.split('-').reverse().join('/')}` : ''
  const lines = [`¡Hola ${site.name}! Soy ${name.trim()} y quería consultar disponibilidad${when}.`]
  if (message.trim()) lines.push('', message.trim())
  return lines.join('\n')
}
