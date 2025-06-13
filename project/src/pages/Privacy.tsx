import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Server, Globe } from 'lucide-react';
import Meta from '../components/Meta';

export default function Privacy() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Shield,
      title: 'Data Protection',
      content: `We are committed to protecting your personal data and ensuring its confidentiality. 
      We implement appropriate technical and organizational measures to ensure a level of security 
      appropriate to the risk of processing your personal data.`
    },
    {
      icon: Lock,
      title: 'Information Security',
      content: `We use industry-standard encryption and security measures to protect your data 
      from unauthorized access, disclosure, alteration, and destruction. Our security practices 
      are regularly reviewed and updated.`
    },
    {
      icon: Eye,
      title: 'Data Collection',
      content: `We collect information that you provide directly to us, information we obtain 
      from your use of our services, and information from third parties. This includes personal 
      information, usage data, and technical information about your device.`
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: `You have the right to access, correct, or delete your personal information. 
      You can also object to processing, request data portability, or withdraw consent at any time. 
      Contact us to exercise these rights.`
    },
    {
      icon: Server,
      title: 'Data Storage',
      content: `Your data is stored on secure servers located in certified data centers. 
      We retain your information only for as long as necessary to provide our services and 
      comply with legal obligations.`
    },
    {
      icon: Globe,
      title: 'International Transfers',
      content: `We may transfer your data to countries outside your residence. When we do, 
      we ensure appropriate safeguards are in place to protect your information and comply 
      with applicable data protection laws.`
    }
  ];

  return (
    <>
      <Meta
        title={t('privacy.title', 'Privacy Policy')}
        description={t('privacy.description', 'Learn about how we protect your privacy and handle your data')}
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
              {t('privacy.title', 'Privacy Policy')}
            </h1>
            <p className="text-lg text-base-content/80">
              {t('privacy.subtitle', 'Your privacy is important to us. This policy outlines how we collect, use, and protect your data.')}
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lead mb-8"
            >
              Last updated: March 15, 2024
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-12"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-base-200 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                      <p className="text-base-content/80">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc pl-6 mb-8">
                <li>By email: privacy@globalyouth.org</li>
                <li>By visiting our contact page: <a href="/contact" className="text-primary hover:underline">Contact Form</a></li>
                <li>By mail: Global Youth Organization, 123 Privacy Street, New York, NY 10001, USA</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-base-200 rounded-xl p-6 mt-8"
            >
              <p className="text-sm text-base-content/70">
                This privacy policy was last modified on March 15, 2024. We reserve the right 
                to update or change our Privacy Policy at any time. Your continued use of the 
                service after we post any modifications to the Privacy Policy on this page will 
                constitute your acknowledgment of the modifications and your consent to abide 
                and be bound by the modified Privacy Policy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}