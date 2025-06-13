import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Star } from 'lucide-react'

interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'logo' | 'minimal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'accent' | 'gradient'
  text?: string
  fullScreen?: boolean
  className?: string
}

const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4'
      case 'md':
        return 'w-8 h-8'
      case 'lg':
        return 'w-12 h-12'
      case 'xl':
        return 'w-16 h-16'
      default:
        return 'w-8 h-8'
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary'
      case 'white':
        return 'text-white'
      case 'accent':
        return 'text-accent'
      case 'gradient':
        return 'text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text'
      default:
        return 'text-primary'
    }
  }

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'md':
        return 'text-base'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      default:
        return 'text-base'
    }
  }

  const renderSpinner = () => (
    <Loader2
      className={`${getSizeClasses()} ${getColorClasses()} animate-spin`}
    />
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${color === 'white' ? 'bg-white' : 'bg-primary'}`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <motion.div
      className={`${getSizeClasses()} rounded-full ${color === 'white' ? 'bg-white' : 'bg-primary'}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )

  const renderBars = () => (
    <div className="flex space-x-1 items-end">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`w-1 ${color === 'white' ? 'bg-white' : 'bg-primary'} rounded-full`}
          animate={{
            height: ['8px', '24px', '8px'],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )

  const renderLogo = () => (
    <motion.div
      className="relative"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div className={`${getSizeClasses()} relative`}>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary"
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Star className="w-4 h-4 text-primary" />
        </div>
      </div>
    </motion.div>
  )

  const renderMinimal = () => (
    <motion.div
      className={`w-6 h-6 border-2 border-current border-t-transparent rounded-full ${getColorClasses()}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots()
      case 'pulse':
        return renderPulse()
      case 'bars':
        return renderBars()
      case 'logo':
        return renderLogo()
      case 'minimal':
        return renderMinimal()
      case 'spinner':
      default:
        return renderSpinner()
    }
  }

  const content = (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {renderLoader()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`font-almarai ${getTextSize()} ${getColorClasses()} text-center`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-midnight via-cetacean to-black flex items-center justify-center z-50"
      >
        <div className="text-center">
          {content}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <p className="font-almarai text-white/60 text-sm">
              جاري التحميل، يرجى الانتظار...
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return content
}

// Specialized loaders for common use cases
export const PageLoader: React.FC<{ text?: string }> = ({
  text = 'جاري تحميل الصفحة...',
}) => <Loader variant="logo" size="lg" color="white" text={text} fullScreen />

export const ButtonLoader: React.FC = () => (
  <Loader variant="minimal" size="sm" color="white" />
)

export const SectionLoader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center py-12">
    <Loader variant="spinner" size="md" color="primary" text={text} />
  </div>
)

export const InlineLoader: React.FC = () => (
  <Loader variant="dots" size="sm" color="primary" />
)

export default Loader