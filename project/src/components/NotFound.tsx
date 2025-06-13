import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
        >
          <span className="text-6xl font-bold">404</span>
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4 font-tajawal">
          {t('notFound.message', 'Page not found')}
        </h1>
        
        <p className="text-white/80 mb-8 font-almarai">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              variant="secondary"
              leftIcon={<Home className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              {t('notFound.backHome', 'Back to Home')}
            </Button>
          </Link>
          
          <Button 
            variant="outline"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;