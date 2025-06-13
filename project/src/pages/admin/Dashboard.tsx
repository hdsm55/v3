import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Users, FolderOpen, Calendar, Eye, TrendingUp, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMembers } from '../../hooks/useMembers'

interface DashboardStats {
  totalUsers: number
  totalProjects: number
  totalEvents: number
  totalViews: number
  monthlyGrowth: number
  activeProjects: number
  pendingRegistrations: number
  totalDownloads: number
}

interface ChartData {
  name: string
  visitors: number
  projects: number
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalEvents: 0,
    totalViews: 0,
    monthlyGrowth: 0,
    activeProjects: 0,
    pendingRegistrations: 0,
    totalDownloads: 0,
  })

  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  
  // Fetch members data to show pending count
  const { data: membersData } = useMembers({ status: 'pending' })
  const pendingMembersCount = membersData?.count || 0

  // Mock data - replace with real API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStats({
          totalUsers: 1847,
          totalProjects: 23,
          totalEvents: 12,
          totalViews: 45672,
          monthlyGrowth: 12.5,
          activeProjects: 8,
          pendingRegistrations: pendingMembersCount,
          totalDownloads: 2341,
        })

        setChartData([
          { name: 'يناير', visitors: 4000, projects: 2400 },
          { name: 'فبراير', visitors: 3000, projects: 1398 },
          { name: 'مارس', visitors: 2000, projects: 9800 },
          { name: 'أبريل', visitors: 2780, projects: 3908 },
          { name: 'مايو', visitors: 1890, projects: 4800 },
          { name: 'يونيو', visitors: 2390, projects: 3800 },
        ])

        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [pendingMembersCount])

  const pieData = [
    { name: 'تعليم', value: 35, color: '#3B82F6' },
    { name: 'صحة', value: 25, color: '#10B981' },
    { name: 'بيئة', value: 20, color: '#F59E0B' },
    { name: 'تكنولوجيا', value: 20, color: '#EF4444' },
  ]

  const statCards = [
    {
      title: 'إجمالي المستخدمين',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      positive: true,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'المشاريع النشطة',
      value: stats.activeProjects,
      icon: FolderOpen,
      change: '+5%',
      positive: true,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'الفعاليات',
      value: stats.totalEvents,
      icon: Calendar,
      change: '+8%',
      positive: true,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'طلبات الانضمام',
      value: stats.pendingRegistrations,
      icon: UserPlus,
      change: pendingMembersCount > 0 ? `${pendingMembersCount} جديد` : '0 جديد',
      positive: pendingMembersCount > 0,
      color: 'from-amber-500 to-amber-600',
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً بك في لوحة تحكم شبابنا</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  <div
                    className={`flex items-center mt-2 ${
                      card.positive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{card.change}</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Visitors Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              الزوار والمشاريع الشهرية
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visitors" fill="#3B82F6" name="الزوار" />
                <Bar dataKey="projects" fill="#10B981" name="المشاريع" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Project Categories */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              توزيع فئات المشاريع
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            الإجراءات السريعة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/projects/add')}
              className="p-4 text-left rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <FolderOpen className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-medium text-gray-900">إضافة مشروع جديد</h4>
              <p className="text-sm text-gray-600">
                إنشاء مشروع جديد بالتفاصيل
              </p>
            </button>
            <button
              onClick={() => navigate('/admin/events/add')}
              className="p-4 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-medium text-gray-900">إضافة فعالية</h4>
              <p className="text-sm text-gray-600">تنظيم فعالية أو ورشة عمل</p>
            </button>
            <button
              onClick={() => navigate('/admin/members')}
              className="p-4 text-left rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors relative"
            >
              <UserPlus className="w-6 h-6 text-amber-500 mb-2" />
              <h4 className="font-medium text-gray-900">إدارة الأعضاء</h4>
              <p className="text-sm text-gray-600">عرض وإدارة طلبات الانضمام</p>
              {pendingMembersCount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingMembersCount}
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard