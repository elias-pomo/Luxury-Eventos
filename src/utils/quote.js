import { candyBars } from '../data/candybar'
import { eventTypes } from '../data/events'
import { formatPrice } from './format'
import { candyBarPrices, categories, extras, guestServices, staff } from '../data/pricing'

export const findEvent = (eventId) => eventTypes.find((event) => event.id === eventId)
export const findCategory = (eventId) => categories.find((category) => category.events.includes(eventId))

// Mozos según invitados: 1 de base y uno más por cada umbral alcanzado.
export const waitersFor = (guests) => 1 + staff.waiter.thresholds.filter((min) => guests >= min).length

// Caminos de mesa: uno cada 10 invitados (redondeado hacia arriba), hasta el máximo de mesas del salón.
export const runnersFor = (guests) => Math.min(guestServices.caminos.max, Math.ceil(guests / guestServices.caminos.perTable))

// Precio más bajo de cada evento, para mostrar "desde $..." al elegirlo.
export const startingPrice = (eventId) => Math.min(...findCategory(eventId).plans.map((plan) => plan.price))

// Arma el presupuesto a partir de lo elegido en el cotizador. Devuelve null si
// todavía no hay evento. Los extras que el plan no admite se ignoran.
// `kind` de cada línea: 'venue' (salón) · 'staff' (obligatorio) · 'extra' (opcional).
export function buildQuote({ eventId, planId, guests, aire, dj, cubresillas, caminos, candyId, merienda }) {
  const category = findCategory(eventId)
  if (!category) return null
  const plan = category.plans.find((p) => p.id === planId) ?? category.plans[0]
  const allows = (extra) => plan.extras.includes(extra)
  const waiters = waitersFor(guests)

  const lines = [{ kind: 'venue', label: plan.name, amount: plan.price }]

  if (category.staffIncluded) {
    lines.push({ kind: 'staff', label: 'Servicio de mozos', amount: 0, included: true })
  } else {
    lines.push({ kind: 'staff', label: `${waiters} ${waiters === 1 ? 'mozo' : 'mozos'}`, amount: waiters * staff.waiter.price })
    lines.push({ kind: 'staff', label: staff.kitchenHelper.name, amount: staff.kitchenHelper.price })
  }

  if (allows('aire') && aire) lines.push({ kind: 'extra', label: extras.aire.name, amount: extras.aire.price })
  if (allows('dj') && dj) lines.push({ kind: 'extra', label: extras.dj.name, amount: extras.dj.price })

  // Cubresillas y caminos de mesa: opcionales, el precio depende de los invitados.
  if (allows('cubresillas') && cubresillas) {
    const { name, price } = guestServices.cubresillas
    lines.push({ kind: 'extra', label: `${name} (${guests} × ${formatPrice(price)})`, amount: guests * price })
  }
  if (allows('caminos') && caminos) {
    const { name, price } = guestServices.caminos
    const runners = runnersFor(guests)
    lines.push({ kind: 'extra', label: `${name} (${runners} × ${formatPrice(price)})`, amount: runners * price })
  }

  const snack = allows('merienda') && guestServices.merienda.options[merienda]
  if (snack) {
    lines.push({ kind: 'extra', label: `Merienda ${snack.name.toLowerCase()} (${guests} × ${formatPrice(snack.price)})`, amount: guests * snack.price })
  }

  const candy = allows('candy') && candyBars.find((c) => c.id === candyId)
  if (candy) lines.push({ kind: 'extra', label: `Candy bar ${candy.name}`, amount: candyBarPrices[candy.id] })

  return {
    event: findEvent(eventId),
    category,
    plan,
    waiters,
    lines,
    total: lines.reduce((sum, line) => sum + line.amount, 0),
  }
}
