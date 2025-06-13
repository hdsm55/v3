import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { ImageUpload } from '@/components/ImageUpload'
import { api } from '@/lib/api'

interface ProjectForm {
  title: {
    ar: string
    en: string
    tr: string
  }
  description: {
    ar: string
    en: string
    tr: string
  }
  category: string
  status: 'draft' | 'published'
  image: File | null
}

const AddProject: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<ProjectForm>({
    title: { ar: '', en: '', tr: '' },
    description: { ar: '', en: '', tr: '' },
    category: '',
    status: 'draft',
    image: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', JSON.stringify(form.title))
      formData.append('description', JSON.stringify(form.description))
      formData.append('category', form.category)
      formData.append('status', form.status)
      if (form.image) {
        formData.append('image', form.image)
      }

      await api.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success(t('projects.addSuccess'))
      navigate('/admin/projects')
    } catch (error) {
      console.error('Error adding project:', error)
      toast.error(t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/admin')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('projects.addNew')}
            </h1>
          </div>
          <p className="text-gray-600">{t('projects.addDescription')}</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          {/* Title */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('projects.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder={t('projects.titleAr')}
                value={form.title.ar}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: { ...form.title, ar: e.target.value },
                  })
                }
                required
              />
              <Input
                placeholder={t('projects.titleEn')}
                value={form.title.en}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: { ...form.title, en: e.target.value },
                  })
                }
                required
              />
              <Input
                placeholder={t('projects.titleTr')}
                value={form.title.tr}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: { ...form.title, tr: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('projects.description')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Textarea
                placeholder={t('projects.descriptionAr')}
                value={form.description.ar}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: { ...form.description, ar: e.target.value },
                  })
                }
                required
              />
              <Textarea
                placeholder={t('projects.descriptionEn')}
                value={form.description.en}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: { ...form.description, en: e.target.value },
                  })
                }
                required
              />
              <Textarea
                placeholder={t('projects.descriptionTr')}
                value={form.description.tr}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: { ...form.description, tr: e.target.value },
                  })
                }
                required
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('projects.category')}
              </label>
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              >
                <option value="">{t('projects.selectCategory')}</option>
                <option value="education">
                  {t('projects.categories.education')}
                </option>
                <option value="health">
                  {t('projects.categories.health')}
                </option>
                <option value="environment">
                  {t('projects.categories.environment')}
                </option>
                <option value="technology">
                  {t('projects.categories.technology')}
                </option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('projects.status')}
              </label>
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as 'draft' | 'published',
                  })
                }
                required
              >
                <option value="draft">{t('projects.statuses.draft')}</option>
                <option value="published">
                  {t('projects.statuses.published')}
                </option>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('projects.image')}
            </h3>
            <ImageUpload
              onChange={(file: File) => setForm({ ...form, image: file })}
              value={form.image ? URL.createObjectURL(form.image) : null}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? (
              <span className="flex items-center gap-2">
                <Save className="w-5 h-5 animate-spin" />
                {t('common.saving')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                {t('common.save')}
              </span>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default AddProject
