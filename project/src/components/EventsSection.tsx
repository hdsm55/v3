import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Mic,
  GraduationCap,
  Heart,
  Zap,
  Trophy,
  BookOpen,
} from 'lucide-react'

export default function EventsSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  const events = [
    {
      id: 'leadership-summit',
      title: 'قمة القيادة الشبابية 2024',
      date: '15 أبريل 2024',
      time: '09:00 - 17:00',
      location: 'مركز دبي الدولي للمؤتمرات',
      category: 'قيادة',
      type: 'مؤتمر',
      icon: Trophy,
      image:
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-500/10',
      participants: 500,
      featured: true,
      description:
        'مؤتمر عالمي يجمع القادة الشباب من مختلف أنحاء العالم لمناقشة التحديات المعاصرة وبناء المستقبل.',
    },
    {
      id: 'tech-workshop',
      title: 'ورشة التكنولوجيا المستقبلية',
      date: '22 مايو 2024',
      time: '14:00 - 18:00',
      location: 'مركز الابتكار التقني - إسطنبول',
      category: 'تكنولوجيا',
      type: 'ورشة عمل',
      icon: Zap,
      image:
        'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      participants: 150,
      featured: false,
      description:
        'ورشة تفاعلية تستكشف أحدث التقنيات وتطبيقاتها في حل المشكلات المجتمعية.',
    },
    {
      id: 'health-seminar',
      title: 'ندوة الصحة النفسية للشباب',
      date: '10 يونيو 2024',
      time: '16:00 - 19:00',
      location: 'الجامعة الأمريكية - بيروت',
      category: 'صحة',
      type: 'ندوة',
      icon: Heart,
      image:
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-500/10',
      participants: 200,
      featured: true,
      description:
        'ندوة متخصصة تناقش أهمية الصحة النفسية وطرق تعزيزها لدى الشباب.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.7,
      },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-bl from-black via-midnight to-cetacean relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-500/3 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-violet-500/3 rounded-full blur-3xl"
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
          initial={{ opacity: 0, y: 30 }}
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
            {t('events.upcoming', 'Upcoming Events')}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-tajawal text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('events.upcoming_title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-almarai text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {t('events.subtitle')}
          </motion.p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => {
            const Icon = event.icon
            const isFeatured = event.featured

            return (
              <motion.div
                key={event.id}
                variants={cardVariants}
                whileHover={{
                  y: -20,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className={`group relative cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-secondary-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                  >
                    ⭐ {t('events.featured', 'Featured')}
                  </motion.div>
                )}

                {/* Main Card */}
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-700 border border-white/10 hover:border-white/20 hover:shadow-xl h-full flex flex-col">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-35`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-md">
                        {event.type}
                      </div>
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4 text-xs text-white/70 font-almarai">
                      {event.category}
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
                  <div className="p-6 flex-1 flex flex-col">
                    <motion.h3
                      className={`font-tajawal font-bold text-white mb-3 group-hover:text-secondary-300 transition-colors duration-300 ${
                        isFeatured ? 'text-2xl' : 'text-xl'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {event.title}
                    </motion.h3>

                    <motion.p
                      className={`font-almarai text-white/80 group-hover:text-white/90 transition-colors duration-300 leading-relaxed mb-4 flex-grow ${
                        isFeatured ? 'text-base' : 'text-sm'
                      }`}
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {event.description}
                    </motion.p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <Calendar className="w-4 h-4 text-secondary-400" />
                        <span className="font-almarai">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <Clock className="w-4 h-4 text-secondary-400" />
                        <span className="font-almarai">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <MapPin className="w-4 h-4 text-secondary-400" />
                        <span className="font-almarai">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <Users className="w-4 h-4 text-secondary-400" />
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="font-almarai">
                              {event.participants}/{event.maxParticipants} {t('events.participants', 'participants')}
                            </span>
                            <span className="font-almarai">
                              {Math.round((event.participants / event.maxParticipants) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1.5">
                            <div 
                              className="bg-secondary-400 h-1.5 rounded-full" 
                              style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                      <Link to="/events">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            w-full relative px-4 py-3 rounded-full font-tajawal font-medium text-white text-sm
                            bg-gradient-to-r ${event.color} opacity-90 group-hover:opacity-100
                            transition-all duration-300 hover:shadow-lg
                            overflow-hidden flex items-center justify-center gap-2
                          `}
                        >
                          <span className="relative z-10">
                            {t('events.register')}
                          </span>
                          <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 ${event.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-center mt-20"
        >
          <Link to="/events">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgba(242, 201, 76, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-tajawal font-bold px-12 py-5 rounded-full shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center gap-3">
                {t('events.view_all')}
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                </motion.div>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}