import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function CallToAction() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <div className="relative isolate overflow-hidden">
      <span
        className="absolute inset-0 bg-gradient-to-b from-primary to-dark/95"
        aria-hidden="true"
      ></span>
      <div
        className="absolute inset-0 bg-[url('grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-light tracking-tight mb-4">
            {t('cta.headline')}
          </h2>
          <p className="text-xl sm:text-2xl text-accent">
            {t('cta.subheadline')}
          </p>
          <button
            role="link"
            className="mt-10 btn btn-accent text-dark hover:brightness-110 rtl:flex-row-reverse flex items-center gap-2 group focus-visible:ring-4 focus-visible:ring-accent/60"
          >
            {t('cta.button')}
            <ArrowRight
              className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
