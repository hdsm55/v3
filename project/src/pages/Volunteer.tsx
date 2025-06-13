import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
  Heart,
  Users,
  Globe,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import Meta from '../components/Meta'

interface FormData {
  name: string
  email: string
  phone: string
  interests: string[]
  availability: string
  experience: string
  message: string
}

export default function Volunteer() {
  const { t } = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interests: [],
    availability: '',
    experience: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const opportunities = [
    {
      icon: Heart,
      title: 'Community Service',
      description:
        'Help organize and participate in local community service projects',
      commitment: '4-6 hours/week',
    },
    {
      icon: Users,
      title: 'Mentorship',
      description:
        'Guide and support youth in their personal and professional development',
      commitment: '2-3 hours/week',
    },
    {
      icon: Globe,
      title: 'Global Initiatives',
      description: 'Contribute to international youth empowerment programs',
      commitment: 'Flexible',
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!executeRecaptcha) return

    setIsSubmitting(true)
    try {
      const token = await executeRecaptcha('volunteer_form')
      // Form submission logic will be implemented here
      console.log('Form submitted:', { ...formData, token })
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((interest) => interest !== value),
    }))
  }

  return (
    <>
      <Meta
        title={t('volunteer.title', 'Volunteer With Us')}
        description={t(
          'volunteer.description',
          'Join our global community of volunteers and make a difference'
        )}
      />

      <div className="min-h-screen bg-base-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-base-content mb-4">
              {t('volunteer.title', 'Volunteer With Us')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t(
                'volunteer.subtitle',
                'Join our community of passionate volunteers making a difference globally'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Volunteer Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-base-content mb-2"
                      >
                        {t('volunteer.form.name', 'Full Name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-base-content mb-2"
                      >
                        {t('volunteer.form.email', 'Email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('volunteer.form.phone', 'Phone Number')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      {t('volunteer.form.interests', 'Areas of Interest')}
                    </label>
                    <div className="space-y-2">
                      {opportunities.map((opportunity) => (
                        <label
                          key={opportunity.title}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="interests"
                            value={opportunity.title}
                            onChange={handleInterestChange}
                            className="checkbox checkbox-primary"
                          />
                          <span>{opportunity.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="availability"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('volunteer.form.availability', 'Availability')}
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="select select-bordered w-full"
                    >
                      <option value="">
                        {t(
                          'volunteer.form.select_availability',
                          'Select availability'
                        )}
                      </option>
                      <option value="weekdays">
                        {t('volunteer.form.weekdays', 'Weekdays')}
                      </option>
                      <option value="weekends">
                        {t('volunteer.form.weekends', 'Weekends')}
                      </option>
                      <option value="flexible">
                        {t('volunteer.form.flexible', 'Flexible')}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('volunteer.form.experience', 'Relevant Experience')}
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={3}
                      className="textarea textarea-bordered w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t(
                        'volunteer.form.message',
                        'Why do you want to volunteer?'
                      )}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="textarea textarea-bordered w-full"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full gap-2"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      <Heart className="w-5 h-5" />
                    )}
                    {t('volunteer.form.submit', 'Submit Application')}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Opportunities */}
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t(
                    'volunteer.opportunities.title',
                    'Volunteer Opportunities'
                  )}
                </h2>
                <div className="space-y-6">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <opportunity.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {opportunity.title}
                        </h3>
                        <p className="text-base-content/80 mb-2">
                          {opportunity.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-base-content/60">
                          <Calendar className="w-4 h-4" />
                          {t('volunteer.commitment', 'Time Commitment')}:{' '}
                          {opportunity.commitment}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t('volunteer.requirements.title', 'Requirements')}
                </h2>
                <ul className="space-y-4 list-disc list-inside text-base-content/80">
                  <li>
                    {t(
                      'volunteer.requirements.age',
                      'Must be 18 years or older'
                    )}
                  </li>
                  <li>
                    {t(
                      'volunteer.requirements.commitment',
                      'Minimum 3-month commitment'
                    )}
                  </li>
                  <li>
                    {t(
                      'volunteer.requirements.language',
                      'Proficiency in English'
                    )}
                  </li>
                  <li>
                    {t(
                      'volunteer.requirements.training',
                      'Attend required training sessions'
                    )}
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t('volunteer.contact.title', 'Contact Information')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>volunteer@globalyouth.org</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>123 Global Street, New York, NY 10001</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
