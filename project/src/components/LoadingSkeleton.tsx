import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'banner' | 'button' | 'custom'
  width?: string | number
  height?: string | number
  className?: string
  rows?: number
  showAvatar?: boolean
  showButton?: boolean
  animate?: boolean
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  width,
  height,
  className = '',
  rows = 3,
  showAvatar = false,
  showButton = false,
  animate = true,
}) => {
  const skeletonClass = `bg-white/10 backdrop-blur-sm rounded-lg ${animate ? 'animate-pulse' : ''}`

  const pulseAnimation = animate
    ? {
        animate: {
          opacity: [0.5, 1, 0.5],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }
    : {}

  const SkeletonBox = ({
    w,
    h,
    className: customClass = '',
    ...props
  }: {
    w?: string | number
    h?: string | number
    className?: string
    [key: string]: unknown
  }) => (
    <motion.div
      className={`${skeletonClass} ${customClass}`}
      style={{ width: w, height: h }}
      {...(animate ? pulseAnimation : {})}
      {...props}
    />
  )

  switch (variant) {
    case 'text':
      return (
        <div className={`space-y-3 ${className}`}>
          {Array.from({ length: rows }).map((_, index) => (
            <SkeletonBox
              key={index}
              w={index === rows - 1 ? '75%' : '100%'}
              h="1rem"
            />
          ))}
        </div>
      )

    case 'avatar':
      return (
        <SkeletonBox
          w={width || '3rem'}
          h={height || '3rem'}
          className={`rounded-full ${className}`}
        />
      )

    case 'banner':
      return (
        <SkeletonBox
          w={width || '100%'}
          h={height || '12rem'}
          className={className}
        />
      )

    case 'button':
      return (
        <SkeletonBox
          w={width || '8rem'}
          h={height || '2.5rem'}
          className={`rounded-full ${className}`}
        />
      )

    case 'card':
      return (
        <div
          className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 ${className}`}
        >
          {/* Header with optional avatar */}
          <div className="flex items-center space-x-4 mb-4">
            {showAvatar && (
              <SkeletonBox w="3rem" h="3rem" className="rounded-full" />
            )}
            <div className="flex-1 space-y-2">
              <SkeletonBox w="60%" h="1.25rem" />
              <SkeletonBox w="40%" h="1rem" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 mb-4">
            <SkeletonBox w="100%" h="1rem" />
            <SkeletonBox w="95%" h="1rem" />
            <SkeletonBox w="80%" h="1rem" />
          </div>

          {/* Optional button */}
          {showButton && (
            <div className="flex justify-end">
              <SkeletonBox w="6rem" h="2.5rem" className="rounded-full" />
            </div>
          )}
        </div>
      )

    case 'custom':
      return (
        <SkeletonBox
          w={width || '100%'}
          h={height || '4rem'}
          className={className}
        />
      )

    default:
      return null
  }
}

// Grid of skeleton cards
export const SkeletonGrid: React.FC<{
  count?: number
  columns?: number
  cardProps?: Partial<LoadingSkeletonProps>
  className?: string
}> = ({ count = 6, columns = 3, cardProps = {}, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} variant="card" {...cardProps} />
      ))}
    </div>
  )
}

// Section skeleton with title and content
export const SectionSkeleton: React.FC<{
  showTitle?: boolean
  showSubtitle?: boolean
  contentRows?: number
  className?: string
}> = ({
  showTitle = true,
  showSubtitle = false,
  contentRows = 4,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title Section */}
      {showTitle && (
        <div className="text-center space-y-3">
          <LoadingSkeleton
            variant="custom"
            width="20rem"
            height="2.5rem"
            className="mx-auto"
          />
          {showSubtitle && (
            <LoadingSkeleton
              variant="custom"
              width="30rem"
              height="1.5rem"
              className="mx-auto"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {Array.from({ length: contentRows }).map((_, index) => (
          <LoadingSkeleton key={index} variant="text" rows={3} />
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton
