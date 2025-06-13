import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  ExternalLink,
  Calendar,
  ChevronDown,
} from 'lucide-react'
import Meta from '../components/Meta'

type LanguageCode = 'en' | 'ar' | 'tr'

interface LocalizedText {
  en: string
  ar: string
  tr: string
}

interface Report {
  id: string
  year: number
  title: LocalizedText
  description: LocalizedText
  fileSize: string
  downloadUrl: string
}

const reports: Report[] = [
  {
    id: 'annual-2023',
    year: 2023,
    title: {
      en: 'Annual Impact Report',
      ar: 'تقرير الأثر السنوي',
      tr: 'Yıllık Etki Raporu',
    },
    description: {
      en: 'Comprehensive overview of our global youth initiatives and their impact throughout 2023.',
      ar: 'نظرة شاملة على مبادراتنا الشبابية العالمية وتأثيرها طوال عام 2023.',
      tr: '2023 boyunca küresel gençlik girişimlerimizin ve etkilerinin kapsamlı bir değerlendirmesi.',
    },
    fileSize: '4.2 MB',
    downloadUrl: '/reports/annual-2023.pdf',
  },
  {
    id: 'financial-2023',
    year: 2023,
    title: {
      en: 'Financial Transparency Report',
      ar: 'تقرير الشفافية المالية',
      tr: 'Mali Şeffaflık Raporu',
    },
    description: {
      en: 'Detailed financial statements and allocation of resources for the fiscal year 2023.',
      ar: 'البيانات المالية المفصلة وتخصيص الموارد للسنة المالية 2023.',
      tr: '2023 mali yılı için detaylı finansal tablolar ve kaynak tahsisi.',
    },
    fileSize: '2.8 MB',
    downloadUrl: '/reports/financial-2023.pdf',
  },
  {
    id: 'impact-q4-2023',
    year: 2023,
    title: {
      en: 'Q4 2023 Impact Metrics',
      ar: 'مقاييس التأثير للربع الرابع 2023',
      tr: '2023 4. Çeyrek Etki Metrikleri',
    },
    description: {
      en: 'Quarterly metrics and achievements from our youth programs and initiatives.',
      ar: 'المقاييس والإنجازات الفصلية من برامجنا ومبادراتنا الشبابية.',
      tr: 'Gençlik programlarımız ve girişimlerimizden üç aylık metrikler ve başarılar.',
    },
    fileSize: '1.5 MB',
    downloadUrl: '/reports/q4-2023.pdf',
  },
  {
    id: 'annual-2022',
    year: 2022,
    title: {
      en: 'Annual Impact Report',
      ar: 'تقرير الأثر السنوي',
      tr: 'Yıllık Etki Raporu',
    },
    description: {
      en: 'A year in review: Our global impact and achievements throughout 2022.',
      ar: 'مراجعة السنة: تأثيرنا العالمي وإنجازاتنا طوال عام 2022.',
      tr: 'Yılın değerlendirmesi: 2022 boyunca küresel etkimiz ve başarılarımız.',
    },
    fileSize: '3.9 MB',
    downloadUrl: '/reports/annual-2022.pdf',
  },
  {
    id: 'financial-2022',
    year: 2022,
    title: {
      en: 'Financial Transparency Report',
      ar: 'تقرير الشفافية المالية',
      tr: 'Mali Şeffaflık Raporu',
    },
    description: {
      en: 'Complete financial overview and resource allocation for fiscal year 2022.',
      ar: 'نظرة مالية شاملة وتخصيص الموارد للسنة المالية 2022.',
      tr: '2022 mali yılı için eksiksiz finansal genel bakış ve kaynak tahsisi.',
    },
    fileSize: '2.6 MB',
    downloadUrl: '/reports/financial-2022.pdf',
  },
]

export default function Reports() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language as LanguageCode
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [expandedReport, setExpandedReport] = useState<string | null>(null)

  const years = Array.from(new Set(reports.map((report) => report.year))).sort(
    (a, b) => b - a
  )

  const filteredReports = reports.filter(
    (report) => selectedYear === 'all' || report.year === selectedYear
  )

  const handleDownload = (url: string) => {
    // In a real application, this would handle the actual file download
    console.log('Downloading:', url)
  }

  const toggleExpand = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId)
  }

  return (
    <>
      <Meta
        title={t('reports.title', 'Annual Reports')}
        description={t(
          'reports.description',
          'Access our annual reports, financial statements, and impact assessments'
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
              {t('reports.title', 'Annual Reports')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t(
                'reports.subtitle',
                'Transparency and accountability in our operations'
              )}
            </p>
          </motion.div>

          {/* Year Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedYear('all')}
                className={`btn ${
                  selectedYear === 'all' ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {t('reports.all_years', 'All Years')}
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`btn ${
                    selectedYear === year ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(report.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <FileText className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-semibold">
                          {report.title[currentLanguage]}
                        </h2>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {report.year}
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          {report.fileSize}
                        </div>
                      </div>
                      <p className="text-base-content/80">
                        {report.description[currentLanguage]}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 transform transition-transform ${
                        expandedReport === report.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {expandedReport === report.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 border-t border-base-300"
                  >
                    <div className="pt-6 flex flex-wrap gap-4">
                      <button
                        onClick={() => handleDownload(report.downloadUrl)}
                        className="btn btn-primary gap-2"
                      >
                        <Download className="w-5 h-5" />
                        {t('reports.download_pdf', 'Download PDF')}
                      </button>
                      <button className="btn btn-outline gap-2">
                        <ExternalLink className="w-5 h-5" />
                        {t('reports.view_online', 'View Online')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-base-content/60">
                {t(
                  'reports.no_reports',
                  'No reports found for the selected year'
                )}
              </p>
              <button
                onClick={() => setSelectedYear('all')}
                className="btn btn-primary mt-4"
              >
                {t('reports.show_all', 'Show All Reports')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
