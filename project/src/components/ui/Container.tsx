import React, { HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  padding = true,
  ...props
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return 'max-w-xl';
      case 'sm':
        return 'max-w-3xl';
      case 'md':
        return 'max-w-5xl';
      case 'lg':
        return 'max-w-7xl';
      case 'xl':
        return 'max-w-screen-2xl';
      case 'full':
        return 'w-full';
      default:
        return 'max-w-7xl';
    }
  };

  const paddingClass = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div 
      className={`mx-auto ${getSizeClass()} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};