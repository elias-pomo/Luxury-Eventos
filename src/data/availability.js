// Fechas ya reservadas. El cotizador avisa y bloquea el turno al elegirlas.
// Única fuente: Fernanda pasa las fechas y se cargan acá (no hay backend).
//
//   { date: '2026-12-05' }                  → todo el día reservado
//   { date: '2026-12-12', shifts: [1] }     → solo el 2.º turno (0 = primero, 1 = segundo)
//
// Los turnos van por posición porque los dos regímenes de `site.shiftSchedules`
// tienen mismo orden (mediodía/tarde): 0 es el primero y 1 el segundo.
// Mantener la lista ordenada por fecha y borrar las que ya pasaron.
//
// TODO: cargar las fechas reales.
export const bookedDates = []

// Se muestra junto al aviso para que se entienda que la lista puede estar atrasada.
export const bookingsUpdatedAt = ''
