import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, User, LogIn } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

interface NavItem {
  path: string;
  label: string;
  id: string;
}

export interface HeaderProps {
  /**
   * Whether the user is authenticated
   */
  isAuthenticated?: boolean;
  
  /**
   * User data if authenticated
   */
  user?: {
    name?: string;
    avatar?: string;
    role?: string;
  };
  
  /**
   * Function to handle logout
   */
  onLogout?: () => void;
  
  /**
   * Additional class name
   */
  className?: string;
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
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems: NavItem[] = [
    { path: '/', label: t('navbar.home'), id: 'home' },
    { path: '/programs', label: t('navbar.programs'), id: 'programs' },
    { path: '/projects', label: t('navbar.projects'), id: 'projects' },
    { path: '/events', label: t('navbar.events'), id: 'events' },
    { path: '/volunteer', label: t('navbar.volunteer'), id: 'volunteer' },
    { path: '/contact', label: t('navbar.contact'), id: 'contact' },
  ];

  // Languages
  const languages = [
    { code: 'ar', name: t('navbar.lang_ar'), flag: '🇸🇦' },
    { code: 'en', name: t('navbar.lang_en'), flag: '🇺🇸' },
  ];

  // Toggle language
  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsLangOpen(false);
      setIsUserMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-midnight/95 backdrop-blur-md shadow-lg' : 'bg-transparent',
        className
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  'relative px-4 py-2 font-almarai font-medium transition-all duration-300',
                  isActive(item.path) ? 'text-secondary' : 'text-white hover:text-secondary'
                )}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangOpen(!isLangOpen);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-primary-100 border border-primary-200 rounded-full transition-all duration-300 text-primary-700 shadow-sm"
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
                aria-label={t('navbar.select_language')}
              >
                <Globe className="w-4 h-4 text-primary-700" />
                <span className="hidden sm:block font-almarai text-sm text-primary-700">
                  {languages.find((lang) => lang.code === i18n.language)
                    ?.name || t('navbar.lang_ar')}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-primary-700 transition-transform duration-300',
                    isLangOpen ? 'rotate-180' : ''
                  )}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
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

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 text-white"
                  aria-expanded={isUserMenuOpen}
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
                      isUserMenuOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden min-w-[200px] z-50"
                      role="menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        {user?.role && (
                          <p className="text-xs text-white/70">{user.role}</p>
                        )}
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                          role="menuitem"
                        >
                          {t('navbar.profile')}
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                            role="menuitem"
                          >
                            {t('navbar.admin')}
                          </Link>
                        )}
                        <button
                          onClick={onLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                          role="menuitem"
                        >
                          {t('navbar.logout')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LogIn className="w-4 h-4" />}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {t('navbar.login')}
                </Button>
              </Link>
            )}

            {/* CTA Button */}
            <Link to="/join" className="hidden sm:block">
              <Button
                variant="secondary"
                size="sm"
                className="font-almarai shadow-lg hover:shadow-xl hover:shadow-secondary/20"
              >
                {t('join.button', 'Join Now')}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-secondary transition-colors duration-300"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t('navbar.close_menu') : t('navbar.open_menu')}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-midnight/98 backdrop-blur-lg border-t border-white/10"
            id="mobile-menu"
            role="menu"
            aria-label={t('navbar.mobile_menu')}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-xl font-almarai font-medium transition-all duration-300',
                      isActive(item.path)
                        ? 'bg-secondary/20 text-secondary'
                        : 'text-white hover:bg-white/10 hover:text-secondary'
                    )}
                    role="menuitem"
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile CTA */}
                <Link
                  to="/join"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-to-r from-secondary to-secondary-500 text-white font-bold px-6 py-3 rounded-xl text-center transition-all duration-300 font-almarai mt-6 shadow-lg"
                  role="menuitem"
                >
                  {t('join.button', 'Join Now')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {(isMenuOpen || isLangOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => {
            setIsMenuOpen(false);
            setIsLangOpen(false);
            setIsUserMenuOpen(false);
          }}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;