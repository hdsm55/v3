import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BarChart2,
  Users,
  Calendar,
  Settings,
  FileText,
  Mail,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SidebarProps {
  /**
   * Whether the sidebar is open (mobile)
   */
  isOpen: boolean;
  
  /**
   * Function to toggle the sidebar
   */
  onToggle: () => void;
  
  /**
   * User data
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

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  children?: Omit<NavItem, 'children'>[];
}

/**
 * Sidebar component for admin and dashboard layouts
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  user,
  onLogout,
  className,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  // Navigation items
  const navItems: NavItem[] = [
    {
      path: '/admin',
      label: t('sidebar.dashboard'),
      icon: Home,
    },
    {
      path: '/admin/programs',
      label: t('sidebar.programs'),
      icon: BarChart2,
    },
    {
      path: '/admin/projects',
      label: t('sidebar.projects'),
      icon: FileText,
    },
    {
      path: '/admin/events',
      label: t('sidebar.events'),
      icon: Calendar,
    },
    {
      path: '/admin/users',
      label: t('sidebar.users'),
      icon: Users,
    },
    {
      path: '/admin/messages',
      label: t('sidebar.messages'),
      icon: Mail,
    },
    {
      path: '/admin/settings',
      label: t('sidebar.settings'),
      icon: Settings,
      children: [
        {
          path: '/admin/settings/general',
          label: t('sidebar.general'),
          icon: Settings,
        },
        {
          path: '/admin/settings/appearance',
          label: t('sidebar.appearance'),
          icon: Settings,
        },
      ],
    },
  ];

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Check if a path is in the active path (for parent items with children)
  const isInPath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Toggle submenu
  const toggleSubmenu = (path: string) => {
    setOpenSubmenu(openSubmenu === path ? null : path);
  };

  // Sidebar variants for animation
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-midnight z-50 shadow-xl',
          'lg:relative lg:translate-x-0',
          className
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">GY</span>
            </div>
            <span className="text-white font-bold text-xl font-tajawal">
              Admin
            </span>
          </div>
          
          <button
            onClick={onToggle}
            className="lg:hidden text-white hover:text-secondary p-2"
            aria-label={t('sidebar.toggle')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{user.name || 'User'}</p>
                {user.role && (
                  <p className="text-white/60 text-xs">{user.role}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-13rem)]">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.path)}
                      className={cn(
                        'flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors',
                        isInPath(item.path)
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                      aria-expanded={openSubmenu === item.path}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          'w-4 h-4 transition-transform',
                          openSubmenu === item.path ? 'rotate-90' : ''
                        )}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openSubmenu === item.path && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1"
                        >
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                className={({ isActive }) =>
                                  cn(
                                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                                    isActive
                                      ? 'bg-white/10 text-white'
                                      : 'text-white/70 hover:text-white hover:bg-white/5'
                                  )
                                }
                              >
                                <child.icon className="w-4 h-4" />
                                <span>{child.label}</span>
                              </NavLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('sidebar.logout')}</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors lg:hidden z-30"
        aria-label={t('sidebar.toggle')}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

export default Sidebar;