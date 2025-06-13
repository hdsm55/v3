import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Filter, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Alert } from '../components/ui/Alert';
import { Loader } from '../components/ui/Loader';

interface Program {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount?: number;
  image_url: string;
  category?: string;
  status?: 'active' | 'completed' | 'upcoming';
}

const ProgramsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Categories
  const categories = [
    { id: 'all', label: t('programs.categories.all') },
    { id: 'education', label: t('programs.categories.education') },
    { id: 'health', label: t('programs.categories.health') },
    { id: 'environment', label: t('programs.categories.environment') },
    { id: 'community', label: t('programs.categories.community') },
  ];
  
  // Statuses
  const statuses = [
    { id: 'all', label: t('programs.statuses.all') },
    { id: 'active', label: t('programs.statuses.active') },
    { id: 'completed', label: t('programs.statuses.completed') },
    { id: 'upcoming', label: t('programs.statuses.upcoming') },
  ];
  
  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await fetch('/api/programs');
        // const data = await response.json();
        
        // Simulated data
        const data: Program[] = [
          {
            id: 'youth-leadership',
            title: 'Youth Leadership Academy',
            description: 'A comprehensive program developing leadership skills in young people through workshops and mentorship.',
            goal_amount: 50000,
            current_amount: 37500,
            image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
            category: 'education',
            status: 'active',
          },
          {
            id: 'community-health',
            title: 'Community Health Initiative',
            description: 'Empowering youth to lead health education and awareness campaigns in their communities.',
            goal_amount: 75000,
            current_amount: 45000,
            image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
            category: 'health',
            status: 'active',
          },
          {
            id: 'green-schools',
            title: 'Green Schools Project',
            description: 'Student-led environmental sustainability projects in schools across the region.',
            goal_amount: 30000,
            current_amount: 30000,
            image_url: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg',
            category: 'environment',
            status: 'completed',
          },
          {
            id: 'digital-training',
            title: 'Digital Training Program',
            description: 'Teaching essential digital skills to underprivileged youth for better career opportunities.',
            goal_amount: 60000,
            current_amount: 36000,
            image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
            category: 'education',
            status: 'active',
          },
          {
            id: 'mental-health',
            title: 'Mental Health Program',
            description: 'Supporting youth mental health through peer counseling and professional guidance.',
            goal_amount: 45000,
            current_amount: 27000,
            image_url: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg',
            category: 'health',
            status: 'active',
          },
          {
            id: 'recycling-education',
            title: 'Recycling Education Campaign',
            description: 'Youth-led initiative to promote recycling awareness and sustainable practices.',
            goal_amount: 25000,
            current_amount: 25000,
            image_url: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
            category: 'environment',
            status: 'completed',
          },
          {
            id: 'arts-for-all',
            title: 'Arts for All',
            description: 'Making arts education accessible to youth from all backgrounds.',
            goal_amount: 40000,
            current_amount: 0,
            image_url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg',
            category: 'community',
            status: 'upcoming',
          },
          {
            id: 'stem-outreach',
            title: 'STEM Outreach Program',
            description: 'Bringing science, technology, engineering, and math education to underserved communities.',
            goal_amount: 55000,
            current_amount: 0,
            image_url: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
            category: 'education',
            status: 'upcoming',
          },
        ];
        
        setPrograms(data);
        setFilteredPrograms(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch programs'));
        console.error('Error fetching programs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);
  
  // Filter programs
  useEffect(() => {
    const filtered = programs.filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
      
      const matchesStatus = selectedStatus === 'all' || program.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    setFilteredPrograms(filtered);
  }, [searchQuery, selectedCategory, selectedStatus, programs]);
  
  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };
  
  // Calculate progress percentage
  const getProgressPercentage = (current?: number, goal?: number) => {
    if (!current || !goal) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
  };
  
  // Get status badge color
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            {t('programs.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {t('programs.subtitle')}
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                leftIcon={<Search className="w-5 h-5" />}
                placeholder={t('programs.search')}
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
                aria-label={t('programs.filter_category')}
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
                aria-label={t('programs.filter_status')}
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
                  {t('programs.clear_filters')}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    {program.status && (
                      <div className="absolute top-4 right-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                          {t(`programs.statuses.${program.status}`)}
                        </span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {program.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-800">
                          {t(`programs.categories.${program.category}`)}
                        </span>
                      </div>
                    )}
                    
                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white font-tajawal">
                        {program.title}
                      </h3>
                    </div>
                  </div>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4 font-almarai line-clamp-3">
                      {program.description}
                    </p>
                    
                    {/* Progress Bar */}
                    {program.goal_amount > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">
                            {t('programs.progress')}
                          </span>
                          <span>
                            {getProgressPercentage(program.current_amount, program.goal_amount)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${getProgressPercentage(program.current_amount, program.goal_amount)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>
                            ${program.current_amount?.toLocaleString() || 0}
                          </span>
                          <span>
                            ${program.goal_amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <Link to={`/programs/${program.id}`}>
                      <Button
                        variant="primary"
                        rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                        fullWidth
                      >
                        {t('programs.view_details')}
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
              {t('programs.no_results')}
            </h3>
            <p className="text-gray-600 mb-6 font-almarai">
              {t('programs.try_different')}
            </p>
            <Button onClick={clearFilters}>
              {t('programs.clear_filters')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;