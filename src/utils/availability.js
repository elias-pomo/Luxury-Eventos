import { bookedDates } from '../data/availability'

// Turnos reservados de una fecha ('AAAA-MM-DD') como Set de posiciones.
// `shiftCount` es la cantidad de turnos del régimen del evento.
export function bookedShifts(date, shiftCount = 2) {
  const all = new Set(Array.from({ length: shiftCount }, (_, i) => i))
  if (!date) return new Set()
  const entry = bookedDates.find((b) => b.date === date)
  if (!entry) return new Set()
  return entry.shifts ? new Set(entry.shifts.filter((i) => all.has(i))) : all
}

export const isShiftBooked = (date, shift, shiftCount = 2) => shift !== null && bookedShifts(date, shiftCount).has(shift)

export const isDayFull = (date, shiftCount = 2) => !!date && bookedShifts(date, shiftCount).size >= shiftCount
