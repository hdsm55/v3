import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Users,
  Search,
  Filter,
  X,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMembers, useUpdateMemberStatus, useDeleteMember } from '../../hooks/useMembers'
import { useDebounce } from '../../hooks/useDebounce'
import { logger } from '../../utils/logger'
import type { Member, MemberStatus } from '../../types/member'

export default function AdminMembers() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<MemberStatus | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  
  // Debounce search to avoid too many requests
  const debouncedSearch = useDebounce(searchQuery, 500)
  
  // Fetch members with filters
  const { 
    data: membersData, 
    isLoading, 
    error,
    refetch
  } = useMembers({
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: debouncedSearch,
    page: currentPage,
    limit: 10
  })
  
  // Mutations
  const updateMemberStatus = useUpdateMemberStatus()
  const deleteMember = useDeleteMember()
  
  // Handle status change
  const handleStatusChange = async (id: string, newStatus: MemberStatus) => {
    try {
      await updateMemberStatus.mutateAsync({ id, status: newStatus })
      
      toast.success(
        newStatus === 'approved' 
          ? t('admin.members.approved', 'Member approved successfully')
          : t('admin.members.rejected', 'Member rejected successfully')
      )
      
      logger.info(`Member status updated to ${newStatus}`, {
        tags: ['admin', 'members'],
        metadata: { memberId: id, newStatus }
      })
      
      // Update the selected member if it's the one being modified
      if (selectedMember && selectedMember.id === id) {
        setSelectedMember({
          ...selectedMember,
          status: newStatus
        })
      }
      
      // Refresh the list
      refetch()
    } catch (err) {
      toast.error(t('admin.members.updateError', 'Failed to update member status'))
      logger.error('Failed to update member status', {
        tags: ['admin', 'members', 'error'],
        metadata: { memberId: id, newStatus, error: err }
      })
    }
  }
  
  // Handle member deletion
  const handleDeleteMember = async (id: string) => {
    if (!window.confirm(t('admin.members.confirmDelete', 'هل أنت متأكد من حذف هذا العضو؟'))) {
      return
    }
    
    try {
      await deleteMember.mutateAsync(id)
      
      toast.success(t('admin.members.deleted', 'Member deleted successfully'))
      
      logger.info('Member deleted', {
        tags: ['admin', 'members'],
        metadata: { memberId: id }
      })
      
      // Close the detail view if the deleted member was selected
      if (selectedMember && selectedMember.id === id) {
        setSelectedMember(null)
      }
      
      // Refresh the list
      refetch()
    } catch (err) {
      toast.error(t('admin.members.deleteError', 'Failed to delete member'))
      logger.error('Failed to delete member', {
        tags: ['admin', 'members', 'error'],
        metadata: { memberId: id, error: err }
      })
    }
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  
  // Get status badge color
  const getStatusBadge = (status: MemberStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-500 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-500 border-red-500/30'
      case 'pending':
      default:
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
    }
  }
  
  // Get status icon
  const getStatusIcon = (status: MemberStatus) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'pending':
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-red-600 text-center">
          <p className="text-xl font-bold mb-2">{t('admin.members.loadError', 'خطأ في تحميل الأعضاء')}</p>
          <p>{String(error)}</p>
          <button 
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            {t('admin.members.retry', 'إعادة المحاولة')}
          </button>
        </div>
      </div>
    )
  }

  // If a member is selected, show the detail view
  if (selectedMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('admin.members.backToList', 'العودة لقائمة الأعضاء')}
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${selectedMember.email}`} className="hover:text-primary">
                    {selectedMember.email}
                  </a>
                </div>
                {selectedMember.phone && (
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedMember.phone}`} className="hover:text-primary">
                      {selectedMember.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div className={`px-3 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusBadge(selectedMember.status as MemberStatus)}`}>
                {getStatusIcon(selectedMember.status as MemberStatus)}
                {t(`admin.members.status.${selectedMember.status}`, selectedMember.status)}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('admin.members.motivation', 'دوافع الانضمام')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMember.motivation || t('admin.members.noMotivation', 'لم يتم تقديم دوافع')}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('admin.members.details', 'تفاصيل إضافية')}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      {t('admin.members.joinedOn', 'تاريخ التسجيل')}: {formatDate(selectedMember.created_at)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8">
                {selectedMember.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedMember.id, 'approved')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {t('admin.members.approve', 'قبول العضو')}
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedMember.id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      {t('admin.members.reject', 'رفض العضو')}
                    </button>
                  </>
                )}
                
                {selectedMember.status === 'rejected' && (
                  <button
                    onClick={() => handleStatusChange(selectedMember.id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {t('admin.members.approve', 'قبول العضو')}
                  </button>
                )}
                
                {selectedMember.status === 'approved' && (
                  <button
                    onClick={() => handleStatusChange(selectedMember.id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    {t('admin.members.reject', 'رفض العضو')}
                  </button>
                )}
                
                <button
                  onClick={() => handleDeleteMember(selectedMember.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  {t('admin.members.delete', 'حذف العضو')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('admin.members.title', 'إدارة الأعضاء')}
            </h1>
          </div>
          <p className="text-gray-600">
            {t('admin.members.description', 'عرض وإدارة طلبات الانضمام والأعضاء الحاليين')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('admin.members.searchPlaceholder', 'بحث بالاسم أو البريد الإلكتروني...')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as MemberStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">{t('admin.members.allStatuses', 'جميع الحالات')}</option>
                <option value="pending">{t('admin.members.status.pending', 'قيد الانتظار')}</option>
                <option value="approved">{t('admin.members.status.approved', 'مقبول')}</option>
                <option value="rejected">{t('admin.members.status.rejected', 'مرفوض')}</option>
              </select>
              
              {(statusFilter !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setStatusFilter('all')
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                  {t('admin.members.clearFilters', 'مسح الفلاتر')}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Members List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('admin.members.list', 'قائمة الأعضاء')}
            </h2>
            <div className="text-sm text-gray-500">
              {membersData?.count
                ? t('admin.members.totalCount', 'إجمالي: {{count}} عضو', { count: membersData.count })
                : t('admin.members.noMembers', 'لا يوجد أعضاء')}
            </div>
          </div>
          
          {membersData?.data.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchQuery || statusFilter !== 'all'
                ? t('admin.members.noResults', 'لا توجد نتائج مطابقة للبحث')
                : t('admin.members.empty', 'لا يوجد أعضاء حالياً')}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.members.name', 'الاسم')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.members.email', 'البريد الإلكتروني')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.members.status', 'الحالة')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.members.joinDate', 'تاريخ الانضمام')}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('admin.members.actions', 'الإجراءات')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {membersData?.data.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(member.status as MemberStatus)}`}>
                          {getStatusIcon(member.status as MemberStatus)}
                          {t(`admin.members.status.${member.status}`, member.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(member.created_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedMember(member)}
                            className="text-primary hover:text-primary-dark"
                          >
                            {t('admin.members.view', 'عرض')}
                          </button>
                          
                          <div className="relative group">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <MoreHorizontal className="w-5 h-5 text-gray-500" />
                            </button>
                            
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 hidden group-hover:block z-10">
                              {member.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(member.id, 'approved')}
                                    className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    {t('admin.members.approve', 'قبول العضو')}
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(member.id, 'rejected')}
                                    className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                  >
                                    <XCircle className="w-4 h-4 text-red-500" />
                                    {t('admin.members.reject', 'رفض العضو')}
                                  </button>
                                </>
                              )}
                              
                              {member.status === 'approved' && (
                                <button
                                  onClick={() => handleStatusChange(member.id, 'rejected')}
                                  className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4 text-red-500" />
                                  {t('admin.members.reject', 'رفض العضو')}
                                </button>
                              )}
                              
                              {member.status === 'rejected' && (
                                <button
                                  onClick={() => handleStatusChange(member.id, 'approved')}
                                  className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  {t('admin.members.approve', 'قبول العضو')}
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                {t('admin.members.delete', 'حذف العضو')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination */}
          {membersData && membersData.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('admin.members.previous', 'السابق')}
              </button>
              
              <span className="text-sm text-gray-700">
                {t('admin.members.pagination', 'الصفحة {{current}} من {{total}}', {
                  current: currentPage,
                  total: membersData.totalPages
                })}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, membersData.totalPages))}
                disabled={currentPage === membersData.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('admin.members.next', 'التالي')}
              </button>
            </div>
          )}
        </motion.div>
        
        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/admin')}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('admin.members.backToDashboard', 'العودة للوحة التحكم')}
          </button>
        </div>
      </div>
    </div>
  )
}