import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Meta from '../components/Meta';

export default function Blog() {
  const { t } = useTranslation();

  return (
    <>
      <Meta
        title={t('blog.title', 'Blog')}
        description={t('blog.description', 'Latest news, stories and updates from our community')}
      />

      <div className="min-h-screen bg-base-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-base-content mb-4">
              {t('blog.title', 'Blog')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t('blog.subtitle', 'Stories and updates from our global community')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog posts will be populated here */}
            <div className="text-center py-12">
              <p className="text-base-content/60">
                {t('blog.coming_soon', 'Blog posts coming soon!')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}