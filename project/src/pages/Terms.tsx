import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scroll, Shield, Scale, FileText, AlertCircle } from 'lucide-react';
import Meta from '../components/Meta';

export default function Terms() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Scroll,
      title: 'Acceptance of Terms',
      content: 'By accessing and using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.'
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.'
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of Global Youth Organization and are protected by international copyright laws.'
    },
    {
      icon: FileText,
      title: 'Content Guidelines',
      content: 'You agree not to post, upload, or share any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.'
    },
    {
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: 'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.'
    }
  ];

  return (
    <>
      <Meta
        title={t('terms.title', 'Terms of Service')}
        description={t('terms.description', 'Read our terms of service and user agreement')}
      />

      <div className="min-h-screen bg-base-100 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-base-content mb-4">
              {t('terms.title', 'Terms of Service')}
            </h1>
            <p className="text-lg text-base-content/80">
              {t('terms.subtitle', 'Please read these terms carefully before using our services')}
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-base-200 rounded-xl p-6 mb-8"
            >
              <p className="text-base-content/80">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-base-200 rounded-xl p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                      <p className="text-base-content/80">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 p-6 bg-base-200 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-base-content/80">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="mt-4 space-y-2">
                <li>Email: legal@globalyouth.org</li>
                <li>Address: 123 Global Street, New York, NY 10001, United States</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}