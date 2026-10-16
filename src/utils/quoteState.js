import { site } from '../config/site'
import { candyBars } from '../data/candybar'
import { findCategory } from './quote'
import { todayISO } from './format'

// Estado del cotizador: se guarda en el navegador (para no perderlo al cerrar o
// volver desde WhatsApp) y viaja en un link para compartirlo. El nombre no va en el link.

const STORAGE_KEY = 'luxury-eventos:presupuesto'

export const emptySelection = {
  eventId: '',
  planId: '',
  date: '',
  shift: null, // posición dentro del régimen de turnos del evento
  guests: 50,
  theme: '',
  aire: false,
  dj: false,
  candyId: '',
}

// Deja solo valores válidos: sirve para lo guardado y para lo que llega por URL,
// que puede estar desactualizado (fecha pasada, plan que ya no existe) o editado a mano.
export function sanitize(raw = {}) {
  const out = {}
  const category = findCategory(raw.eventId)
  if (category) {
    out.eventId = raw.eventId
    if (category.plans.some((p) => p.id === raw.planId)) out.planId = raw.planId
    const shifts = site.shiftSchedules[category.schedule].shifts
    if (Number.isInteger(raw.shift) && raw.shift >= 0 && raw.shift < shifts.length) out.shift = raw.shift
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw.date ?? '') && raw.date >= todayISO()) out.date = raw.date
  const guests = Number(raw.guests)
  if (Number.isFinite(guests) && guests >= 1) out.guests = Math.min(site.capacity, Math.round(guests))
  if (typeof raw.theme === 'string') out.theme = raw.theme.slice(0, 300)
  if (raw.aire === true) out.aire = true
  if (raw.dj === true) out.dj = true
  if (candyBars.some((c) => c.id === raw.candyId)) out.candyId = raw.candyId
  return out
}

// --- Link ---

export function selectionToParams(s) {
  const p = new URLSearchParams()
  if (s.eventId) p.set('tipo', s.eventId)
  if (s.planId) p.set('plan', s.planId)
  if (s.date) p.set('fecha', s.date)
  if (s.shift !== null) p.set('turno', String(s.shift))
  p.set('inv', String(s.guests))
  if (s.aire) p.set('aire', '1')
  if (s.dj) p.set('dj', '1')
  if (s.candyId) p.set('candy', s.candyId)
  if (s.theme.trim()) p.set('tema', s.theme.trim())
  return p
}

export function paramsToSelection(p) {
  return sanitize({
    eventId: p.get('tipo'),
    planId: p.get('plan'),
    date: p.get('fecha'),
    shift: p.has('turno') ? Number(p.get('turno')) : null,
    guests: p.get('inv'),
    aire: p.get('aire') === '1',
    dj: p.get('dj') === '1',
    candyId: p.get('candy'),
    theme: p.get('tema') ?? '',
  })
}

// --- Navegador ---

export function loadSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!saved) return null
    return { selection: sanitize(saved.selection), name: typeof saved.name === 'string' ? saved.name.slice(0, 60) : '' }
  } catch {
    return null
  }
}

export function save(selection, name) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selection, name }))
  } catch {
    // Navegación privada o almacenamiento lleno: simplemente no se guarda.
  }
}

export function clearSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ídem
  }
}
