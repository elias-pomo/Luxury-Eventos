// Precios y condiciones del cotizador de Servicios (en pesos argentinos).
// Única fuente de verdad: para actualizar un precio, cambiarlo solo acá.

export const pricesUpdatedAt = 'octubre de 2026'

// Personal del salón (se trabaja solo con personal propio).
export const staff = {
  // 1 mozo hasta 30 invitados, 2 desde 31 y 3 desde 61 (máximo 3).
  waiter: { name: 'Mozo', price: 30000, thresholds: [31, 61] },
  // Uno por evento, sin importar la cantidad de invitados.
  kitchenHelper: { name: 'Ayudante de cocina', price: 30000 },
}

// Lo que tienen todos los eventos.
const baseIncludes = ['Vajilla completa', 'Mantelería, mesas y sillas', 'Equipo de sonido', 'Cocina completa y asador', 'Patio para fumadores']

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
        extras: ['aire', 'dj', 'candy'],
      },
    ],
  },
  {
    id: 'familiar',
    events: ['baby-shower', 'revelacion'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [{ id: 'salon', name: 'Salón', price: 300000, includes: baseIncludes, extras: ['aire', 'dj', 'candy'] }],
  },
  {
    id: 'religioso',
    events: ['bautismos', 'comuniones'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [{ id: 'salon', name: 'Salón', price: 350000, includes: baseIncludes, extras: ['aire', 'dj', 'candy'] }],
  },
  {
    id: 'despedida',
    events: ['despedidas'],
    schedule: 'standard',
    staffIncluded: false,
    plans: [{ id: 'salon', name: 'Salón', price: 350000, includes: baseIncludes, extras: ['aire', 'dj', 'candy'] }],
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
          '3 mozos y ayudante de cocina',
          'Habilitación IPLA (alcohol en horario nocturno)',
          'Sonido y luces',
          'Aire acondicionado y ventiladores',
          ...baseIncludes.filter((item) => item !== 'Equipo de sonido'),
        ],
        extras: ['dj', 'candy'],
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
        extras: ['candy'],
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

export const candyBarPrices = {
  clasico: 75000,
  tematico: 100000,
  premium: 150000,
}

// Aclaraciones que se muestran junto al total.
export const quoteNotes = [
  'El catering corre por cuenta del cliente: el salón pone la cocina, el asador y el personal.',
  'Se trabaja exclusivamente con mozos y personal del salón.',
]
