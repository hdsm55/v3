import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <section className="section bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      <span
        className="absolute inset-0 bg-gradient-to-b from-primary to-primary-dark"
        aria-hidden="true"
      ></span>
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-tajawal">
            {t('cta.headline')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 font-almarai">
            {t('cta.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary group bg-secondary hover:bg-secondary-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-secondary/20 font-tajawal"
              >
                {t('cta.buttons.join')}
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                    isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                  }`}
                />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:border-white/50 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 font-tajawal"
              >
                {t('cta.buttons.contact')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}