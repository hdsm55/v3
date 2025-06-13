import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Phone,
  Heart,
  X,
  Tag,
  ExternalLink,
} from 'lucide-react'
import Meta from '../components/Meta'
import { logger } from '../utils/logger'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  category: string
  featured: boolean
  image: string
  price: number
  organizer: string
}

const events: Event[] = [
  {
    id: 1,
    title: 'مؤتمر الشباب العربي للتكنولوجيا',
    description:
      'مؤتمر شامل يجمع خبراء التكنولوجيا والشباب المبدع لمناقشة مستقبل التقنية في المنطقة',
    date: '2024-06-15',
    time: '09:00',
    location: 'الرياض، السعودية',
    participants: 450,
    maxParticipants: 500,
    category: 'تكنولوجيا',
    featured: true,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    price: 0,
    organizer: 'شبابنا العالمية',
  },
  {
    id: 2,
    title: 'ورشة ريادة الأعمال للشباب',
    description:
      'تعلم أساسيات ريادة الأعمال وبناء الشركات الناشئة مع خبراء في المجال',
    date: '2024-06-20',
    time: '14:00',
    location: 'دبي، الإمارات',
    participants: 85,
    maxParticipants: 100,
    category: 'ريادة أعمال',
    featured: false,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    price: 150,
    organizer: 'مركز الإبداع',
  },
  {
    id: 3,
    title: 'معسكر التطوع البيئي',
    description:
      'انضم إلينا في حملة تنظيف الشواطئ وزراعة الأشجار للحفاظ على البيئة',
    date: '2024-06-25',
    time: '07:00',
    location: 'الدوحة، قطر',
    participants: 120,
    maxParticipants: 150,
    category: 'بيئة',
    featured: true,
    image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
    price: 0,
    organizer: 'جمعية البيئة',
  },
  {
    id: 4,
    title: 'مهرجان الثقافة والفنون',
    description:
      'احتفال بالتراث العربي والفنون المعاصرة مع عروض موسيقية ومعارض فنية',
    date: '2024-07-01',
    time: '18:00',
    location: 'بيروت، لبنان',
    participants: 300,
    maxParticipants: 400,
    category: 'ثقافة',
    featured: false,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    price: 75,
    organizer: 'مؤسسة الثقافة',
  },
  {
    id: 5,
    title: 'دورة القيادة الشبابية',
    description: 'تطوير مهارات القيادة والتأثير الإيجابي للشباب العربي',
    date: '2024-07-10',
    time: '10:00',
    location: 'عمان، الأردن',
    participants: 60,
    maxParticipants: 80,
    category: 'تطوير ذاتي',
    featured: true,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    price: 200,
    organizer: 'أكاديمية القادة',
  },
  {
    id: 6,
    title: 'هاكاثون الحلول الذكية',
    description: 'مسابقة برمجية لتطوير حلول تقنية للتحديات المجتمعية',
    date: '2024-07-15',
    time: '09:00',
    location: 'القاهرة، مصر',
    participants: 200,
    maxParticipants: 250,
    category: 'تكنولوجيا',
    featured: false,
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    price: 50,
    organizer: 'تك هب',
  },
]

const categories = [
  'جميع الفئات',
  'تكنولوجيا',
  'ريادة أعمال',
  'بيئة',
  'ثقافة',
  'تطوير ذاتي',
]

interface RegistrationForm {
  eventId: number
  name: string
  email: string
  phone: string
  experience: string
  motivation: string
}

export default function Events() {
  const { i18n, t } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  const [selectedCategory, setSelectedCategory] = useState('جميع الفئات')
  const [searchTerm, setSearchTerm] = useState('')
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    eventId: 0,
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // Sort events by date (upcoming first)
      const sortedEvents = [...events].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      
      setUpcomingEvents(sortedEvents)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === 'جميع الفئات' || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setRegistrationForm((prev) => ({ ...prev, eventId: event.id }))
    setShowRegistration(true)
    
    // Log event for analytics
    logger.info('Event registration started', {
      tags: ['events', 'registration'],
      metadata: { eventId: event.id, eventTitle: event.title }
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setRegistrationForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Log successful registration
      logger.info('Event registration completed', {
        tags: ['events', 'registration', 'success'],
        metadata: { 
          eventId: selectedEvent?.id,
          eventTitle: selectedEvent?.title,
          userEmail: registrationForm.email.substring(0, 3) + '***' // Log partial email for privacy
        }
      })

      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after success
      setTimeout(() => {
        setIsSuccess(false)
        setShowRegistration(false)
        setRegistrationForm({
          eventId: 0,
          name: '',
          email: '',
          phone: '',
          experience: '',
          motivation: '',
        })
      }, 3000)
    } catch (error) {
      logger.error('Event registration failed', {
        tags: ['events', 'registration', 'error'],
        metadata: { error, eventId: selectedEvent?.id }
      })
      
      setIsSubmitting(false)
      // Would handle error state here
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Calculate days remaining until event
  const getDaysRemaining = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Animation variants
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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

  if (showRegistration && selectedEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black">
        <Meta
          title={`${t('events.register')} - ${selectedEvent.title}`}
          description={`${t('events.register_for')} ${selectedEvent.title}`}
        />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <motion.button
              onClick={() => setShowRegistration(false)}
              className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-almarai"
              whileHover={{ x: isRTL ? 5 : -5 }}
            >
              <ArrowRight className={`w-5 h-5 ${isRTL ? '' : 'rotate-180'}`} />
              {t('events.back_to_events', 'Back to Events')}
            </motion.button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-4 font-tajawal">
                  {t('events.registration_success', 'Registration Successful!')}
                </h2>

                <p className="text-white/80 font-almarai mb-6">
                  {t('events.registration_confirmation', 'You have been successfully registered for')} "{selectedEvent.title}". {t('events.confirmation_email', 'A confirmation email will be sent to your email address.')}
                </p>

                <div className="text-secondary-400 font-almarai text-sm">
                  {t('events.redirect_message', 'You will be redirected to the events page in 3 seconds...')}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              >
                {/* Event Summary */}
                <div className="mb-8 p-6 bg-secondary-400/10 border border-secondary-400/20 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-2 font-tajawal">
                    {selectedEvent.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80 font-almarai">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-secondary-400" />
                      {formatDate(selectedEvent.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary-400" />
                      {selectedEvent.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary-400" />
                      {selectedEvent.location}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-white/80 font-almarai">
                      <Users className="w-4 h-4 text-secondary-400" />
                      <span>{selectedEvent.participants}/{selectedEvent.maxParticipants} {t('events.participants', 'participants')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 font-almarai">
                      <Tag className="w-4 h-4 text-secondary-400" />
                      <span>{selectedEvent.category}</span>
                    </div>
                    {selectedEvent.price > 0 && (
                      <div className="flex items-center gap-2 text-secondary-400 font-bold font-almarai">
                        <span>{t('events.fee', 'Registration fee')}: {selectedEvent.price} {t('events.currency', 'SAR')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 font-tajawal">
                      {t('events.register_for_event', 'Register for Event')}
                    </h3>
                    <p className="text-white/70 font-almarai">
                      {t('events.fill_form', 'Fill in the following information to register')}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 font-almarai font-medium">
                        {t('events.full_name', 'Full Name')} <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="text"
                          name="name"
                          value={registrationForm.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                          placeholder={t('events.name_placeholder', 'Enter your full name')}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white mb-2 font-almarai font-medium">
                        {t('events.email', 'Email Address')} <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="email"
                          name="email"
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-almarai font-medium">
                      {t('events.phone', 'Phone Number')}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="tel"
                        name="phone"
                        value={registrationForm.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                        placeholder="+966 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-almarai font-medium">
                      {t('events.experience', 'Your Experience in this Field')}
                    </label>
                    <textarea
                      name="experience"
                      value={registrationForm.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none"
                      placeholder={t('events.experience_placeholder', 'Tell us about your relevant experience...')}
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-almarai font-medium">
                      {t('events.motivation', 'Why do you want to participate?')} <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                      <textarea
                        name="motivation"
                        value={registrationForm.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none"
                        placeholder={t('events.motivation_placeholder', 'What motivates you to participate in this event?')}
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-bold py-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-almarai disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {t('events.submitting', 'Registering...')}
                      </>
                    ) : (
                      <>
                        {t('events.confirm_registration', 'Confirm Registration')}
                        <CheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black">
      <Meta
        title={t('events.title', 'Events')}
        description={t('events.description', 'Discover and participate in our global youth events')}
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-midnight/90 to-cetacean/90 py-20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-400/20 backdrop-blur-md border border-secondary-400/30 rounded-full px-6 py-3 mb-6 text-sm text-secondary-400 font-almarai">
              <Calendar className="w-4 h-4" />
              {t('events.inspiring', 'Inspiring and impactful events')}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-tajawal">
              {t('events.upcoming_title', 'Upcoming Events')}
            </h1>

            <p className="text-xl text-white/80 max-w-2xl mx-auto font-almarai">
              {t('events.join_community', 'Join a global community of creative youth in interactive and impactful events')}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
      </div>

      {/* Filters & Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                placeholder={t('events.search', 'Search for an event...')}
                aria-label={t('events.search')}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label={t('common.clear', 'Clear')}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai appearance-none cursor-pointer min-w-[200px]"
                aria-label={t('events.filter_by_category', 'Filter by category')}
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-midnight text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Events Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 300, damping: 20 },
                    }}
                    className="group relative cursor-pointer"
                  >
                    {/* Main Card */}
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden transition-all duration-500 border border-white/10 hover:border-secondary-400/50 h-full flex flex-col">
                      {/* Featured Badge */}
                      {event.featured && (
                        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-secondary-400 to-secondary-500 text-black px-3 py-1 rounded-full text-xs font-bold font-almarai flex items-center gap-1">
                          <Star className="w-3 h-3 inline" />
                          {t('events.featured', 'Featured')}
                        </div>
                      )}

                      {/* Event Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Category Tag */}
                        <div className="absolute bottom-4 left-4 bg-accent-400/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold font-almarai">
                          {event.category}
                        </div>
                        
                        {/* Days Remaining */}
                        {getDaysRemaining(event.date) > 0 && (
                          <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold font-almarai flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getDaysRemaining(event.date)} {t('events.days_remaining', 'days remaining')}
                          </div>
                        )}
                      </div>

                      {/* Event Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-3 font-tajawal group-hover:text-secondary-400 transition-colors duration-300">
                          {event.title}
                        </h3>

                        <p className="text-white/70 text-sm mb-4 font-almarai line-clamp-2 flex-grow">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                            <Calendar className="w-4 h-4 text-secondary-400" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                            <Clock className="w-4 h-4 text-secondary-400" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                            <MapPin className="w-4 h-4 text-secondary-400" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                            <Users className="w-4 h-4 text-secondary-400" />
                            <div className="w-full">
                              <div className="flex justify-between mb-1">
                                <span>{event.participants}/{event.maxParticipants} {t('events.participants', 'participants')}</span>
                                <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
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

                        {/* Price & Register */}
                        <div className="flex items-center justify-between mt-auto">
                          <div className="text-secondary-400 font-bold font-almarai">
                            {event.price === 0 ? t('events.free', 'Free') : `${event.price} ${t('events.currency', 'SAR')}`}
                          </div>

                          <motion.button
                            onClick={() => handleRegister(event)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-almarai"
                          >
                            {t('events.register', 'Register Now')}
                            <ArrowRight
                              className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
                            />
                          </motion.button>
                        </div>
                      </div>

                      {/* Background glow effect */}
                      <div
                        className={`absolute inset-0 bg-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-white/50 text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-tajawal">
                    {t('events.no_events', 'No events found')}
                  </h3>
                  <p className="text-white/70 font-almarai">
                    {t('events.try_different', 'Try changing your search criteria or category')}
                  </p>
                  {(searchTerm || selectedCategory !== 'جميع الفئات') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('جميع الفئات');
                      }}
                      className="mt-4 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-almarai"
                    >
                      {t('events.clear_filters', 'Clear filters')}
                    </button>
                  )}
                </div>
              )}
              
              {/* View All Events Button */}
              {filteredEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                  className="text-center mt-20"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 20px 25px -5px rgba(242, 201, 76, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-tajawal font-bold px-12 py-5 rounded-full shadow-xl transition-all duration-300 group"
                  >
                    <span className="flex items-center gap-3">
                      {t('events.view_all', 'View All Events')}
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                      </motion.div>
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
          
          {/* Calendar Integration Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center"
          >
            <Calendar className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3 font-tajawal">
              {t('events.never_miss', 'Never Miss an Event')}
            </h2>
            <p className="text-white/70 font-almarai mb-6 max-w-2xl mx-auto">
              {t('events.calendar_description', 'Subscribe to our events calendar to stay updated with all our upcoming activities and receive automatic reminders.')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl border border-white/20 transition-all duration-300 flex items-center gap-2 mx-auto font-almarai"
            >
              <Calendar className="w-5 h-5" />
              {t('events.subscribe_calendar', 'Subscribe to Calendar')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}