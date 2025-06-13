import React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <Globe className="w-5 h-5" />
        <span className="font-almarai">
          {i18n.language === 'ar'
            ? 'العربية'
            : i18n.language === 'tr'
            ? 'Türkçe'
            : 'English'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          <button
            onClick={() => changeLanguage('ar')}
            className={`w-full text-right px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
              i18n.language === 'ar'
                ? 'bg-gray-50 text-primary-600'
                : 'text-gray-700'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full text-right px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
              i18n.language === 'en'
                ? 'bg-gray-50 text-primary-600'
                : 'text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('tr')}
            className={`w-full text-right px-4 py-2 hover:bg-gray-50 transition-colors duration-200 ${
              i18n.language === 'tr'
                ? 'bg-gray-50 text-primary-600'
                : 'text-gray-700'
            }`}
          >
            Türkçe
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
