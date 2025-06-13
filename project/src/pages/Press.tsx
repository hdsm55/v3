import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Newspaper, Download, ExternalLink } from 'lucide-react'
import Meta from '../components/Meta'

type LanguageCode = 'en' | 'ar' | 'tr'

interface LocalizedText {
  en: string
  ar: string
  tr: string
}

interface PressRelease {
  id: string
  date: string
  title: LocalizedText
  description: LocalizedText
  pdfUrl?: string
  externalUrl?: string
}

const pressReleases: PressRelease[] = [
  {
    id: 'youth-summit-2024',
    date: '2024-02-15',
    title: {
      en: 'Global Youth Organization Announces International Youth Summit 2024',
      ar: 'منظمة الشباب العالمية تعلن عن قمة الشباب الدولية 2024',
      tr: 'Global Gençlik Organizasyonu 2024 Uluslararası Gençlik Zirvesini Duyurdu',
    },
    description: {
      en: 'Annual gathering of youth leaders from across the globe to share experiences and build networks.',
      ar: 'التجمع السنوي لقادة الشباب من جميع أنحاء العالم لتبادل الخبرات وبناء الشبكات.',
      tr: 'Deneyimleri paylaşmak ve ağlar kurmak için dünyanın dört bir yanından gençlik liderlerinin yıllık buluşması.',
    },
    pdfUrl: '/press/youth-summit-2024.pdf',
    externalUrl: 'https://example.com/press/youth-summit-2024',
  },
  {
    id: 'digital-initiative',
    date: '2024-01-20',
    title: {
      en: 'Launch of Digital Skills Training Initiative',
      ar: 'إطلاق مبادرة التدريب على المهارات الرقمية',
      tr: 'Dijital Beceriler Eğitim Girişiminin Başlatılması',
    },
    description: {
      en: 'New program aims to provide digital skills training to 10,000 youth across developing regions.',
      ar: 'يهدف البرنامج الجديد إلى توفير التدريب على المهارات الرقمية لـ 10,000 شاب في المناطق النامية.',
      tr: 'Yeni program, gelişmekte olan bölgelerde 10.000 gence dijital beceriler eğitimi vermeyi amaçlıyor.',
    },
    pdfUrl: '/press/digital-initiative.pdf',
  },
  {
    id: 'environmental-campaign',
    date: '2023-12-10',
    title: {
      en: 'Youth-Led Environmental Campaign Reaches 1 Million Participants',
      ar: 'حملة بيئية بقيادة الشباب تصل إلى مليون مشارك',
      tr: 'Gençlik Öncülüğündeki Çevre Kampanyası 1 Milyon Katılımcıya Ulaştı',
    },
    description: {
      en: 'Milestone achievement in global environmental awareness and action through youth engagement.',
      ar: 'إنجاز مهم في الوعي البيئي العالمي والعمل من خلال مشاركة الشباب.',
      tr: 'Gençlik katılımı yoluyla küresel çevre bilinci ve eyleminde önemli bir başarı.',
    },
    externalUrl: 'https://example.com/press/environmental-campaign',
  },
]

export default function Press() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language as LanguageCode

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString))
  }

  return (
    <>
      <Meta
        title={t('press.title', 'Press Releases')}
        description={t(
          'press.description',
          'Latest news and updates from Global Youth Organization'
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
              {t('press.title', 'Press Releases')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t(
                'press.subtitle',
                'Stay updated with our latest announcements and media coverage'
              )}
            </p>
          </motion.div>

          <div className="grid gap-8">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <h2 className="text-xl font-bold">
                        {release.title[currentLanguage]}
                      </h2>
                      <div className="text-sm text-base-content/60">
                        {formatDate(release.date)}
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-6">
                      {release.description[currentLanguage]}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {release.pdfUrl && (
                        <a
                          href={release.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm gap-2"
                        >
                          <Download className="w-4 h-4" />
                          {t('press.download_pdf', 'Download PDF')}
                        </a>
                      )}
                      {release.externalUrl && (
                        <a
                          href={release.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('press.read_more', 'Read More')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              {t('press.contact.title', 'Media Inquiries')}
            </h2>
            <p className="text-base-content/80 mb-6">
              {t(
                'press.contact.description',
                'For press inquiries and interview requests, please contact our media relations team'
              )}
            </p>
            <a
              href="mailto:press@globalyouth.org"
              className="btn btn-primary gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              {t('press.contact.button', 'Contact Media Relations')}
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}
