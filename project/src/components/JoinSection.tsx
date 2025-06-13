import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function JoinSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <section className="section bg-gradient-to-br from-accent to-accent-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-tajawal">
            {t('join.heading')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 font-almarai">
            {t('join.subheading')}
          </p>
          <Link to="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary group bg-white hover:bg-white/90 text-accent font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 hover:shadow-xl hover:shadow-white/20 font-tajawal"
            >
              {t('join.button')}
              <ArrowRight
                className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}