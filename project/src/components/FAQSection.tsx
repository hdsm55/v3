// FILE: src/components/FAQSection.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    key: 'faq1',
    question: 'How can I get involved?',
    answer:
      'You can join our volunteer programs, participate in events, or donate to support our cause.',
  },
  {
    key: 'faq2',
    question: 'What programs do you offer?',
    answer:
      'We offer leadership development, educational programs, community outreach, and international exchange programs.',
  },
  {
    key: 'faq3',
    question: 'How are donations used?',
    answer:
      'Donations go directly to funding our programs, supporting youth initiatives, and operational costs.',
  },
  {
    key: 'faq4',
    question: 'Can I volunteer remotely?',
    answer:
      'Yes! We have many remote volunteer opportunities including content creation, mentoring, and virtual event support.',
  },
  {
    key: 'faq5',
    question: 'What is the age range for participants?',
    answer:
      'Our programs primarily focus on youth aged 16-30, though some programs are open to all ages.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function FAQSection() {
  const { t } = useTranslation()
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (key: string) => {
    setOpenFAQ(openFAQ === key ? null : key)
  }

  return (
    <section
      id="faq"
      className="py-24 bg-gradient-to-b from-black/90 to-cetacean/90"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-tajawal font-bold text-white mb-4">
            {t('faq.title', 'Frequently Asked Questions')}
          </h2>
          <p className="text-xl font-almarai text-white/80 max-w-2xl mx-auto">
            {t(
              'faq.subtitle',
              'Find answers to common questions about our organization and programs'
            )}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.key}
              variants={itemVariants}
              className="bg-cetacean/90 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.key)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-tajawal font-semibold text-white pr-4">
                  {t(`faq.${faq.key}.question`, faq.question)}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === faq.key ? (
                    <Minus className="w-5 h-5 text-primary" />
                  ) : (
                    <Plus className="w-5 h-5 text-white/60" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openFAQ === faq.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-white/10">
                      <p className="text-white/80 font-almarai leading-relaxed pt-4">
                        {t(`faq.${faq.key}.answer`, faq.answer)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
