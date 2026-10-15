const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export const formatPrice = (value) => currency.format(value)

// 'AAAA-MM-DD' (valor de un <input type="date">) → 'DD/MM/AAAA'
export const formatDate = (date) => date.split('-').reverse().join('/')

// Fecha local de hoy en formato AAAA-MM-DD (mínimo de los selectores de fecha).
export const todayISO = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}
