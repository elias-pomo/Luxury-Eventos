import { Baby, Balloon, Church, Crown, Droplets, Gem, Gift, Martini, PartyPopper } from 'lucide-react'

// Tipos de evento del salón. Se usan en el Inicio, la Galería y el cotizador
// de Servicios. Los precios se definen al armar Servicios.
export const eventTypes = [
  {
    id: 'casamientos',
    name: 'Casamientos',
    icon: Gem,
    short: 'Una celebración íntima y elegante para dar el “sí” rodeados de quienes más quieren.',
  },
  {
    id: 'quince',
    name: '15 Años',
    icon: Crown,
    short: 'La noche soñada: ambientación, luces y pista para vivir una fiesta de película.',
  },
  {
    id: 'dieciocho',
    name: '18 Años',
    icon: PartyPopper,
    short: 'Música, luces de colores y mucha onda para festejar la mayoría de edad a lo grande.',
  },
  {
    id: 'infantiles',
    name: 'Infantiles',
    icon: Balloon,
    short: 'Cumpleaños llenos de color y diversión, con temáticas que los chicos van a amar.',
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    icon: Baby,
    short: 'Un encuentro tierno y delicado para recibir al bebé con la familia y amigos.',
  },
  {
    id: 'revelacion',
    name: 'Revelación de Género',
    icon: Gift,
    short: 'El momento más esperado, ambientado para que la sorpresa sea inolvidable.',
  },
  {
    id: 'bautismos',
    name: 'Bautismos',
    icon: Droplets,
    short: 'Una celebración serena y luminosa para compartir este día tan especial.',
  },
  {
    id: 'comuniones',
    name: 'Comuniones',
    icon: Church,
    short: 'Ambientaciones delicadas y cálidas para festejar en familia.',
  },
  {
    id: 'despedidas',
    name: 'Despedidas de Solteros',
    icon: Martini,
    short: 'La última gran fiesta antes del casamiento, con DJ, luces y brindis.',
  },
]
