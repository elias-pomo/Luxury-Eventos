// Precios y condiciones del cotizador de Servicios (en pesos argentinos).
// Única fuente de verdad: para actualizar un precio, cambiarlo solo acá.

export const pricesUpdatedAt = 'noviembre de 2026'

// Personal del salón (se trabaja solo con personal propio).
export const staff = {
  // 1 mozo hasta 34 invitados, 2 desde 35 y 3 desde 72 (máximo 3).
  waiter: { name: 'Mozo', price: 30000, thresholds: [35, 72] },
  // Uno por evento, sin importar la cantidad de invitados.
  kitchenHelper: { name: 'Ayudante de cocina', price: 30000 },
}

// Lo que tienen todos los eventos.
const baseIncludes = ['Vajilla completa', 'Mantelería, mesas y sillas', 'Equipo de sonido', 'Cocina completa y asador', 'Patio para fumadores']

// Extra que se cobra según los invitados (ver `guestServices`): lo admiten todos los planes.
const guestExtras = ['merienda']

// Categorías de precio. `events`: ids de data/events.js que entran en cada una.
// `schedule`: régimen de turnos de config/site.js (shiftSchedules).
// `staffIncluded`: si los mozos y el ayudante ya vienen en el precio.
// Cada plan tiene su precio, lo que incluye y qué extras se pueden sumar.
export const categories = [
  {
    id: 'infantil',
    events: ['infantiles'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [
      {
        id: 'salon',
        name: 'Salón infantil',
        price: 250000,
        includes: [...baseIncludes, 'Pelotero inflable (castillo) y metegol'],
        extras: ['aire', 'dj', 'candy', ...guestExtras],
      },
    ],
  },
  {
    id: 'familiar',
    events: ['baby-shower'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [{ id: 'salon', name: 'Salón', price: 300000, includes: baseIncludes, extras: ['aire', 'dj', 'candy', ...guestExtras] }],
  },
  {
    id: 'religioso',
    events: ['bautismos', 'comuniones'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [{ id: 'salon', name: 'Salón', price: 350000, includes: baseIncludes, extras: ['aire', 'dj', 'candy', ...guestExtras] }],
  },
  {
    id: 'adultos',
    events: ['adultos'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [{ id: 'salon', name: 'Salón', price: 350000, includes: baseIncludes, extras: ['aire', 'dj', 'candy', ...guestExtras] }],
  },
  {
    id: 'premium',
    events: ['quince', 'dieciocho', 'casamientos', 'corporativos'],
    schedule: 'premium',
    staffIncluded: true,
    plans: [
      {
        id: 'premium',
        name: 'Plan Premium',
        price: 600000,
        includes: [
          'Servicio de mozos incluido',
          'Sonido y luces',
          'Aire acondicionado y ventiladores',
          ...baseIncludes.filter((item) => item !== 'Equipo de sonido'),
        ],
        extras: ['dj', 'candy', ...guestExtras],
      },
      {
        id: 'luxury',
        name: 'Paquete Luxury',
        price: 800000,
        badge: 'Con DJ',
        includes: [
          'Todo lo del Plan Premium',
          'DJ del salón con equipamiento completo a tu disposición',
        ],
        extras: ['candy', ...guestExtras],
      },
    ],
  },
]

// Extras opcionales. El candy bar es exclusivo del salón; sus tipos y textos
// están en data/candybar.js y acá solo el precio de cada uno.
export const extras = {
  aire: { name: 'Aire acondicionado', price: 25000, note: 'Opcional, según la época del año.' },
  dj: { name: 'DJ', price: 200000, note: 'Musicalización profesional durante todo el evento.' },
}

// Servicios que dependen de los invitados (pedido de Fernanda, 2026-11-15).
// Cubresillas y caminos de mesa van SIEMPRE en el presupuesto; la merienda es opcional.
export const guestServices = {
  // Uno por invitado.
  cubresillas: { name: 'Cubresillas', price: 750, note: 'Uno por cada invitado.' },
  // Uno cada `perTable` invitados (redondeado hacia arriba) y nunca más de `max`: el salón arma hasta 9 mesas.
  caminos: { name: 'Caminos de mesa', price: 1500, perTable: 10, max: 9, note: 'Uno por mesa: una mesa cada 10 invitados.' },
  // Por invitado. En el salón o con el servicio completo fuera del salón.
  merienda: {
    name: 'Merienda',
    note: 'Se cobra por invitado.',
    options: {
      salon: { name: 'En el salón', price: 2000 },
      afuera: { name: 'Fuera del salón', price: 3500 },
    },
  },
}

export const candyBarPrices = {
  pequeno: 75000,
  mediano: 125000,
  grande: 150000,
  completo: 200000,
}

// Depósito de garantía: igual para todos los eventos. Va APARTE del total
// (no es un costo: se devuelve). Fernanda pide que figure sí o sí en el presupuesto.
export const deposit = {
  name: 'Depósito de garantía',
  amount: 35000,
  note: 'Se abona aparte del total. Cuando termina la fiesta se controla todo y, si no se rompió ni se perdió nada, se reintegra el importe en efectivo o por transferencia.',
}

// Aclaraciones que se muestran junto al total.
export const quoteNotes = [
  'El catering corre por cuenta del cliente: el salón pone la cocina, el asador y el personal.',
  'Se trabaja exclusivamente con mozos y personal del salón.',
]
