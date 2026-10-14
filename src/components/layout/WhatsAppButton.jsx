import { motion } from 'motion/react'
import { WhatsAppIcon } from '../icons/SocialIcons'
import { whatsappLink } from '../../utils/whatsapp'
import { site } from '../../config/site'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink(`¡Hola ${site.name}! Quisiera hacer una consulta.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
    >
      <WhatsAppIcon className="size-7" />
    </motion.a>
  )
}
