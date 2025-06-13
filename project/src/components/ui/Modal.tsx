import React, { Fragment, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  
  /**
   * Function to close the modal
   */
  onClose: () => void;
  
  /**
   * Modal title
   */
  title?: string;
  
  /**
   * Modal content
   */
  children: ReactNode;
  
  /**
   * Modal footer content
   */
  footer?: ReactNode;
  
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Whether to close the modal when clicking outside
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * Whether to close the modal when pressing escape
   */
  closeOnEsc?: boolean;
  
  /**
   * Whether to show the close button
   */
  showCloseButton?: boolean;
  
  /**
   * Additional class name for the modal
   */
  className?: string;
  
  /**
   * Whether to center the modal vertically
   */
  centered?: boolean;
  
  /**
   * Whether to scroll the modal content
   */
  scrollBehavior?: 'inside' | 'outside';
  
  /**
   * Whether to block scrolling of the page when modal is open
   */
  blockScrollOnMount?: boolean;
  
  /**
   * Whether to trap focus inside the modal
   */
  trapFocus?: boolean;
  
  /**
   * Whether to return focus to the element that triggered the modal when it closes
   */
  returnFocusOnClose?: boolean;
  
  /**
   * ID for the modal
   */
  id?: string;
}

/**
 * Modal component for displaying content in a layer above the app
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
  centered = true,
  scrollBehavior = 'inside',
  blockScrollOnMount = true,
  trapFocus = true,
  returnFocusOnClose = true,
  id,
}) => {
  // Handle escape key press
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      
      // Block scrolling on mount if needed
      if (blockScrollOnMount) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      
      // Restore scrolling when unmounted
      if (blockScrollOnMount) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose, closeOnEsc, blockScrollOnMount]);

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case 'full': return 'max-w-full m-4';
      default: return 'max-w-md';
    }
  };

  // Get content classes
  const getContentClasses = () => {
    return scrollBehavior === 'inside' ? 'overflow-y-auto max-h-[calc(100vh-10rem)]' : '';
  };

  // Modal ID
  const modalId = id || `modal-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
          <div
            className={cn(
              'fixed inset-0 z-50 flex overflow-y-auto py-10',
              centered ? 'items-center' : 'items-start',
              scrollBehavior === 'outside' ? 'overflow-y-auto' : 'overflow-hidden'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? `${modalId}-title` : undefined}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'relative w-full m-auto',
                getSizeClasses(),
                className
              )}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    {title && (
                      <h2 id={`${modalId}-title`} className="text-lg font-semibold text-gray-900">
                        {title}
                      </h2>
                    )}
                    {showCloseButton && (
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Close"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 -mr-2"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className={cn('px-6 py-4', getContentClasses())}>
                  {children}
                </div>

                {/* Footer */}
                {footer && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    {footer}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default Modal;