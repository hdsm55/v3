import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink,
} from 'lucide-react'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const changeLang = (lang: string) => i18n.changeLanguage(lang)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const mainLinks = [
    { to: '/about', label: t('footer.about') },
    { to: '/projects', label: t('footer.projects') },
    { to: '/events', label: t('footer.events') },
    { to: '/blog', label: t('footer.blog') },
    { to: '/who-we-are', label: t('footer.whoWeAre') },
    { to: '/reports', label: t('footer.reports') },
  ]

  const supportLinks = [
    { to: '/contact', label: t('footer.contact') },
    { to: '/faq', label: t('footer.faq') },
    { to: '/volunteer', label: t('footer.volunteer') },
    { to: '/join', label: t('footer.join') },
    { to: '/donate', label: t('footer.donate') },
    { to: '/partners', label: t('footer.partners') },
  ]

  const legalLinks = [
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/press', label: t('footer.press') },
  ]

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://facebook.com/shababuna',
      label: 'Facebook',
      color: 'hover:text-blue-400',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/shababuna',
      label: 'Twitter',
      color: 'hover:text-sky-400',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/shababuna',
      label: 'Instagram',
      color: 'hover:text-pink-400',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/shababuna',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@shababuna',
      label: 'YouTube',
      color: 'hover:text-red-500',
    },
  ]

  return (
    <footer className="section bg-gradient-to-br from-midnight via-cetacean to-black text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <img
                src="/Shababuna-Logo-1.1.svg.svg"
                alt={t('navbar.logoAlt')}
                className="h-12 w-auto mb-4"
                loading="lazy"
                width="180"
                height="48"
              />
              <h3 className="font-tajawal text-2xl font-bold mb-4 text-white">
                {t('hero.organization')}
              </h3>
              <p className="text-white/70 leading-relaxed max-w-md font-almarai">
                {t('about.mission.description')}
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-accent" aria-hidden="true" />
                <a
                  href="mailto:info@shababuna.org"
                  className="hover:text-white transition-colors font-almarai"
                >
                  info@shababuna.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-accent" aria-hidden="true" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors font-almarai"
                >
                  +123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-accent" aria-hidden="true" />
                <span className="font-almarai">{t('contact.info.address.details')}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-tajawal text-lg font-bold mb-6 text-white">
              {t('footer.about_us')}
            </h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group font-almarai"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-tajawal text-lg font-bold mb-6 text-white">
              {t('footer.get_involved')}
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group font-almarai"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-tajawal text-lg font-bold mb-6 text-white">
              {t('newsletter.heading')}
            </h4>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-white/70 text-sm mb-4 font-almarai">
                {t('newsletter.subheading')}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  id="footer-email"
                  name="footer-email"
                  placeholder={t('newsletter.placeholder')}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent backdrop-blur-sm font-almarai"
                  aria-label={t('newsletter.placeholder')}
                />
                <button 
                  className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors flex-shrink-0"
                  aria-label={t('newsletter.button')}
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <p className="text-white/60 text-xs mt-2 font-almarai">
                {t('newsletter.privacy')}
              </p>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-white/70 text-sm mb-4 font-almarai">
                {t('common.followUs')}
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white/10 hover:bg-white/20 text-white ${color} w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 text-white/60"
            >
              <span className="text-sm font-almarai">
                {t('footer.copy')}
              </span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" aria-hidden="true" />
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-300 font-almarai"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>

            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label htmlFor="footer-language" className="sr-only">
                {t('navbar.select_language')}
              </label>
              <select
                id="footer-language"
                name="footer-language"
                onChange={(e) => changeLang(e.target.value)}
                value={i18n.language}
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm font-almarai"
                aria-label={t('navbar.select_language')}
              >
                <option value="ar" className="bg-midnight text-white">
                  {t('navbar.lang_ar')}
                </option>
                <option value="en" className="bg-midnight text-white">
                  {t('navbar.lang_en')}
                </option>
                <option value="tr" className="bg-midnight text-white">
                  {t('navbar.lang_tr')}
                </option>
              </select>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button 
        onClick={scrollToTop} 
        className="fixed bottom-6 right-6 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t('common.back_to_top', 'Back to top')}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </motion.button>
    </footer>
  )
}