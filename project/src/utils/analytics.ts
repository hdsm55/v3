// Google Analytics Integration for Shababna Platform

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics Configuration
export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX'

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    console.log('Google Analytics initialized with ID:', GA_TRACKING_ID)
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title || document.title,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track user engagement events
export const trackUserEngagement = {
  // Track project views
  projectView: (projectId: string, projectTitle: string) => {
    trackEvent('view_project', 'Projects', projectTitle, parseInt(projectId))
  },

  // Track event registrations
  eventRegistration: (eventId: string, eventTitle: string) => {
    trackEvent('register_event', 'Events', eventTitle, parseInt(eventId))
  },

  // Track user signups
  userSignup: (method: string = 'website') => {
    trackEvent('sign_up', 'User', method)
  },

  // Track contact form submissions
  contactSubmission: (type: string = 'general') => {
    trackEvent('contact_form', 'Contact', type)
  },

  // Track newsletter subscriptions
  newsletterSubscription: () => {
    trackEvent('newsletter_signup', 'Marketing', 'footer')
  },

  // Track file downloads
  fileDownload: (fileName: string) => {
    trackEvent('download', 'Files', fileName)
  },

  // Track social media clicks
  socialClick: (platform: string, location: string = 'footer') => {
    trackEvent('social_click', 'Social', `${platform}_${location}`)
  },

  // Track search usage
  search: (searchTerm: string, resultsCount: number) => {
    trackEvent('search', 'Search', searchTerm, resultsCount)
  },

  // Track video plays
  videoPlay: (videoTitle: string, videoDuration?: number) => {
    trackEvent('video_play', 'Media', videoTitle, videoDuration)
  },

  // Track scroll depth
  scrollDepth: (percentage: number) => {
    trackEvent('scroll', 'Engagement', `${percentage}%`, percentage)
  },

  // Track time on page
  timeOnPage: (seconds: number, pagePath: string) => {
    trackEvent('timing_complete', 'Engagement', pagePath, seconds)
  }
}

// Enhanced Analytics for Dashboard
export const dashboardAnalytics = {
  // Track admin actions
  adminAction: (action: string, resource: string, resourceId?: string) => {
    trackEvent(`admin_${action}`, 'Admin', `${resource}_${resourceId || 'unknown'}`)
  },

  // Track user management actions
  userManagement: (action: 'create' | 'update' | 'delete' | 'approve', userId: string) => {
    trackEvent(`user_${action}`, 'User Management', userId)
  },

  // Track project management actions
  projectManagement: (action: 'create' | 'update' | 'delete' | 'publish', projectId: string) => {
    trackEvent(`project_${action}`, 'Project Management', projectId)
  },

  // Track event management actions
  eventManagement: (action: 'create' | 'update' | 'delete' | 'publish', eventId: string) => {
    trackEvent(`event_${action}`, 'Event Management', eventId)
  }
}

// Performance tracking
export const performanceTracking = {
  // Track page load time
  pageLoad: (loadTime: number, pageName: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'timing_complete', {
        name: 'page_load',
        value: loadTime,
        event_category: 'Performance',
        event_label: pageName
      })
    }
  },

  // Track API response times
  apiResponse: (endpoint: string, responseTime: number, status: number) => {
    trackEvent('api_response', 'Performance', `${endpoint}_${status}`, responseTime)
  },

  // Track image load times
  imageLoad: (imageUrl: string, loadTime: number) => {
    trackEvent('image_load', 'Performance', imageUrl, loadTime)
  }
}

// E-commerce tracking (for donations or paid events)
export const ecommerceTracking = {
  // Track purchases
  purchase: (transactionId: string, value: number, currency: string = 'USD', items: any[]) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items
      })
    }
  },

  // Track donations
  donation: (amount: number, campaign?: string) => {
    trackEvent('donate', 'Fundraising', campaign, amount)
  },

  // Track event registrations with payment
  paidEventRegistration: (eventId: string, amount: number, currency: string = 'USD') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'purchase', {
        transaction_id: `event_${eventId}_${Date.now()}`,
        value: amount,
        currency: currency,
        items: [{
          item_id: eventId,
          item_name: 'Event Registration',
          category: 'Events',
          quantity: 1,
          price: amount
        }]
      })
    }
  }
}

// Analytics data collection
export const collectAnalyticsData = async () => {
  // Implementation for collecting analytics data
  return {
    timestamp: new Date().toISOString(),
    pageViews: 0,
    uniqueVisitors: 0,
    averageTimeOnSite: 0,
    bounceRate: 0,
    topPages: [],
    topReferrers: [],
    deviceTypes: {},
    browserTypes: {},
    operatingSystems: {}
  }
}

// Scroll tracking
let maxScrollDepth = 0

export const initScrollTracking = () => {
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
    )
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent
      trackUserEngagement.scrollDepth(scrollPercent)
    }
  }

  window.addEventListener('scroll', trackScroll)
  return () => window.removeEventListener('scroll', trackScroll)
}

// Time tracking
export const initTimeTracking = () => {
  const startTime = Date.now()
  const trackTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    trackUserEngagement.timeOnPage(timeSpent, window.location.pathname)
  }

  window.addEventListener('beforeunload', trackTimeOnPage)
  return () => window.removeEventListener('beforeunload', trackTimeOnPage)
}

// Initialize all analytics
export const initAnalytics = () => {
  initGA()
  initScrollTracking()
  initTimeTracking()
}
