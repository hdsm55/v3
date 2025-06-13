import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import HeroSection from '../components/HeroSection'
import Meta from '../components/Meta'
import Loader from '../components/Loader'

// Lazy load only essential sections for better performance
const StatsSection = lazy(() => import('../components/StatsSection'))
const CoreValuesSection = lazy(() => import('../components/CoreValuesSection'))
const ProjectsSection = lazy(() => import('../components/ProjectsSection'))
const TestimonialsSection = lazy(
  () => import('../components/TestimonialsSection')
)
const CTASection = lazy(() => import('../components/CTASection'))

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Meta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        image="/hero-poster.jpg"
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <Suspense fallback={<Loader />}>
        <StatsSection />
      </Suspense>

      {/* Core Values Section - Simplified without images */}
      <Suspense fallback={<Loader />}>
        <CoreValuesSection />
      </Suspense>

      {/* Featured Projects Section */}
      <Suspense fallback={<Loader />}>
        <ProjectsSection />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<Loader />}>
        <TestimonialsSection />
      </Suspense>

      {/* Call to Action Section */}
      <Suspense fallback={<Loader />}>
        <CTASection />
      </Suspense>
    </>
  )
}