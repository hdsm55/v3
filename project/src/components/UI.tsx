import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode, forwardRef } from 'react';

// ==============================
// Button Component
// ==============================
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
    
    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-5 py-2.5',
      lg: 'text-lg px-6 py-3',
    }[size];
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses} ${widthClass} inline-flex items-center justify-center gap-2 ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-block">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="inline-block">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ==============================
// Section Component
// ==============================
export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <section className={`section ${className}`} {...props}>
      <div className={`container mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

// ==============================
// Card Component
// ==============================
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  bordered = false,
  ...props
}) => {
  return (
    <div
      className={`
        bg-surface rounded-card p-6
        ${hover ? 'hover:shadow-card-hover transition-shadow duration-200' : ''}
        ${bordered ? 'border border-gray-200' : 'shadow-card'}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// ==============================
// Card Components
// ==============================
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
};

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};