// Image optimization utilities for better performance

export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  height?: number,
  quality = 80
): string => {
  // For external URLs (like Pexels), return as is or add query params if supported
  if (url.startsWith('http')) {
    // For Pexels images, we can add quality parameters
    if (url.includes('pexels.com')) {
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}auto=compress&cs=tinysrgb${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
    }
    return url
  }

  // For local images, return with optimization params
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}q=${quality}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
}

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export const createImagePlaceholder = (width: number, height: number): string => {
  return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`
}

export const isImageLoaded = (img: HTMLImageElement): boolean => {
  return img.complete && img.naturalHeight !== 0
}
