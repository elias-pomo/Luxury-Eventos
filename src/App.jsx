import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// El Inicio va en el paquete principal (es donde llega casi todo el mundo); el
// resto de las páginas se descargan recién cuando se visitan.
const Gallery = lazy(() => import('./pages/Gallery'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="galeria" element={<Page><Gallery /></Page>} />
        <Route path="servicios" element={<Page><Services /></Page>} />
        <Route path="contacto" element={<Page><Contact /></Page>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Route>
    </Routes>
  )
}

// Mientras se descarga la página se muestra un espacio vacío del alto de la
// pantalla, así el pie no salta hacia arriba.
function Page({ children }) {
  return <Suspense fallback={<div className="min-h-dvh" />}>{children}</Suspense>
}
