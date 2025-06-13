import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import CoreValuesSection from '../components/CoreValuesSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import { logger } from '../utils/logger';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  // Log page view for analytics
  useEffect(() => {
    logger.info('Home page viewed', {
      tags: ['home', 'pageview']
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Core Values Section */}
      <CoreValuesSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;