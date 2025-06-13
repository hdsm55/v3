import React from 'react';
import { cn } from '../../utils/cn';

export interface LoaderProps {
  /**
   * Size of the loader
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Color of the loader
   */
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'current';
  
  /**
   * Text to display with the loader
   */
  text?: string;
  
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Loader component for indicating loading state
 */
export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className,
}) => {
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-4 h-4';
      case 'sm': return 'w-6 h-6';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };
  
  // Get color classes
  const getColorClasses = () => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'accent': return 'text-accent';
      case 'white': return 'text-white';
      case 'current': return 'text-current';
      default: return 'text-primary';
    }
  };
  
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'border-2 rounded-full animate-spin',
          getSizeClasses(),
          getColorClasses(),
          'border-current border-t-transparent'
        )}
        role="status"
        aria-label={text || 'Loading'}
      />
      
      {text && (
        <div className={cn('mt-2 text-sm', getColorClasses())}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Loader;