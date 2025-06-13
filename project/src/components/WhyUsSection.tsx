import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Users,
  Target,
  Award,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react'

export default function WhyUsSection() {
  const { t } = useTranslation()

  const reasons = [
    {
      id: 'experience',
      icon: Award,
      stat: '8+',
      statLabel: 'سنوات خبرة',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-500/10',
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    },
    {
      id: 'community',
      icon: Users,
      stat: '50K+',
      statLabel: 'شاب وشابة',
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-500/10',
      image:
        'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    },
    {
      id: 'impact',
      icon: Target,
      stat: '100+',
      statLabel: 'مشروع مكتمل',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-500/10',
      image:
        'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    },
    {
      id: 'innovation',
      icon: Zap,
      stat: '25+',
      statLabel: 'دولة',
      color: 'from-secondary-400 to-yellow-500',
      bgColor: 'bg-secondary-500/10',
      image:
        'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    },
    {
      id: 'reliability',
      icon: Shield,
      stat: '99%',
      statLabel: 'رضا المشاركين',
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      image:
        'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
    },
    {
      id: 'growth',
      icon: TrendingUp,
      stat: '300%',
      statLabel: 'نمو سنوي',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-500/10',
      image:
        'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-tr from-black via-cetacean to-midnight relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-500/3 rounded-full blur-3xl"
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
          className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-accent-500/3 rounded-full blur-3xl"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
          >
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
            لماذا تختارنا؟
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-tajawal text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
          >
            {t('why_us.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-almarai text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {t('why_us.subtitle')}
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon

            return (
              <motion.div
                key={reason.id}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group relative cursor-pointer"
              >
                {/* Main Card */}
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-xl">
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={reason.image}
                      alt={t(`why_us.${reason.id}.title`)}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${reason.color} opacity-35`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Stat Display */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-2 border border-white/30">
                        <div className="text-lg font-bold text-white">
                          {reason.stat}
                        </div>
                        <div className="text-xs text-white/80 font-almarai text-center">
                          {reason.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3
                      className="font-tajawal text-xl font-bold text-white mb-3 group-hover:text-secondary-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {t(`why_us.${reason.id}.title`)}
                    </motion.h3>

                    <motion.p
                      className="font-almarai text-white/80 group-hover:text-white/90 transition-colors duration-300 leading-relaxed text-sm"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {t(`why_us.${reason.id}.description`)}
                    </motion.p>
                  </div>

                  {/* Animated accent line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${reason.color}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 ${reason.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row gap-4 items-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgba(242, 201, 76, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-tajawal font-bold px-10 py-4 rounded-full shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center gap-3">
                {t('why_us.learn_more')}
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.div>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-white/20 text-white font-tajawal font-bold rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              تصفح مشاريعنا
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
