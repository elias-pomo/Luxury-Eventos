import { AirVent, Candy, ConciergeBell, Disc3, Lightbulb, Speaker } from 'lucide-react'

// Comodidades del salón para la sección de info general del Inicio.
// `badge`: 'included' viene con el salón · 'required' se cobra aparte pero es
// obligatorio · 'optional' se contrata aparte si el cliente lo desea.
export const highlights = [
  {
    icon: Speaker,
    title: 'Sonido Premium',
    text: 'Equipos JBL de máxima calidad que llenan el salón con un sonido claro y potente, tanto en la cena como en la pista.',
    badge: 'included',
  },
  {
    icon: Lightbulb,
    title: 'Luces personalizadas',
    text: 'Iluminación ambiental que transforma el salón: tonos cálidos para la recepción y colores vibrantes para el baile.',
    badge: 'included',
  },
  {
    icon: AirVent,
    title: 'Aire acondicionado',
    text: 'Salón totalmente climatizado para que tus invitados estén cómodos en pleno verano tucumano o en invierno.',
    badge: 'included',
  },
  {
    icon: ConciergeBell,
    title: 'Mozos y cocina',
    text: 'Personal propio y capacitado: un mozo cada 30 invitados y un ayudante de cocina por evento.',
    badge: 'required',
  },
  {
    icon: Disc3,
    title: 'DJ',
    text: 'Musicalización profesional que lee la pista y arma la playlist ideal según tu tipo de fiesta.',
    badge: 'optional',
  },
  {
    icon: Candy,
    title: 'Candy bar',
    text: 'Una mesa dulce ambientada con golosinas y detalles a tono con tu temática, que se roba todas las miradas.',
    badge: 'optional',
  },
]

export const badgeLabels = {
  included: 'Incluido',
  required: 'Obligatorio',
  optional: 'Opcional',
}
