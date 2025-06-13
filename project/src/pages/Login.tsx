import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useTranslation } from 'react-i18next'

interface LoginForm {
  email: string
  password: string
}

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { data, error: supaError } = await supabase.auth.signInWithPassword(
        {
          email: formData.email,
          password: formData.password,
        }
      )

      if (supaError || !data.session) {
        throw new Error(supaError?.message || 'Authentication failed')
      }

      navigate('/admin')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'حدث خطأ أثناء تسجيل الدخول'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-tajawal font-bold text-white mb-2">
            {t('login.title', 'تسجيل الدخول')}
          </h1>
          <p className="text-white/80 font-almarai">
            {t('login.description', 'الوصول إلى لوحة التحكم')}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6"
          >
            <p className="text-red-200 text-sm font-almarai text-center">
              {error}
            </p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-white/90 font-almarai font-medium mb-2">
              {t('login.email', 'البريد الإلكتروني')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-white/50" />
              </div>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 text-white placeholder-white/50 font-almarai focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                placeholder={t('login.email', 'البريد الإلكتروني')}
                required
                aria-label={t('login.email', 'البريد الإلكتروني')}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white/90 font-almarai font-medium mb-2">
              {t('login.password', 'كلمة المرور')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-white/50" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pl-10 pr-10 text-white placeholder-white/50 font-almarai focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                placeholder={t('login.password', 'كلمة المرور')}
                required
                aria-label={t('login.password', 'كلمة المرور')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label={
                  showPassword
                    ? t('login.hidePassword', 'إخفاء كلمة المرور')
                    : t('login.showPassword', 'إظهار كلمة المرور')
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-white/50 hover:text-white/80" />
                ) : (
                  <Eye className="w-5 h-5 text-white/50 hover:text-white/80" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-secondary-400 hover:bg-secondary-500 text-black font-tajawal font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
              />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                {t('login.submit', 'تسجيل الدخول')}
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg"
        >
          <p className="text-white/70 font-almarai text-sm mb-2">
            {t('login.credentials', 'بيانات الدخول:')}
          </p>
          <p className="text-white/90 font-almarai text-xs">
            {t('login.email', 'البريد الإلكتروني')}: admin@shababna.org
            <br />
            كلمة المرور: admin123
          </p>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white font-almarai text-sm transition-colors duration-300"
          >
            {t('login.back', 'العودة للصفحة الرئيسية')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
