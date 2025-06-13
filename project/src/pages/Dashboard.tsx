import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Users, Calendar, BarChart, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    totalDonations: 0,
    monthlyVisitors: 0,
  })

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      totalUsers: 1234,
      activeProjects: 56,
      totalDonations: 78900,
      monthlyVisitors: 45678,
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 mt-2">{t('dashboard.description')}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {t('dashboard.totalUsers')}
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {t('dashboard.activeProjects')}
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.activeProjects}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <BarChart className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {t('dashboard.totalDonations')}
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalDonations}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {t('dashboard.monthlyVisitors')}
                </h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.monthlyVisitors}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t('dashboard.progress')}
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {t('dashboard.projectCompletion')}
                </span>
                <span className="text-sm font-medium text-gray-700">75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {t('dashboard.donationGoal')}
                </span>
                <span className="text-sm font-medium text-gray-700">60%</span>
              </div>
              <Progress value={60} />
            </div>
          </div>
        </Card>

        <motion.button className="btn-primary">
          {t('cta.buttons.projects')}
        </motion.button>
      </div>
    </div>
  )
}

export default Dashboard
