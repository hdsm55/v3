import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const changeLang = (lang: string) => i18n.changeLanguage(lang)

  const navLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/projects', label: t('navbar.projects') },
    { to: '/events', label: t('navbar.events') },
    { to: '/about', label: t('navbar.about') },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 bg-black ${
        isScrolled ? 'shadow-xl backdrop-blur-md' : 'bg-opacity-95'
      }`}
      role="navigation"
      aria-label={t('navbar.main_navigation')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <a
              href="/"
              aria-label={t('navbar.home')}
              className="flex items-center"
            >
              <img
                src="/Shababuna-Logo-1.1.svg.svg"
                alt={t('navbar.logoAlt')}
                className="h-12 w-auto"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex md:space-x-8 md:items-center"
            role="menubar"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <a
                  href={link.to}
                  className={`relative font-tajawal text-white hover:text-white/80 px-3 py-2 transition-colors duration-300 rounded-lg ${
                    location.pathname === link.to
                      ? 'bg-white/10 text-white font-bold shadow'
                      : ''
                  }`}
                  role="menuitem"
                  aria-current={
                    location.pathname === link.to ? 'page' : undefined
                  }
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex md:items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <label htmlFor="language-select" className="sr-only">
                {t('navbar.select_language')}
              </label>
              <select
                id="language-select"
                onChange={(e) => changeLang(e.target.value)}
                value={i18n.language}
                className={`font-almarai bg-black/80 text-white border border-white/20 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300`}
                aria-label={t('navbar.select_language')}
              >
                <option value="ar">{t('navbar.lang_ar')}</option>
                <option value="en">{t('navbar.lang_en')}</option>
                <option value="tr">{t('navbar.lang_tr')}</option>
              </select>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-300"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={
                isOpen ? t('navbar.close_menu') : t('navbar.open_menu')
              }
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md"
            role="menu"
            aria-label={t('navbar.mobile_menu')}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={link.to}
                  className={`block font-tajawal text-white hover:text-white/80 px-4 py-3 transition-colors duration-300 rounded-lg ${
                    location.pathname === link.to
                      ? 'bg-white/10 text-white font-bold'
                      : ''
                  }`}
                  role="menuitem"
                  aria-current={
                    location.pathname === link.to ? 'page' : undefined
                  }
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="px-4 py-3"
            >
              <label htmlFor="mobile-language-select" className="sr-only">
                {t('navbar.select_language')}
              </label>
              <select
                id="mobile-language-select"
                onChange={(e) => changeLang(e.target.value)}
                value={i18n.language}
                className="font-almarai bg-black/80 text-white border border-white/20 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 w-full mt-2"
                aria-label={t('navbar.select_language')}
              >
                <option value="ar">{t('navbar.lang_ar')}</option>
                <option value="en">{t('navbar.lang_en')}</option>
                <option value="tr">{t('navbar.lang_tr')}</option>
              </select>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}