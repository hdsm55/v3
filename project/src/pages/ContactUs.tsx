import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa'

const ContactUs: React.FC = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    // Simulate async submission
    setTimeout(() => {
      if (formData.email && formData.message) {
        setStatus('success')
      } else {
        setStatus('error')
        setError(t('contact.form.error', 'Please fill all required fields.'))
      }
    }, 1200)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              {t('contact.title', 'تواصل معنا')}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {t(
                'contact.subtitle',
                'نحن هنا للإجابة على استفساراتكم ومساعدتكم'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('contact.info.title', 'معلومات التواصل')}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <FaPhone className="text-2xl text-primary mt-1 ml-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('contact.info.phone', 'الهاتف')}
                    </h3>
                    <p className="text-gray-600">+123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-2xl text-primary mt-1 ml-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('contact.info.email', 'البريد الإلكتروني')}
                    </h3>
                    <p className="text-gray-600">info@shababna.org</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-2xl text-primary mt-1 ml-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('contact.info.address', 'العنوان')}
                    </h3>
                    <p className="text-gray-600">
                      {t(
                        'contact.info.address.details',
                        'شارع الرئيسي، المدينة، البلد'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-2xl text-primary mt-1 ml-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('contact.info.hours', 'ساعات العمل')}
                    </h3>
                    <p className="text-gray-600">
                      {t(
                        'contact.info.hours.details',
                        'السبت - الخميس: 9:00 صباحاً - 5:00 مساءً'
                      )}
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                    className="text-primary hover:text-primary/80 text-2xl"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Twitter"
                    className="text-primary hover:text-primary/80 text-2xl"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener"
                    aria-label="Instagram"
                    className="text-primary hover:text-primary/80 text-2xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener"
                    aria-label="WhatsApp"
                    className="text-primary hover:text-primary/80 text-2xl"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-soft"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {t('contact.form.title', 'راسلنا')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('contact.form.name', 'الاسم')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('contact.form.email', 'البريد الإلكتروني')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('contact.form.subject', 'الموضوع')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('contact.form.message', 'الرسالة')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="text-green-600 font-bold text-center">
                    {t('contact.form.success', 'تم إرسال رسالتك بنجاح!')}
                  </div>
                )}
                {status === 'error' && error && (
                  <div className="text-red-600 font-bold text-center">
                    {error}
                  </div>
                )}
                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={status === 'loading'}
                >
                  {status === 'loading'
                    ? t('contact.form.sending')
                    : t('contact.form.submit')}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Google Map */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627917975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1611816611234!5m2!1sen!2sau"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
