import React, { HTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: ReactNode;
  
  /**
   * Whether to apply hover effects
   */
  hover?: boolean;
  
  /**
   * Whether to show a border
   */
  bordered?: boolean;
  
  /**
   * Whether to animate the card
   */
  animate?: boolean;
  
  /**
   * Card padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Card shadow
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Card background
   */
  background?: 'white' | 'light' | 'dark' | 'primary' | 'secondary' | 'accent' | 'transparent';
  
  /**
   * Additional motion props
   */
  motionProps?: MotionProps;
}

/**
 * Card component for displaying content in a contained area
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    className = '',
    hover = true,
    bordered = false,
    animate = false,
    padding = 'md',
    shadow = 'md',
    background = 'white',
    motionProps,
    ...props
  }, ref) => {
    // Determine padding classes
    const getPaddingClass = () => {
      switch (padding) {
        case 'none': return 'p-0';
        case 'sm': return 'p-4';
        case 'md': return 'p-6';
        case 'lg': return 'p-8';
        case 'xl': return 'p-10';
        default: return 'p-6';
      }
    };

    // Determine shadow classes
    const getShadowClass = () => {
      switch (shadow) {
        case 'none': return '';
        case 'sm': return 'shadow-sm';
        case 'md': return 'shadow';
        case 'lg': return 'shadow-lg';
        case 'xl': return 'shadow-xl';
        default: return 'shadow';
      }
    };

    // Determine background classes
    const getBackgroundClass = () => {
      switch (background) {
        case 'white': return 'bg-white';
        case 'light': return 'bg-gray-50';
        case 'dark': return 'bg-gray-800 text-white';
        case 'primary': return 'bg-primary-50';
        case 'secondary': return 'bg-secondary-50';
        case 'accent': return 'bg-accent-50';
        case 'transparent': return 'bg-transparent';
        default: return 'bg-white';
      }
    };

    // Combine all classes
    const cardClasses = cn(
      'rounded-xl',
      getBackgroundClass(),
      getShadowClass(),
      hover ? 'transition-all duration-200 hover:shadow-lg' : '',
      bordered ? 'border border-gray-200' : '',
      getPaddingClass(),
      className
    );

    // Default motion props
    const defaultMotionProps: MotionProps = {
      whileHover: hover ? { y: -5, transition: { duration: 0.2 } } : {},
      ...motionProps,
    };

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          {...defaultMotionProps}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold', className)} {...props}>
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = '', ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props}>
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-gray-100', className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter
});