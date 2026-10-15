import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import WhatsAppButton from './WhatsAppButton'

export default function Layout() {
  return (
    // Todas las animaciones del sitio respetan "reducir movimiento" del sistema.
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
