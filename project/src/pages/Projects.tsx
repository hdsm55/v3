import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Filter,
  Search,
  X,
  Calendar,
  ArrowRight,
  ExternalLink,
  Tag,
  Clock,
  CheckCircle,
} from 'lucide-react'
import projectsData from '../data/projects.json'
import Meta from '../components/Meta'
import OptimizedImage from '../components/OptimizedImage'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading, Text } from '../components/ui/Typography'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
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
}

export default function Projects() {
  const { t, i18n } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    (projectsData.projects as Project[]) || []
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const currentLanguage = i18n.language as keyof Project['title']
  const isRTL = i18n.dir() === 'rtl'

  const uniqueCategories = [
    'all',
    ...new Set(projectsData.projects.map((p) => p.category)),
  ]
  const uniqueStatuses = [
    'all',
    ...new Set(projectsData.projects.map((p) => p.status)),
  ]

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const filterProjects = useCallback(() => {
    try {
      const filtered = ((projectsData.projects as Project[]) || []).filter(
        (project) => {
          const matchesCategory =
            selectedCategory === 'all' || project.category === selectedCategory
          const matchesStatus =
            selectedStatus === 'all' || project.status === selectedStatus
          const matchesSearch =
            searchQuery === '' ||
            project.title[currentLanguage]
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            project.description[currentLanguage]
              .toLowerCase()
              .includes(searchQuery.toLowerCase())

          return matchesCategory && matchesStatus && matchesSearch
        }
      )
      setFilteredProjects(filtered)
      
      // Log filter usage for analytics
      logger.info('Projects filtered', {
        tags: ['projects', 'filter'],
        metadata: { 
          category: selectedCategory, 
          status: selectedStatus, 
          searchQuery: searchQuery ? true : false,
          resultsCount: filtered.length
        }
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error filtering projects'));
      logger.error('Error filtering projects', {
        tags: ['projects', 'error'],
        metadata: { error: err }
      })
      setFilteredProjects([])
    }
  }, [selectedCategory, selectedStatus, searchQuery, currentLanguage])

  useEffect(() => {
    filterProjects()
  }, [filterProjects])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedStatus('all')
    setSearchQuery('')
    
    logger.info('Projects filters cleared', {
      tags: ['projects', 'filter']
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  // Handle project click for analytics
  const handleProjectClick = (projectId: string, projectTitle: string) => {
    logger.info('Project clicked', {
      tags: ['projects', 'interaction'],
      metadata: { projectId, projectTitle }
    })
  }

  // Improved error handling
  if (error) {
    console.error('Error loading projects:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight via-cetacean to-black">
        <div className="text-center text-white p-8 max-w-md bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <h2 className="text-2xl font-bold mb-4 font-tajawal">خطأ في تحميل المشاريع</h2>
          <p className="text-white/80 mb-6 font-almarai">{error.message || JSON.stringify(error)}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta
        title={t('projects.title', 'Our Projects')}
        description={t(
          'projects.description',
          'Explore our various youth empowerment projects and initiatives'
        )}
      />
      <Section 
        className="min-h-screen py-24 bg-gradient-to-tr from-midnight via-cetacean to-black relative overflow-hidden"
        background="transparent"
        fullWidth
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
        
        <Container className="relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              {t('projects.featured', 'Our Featured Projects')}
            </motion.div>
            
            <Heading 
              level={1} 
              align="center"
              className="text-white mb-6 font-tajawal"
            >
              {t('projects.title', 'Our Projects')}
            </Heading>
            
            <motion.div
              className="mx-auto mb-4 mt-[-12px] h-1 w-32 bg-gradient-to-r from-accent to-yellow-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            
            <Text 
              align="center"
              size="xl"
              className="text-white/80 max-w-3xl mx-auto leading-relaxed font-almarai"
            >
              {t(
                'projects.subtitle',
                'Discover our initiatives making a difference in communities worldwide'
              )}
            </Text>
          </motion.div>

          {/* Filters/Search */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'projects.search_placeholder',
                  'Search projects...'
                )}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 font-almarai"
                aria-label={t('projects.search_placeholder')}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="primary"
                leftIcon={<Filter className="w-5 h-5" />}
                className="rounded-full bg-gradient-to-r from-accent to-accent-light text-white font-tajawal font-bold shadow"
                aria-expanded={isFilterOpen}
                aria-controls="filter-panel"
              >
                {t('projects.filter', 'Filter')}
              </Button>
              {(selectedCategory !== 'all' ||
                selectedStatus !== 'all' ||
                searchQuery) && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  leftIcon={<X className="w-5 h-5" />}
                  className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 font-tajawal font-bold"
                >
                  {t('projects.clear', 'Reset')}
                </Button>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                id="filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-white/80 font-almarai mb-2">
                    {t('projects.category', 'Category')}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 font-almarai"
                    aria-label={t('projects.category')}
                  >
                    {uniqueCategories.map((category) => (
                      <option key={category ?? 'all'} value={category} className="bg-midnight text-white">
                        {t(`projects.categories.${category}`, category)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 font-almarai mb-2">
                    {t('projects.status', 'Status')}
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 font-almarai"
                    aria-label={t('projects.status')}
                  >
                    {uniqueStatuses.map((status) => (
                      <option key={status ?? 'all'} value={status} className="bg-midnight text-white">
                        {t(`projects.statuses.${status}`, status)}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Projects Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={
                      project.id ?? project.title[currentLanguage] ?? String(index)
                    }
                    variants={cardVariants}
                  >
                    <Link
                      to={project.id ? `/projects/${project.id}` : '#'}
                      className="block h-full"
                      onClick={() => handleProjectClick(project.id, project.title[currentLanguage])}
                      aria-label={`${t('projects.view_details')}: ${project.title[currentLanguage]}`}
                    >
                      <Card 
                        className="h-full group"
                        hover={true}
                        padding="none"
                      >
                        {/* Project Image */}
                        <div className="relative h-48 overflow-hidden">
                          <OptimizedImage
                            src={project.image}
                            alt={project.title[currentLanguage]}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                            quality={80}
                            lazy={true}
                            placeholder={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent opacity-35" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 left-4">
                            <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-2 border border-white/30 flex items-center gap-2">
                              {project.status === 'active' && (
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                              )}
                              {project.status === 'completed' && (
                                <CheckCircle className="w-3 h-3 text-green-400" />
                              )}
                              {project.status === 'planning' && (
                                <Clock className="w-3 h-3 text-yellow-400" />
                              )}
                              <span className="text-xs text-white font-almarai font-bold">
                                {t(
                                  `projects.statuses.${project.status}`,
                                  project.status
                                )}
                              </span>
                            </div>
                          </div>
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-2 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-md font-almarai flex items-center gap-2">
                              <Tag className="w-3 h-3" />
                              {t(
                                `projects.categories.${project.category}`,
                                project.category
                              )}
                            </div>
                          </div>
                          
                          {/* Floating Icon */}
                          <motion.div
                            className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <ExternalLink className="w-7 h-7 text-white" />
                          </motion.div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <Heading 
                            level={3} 
                            align="center"
                            className="text-white mb-3 group-hover:text-accent transition-colors duration-300 font-tajawal"
                          >
                            {project.title[currentLanguage]}
                          </Heading>
                          
                          {/* Animated accent line */}
                          <motion.div
                            className="mx-auto mb-4 mt-[-12px] h-1 w-20 bg-gradient-to-r from-accent to-yellow-400 rounded-full"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <Text 
                            align="center"
                            className="text-white/80 group-hover:text-white/90 transition-colors duration-300 mb-4 text-sm font-almarai line-clamp-3"
                          >
                            {project.description[currentLanguage]}
                          </Text>
                          
                          {/* Project Details */}
                          {project.date && (
                            <div className="flex items-center justify-center text-white/60 text-sm mb-4 gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-almarai">
                                {new Date(project.date).toLocaleDateString(i18n.language, {
                                  year: 'numeric',
                                  month: 'long',
                                })}
                              </span>
                            </div>
                          )}
                          
                          {/* Action Button */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full relative px-4 py-3 rounded-full font-tajawal font-medium text-white text-sm bg-gradient-to-r from-accent to-accent-light opacity-90 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden"
                          >
                            <span className="relative z-10">
                              {t('projects.view_details', 'View Details')}
                            </span>
                            <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        </div>
                        
                        {/* Background glow effect */}
                        <div className="absolute inset-0 from-accent/10 to-accent-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br" />
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Search className="w-8 h-8 text-white/40" />
                  </div>
                  <Text className="text-white/60 font-almarai text-lg mb-4">
                    {t(
                      'projects.no_results',
                      'No projects found matching your criteria.'
                    )}
                  </Text>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-tajawal"
                  >
                    {t('projects.clear', 'Reset Filters')}
                  </Button>
                </motion.div>
              )}
              
              {/* View All Projects Button */}
              {filteredProjects.length > 0 && filteredProjects.length < projectsData.projects.length && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 text-center"
                >
                  <Button
                    onClick={clearFilters}
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                    className="bg-secondary hover:bg-secondary-600 text-white font-tajawal"
                  >
                    {t('projects.viewAll', 'View All Projects')}
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </Container>
      </Section>
    </>
  )
}