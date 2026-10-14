import { site } from '../config/site'

// Arma el link de WhatsApp con un mensaje precargado.
export const whatsappLink = (message = '') => {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${site.whatsapp}${text}`
}
