import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe, Award, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import ImageLoader from '../components/ImageLoader'

type LanguageCode = 'en' | 'ar' | 'tr'

interface PartnerDescription {
  en: string
  ar: string
  tr: string
}

interface Partner {
  name: string
  logo: string
  description: PartnerDescription
  projects: number
  countries: number
}

const partners: Partner[] = [
  {
    name: 'UNICEF',
    logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg',
    description: {
      en: 'Working together to support youth education and development worldwide',
      ar: 'نعمل معًا لدعم تعليم وتطوير الشباب في جميع أنحاء العالم',
      tr: 'Dünya çapında gençlik eğitimi ve gelişimini desteklemek için birlikte çalışıyoruz',
    },
    projects: 12,
    countries: 45,
  },
  {
    name: 'UNESCO',
    logo: 'https://images.pexels.com/photos/2977547/pexels-photo-2977547.jpeg',
    description: {
      en: 'Promoting cultural exchange and educational opportunities for youth',
      ar: 'تعزيز التبادل الثقافي والفرص التعليمية للشباب',
      tr: 'Gençler için kültürel değişim ve eğitim fırsatlarını teşvik ediyoruz',
    },
    projects: 8,
    countries: 35,
  },
  {
    name: 'WHO',
    logo: 'https://images.pexels.com/photos/2977549/pexels-photo-2977549.jpeg',
    description: {
      en: 'Collaborating on youth health initiatives and awareness programs',
      ar: 'التعاون في مبادرات صحة الشباب وبرامج التوعية',
      tr: 'Gençlik sağlığı girişimleri ve farkındalık programlarında işbirliği yapıyoruz',
    },
    projects: 15,
    countries: 50,
  },
  {
    name: 'UNDP',
    logo: 'https://images.pexels.com/photos/2977551/pexels-photo-2977551.jpeg',
    description: {
      en: 'Supporting sustainable development goals through youth empowerment',
      ar: 'دعم أهداف التنمية المستدامة من خلال تمكين الشباب',
      tr: 'Gençlerin güçlendirilmesi yoluyla sürdürülebilir kalkınma hedeflerini destekliyoruz',
    },
    projects: 20,
    countries: 40,
  },
  {
    name: 'World Bank',
    logo: 'https://images.pexels.com/photos/2977553/pexels-photo-2977553.jpeg',
    description: {
      en: 'Funding innovative youth projects and entrepreneurship initiatives',
      ar: 'تمويل مشاريع الشباب المبتكرة ومبادرات ريادة الأعمال',
      tr: 'Yenilikçi gençlik projelerini ve girişimcilik girişimlerini finanse ediyoruz',
    },
    projects: 25,
    countries: 30,
  },
]

export default function Partners() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language as LanguageCode

  return (
    <>
      <Meta
        title={t('partners.title', 'Our Partners')}
        description={t(
          'partners.description',
          'Meet the organizations working with us to empower youth globally'
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
              {t('partners.title', 'Our Partners')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t('partners.subtitle', 'Together we create lasting impact')}
            </p>
          </motion.div>

          <div className="space-y-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-200 rounded-xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative aspect-video lg:aspect-auto">
                    <ImageLoader
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {partner.name}
                      </h2>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-lg text-base-content/80 mb-6">
                      {partner.description[currentLanguage]}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-base-100 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <span className="text-2xl font-bold">
                            {partner.countries}
                          </span>
                        </div>
                        <p className="text-sm text-base-content/60 mt-1">
                          {t('partners.countries', 'Countries')}
                        </p>
                      </div>

                      <div className="bg-base-100 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-primary" />
                          <span className="text-2xl font-bold">
                            {partner.projects}
                          </span>
                        </div>
                        <p className="text-sm text-base-content/60 mt-1">
                          {t('partners.projects', 'Joint Projects')}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/projects?partner=${partner.name.toLowerCase()}`}
                      className="btn btn-primary gap-2"
                    >
                      {t('partners.view_projects', 'View Projects')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-primary text-white rounded-xl p-8 text-center"
          >
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              {t('partners.become_partner', 'Become a Partner')}
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              {t(
                'partners.become_partner_desc',
                'Join our global network of organizations committed to youth empowerment'
              )}
            </p>
            <Link
              to="/contact"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 gap-2"
            >
              {t('partners.contact_us', 'Contact Us')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}
