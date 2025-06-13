import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Globe, Users, ExternalLink, Heart, Share2, Tag, Clock, CheckCircle } from 'lucide-react'
import projectsData from '../data/projects.json'
import Meta from '../components/Meta'
import { logger } from '../utils/logger'

interface Project {
  id: string
  title: {
    en: string
    ar: string
    tr: string
  }
  description: {
    en: string
    ar: string
    tr: string
  }
  category: string
  status: string
  image: string
  date?: string
  images?: string[]
  team?: { avatar: string; name: string }[]
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const currentLanguage = i18n.language as keyof Project['title']
  const project = projectsData.projects.find((p) => p.id === id) as
    | Project
    | undefined
  const isRTL = i18n.dir() === 'rtl'

  // Log page view for analytics
  React.useEffect(() => {
    if (project) {
      logger.info('Project details viewed', {
        tags: ['projects', 'pageview'],
        metadata: { 
          projectId: project.id, 
          projectTitle: project.title[currentLanguage],
          language: i18n.language
        }
      })
    }
  }, [project, currentLanguage, i18n.language])

  // Handle share functionality
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: project?.title[currentLanguage] || '',
          url: window.location.href,
        })
        
        logger.info('Project shared', {
          tags: ['projects', 'share', 'success'],
          metadata: { projectId: project?.id }
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(window.location.href)
        alert(t('project.link_copied', 'Link copied to clipboard!'))
        
        logger.info('Project link copied', {
          tags: ['projects', 'share', 'clipboard'],
          metadata: { projectId: project?.id }
        })
      }
    } catch (error) {
      console.error('Error sharing project:', error);
      logger.error('Project share failed', {
        tags: ['projects', 'share', 'error'],
        metadata: { error, projectId: project?.id }
      })
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="text-center p-8 max-w-md bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <h1 className="text-2xl font-tajawal font-bold text-white mb-4">
            {t('project.not_found')}
          </h1>
          <p className="text-white/80 mb-6 font-almarai">
            The project you're looking for could not be found or may have been removed.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="bg-secondary-400 hover:bg-secondary-500 text-black px-6 py-3 rounded-xl font-almarai font-semibold transition-all duration-300"
          >
            {t('project.back_to_projects')}
          </button>
        </div>
      </div>
    )
  }

  // Get status icon
  const getStatusIcon = () => {
    switch (project.status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'planning':
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return null
    }
  }

  return (
    <>
      <Meta
        title={project.title[currentLanguage]}
        description={project.description[currentLanguage]}
        image={project.image}
      />

      <section className="min-h-screen py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/projects')}
            className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 font-almarai"
          >
            <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            <span>{t('project.back')}</span>
          </motion.button>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai">
              <Tag className="w-4 h-4 text-secondary-400" />
              {t(`projects.categories.${project.category}`, project.category)}
            </div>

            <h1 className="text-4xl md:text-5xl font-tajawal font-bold text-white mb-4">
              {project.title[currentLanguage]}
            </h1>

            <div className="flex items-center justify-center gap-6 text-white/70 text-sm mb-8">
              {project.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-almarai">
                    {new Date(project.date).toLocaleDateString(i18n.language, {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="font-almarai">
                  {t(`projects.statuses.${project.status}`, project.status)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.title[currentLanguage]}
              className="w-full h-64 md:h-96 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Gallery Section */}
          {project.images && project.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-xl font-bold text-white mb-4 font-tajawal">
                {t('project.gallery', 'Gallery')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg overflow-hidden shadow-md border border-white/20"
                  >
                    <img
                      src={img}
                      alt={project.title[currentLanguage] + ' ' + (idx + 1)}
                      className="h-32 w-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-tajawal font-bold text-white mb-6">
              {t('project.about')}
            </h2>
            <p className="text-white/90 font-almarai text-lg leading-relaxed mb-8 whitespace-pre-line">
              {project.description[currentLanguage]}
            </p>

            {/* Project Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Users className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                <div className="text-2xl font-tajawal font-bold text-white mb-1">
                  50+
                </div>
                <div className="text-white/70 font-almarai text-sm">
                  {t('project.volunteers')}
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <Globe className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                <div className="text-2xl font-tajawal font-bold text-white mb-1">
                  5+
                </div>
                <div className="text-white/70 font-almarai text-sm">
                  {t('project.countries')}
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <ExternalLink className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <div className="text-2xl font-tajawal font-bold text-white mb-1">
                  1000+
                </div>
                <div className="text-white/70 font-almarai text-sm">
                  {t('project.beneficiaries')}
                </div>
              </div>
            </div>

            {/* Team/Volunteers Section */}
            {project.team && project.team.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 font-tajawal">
                  {t('project.team', 'Team')}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.team.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center bg-white/10 rounded-xl p-4 w-32"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-16 h-16 rounded-full mb-2 border-2 border-secondary-400 object-cover"
                        loading="lazy"
                      />
                      <span className="text-white font-almarai text-sm font-bold text-center">
                        {member.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-secondary-400 hover:bg-secondary-500 text-black px-8 py-4 rounded-xl font-almarai font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-secondary-400/20"
              >
                <Users className="w-5 h-5" />
                {t('project.join')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-almarai font-semibold hover:border-white/50 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ExternalLink className="w-5 h-5" />
                {t('project.learn_more')}
              </motion.button>
            </div>

            {/* Share Button */}
            <div className="flex justify-end mt-8">
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-accent-400 hover:bg-accent-500 text-white px-4 py-2 rounded-lg font-almarai font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                {t('project.share', 'Share Project')}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Related Projects Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 font-tajawal">
              {t('project.related', 'Related Projects')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectsData.projects
                .filter(p => p.id !== id && p.category === project.category)
                .slice(0, 2)
                .map((relatedProject, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 rounded-xl overflow-hidden flex cursor-pointer"
                    onClick={() => navigate(`/projects/${relatedProject.id}`)}
                  >
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={relatedProject.image} 
                        alt={relatedProject.title[currentLanguage]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-tajawal font-semibold mb-1 line-clamp-1">
                        {relatedProject.title[currentLanguage]}
                      </h4>
                      <p className="text-white/70 text-sm font-almarai line-clamp-2">
                        {relatedProject.description[currentLanguage]}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
            
            <div className="text-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
                className="text-secondary-400 hover:text-secondary-300 font-almarai font-medium inline-flex items-center gap-2"
              >
                {t('projects.viewAll')}
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Engagement Metrics (hidden but tracked) */}
          <div className="hidden">
            <Heart 
              className="text-red-500" 
              onClick={() => {
                logger.info('Project liked', {
                  tags: ['projects', 'engagement'],
                  metadata: { projectId: project.id }
                })
              }} 
            />
          </div>
        </div>
      </section>
    </>
  )
}