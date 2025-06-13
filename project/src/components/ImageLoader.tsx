import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'

interface ImageLoaderProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  aspectRatio?: string
}

export default function ImageLoader({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  aspectRatio = 'aspect-video',
}: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleError = () => {
    if (currentSrc === fallbackSrc) {
      setIsLoading(false)
      setError(true)
    } else {
      setCurrentSrc(fallbackSrc)
    }
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatio} w-full`}>
      {isLoading && (
        <div className="absolute inset-0 bg-base-200 animate-pulse" />
      )}
      {error ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-base-200 text-base-content/60">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-sm">Image not available</span>
        </div>
      ) : (
        <motion.img
          src={currentSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300 w-full h-full object-cover`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          loading="lazy"
          decoding="async"
          width="100%"
          height="100%"
        />
      )}
    </div>
  )
}
