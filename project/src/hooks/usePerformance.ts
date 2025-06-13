import { useEffect, useState, useCallback, useRef } from 'react';

// Hook لتحسين الأداء وتحميل الصور
export const useImageOptimization = () => {
  const [webpSupported, setWebpSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const supported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      setWebpSupported(supported);
    };

    checkWebPSupport();
  }, []);

  const optimizeImageUrl = useCallback((
    src: string,
    width?: number,
    height?: number,
    quality: number = 85
  ) => {
    if (!src || src.startsWith('http')) return src;

    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());

    if (webpSupported) {
      params.set('f', 'webp');
    }

    return `${src}?${params.toString()}`;
  }, [webpSupported]);

  return { optimizeImageUrl, webpSupported };
};

// Hook للتمرير المحسن
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string,
    offset: number = 0
  ) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, []);

  return { scrollToElement };
};

// Hook لمراقبة الأداء
export const usePerformanceMonitor = () => {
  const startTimeRef = useRef<number>(0);

  const startMeasure = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  const endMeasure = useCallback((label: string) => {
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }, []);

  const measure = useCallback((fn: () => void, label: string) => {
    startMeasure();
    fn();
    return endMeasure(label);
  }, [startMeasure, endMeasure]);

  return { startMeasure, endMeasure, measure };
};

// Hook للكشف عن نوع الجهاز
export const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      let type: 'mobile' | 'tablet' | 'desktop';

      if (width < 768) {
        type = 'mobile';
      } else if (width < 1024) {
        type = 'tablet';
      } else {
        type = 'desktop';
      }

      setDeviceType(type);
      setIsMobile(type === 'mobile');
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return { deviceType, isMobile };
};

// Hook لتحسين الحركة
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getMotionConfig = useCallback(() => {
    if (prefersReducedMotion) {
      return {
        initial: {},
        animate: {},
        transition: { duration: 0 }
      };
    }

    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: 'easeOut' }
    };
  }, [prefersReducedMotion]);

  return { prefersReducedMotion, getMotionConfig };
};