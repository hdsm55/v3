import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  Heart,
  CheckCircle,
  ArrowRight,
  Star,
} from 'lucide-react'
import { useCreateMember } from '../hooks/useMembers'
import Meta from '../components/Meta'
import { logger } from '../utils/logger'

export default function Join() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isRTL = i18n.dir() === 'rtl'
  const createMember = useCreateMember()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motivation: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t('join.form.errors.name', 'Name is required')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('join.form.errors.email', 'Email is required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('join.form.errors.emailInvalid', 'Email is invalid')
    }
    
    if (!formData.motivation.trim()) {
      newErrors.motivation = t('join.form.errors.motivation', 'Please tell us why you want to join')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      logger.info('Submitting join form', {
        tags: ['members', 'form-submission']
      })
      
      await createMember.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        motivation: formData.motivation
      })
      
      setIsSuccess(true)
      
      logger.info('Join form submitted successfully', {
        tags: ['members', 'form-success']
      })
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        motivation: '',
      })
      
      // Redirect after success
      setTimeout(() => {
        navigate('/')
      }, 3000)
      
    } catch (error) {
      logger.error('Join form submission failed', {
        tags: ['members', 'form-error'],
        metadata: { error }
      })
      
      // Check for email uniqueness error
      if (error instanceof Error && error.message.includes('unique')) {
        setErrors({
          email: t('join.form.errors.emailExists', 'This email is already registered')
        })
      } else {
        setErrors({
          general: t('join.form.errors.general', 'An error occurred. Please try again later.')
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center max-w-md w-full border border-white/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-4 font-tajawal"
          >
            {t('join.success.title', 'مرحباً بك في شبابنا!')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 font-almarai mb-6"
          >
            {t('join.success.message', 'تم تسجيل طلبك بنجاح. سنتواصل معك قريباً لإكمال عملية الانضمام.')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-secondary-400 font-almarai text-sm"
          >
            {t('join.success.redirect', 'سيتم تحويلك للصفحة الرئيسية خلال 3 ثوانٍ...')}
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Meta
        title={t('join.title', 'Join Our Community')}
        description={t(
          'join.description',
          'Join our global community of youth leaders and change-makers',
        )}
      />

      <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-midnight/90 to-cetacean/90 py-20">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-secondary-400/20 backdrop-blur-md border border-secondary-400/30 rounded-full px-6 py-3 mb-6 text-sm text-secondary-400 font-almarai">
                <Star className="w-4 h-4" />
                {t('join.badge', 'انضم إلى عائلة شبابنا العالمية')}
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-tajawal">
                {t('join.heading', 'ابدأ رحلتك معنا')}
              </h1>

              <p className="text-xl text-white/80 max-w-2xl mx-auto font-almarai">
                {t('join.subheading', 'انضم إلى أكثر من 50,000 شاب وشابة في رحلة التطوير والتأثير الإيجابي')}
              </p>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2 font-tajawal">
                    {t('join.form.title', 'نموذج الانضمام')}
                  </h2>
                  <p className="text-white/70 font-almarai">
                    {t('join.form.subtitle', 'أخبرنا عن نفسك لنتواصل معك')}
                  </p>
                </div>

                {errors.general && (
                  <div className="bg-red-500/20 border border-red-400 rounded-lg p-3" role="alert">
                    <p className="text-red-400 text-sm">{errors.general}</p>
                  </div>
                )}

                <div>
                  <label className="block text-white mb-2 font-almarai font-medium">
                    {t('join.form.name', 'الاسم الكامل')} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/20'} rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai`}
                      placeholder={t('join.form.namePlaceholder', 'أدخل اسمك الكامل')}
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 font-almarai font-medium">
                    {t('join.form.email', 'البريد الإلكتروني')} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai`}
                      placeholder={t('join.form.emailPlaceholder', 'your@email.com')}
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2 font-almarai font-medium">
                    {t('join.form.phone', 'رقم الهاتف')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                      placeholder={t('join.form.phonePlaceholder', '+966 XX XXX XXXX')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 font-almarai font-medium">
                    {t('join.form.motivation', 'لماذا تريد الانضمام لشبابنا؟')} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Heart className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full bg-white/10 border ${errors.motivation ? 'border-red-400' : 'border-white/20'} rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none`}
                      placeholder={t('join.form.motivationPlaceholder', 'شاركنا قصتك ودافعك للانضمام لمنظمة شبابنا العالمية...')}
                      aria-required="true"
                      aria-invalid={errors.motivation ? 'true' : 'false'}
                    />
                  </div>
                  {errors.motivation && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.motivation}
                    </p>
                  )}
                </div>

                <div className="bg-secondary-400/10 border border-secondary-400/20 rounded-xl p-6">
                  <h3 className="text-secondary-400 font-bold mb-4 font-tajawal">
                    {t('join.benefits.title', 'ما ستحصل عليه كعضو في شبابنا:')}
                  </h3>
                  <ul className="space-y-2 text-white/80 font-almarai">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary-400" />
                      {t('join.benefits.item1', 'فرص تطوعية متنوعة ومؤثرة')}
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary-400" />
                      {t('join.benefits.item2', 'دورات تدريبية وورش عمل مجانية')}
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary-400" />
                      {t('join.benefits.item3', 'شبكة علاقات عالمية من الشباب')}
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary-400" />
                      {t('join.benefits.item4', 'شهادات معتمدة في التطوع')}
                    </li>
                  </ul>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold px-12 py-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-almarai disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('join.form.submitting', 'جاري الإرسال...')}
                    </>
                  ) : (
                    <>
                      {t('join.form.submit', 'انضم الآن')}
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}