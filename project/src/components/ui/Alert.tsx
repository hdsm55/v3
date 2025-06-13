import React, { HTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Alert status determines the color scheme
   */
  status?: AlertStatus;
  
  /**
   * Alert title
   */
  title?: string;
  
  /**
   * Alert content
   */
  children: ReactNode;
  
  /**
   * Whether the alert is dismissible
   */
  dismissible?: boolean;
  
  /**
   * Function to call when the alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Whether to show the alert icon
   */
  showIcon?: boolean;
  
  /**
   * Custom icon to display
   */
  icon?: ReactNode;
  
  /**
   * Whether to animate the alert
   */
  animate?: boolean;
  
  /**
   * Alert variant
   */
  variant?: 'solid' | 'subtle' | 'outline';
}

/**
 * Alert component for displaying feedback messages
 */
export const Alert: React.FC<AlertProps> = ({
  status = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  showIcon = true,
  icon,
  animate = true,
  variant = 'subtle',
  className,
  ...props
}) => {
  // Get status icon
  const getStatusIcon = () => {
    if (icon) return icon;
    
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };
  
  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'solid':
        return {
          info: 'bg-info text-white',
          success: 'bg-success text-white',
          warning: 'bg-warning text-white',
          error: 'bg-error text-white'
        }[status];
      case 'outline':
        return {
          info: 'bg-white border border-info text-info',
          success: 'bg-white border border-success text-success',
          warning: 'bg-white border border-warning text-warning',
          error: 'bg-white border border-error text-error'
        }[status];
      case 'subtle':
      default:
        return {
          info: 'bg-info-50 text-info-600',
          success: 'bg-success-50 text-success-600',
          warning: 'bg-warning-50 text-warning-600',
          error: 'bg-error-50 text-error-600'
        }[status];
    }
  };
  
  // Animation variants
  const alertVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };
  
  const alertComponent = (
    <div
      role="alert"
      className={cn(
        'rounded-lg p-4',
        getVariantClasses(),
        className
      )}
      {...props}
    >
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            {getStatusIcon()}
          </div>
        )}
        
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        
        {dismissible && onDismiss && (
          <button
            type="button"
            className="flex-shrink-0 ml-3 -mt-1 -mr-1 p-1 rounded-full hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
  
  if (!animate) {
    return alertComponent;
  }
  
  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={alertVariants}
        transition={{ duration: 0.2 }}
      >
        {alertComponent}
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;