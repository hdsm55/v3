export const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: prefersReducedMotion ? 0 : 0.5 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.1
    }
  }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: prefersReducedMotion ? 0 : 0.3 }
};