import React, { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  containerClassName?: string;
  fullWidth?: boolean;
  background?: 'light' | 'dark' | 'primary' | 'secondary' | 'accent' | 'transparent' | 'white' | 'gradient';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  fullWidth = false,
  background = 'white',
  spacing = 'md',
  ...props
}) => {
  const getBgColor = () => {
    switch (background) {
      case 'light':
        return 'bg-gray-50';
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'primary':
        return 'bg-primary text-white';
      case 'secondary':
        return 'bg-secondary text-white';
      case 'accent':
        return 'bg-accent text-white';
      case 'transparent':
        return 'bg-transparent';
      case 'white':
        return 'bg-white';
      case 'gradient':
        return 'bg-gradient-to-br from-primary to-primary-dark text-white';
      default:
        return 'bg-white';
    }
  };

  const getSpacingClass = () => {
    switch (spacing) {
      case 'none':
        return 'py-0';
      case 'sm':
        return 'py-8 md:py-12';
      case 'md':
        return 'py-12 md:py-16';
      case 'lg':
        return 'py-16 md:py-24';
      case 'xl':
        return 'py-20 md:py-32';
      default:
        return 'py-12 md:py-16';
    }
  };

  return (
    <section 
      className={`${getBgColor()} ${getSpacingClass()} ${className}`} 
      dir="auto"
      {...props}
    >
      <div className={`px-4 sm:px-6 lg:px-8 ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};