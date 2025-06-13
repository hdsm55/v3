import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface NavigationProps {
  /**
   * Navigation items
   */
  items: {
    path: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  
  /**
   * Navigation orientation
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Whether to show icons
   */
  showIcons?: boolean;
  
  /**
   * Whether to animate the active indicator
   */
  animateActive?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Additional class name for each item
   */
  itemClassName?: string;
  
  /**
   * Additional class name for active items
   */
  activeItemClassName?: string;
}

/**
 * Navigation component for consistent navigation across the app
 */
export const Navigation: React.FC<NavigationProps> = ({
  items,
  orientation = 'horizontal',
  showIcons = true,
  animateActive = true,
  className,
  itemClassName,
  activeItemClassName,
}) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={cn(
        orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col',
        className
      )}
      aria-label="Main navigation"
    >
      {items.map((item) => {
        const active = isActive(item.path);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'relative transition-colors duration-200',
              orientation === 'horizontal'
                ? 'px-4 py-2 mx-1'
                : 'px-4 py-2 my-1',
              active
                ? cn('text-primary font-medium', activeItemClassName)
                : 'text-gray-600 hover:text-primary',
              itemClassName
            )}
            aria-current={active ? 'page' : undefined}
          >
            <div className="flex items-center gap-2">
              {showIcons && item.icon && (
                <span className="flex-shrink-0">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </div>
            
            {active && animateActive && (
              <motion.div
                layoutId="activeNavIndicator"
                className={cn(
                  'absolute bg-primary',
                  orientation === 'horizontal'
                    ? 'bottom-0 left-0 right-0 h-0.5'
                    : 'left-0 top-0 bottom-0 w-0.5'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;