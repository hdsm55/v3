import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, CheckCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  status?: string;
  year?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  status,
  year,
  className
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  // Get status icon
  const getStatusIcon = () => {
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

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn("overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white", className)}
    >
      <Link to={`/projects/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Status Badge */}
          {status && (
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                {getStatusIcon()}
                <span className="font-almarai">
                  {t(`projects.statuses.${status}`)}
                </span>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4">
              <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span className="font-almarai">
                  {t(`projects.categories.${category}`)}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-tajawal line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 font-almarai line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            {year && (
              <div className="flex items-center gap-2 text-gray-500 text-sm font-almarai">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{year}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-primary font-medium font-almarai">
              {t('projects.learnMore')}
              <motion.span
                animate={{ x: isRTL ? [-3, 0, -3] : [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;