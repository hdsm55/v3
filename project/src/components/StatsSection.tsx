import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function StatsSection() {
  const { t } = useTranslation()
  const stats = [
    { value: '100+', label: t('stats.volunteers') },
    { value: '50+', label: t('stats.projects') },
    { value: '1000+', label: t('stats.beneficiaries') },
    { value: '10+', label: t('stats.partners') },
  ]

  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="card card-hover border border-gray-100 hover:border-gray-200 transition-colors">
                <h3 className="text-4xl font-bold text-primary mb-2 font-tajawal">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-almarai">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}