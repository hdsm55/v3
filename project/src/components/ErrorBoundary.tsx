import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorId?: string
}

// Professional Error Fallback Component
const ProfessionalErrorFallback: React.FC<{
  error: Error
  resetError: () => void
  errorId: string
}> = ({ error, resetError, errorId }) => {
  const { t } = useTranslation()

  const handleReportError = () => {
    // In a real app, this would send to error reporting service
    const errorData = {
      errorId,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    console.error('Error Report:', errorData)

    // Simulate sending to error reporting service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      })
    }
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cetacean to-midnight flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-8 w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
        >
          <AlertTriangle className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-tajawal text-4xl md:text-5xl font-bold text-white mb-4"
        >
          {t('error.title', 'عذراً، حدث خطأ')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-almarai text-white/80 text-lg md:text-xl mb-8 leading-relaxed"
        >
          {t(
            'error.description',
            'نعتذر عن هذا الإزعاج. فريقنا التقني يعمل على حل هذه المشكلة.'
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10"
        >
          <p className="font-almarai text-white/60 text-sm mb-2">
            {t('error.errorId', 'معرف الخطأ')}:{' '}
            <span className="font-mono text-white/80">{errorId}</span>
          </p>
          {import.meta.env.DEV && (
            <details className="mt-4">
              <summary className="font-almarai text-white/60 text-sm cursor-pointer hover:text-white/80 transition-colors">
                {t('error.technicalDetails', 'التفاصيل التقنية')}
              </summary>
              <pre className="mt-2 text-xs text-white/50 overflow-auto bg-black/20 p-3 rounded-lg">
                {error.message}
              </pre>
            </details>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={resetError}
            className="group flex items-center justify-center gap-3 bg-white text-cetacean font-tajawal font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:shadow-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            {t('error.retry', 'إعادة المحاولة')}
          </button>

          <button
            onClick={handleGoHome}
            className="group flex items-center justify-center gap-3 bg-white/10 text-white font-tajawal font-bold px-8 py-4 rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {t('error.goHome', 'العودة للرئيسية')}
          </button>

          <button
            onClick={handleReportError}
            className="group flex items-center justify-center gap-3 bg-red-500/20 text-red-200 font-tajawal font-bold px-8 py-4 rounded-full border border-red-500/20 transition-all duration-300 hover:bg-red-500/30 hover:border-red-500/40 focus:outline-none focus:ring-4 focus:ring-red-500/30 backdrop-blur-sm"
          >
            <Bug className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {t('error.report', 'إبلاغ عن الخطأ')}
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-almarai text-white/40 text-sm mt-8"
        >
          {t(
            'error.support',
            'إذا استمرت المشكلة، يرجى التواصل مع فريق الدعم التقني'
          )}
        </motion.p>
      </motion.div>
    </div>
  )
}

class ErrorBoundary extends React.Component<Props, State> {
  private retryTimeoutId: number | null = null

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = `err_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`

    return {
      hasError: true,
      error,
      errorId,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })

    // Professional error logging
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      errorId: this.state.errorId,
    }

    // Log to console in development
    console.group('🔴 Error Boundary Caught Error')
    console.error('Error:', error)
    console.error('Error Info:', errorInfo)
    console.error('Error Details:', errorDetails)
    console.groupEnd()

    // Send to monitoring service in production
    if (!import.meta.env.DEV) {
      this.reportError(errorDetails)
    }
  }

  private reportError = async (errorDetails: {
    message: string
    stack?: string
    componentStack?: string | null
    errorBoundary: string
    timestamp: string
    url: string
    userAgent: string
    errorId?: string
  }) => {
    try {
      // In a real application, send to error monitoring service
      // Example: Sentry, LogRocket, or custom API
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorDetails),
      })
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  private resetError = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
    })
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
  }

  render() {
    if (this.state.hasError && this.state.error && this.state.errorId) {
      // Use custom fallback if provided, otherwise use professional default
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        )
      }

      return (
        <ProfessionalErrorFallback
          error={this.state.error}
          resetError={this.resetError}
          errorId={this.state.errorId}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary