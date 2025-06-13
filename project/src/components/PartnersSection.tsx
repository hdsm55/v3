// FILE: src/components/PartnersSection.tsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ImageLoader from './ImageLoader'

const partners = [
  {
    name: 'UNICEF',
    logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg',
  },
  {
    name: 'UNESCO',
    logo: 'https://images.pexels.com/photos/2977547/pexels-photo-2977547.jpeg',
  },
  {
    name: 'WHO',
    logo: 'https://images.pexels.com/photos/2977549/pexels-photo-2977549.jpeg',
  },
  {
    name: 'UNDP',
    logo: 'https://images.pexels.com/photos/2977551/pexels-photo-2977551.jpeg',
  },
  {
    name: 'World Bank',
    logo: 'https://images.pexels.com/photos/2977553/pexels-photo-2977553.jpeg',
  },
  {
    name: 'USAID',
    logo: 'https://images.pexels.com/photos/2977555/pexels-photo-2977555.jpeg',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function PartnersSection() {
  const { t } = useTranslation()

  return (
    <section
      id="partners"
      className="py-24 bg-gradient-to-b from-cetacean/90 to-black/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-tajawal font-bold text-white mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-xl font-almarai text-white/80 max-w-3xl mx-auto">
            {t(
              'partners.subtitle',
              'Working with leading organizations to create global impact',
            )}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group"
            >
              <div className="aspect-[3/2] overflow-hidden rounded-lg bg-white/10 p-4 hover:bg-white/20 transition-all duration-300">
                <ImageLoader
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-center mt-3 text-white/80 font-almarai text-sm group-hover:text-white transition-colors">
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
