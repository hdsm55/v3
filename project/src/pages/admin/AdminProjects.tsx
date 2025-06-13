import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  useProjects, 
  useAddProject, 
  useUpdateProject,
  useDeleteProject 
} from '../../hooks/useProjects'
import { FolderPlus, Trash2, Edit, Loader, Image, Upload, Save, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { logger } from '../../utils/logger'

export default function AdminProjects() {
  const navigate = useNavigate()
  const { data: projects = [], isLoading, error } = useProjects()
  const addProject = useAddProject()
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()
  
  const [newProjectTitle, setNewProjectTitle] = useState('')
  const [newProjectImage, setNewProjectImage] = useState<File | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProjectImage(e.target.files[0])
    }
  }

  const handleAddProject = async () => {
    if (!newProjectTitle.trim()) return
    
    setIsAdding(true)
    setUploadProgress(0)
    
    try {
      let img_url = ''
      
      // Upload image if selected
      if (newProjectImage) {
        const fileExt = newProjectImage.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `project-images/${fileName}`
        
        // Upload to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(filePath, newProjectImage, {
            cacheControl: '3600',
            upsert: false,
            onUploadProgress: (progress) => {
              setUploadProgress(Math.round((progress.loaded / progress.total) * 100))
            }
          })
          
        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`)
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(filePath)
          
        img_url = urlData.publicUrl
      }
      
      // Create project with image URL
      await addProject.mutateAsync({ 
        title: newProjectTitle,
        description: 'وصف المشروع',
        status: 'draft',
        img_url
      })
      
      // Reset form
      setNewProjectTitle('')
      setNewProjectImage(null)
      setUploadProgress(0)
      
      logger.info('Project created successfully', {
        tags: ['admin', 'project']
      })
    } catch (err) {
      logger.error('Failed to create project', {
        tags: ['admin', 'project', 'error'],
        metadata: { error: err }
      })
    } finally {
      setIsAdding(false)
    }
  }

  const handleStartEdit = (project: any) => {
    setEditingId(project.id)
    setEditTitle(project.title)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  const handleUpdateProject = async (id: string) => {
    if (!editTitle.trim()) return
    
    setIsUpdating(true)
    
    try {
      await updateProject.mutateAsync({
        id,
        dto: { title: editTitle }
      })
      
      setEditingId(null)
      setEditTitle('')
      
      logger.info('Project updated successfully', {
        tags: ['admin', 'project'],
        metadata: { projectId: id }
      })
    } catch (err) {
      logger.error('Failed to update project', {
        tags: ['admin', 'project', 'error'],
        metadata: { projectId: id, error: err }
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        await deleteProject.mutateAsync(id)
        
        logger.info('Project deleted successfully', {
          tags: ['admin', 'project'],
          metadata: { projectId: id }
        })
      } catch (err) {
        logger.error('Failed to delete project', {
          tags: ['admin', 'project', 'error'],
          metadata: { projectId: id, error: err }
        })
      }
    }
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-600 text-center">
        <p className="text-xl font-bold mb-2">خطأ في تحميل المشاريع</p>
        <p>{String(error)}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إدارة المشاريع</h1>
          <button 
            onClick={() => navigate('/admin/projects/add')}
            className="btn-primary flex items-center gap-2"
          >
            <FolderPlus className="w-5 h-5" />
            إضافة مشروع جديد
          </button>
        </div>

        {/* Quick Add Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">إضافة مشروع سريع</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="project-title" className="block text-sm font-medium text-gray-700 mb-1">
                عنوان المشروع
              </label>
              <input
                type="text"
                id="project-title"
                name="project-title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="عنوان المشروع"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="project-image" className="block text-sm font-medium text-gray-700 mb-1">
                صورة المشروع (اختياري)
              </label>
              <div className="flex items-center gap-4">
                <label 
                  htmlFor="project-image" 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                >
                  <Image className="w-5 h-5 text-gray-600" />
                  <span>{newProjectImage ? newProjectImage.name : 'اختر صورة'}</span>
                </label>
                <input
                  type="file"
                  id="project-image"
                  name="project-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {newProjectImage && (
                  <button 
                    onClick={() => setNewProjectImage(null)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="إزالة الصورة"
                  >
                    إزالة
                  </button>
                )}
              </div>
              
              {newProjectImage && (
                <div className="mt-2">
                  <img 
                    src={URL.createObjectURL(newProjectImage)} 
                    alt="معاينة المشروع" 
                    className="h-20 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                      role="progressbar"
                      aria-valuenow={uploadProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{uploadProgress}% تم الرفع</p>
                </div>
              )}
            </div>
            
            <button
              onClick={handleAddProject}
              disabled={isAdding || !newProjectTitle.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {uploadProgress > 0 ? `جاري الرفع... ${uploadProgress}%` : 'جاري الإضافة...'}
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  إضافة
                </>
              )}
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">قائمة المشاريع</h2>
          </div>
          
          {projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              لا توجد مشاريع حالياً. أضف مشروعاً جديداً للبدء.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200" role="list" aria-label="قائمة المشاريع">
              {projects.map((project) => (
                <li key={project.id} className="p-6 hover:bg-gray-50">
                  {editingId === project.id ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        aria-label="عنوان المشروع الجديد"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateProject(project.id)}
                          disabled={isUpdating}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          aria-label="حفظ التغييرات"
                        >
                          {isUpdating ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            <Save className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="إلغاء التعديل"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {project.img_url && (
                          <img 
                            src={project.img_url} 
                            alt={project.title} 
                            className="w-12 h-12 object-cover rounded-lg"
                            loading="lazy"
                          />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{project.title}</h3>
                          <p className="text-sm text-gray-500 truncate max-w-md">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label={`تعديل المشروع: ${project.title}`}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`حذف المشروع: ${project.title}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}