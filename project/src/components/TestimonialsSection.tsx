import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const testimonials = [
    {
      name: t('testimonials.volunteer1.name'),
      role: t('testimonials.volunteer1.role'),
      content: t('testimonials.volunteer1.content'),
    },
    {
      name: t('testimonials.volunteer2.name'),
      role: t('testimonials.volunteer2.role'),
      content: t('testimonials.volunteer2.content'),
    },
    {
      name: t('testimonials.volunteer3.name'),
      role: t('testimonials.volunteer3.role'),
      content: t('testimonials.volunteer3.content'),
    },
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-tajawal">
            {t('testimonials.heading')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {t('testimonials.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card card-hover h-full border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="mb-4 text-accent opacity-30">
                <Quote size={32} />
              </div>
              <p className="text-gray-600 mb-6 italic font-almarai">"{testimonial.content}"</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold font-tajawal">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 font-tajawal">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-almarai">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}