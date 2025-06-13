import React, { ReactNode, forwardRef, ElementType } from 'react'
import { cn } from '../../utils/cn'

export interface ButtonProps<T extends ElementType = 'button'> {
  /**
   * Button variant
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'gradient'

  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Whether the button is in loading state
   */
  loading?: boolean

  /**
   * Text to show when button is loading
   */
  loadingText?: string

  /**
   * Icon to show on the left side of the button
   */
  leftIcon?: ReactNode

  /**
   * Icon to show on the right side of the button
   */
  rightIcon?: ReactNode

  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean

  /**
   * Button border radius
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'

  /**
   * The element to render the button as
   */
  as?: T

  /**
   * Additional props for the component
   */
  [key: string]: any
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = 'lg',
      children,
      className = '',
      disabled,
      as: Component = 'button',
      ...props
    },
    ref
  ) => {
    // Get variant classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-primary hover:bg-primary/90 text-white border-primary hover:border-primary/90'
        case 'secondary':
          return 'bg-secondary hover:bg-secondary/90 text-white border-secondary hover:border-secondary/90'
        case 'outline':
          return 'bg-transparent hover:bg-primary/10 text-primary border-primary hover:border-primary/90'
        case 'ghost':
          return 'bg-transparent hover:bg-white/10 text-white border-transparent hover:border-white/20'
        case 'danger':
          return 'bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 shadow-lg hover:shadow-xl hover:shadow-red-500/25'
        case 'success':
          return 'bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 shadow-lg hover:shadow-xl hover:shadow-green-500/25'
        case 'gradient':
          return 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent-hover text-white border-transparent shadow-lg hover:shadow-xl hover:shadow-primary/25'
        default:
          return 'bg-primary hover:bg-primary/90 text-white border-primary hover:border-primary/90'
      }
    }

    // Get size classes
    const getSizeClasses = () => {
      switch (size) {
        case 'xs':
          return 'px-3 py-1.5 text-xs font-medium'
        case 'sm':
          return 'px-4 py-2 text-sm font-medium'
        case 'md':
          return 'px-6 py-2.5 text-base font-semibold'
        case 'lg':
          return 'px-8 py-3 text-lg font-semibold'
        case 'xl':
          return 'px-10 py-4 text-xl font-bold'
        default:
          return 'px-6 py-2.5 text-base font-semibold'
      }
    }

    // Get rounded classes
    const getRoundedClasses = () => {
      switch (rounded) {
        case 'none':
          return 'rounded-none'
        case 'sm':
          return 'rounded-sm'
        case 'md':
          return 'rounded-md'
        case 'lg':
          return 'rounded-lg'
        case 'full':
          return 'rounded-full'
        default:
          return 'rounded-lg'
      }
    }

    // Get icon size
    const getIconSize = () => {
      switch (size) {
        case 'xs':
          return 'w-3 h-3'
        case 'sm':
          return 'w-4 h-4'
        case 'md':
          return 'w-5 h-5'
        case 'lg':
          return 'w-6 h-6'
        case 'xl':
          return 'w-7 h-7'
        default:
          return 'w-5 h-5'
      }
    }

    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2',
      'font-sans transition-all duration-300',
      'border focus:outline-none focus:ring-4 focus:ring-primary/30',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      getVariantClasses(),
      getSizeClasses(),
      getRoundedClasses(),
      fullWidth ? 'w-full' : '',
      className
    )

    return (
      <Component
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
        aria-busy={loading}
      >
        {loading && (
          <div className={getIconSize()}>
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        {!loading && leftIcon && (
          <span className={getIconSize()}>{leftIcon}</span>
        )}
        <span className={loading ? 'opacity-70' : ''}>
          {loading && loadingText ? loadingText : children}
        </span>
        {!loading && rightIcon && (
          <span className={getIconSize()}>{rightIcon}</span>
        )}
      </Component>
    )
  }
)

Button.displayName = 'Button'
