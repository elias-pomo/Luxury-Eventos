// Eventos de analítica. No hace nada si no se configuró Plausible ni GA4
// (config/site.js → analytics), así que se puede llamar desde cualquier lado.
// Los nombres de evento hay que darlos de alta como "objetivos" en Plausible.
export function track(name, props = {}) {
  try {
    window.plausible?.(name, { props })
    window.gtag?.('event', name, props)
  } catch {
    // La analítica nunca debe romper el sitio.
  }
}
