import { site } from '../config/site'
import { extras, quoteNotes, staff } from './pricing'
import { formatPrice } from '../utils/format'

// Preguntas frecuentes de Contacto. Todo sale de datos reales del salón
// (config/site.js y data/pricing.js); lo que depende de Fernanda se deriva a WhatsApp.
// TODO: confirmar con el salón y sumar seña, cancelaciones y horario de armado cuando los definan.

const [firstThreshold, secondThreshold] = staff.waiter.thresholds
const owner = site.owner.split(' ')[0]

export const faqTitle = 'Lo que más nos preguntan'
export const faqSubtitle = `Si tu duda no está acá, escribile a ${owner} por WhatsApp y te responde enseguida.`

export const faqs = [
  {
    question: '¿Para cuántos invitados es el salón?',
    answer: `El salón tiene capacidad para hasta ${site.capacity} invitados, con vajilla, mantelería, mesas y sillas para todos.`,
  },
  {
    question: '¿Qué horarios y turnos hay?',
    answer: Object.values(site.shiftSchedules)
      .map(({ label, shifts }) => `${label}: ${shifts.map((s) => `${s.label.toLowerCase()} de ${s.time}`).join(' y ')}.`)
      .join(' '),
  },
  {
    question: '¿La comida está incluida?',
    answer: `${quoteNotes[0]} Tenés cocina completa y asador para que el servicio que elijas trabaje cómodo.`,
  },
  {
    question: '¿Hay mozos?',
    answer: `Sí, y se trabaja solo con el personal del salón. En los planes salón la cantidad depende de los invitados: 1 hasta ${firstThreshold - 1}, 2 desde ${firstThreshold} y 3 desde ${secondThreshold} (${formatPrice(staff.waiter.price)} cada uno), más un ayudante de cocina. En 15, 18, casamientos y corporativos ya vienen incluidos.`,
  },
  {
    question: '¿El salón tiene aire acondicionado?',
    answer: `Está climatizado. En los planes Premium y Luxury el aire va incluido; en los demás eventos podés sumarlo por ${formatPrice(extras.aire.price)}, según la época del año.`,
  },
  {
    question: '¿Puedo sumar DJ o candy bar?',
    answer: `Sí. El DJ cuesta ${formatPrice(extras.dj.price)} (viene incluido en el Paquete Luxury) y el candy bar tiene tres opciones. Los sumás directamente en el cotizador y ves el total al instante.`,
  },
  {
    question: '¿Cómo reservo mi fecha?',
    answer: `Armá tu evento en el cotizador o escribinos con la fecha que buscás: ${owner} te confirma la disponibilidad y te explica cómo seguir.`,
  },
]
