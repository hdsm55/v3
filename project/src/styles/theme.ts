// Design system constants for the application
// This file defines our design tokens that can be used throughout the application

export const theme = {
  // Color palette
  colors: {
    // Primary colors
    primary: {
      50: '#e6f0f9',
      100: '#cce0f3',
      200: '#99c2e6',
      300: '#66a3da',
      400: '#3385cd',
      500: '#0066c1',
      600: '#00529a',
      700: '#003d74',
      800: '#00294d',
      900: '#001427',
      DEFAULT: '#003362',
      light: '#0A4A7F',
      dark: '#002345',
      hover: '#00284D'
    },
    // Secondary colors
    secondary: {
      50: '#eeecfe',
      100: '#ddd9fd',
      200: '#bbb3fb',
      300: '#988df9',
      400: '#7667f7',
      500: '#5541f5',
      600: '#4434c4',
      700: '#332793',
      800: '#221a62',
      900: '#110d31',
      DEFAULT: '#4f46e5',
      light: '#6366f1',
      dark: '#4338ca',
      hover: '#4338ca'
    },
    // Accent colors
    accent: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      DEFAULT: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      hover: '#6d28d9'
    },
    // Neutral colors
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      DEFAULT: '#6b7280'
    },
    // Semantic colors
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      500: '#10b981',
      600: '#059669',
      DEFAULT: '#10b981'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      DEFAULT: '#f59e0b'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      DEFAULT: '#ef4444'
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      DEFAULT: '#3b82f6'
    },
    // Special colors
    midnight: '#0F172A',
    cetacean: '#1E293B'
  },

  // Typography
  typography: {
    // Font families
    fontFamily: {
      sans: ['Tajawal', 'sans-serif'],
      body: ['Almarai', 'sans-serif']
    },
    // Font sizes
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
      '9xl': '8rem'      // 128px
    },
    // Font weights
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    // Line heights
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // Spacing system
  spacing: {
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  // Breakpoints for responsive design
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-index values
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '1000',
    sticky: '1100',
    fixed: '1200',
    modal: '1300',
    popover: '1400',
    toast: '1500'
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },

  // Transitions
  transitions: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

// CSS variables for the theme
export const cssVariables = `
  :root {
    /* Primary Colors */
    --color-primary: ${theme.colors.primary.DEFAULT};
    --color-primary-light: ${theme.colors.primary.light};
    --color-primary-dark: ${theme.colors.primary.dark};
    
    /* Secondary Colors */
    --color-secondary: ${theme.colors.secondary.DEFAULT};
    --color-secondary-light: ${theme.colors.secondary.light};
    --color-secondary-dark: ${theme.colors.secondary.dark};
    
    /* Accent Colors */
    --color-accent: ${theme.colors.accent.DEFAULT};
    --color-accent-light: ${theme.colors.accent.light};
    --color-accent-dark: ${theme.colors.accent.dark};
    
    /* Semantic Colors */
    --color-success: ${theme.colors.success.DEFAULT};
    --color-warning: ${theme.colors.warning.DEFAULT};
    --color-error: ${theme.colors.error.DEFAULT};
    --color-info: ${theme.colors.info.DEFAULT};
    
    /* Special Colors */
    --color-midnight: ${theme.colors.midnight};
    --color-cetacean: ${theme.colors.cetacean};
    
    /* Typography */
    --font-family-sans: ${theme.typography.fontFamily.sans.join(', ')};
    --font-family-body: ${theme.typography.fontFamily.body.join(', ')};
    
    /* Spacing */
    --spacing-1: ${theme.spacing[1]};
    --spacing-2: ${theme.spacing[2]};
    --spacing-4: ${theme.spacing[4]};
    --spacing-8: ${theme.spacing[8]};
    --spacing-16: ${theme.spacing[16]};
    
    /* Border Radius */
    --border-radius-sm: ${theme.borderRadius.sm};
    --border-radius-md: ${theme.borderRadius.md};
    --border-radius-lg: ${theme.borderRadius.lg};
    --border-radius-xl: ${theme.borderRadius.xl};
    
    /* Shadows */
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-xl: ${theme.shadows.xl};
    
    /* Transitions */
    --transition-fast: ${theme.transitions.duration[150]};
    --transition-normal: ${theme.transitions.duration[300]};
    --transition-slow: ${theme.transitions.duration[500]};
  }
`;

export default theme;