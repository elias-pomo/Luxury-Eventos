import { useEffect } from 'react'
import { site } from '../config/site'

const defaultTitle = `${site.name} | Salón de Eventos`

// Título de la pestaña del navegador. Sin `title` (Inicio) usa el título general.
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : defaultTitle
  }, [title])
}
