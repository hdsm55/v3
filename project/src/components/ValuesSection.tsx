// FILE: src/components/ValuesSection.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Users, Globe, Zap, Heart, Target, Award } from 'lucide-react'

type ValueItem = {
  key:
    | 'leadership'
    | 'diversity'
    | 'impact'
    | 'innovation'
    | 'community'
    | 'global'
  icon: React.ElementType
  image: string
  color: string
  bgColor: string
  iconBg: string
  iconColor: string
}

const values: ValueItem[] = [
  {
    key: 'leadership',
    icon: Award,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    key: 'diversity',
    icon: Users,
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    color: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-500/10',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    key: 'impact',
    icon: Zap,
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-500/10',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    key: 'innovation',
    icon: Target,
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    key: 'community',
    icon: Heart,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-500/10',
    iconBg: 'bg-pink-500/20',
    iconColor: 'text-pink-400',
  },
  {
    key: 'global',
    icon: Globe,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    color: 'from-secondary-400 to-yellow-500',
    bgColor: 'bg-secondary-500/10',
    iconBg: 'bg-secondary-500/20',
    iconColor: 'text-secondary-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
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

export default function ValuesSection() {
  const { t } = useTranslation()

  return (
    <section
      id="values"
      className="py-24 bg-gradient-to-br from-midnight via-cetacean to-black relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
          >
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
            قيمنا الأساسية
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-tajawal font-bold text-white mb-4">
            {t('values.title')}
          </h2>
          <p className="text-lg md:text-xl font-almarai text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t('values.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-white/10 hover:border-white/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(`values.${item.key}.title`)}
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-35`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Floating icon */}
                  <motion.div
                    className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon
                      className={`w-6 h-6 ${item.iconColor}`}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-tajawal font-semibold text-white mb-3 text-center group-hover:text-secondary-300 transition-colors duration-300">
                    {t(`values.${item.key}.title`)}
                  </h3>
                  <p className="text-white/80 font-almarai text-center leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {t(`values.${item.key}.description`)}
                  </p>
                </div>

                {/* Animated accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(242, 201, 76, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-tajawal font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              {t('values.cta')}
              <motion.svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
