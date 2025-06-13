import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Heart, Users, Globe, Award } from 'lucide-react'

export default function CoreValuesSection() {
  const { t } = useTranslation()
  const values = [
    {
      icon: Heart,
      title: t('values.compassion.title'),
      description: t('values.compassion.description'),
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
    },
    {
      icon: Users,
      title: t('values.community.title'),
      description: t('values.community.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Globe,
      title: t('values.sustainability.title'),
      description: t('values.sustainability.description'),
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Award,
      title: t('values.excellence.title'),
      description: t('values.excellence.description'),
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-tajawal">
            {t('values.heading')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {t('values.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card card-hover h-full"
              >
                <div className={`w-12 h-12 ${value.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${value.color}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-tajawal">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-almarai">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}