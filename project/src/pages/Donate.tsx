import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Heart, CreditCard, DollarSign, Gift } from 'lucide-react'
import Meta from '../components/Meta'

export default function Donate() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('25')
  const [customAmount, setCustomAmount] = useState('')
  const [isCustomAmount, setIsCustomAmount] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)

  const predefinedAmounts = ['10', '25', '50', '100']

  const handleAmountSelect = (value: string) => {
    setAmount(value)
    setIsCustomAmount(false)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setCustomAmount(value)
    setAmount(value)
    setIsCustomAmount(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Stripe integration will be implemented here
    console.log('Processing donation:', { amount, isRecurring })
  }

  return (
    <>
      <Meta
        title={t('donate.title', 'Support Our Mission')}
        description={t(
          'donate.description',
          'Make a difference by supporting our youth empowerment initiatives',
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
              {t('donate.title', 'Support Our Mission')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t(
                'donate.subtitle',
                'Your contribution helps empower youth globally',
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Amount Selection */}
                  <div>
                    <label className="text-lg font-semibold mb-4 block">
                      {t('donate.select_amount', 'Select Amount')}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {predefinedAmounts.map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`btn ${
                            amount === value && !isCustomAmount
                              ? 'btn-primary'
                              : 'btn-outline'
                          }`}
                          onClick={() => handleAmountSelect(value)}
                        >
                          ${value}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="text-lg font-semibold mb-4 block">
                      {t('donate.custom_amount', 'Custom Amount')}
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" />
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder={t('donate.enter_amount', 'Enter amount')}
                        className="input input-bordered w-full pl-10"
                      />
                    </div>
                  </div>

                  {/* Donation Frequency */}
                  <div>
                    <label className="text-lg font-semibold mb-4 block">
                      {t('donate.frequency', 'Donation Frequency')}
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className={`btn flex-1 ${!isRecurring ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setIsRecurring(false)}
                      >
                        <Gift className="w-5 h-5 mr-2" />
                        {t('donate.one_time', 'One-time')}
                      </button>
                      <button
                        type="button"
                        className={`btn flex-1 ${isRecurring ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setIsRecurring(true)}
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        {t('donate.monthly', 'Monthly')}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    {t('donate.submit', 'Donate Now')}
                  </button>

                  <p className="text-sm text-base-content/60 text-center">
                    {t(
                      'donate.secure_payment',
                      'Secure payment powered by Stripe',
                    )}
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Impact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t('donate.impact.title', 'Your Impact')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t('donate.impact.education.title', 'Education')}
                      </h3>
                      <p className="text-base-content/80">
                        {t(
                          'donate.impact.education.description',
                          'Support educational programs and workshops for underprivileged youth',
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t('donate.impact.mentorship.title', 'Mentorship')}
                      </h3>
                      <p className="text-base-content/80">
                        {t(
                          'donate.impact.mentorship.description',
                          'Help provide mentorship opportunities for young leaders',
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t('donate.impact.resources.title', 'Resources')}
                      </h3>
                      <p className="text-base-content/80">
                        {t(
                          'donate.impact.resources.description',
                          'Fund essential resources and tools for youth development',
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t('donate.transparency.title', 'Transparency')}
                </h2>
                <p className="text-base-content/80 mb-6">
                  {t(
                    'donate.transparency.description',
                    'We are committed to transparency in how we use your donations. Regular reports and updates are provided to our donors.',
                  )}
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">
                    {t(
                      'donate.transparency.thank_you',
                      'Thank you for your support!',
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
