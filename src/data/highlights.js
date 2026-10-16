import { AirVent, Candy, Castle, Cigarette, ConciergeBell, CookingPot, Disc3, Speaker, UtensilsCrossed } from 'lucide-react'
import { site } from '../config/site'
import { staff } from './pricing'

const [twoWaiters, threeWaiters] = staff.waiter.thresholds

// Comodidades del salón para la sección de info general del Inicio.
// `badge`: 'included' viene con el salón · 'required' se cobra aparte pero es
// obligatorio · 'optional' se contrata aparte si el cliente lo desea ·
// 'kids' solo en eventos infantiles. Los precios están en data/pricing.js.
export const highlights = [
  {
    icon: Speaker,
    title: 'Sonido y luces',
    text: 'Equipo de sonido en todos los eventos, y luces para la pista en los eventos premium: 15, 18, casamientos y corporativos.',
    badge: 'included',
  },
  {
    icon: AirVent,
    title: 'Climatización',
    text: 'Aire acondicionado y ventiladores incluidos en los eventos premium. En el resto, el aire se suma como opcional según la época.',
    badge: 'included',
  },
  {
    icon: CookingPot,
    title: 'Cocina y asador',
    text: 'Cocina completa, asador y todo lo necesario para el evento. El catering lo elegís vos: nosotros ponemos el espacio y el personal.',
    badge: 'included',
  },
  {
    icon: UtensilsCrossed,
    title: 'Vajilla y mobiliario',
    text: `Toda la vajilla, mantelería, mesas y sillas para hasta ${site.capacity} invitados, listas el día de tu evento.`,
    badge: 'included',
  },
  {
    icon: Cigarette,
    title: 'Patio para fumadores',
    text: 'Un pequeño patio al aire libre para que los que fuman no tengan que salir del salón.',
    badge: 'included',
  },
  {
    icon: Castle,
    title: 'Pelotero y metegol',
    text: 'Castillo inflable y metegol para que los chicos se diviertan durante toda la fiesta.',
    badge: 'kids',
  },
  {
    icon: ConciergeBell,
    title: 'Mozos y cocina',
    text: 'Personal exclusivo del salón: de 1 a 3 mozos según la cantidad de invitados y un ayudante de cocina por evento.',
    badge: 'required',
  },
  {
    icon: Disc3,
    title: 'DJ',
    text: 'Musicalización profesional que lee la pista. Se suma como extra o viene incluido en el Paquete Luxury.',
    badge: 'optional',
  },
  {
    icon: Candy,
    title: 'Candy bar',
    text: 'Una mesa dulce exclusiva del salón, ambientada a tono con tu temática, en tres estilos para elegir.',
    badge: 'optional',
  },
]

export const badgeLabels = {
  included: 'Incluido',
  required: 'Obligatorio',
  optional: 'Opcional',
  kids: 'Infantiles',
}

export const highlightsIntro =
  'Vajilla, sonido, cocina con asador y patio vienen con el salón. Tocá cada uno para ver el detalle.'

export const highlightsNote =
  `Los mozos (1 hasta ${twoWaiters - 1} invitados, 2 desde ${twoWaiters} y 3 desde ${threeWaiters}) y el ayudante de cocina se cotizan aparte en todos los eventos, salvo en los premium, donde ya vienen incluidos.`
