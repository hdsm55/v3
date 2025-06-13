import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  getOptimizedImageUrl,
  createImagePlaceholder,
} from '../utils/imageOptimization'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  quality?: number
  lazy?: boolean
  placeholder?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 80,
  lazy = true,
  placeholder = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    const optimizedSrc = getOptimizedImageUrl(src, width, height, quality)

    if (lazy) {
      const img = new Image()
      img.onload = () => {
        setImageSrc(optimizedSrc)
        setIsLoaded(true)
      }
      img.onerror = () => {
        setHasError(true)
      }
      img.src = optimizedSrc
    } else {
      setImageSrc(optimizedSrc)
      setIsLoaded(true)
    }
  }, [src, width, height, quality, lazy])

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Image failed to load</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{
            backgroundImage:
              width && height
                ? `url(${createImagePlaceholder(width, height)})`
                : undefined,
          }}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Main Image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
