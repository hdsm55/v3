import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface MetaProps {
  title?: string
  description?: string
  image?: string
  type?: string
  url?: string
}

const DEFAULT_META = {
  title: 'Shababuna International Organization',
  description:
    'Empowering youth through education, community development, and humanitarian aid.',
  image: '/Shababuna-Logo-1.1.svg',
  type: 'website',
}

export default function Meta({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  image = DEFAULT_META.image,
  type = DEFAULT_META.type,
  url = typeof window !== 'undefined' ? window.location.href : '',
}: MetaProps) {
  const siteName = 'Shababuna International Organization'
  const fullTitle =
    title === DEFAULT_META.title ? title : `${title} | ${siteName}`
  const canonicalUrl = url.split('?')[0].split('#')[0]
  const location = useLocation()
  const pathname = location.pathname

  // Generate alternate language URLs
  const alternateUrls = {
    en: `https://shababuna.org${pathname}`,
    ar: `https://shababuna.org/ar${pathname}`,
    tr: `https://shababuna.org/tr${pathname}`,
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta name="author" content={siteName} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="ar" href={alternateUrls.ar} />
      <link rel="alternate" hrefLang="tr" href={alternateUrls.tr} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.en} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#005A9C" />
    </Helmet>
  )
}
