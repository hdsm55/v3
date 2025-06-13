import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter, X, ArrowRight, Tag, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { Loader } from '../components/ui/Loader';

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  status?: 'active' | 'completed' | 'planning';
  image_url: string;
  year?: string;
}

const ProjectsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Categories
  const categories = [
    { id: 'all', label: t('projects.categories.all') },
    { id: 'education', label: t('projects.categories.education') },
    { id: 'health', label: t('projects.categories.health') },
    { id: 'environment', label: t('projects.categories.environment') },
    { id: 'technology', label: t('projects.categories.technology') },
    { id: 'community', label: t('projects.categories.community') },
  ];
  
  // Statuses
  const statuses = [
    { id: 'all', label: t('projects.statuses.all') },
    { id: 'active', label: t('projects.statuses.active') },
    { id: 'completed', label: t('projects.statuses.completed') },
    { id: 'planning', label: t('projects.statuses.planning') },
  ];
  
  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        
        // Instead of making an API call, use mock data
        // This avoids the ECONNREFUSED error when the backend is not running
        const mockProjects: Project[] = [
          {
            id: 'youth-leadership',
            title: 'Youth Leadership Academy',
            description: 'A comprehensive program developing leadership skills in young people through workshops and mentorship.',
            category: 'education',
            status: 'active',
            image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
            year: '2023'
          },
          {
            id: 'community-health',
            title: 'Community Health Initiative',
            description: 'Empowering youth to lead health education and awareness campaigns in their communities.',
            category: 'health',
            status: 'active',
            image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
            year: '2023'
          },
          {
            id: 'green-schools',
            title: 'Green Schools Project',
            description: 'Student-led environmental sustainability projects in schools across the region.',
            category: 'environment',
            status: 'completed',
            image_url: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg',
            year: '2022'
          },
          {
            id: 'digital-training',
            title: 'Digital Training Program',
            description: 'Teaching essential digital skills to underprivileged youth for better career opportunities.',
            category: 'technology',
            status: 'active',
            image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
            year: '2023'
          },
          {
            id: 'mental-health',
            title: 'Mental Health Program',
            description: 'Supporting youth mental health through peer counseling and professional guidance.',
            category: 'health',
            status: 'active',
            image_url: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg',
            year: '2023'
          },
          {
            id: 'recycling-education',
            title: 'Recycling Education Campaign',
            description: 'Youth-led initiative to promote recycling awareness and sustainable practices.',
            category: 'environment',
            status: 'completed',
            image_url: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
            year: '2022'
          }
        ];
        
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Filter projects
  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    setFilteredProjects(filtered);
  }, [searchQuery, selectedCategory, selectedStatus, projects]);
  
  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };
  
  // Get status icon
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'planning':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text={t('common.loading')} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          status="error"
          title={t('common.error')}
          className="max-w-md"
        >
          {error.message}
          <div className="mt-4">
            <Button onClick={() => window.location.reload()}>
              {t('common.retry')}
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-tajawal">
            {t('projects.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {t('projects.subtitle')}
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                leftIcon={<Search className="w-5 h-5" />}
                placeholder={t('projects.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex-shrink-0 w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                aria-label={t('projects.category')}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div className="flex-shrink-0 w-full md:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                aria-label={t('projects.status')}
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  leftIcon={<X className="w-5 h-5" />}
                  onClick={clearFilters}
                >
                  {t('projects.clear')}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    {project.status && (
                      <div className="absolute top-4 left-4">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                          {getStatusIcon(project.status)}
                          <span className="font-almarai">
                            {t(`projects.statuses.${project.status}`)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-4 right-4">
                        <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span className="font-almarai">
                            {t(`projects.categories.${project.category}`)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardContent>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-tajawal">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 font-almarai line-clamp-3">
                      {project.description}
                    </p>
                    
                    {project.year && (
                      <div className="flex items-center text-gray-500 text-sm mb-4 font-almarai">
                        <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                        <span>{project.year}</span>
                      </div>
                    )}
                    
                    <Link to={`/projects/${project.id}`}>
                      <Button
                        variant="primary"
                        rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                        fullWidth
                      >
                        {t('projects.view_details')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-tajawal">
              {t('projects.no_results')}
            </h3>
            <p className="text-gray-600 mb-6 font-almarai">
              {t('projects.try_different')}
            </p>
            <Button onClick={clearFilters}>
              {t('projects.clear')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;