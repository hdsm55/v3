import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  Settings,
  Heart,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'

interface NavItem {
  path: string
  label: string
  id: string
}

interface Language {
  code: string
  name: string
  flag: string
}

export interface HeaderProps {
  /**
   * Whether the user is authenticated
   */
  isAuthenticated?: boolean

  /**
   * User data if authenticated
   */
  user?: {
    name?: string
    avatar?: string
    role?: string
  }

  /**
   * Function to handle logout
   */
  onLogout?: () => void

  /**
   * Additional class name
   */
  className?: string
}

const Logo = () => {
  const { t } = useTranslation()

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary-500 rounded-full flex items-center justify-center"
      >
        <span className="text-white font-bold text-lg">GY</span>
      </motion.div>
      <span className="text-white font-bold text-xl font-tajawal group-hover:text-secondary transition-colors duration-300">
        GlobalYouth
      </span>
    </Link>
  )
}

const NavLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
  <Link
    key={item.id}
    to={item.path}
    className={cn(
      'relative px-4 py-2 font-almarai font-medium transition-all duration-300',
      isActive ? 'text-secondary' : 'text-white hover:text-secondary'
    )}
  >
    {item.label}
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </Link>
)

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const isRTL = i18n.dir() === 'rtl'

  const languages: Language[] = [
    { code: 'ar', name: t('navbar.lang_ar'), flag: '🇸🇦' },
    { code: 'en', name: t('navbar.lang_en'), flag: '🇺🇸' },
  ]

  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 text-white"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('navbar.select_language')}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:block font-almarai text-sm">
          {languages.find((lang) => lang.code === i18n.language)?.name ||
            t('navbar.lang_ar')}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden min-w-[150px] z-50"
            role="listbox"
            onClick={(e) => e.stopPropagation()}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.code)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-300',
                  i18n.language === lang.code ? 'text-secondary' : 'text-white'
                )}
                role="option"
                aria-selected={i18n.language === lang.code}
              >
                <span>{lang.flag}</span>
                <span className="font-almarai">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const UserMenu = ({
  user,
  onLogout,
}: {
  user?: HeaderProps['user']
  onLogout?: () => void
}) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 text-white"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'User'}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <User className="w-5 h-5" />
        )}
        <span className="hidden sm:block font-almarai text-sm">
          {user?.name || 'User'}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden min-w-[200px] z-50"
            role="menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                <User className="w-5 h-5" />
                <span className="font-almarai">{t('navbar.profile')}</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                <Settings className="w-5 h-5" />
                <span className="font-almarai">{t('navbar.settings')}</span>
              </Link>
              <Link
                to="/favorites"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                <Heart className="w-5 h-5" />
                <span className="font-almarai">{t('navbar.favorites')}</span>
              </Link>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-almarai">{t('navbar.logout')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AuthButtons = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        className="hidden sm:flex"
        as={Link}
        to="/admin"
      >
        {t('navbar.admin')}
      </Button>
    </div>
  )
}

const MobileMenu = ({
  isOpen,
  onClose,
  navItems,
  isActive,
}: {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  isActive: (path: string) => boolean
}) => {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-midnight/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    'px-4 py-3 font-almarai font-medium rounded-lg transition-all duration-300',
                    isActive(item.path)
                      ? 'bg-white/10 text-secondary'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <AuthButtons />
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Header component with navigation and language switcher
 */
export const Header: React.FC<HeaderProps> = ({
  isAuthenticated = false,
  user,
  onLogout,
  className,
}) => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const isRTL = i18n.dir() === 'rtl'

  // Navigation items
  const navItems: NavItem[] = [
    { path: '/', label: t('navbar.home'), id: 'home' },
    { path: '/programs', label: t('navbar.programs'), id: 'programs' },
    { path: '/projects', label: t('navbar.projects'), id: 'projects' },
    { path: '/events', label: t('navbar.events'), id: 'events' },
    { path: '/volunteer', label: t('navbar.volunteer'), id: 'volunteer' },
    { path: '/contact', label: t('navbar.contact'), id: 'contact' },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-midnight/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent',
        className
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                isActive={isActive(item.path)}
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />

            {isAuthenticated ? (
              <UserMenu user={user} onLogout={onLogout} />
            ) : (
              <AuthButtons />
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-secondary transition-colors duration-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        isActive={isActive}
      />
    </header>
  )
}

export default Header
