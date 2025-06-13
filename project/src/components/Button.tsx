import React, { forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'

import { ButtonLoader } from './Loader'

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onDrag' | 'onDragEnd' | 'onDragStart'
  > {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  animate?: boolean
  motionProps?: MotionProps
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      animate = true,
      motionProps,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'btn-primary'
        case 'secondary':
          return 'btn-secondary'
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
          return 'btn-primary'
      }
    }

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

    const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-sans transition-all duration-300
    border focus:outline-none focus:ring-4 focus:ring-primary/30
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${getRoundedClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ')

    const defaultMotionProps: MotionProps = {
      whileHover: { scale: disabled || loading ? 1 : 1.02 },
      whileTap: { scale: disabled || loading ? 1 : 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 },
      ...motionProps,
    }

    const content = (
      <>
        {loading && (
          <div className={getIconSize()}>
            <ButtonLoader />
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
      </>
    )

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={baseClasses}
          disabled={disabled || loading}
          {...defaultMotionProps}
          onClick={props.onClick}
          type={props.type}
          form={props.form}
          name={props.name}
          value={props.value}
          aria-busy={loading}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
        aria-busy={loading}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button