// FILE: src/components/NewsletterSection.tsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'

export default function NewsletterSection() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('newsletter.errorInvalid'))
      setSuccess(false)
      return
    }

    setError(null)
    setSuccess(true)
    setEmail('')

    // Here you would send the data to your backend (e.g., Strapi or Mailchimp)
    console.log('Newsletter signup:', email)

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <section
      id="newsletter"
      className="py-24 bg-gradient-to-b from-cetacean/90 to-black/90"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-cetacean/90 border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6"
            >
              <Mail className="w-8 h-8 text-primary" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-tajawal font-bold text-white mb-4">
              {t('newsletter.heading')}
            </h2>

            <p className="text-xl font-almarai text-white/80 mb-8 max-w-2xl mx-auto">
              {t('newsletter.subheading')}
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletter.placeholder')}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-black font-tajawal font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 border-2 border-white hover:border-primary whitespace-nowrap"
                >
                  {t('newsletter.button')}
                </motion.button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-3 font-almarai"
                >
                  {error}
                </motion.p>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 text-green-400 text-sm mt-3 font-almarai"
                >
                  <CheckCircle className="w-4 h-4" />
                  {t('newsletter.success')}
                </motion.div>
              )}
            </form>

            <p className="text-white/60 text-sm mt-6 font-almarai">
              {t(
                'newsletter.privacy',
                'We respect your privacy and will never spam you.',
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
