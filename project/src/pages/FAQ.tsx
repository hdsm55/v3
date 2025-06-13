import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import Meta from '../components/Meta';

interface FAQItem {
  id: string;
  question: {
    en: string;
    ar: string;
    tr: string;
  };
  answer: {
    en: string;
    ar: string;
    tr: string;
  };
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: {
      en: 'How can I get involved with the organization?',
      ar: 'كيف يمكنني المشاركة في المنظمة؟',
      tr: 'Organizasyona nasıl katılabilirim?'
    },
    answer: {
      en: 'There are several ways to get involved: you can volunteer for our programs, participate in events, donate to support our initiatives, or apply for leadership positions. Visit our Join Us page to explore all opportunities.',
      ar: 'هناك عدة طرق للمشاركة: يمكنك التطوع في برامجنا، والمشاركة في الفعاليات، والتبرع لدعم مبادراتنا، أو التقدم للحصول على مناصب قيادية. قم بزيارة صفحة انضم إلينا لاستكشاف جميع الفرص.',
      tr: 'Katılmanın birkaç yolu var: programlarımızda gönüllü olabilir, etkinliklere katılabilir, girişimlerimizi desteklemek için bağış yapabilir veya liderlik pozisyonlarına başvurabilirsiniz. Tüm fırsatları keşfetmek için Bize Katılın sayfamızı ziyaret edin.'
    },
    category: 'general'
  },
  {
    id: 'faq-2',
    question: {
      en: 'What age groups do your programs target?',
      ar: 'ما هي الفئات العمرية التي تستهدفها برامجكم؟',
      tr: 'Programlarınız hangi yaş gruplarını hedefliyor?'
    },
    answer: {
      en: 'Our programs primarily focus on youth aged 15-30, but we have specific initiatives for different age groups. Some programs are designed for high school students (15-18), while others target university students and young professionals (18-30).',
      ar: 'تركز برامجنا بشكل أساسي على الشباب الذين تتراوح أعمارهم بين 15-30 عامًا، ولكن لدينا مبادرات محددة لمختلف الفئات العمرية. بعض البرامج مصممة لطلاب المدارس الثانوية (15-18)، بينما يستهدف البعض الآخر طلاب الجامعات والمهنيين الشباب (18-30).',
      tr: 'Programlarımız öncelikle 15-30 yaş arası gençlere odaklanıyor, ancak farklı yaş grupları için özel girişimlerimiz var. Bazı programlar lise öğrencileri (15-18) için tasarlanmışken, diğerleri üniversite öğrencilerini ve genç profesyonelleri (18-30) hedefliyor.'
    },
    category: 'programs'
  },
  {
    id: 'faq-3',
    question: {
      en: 'Are your programs available internationally?',
      ar: 'هل برامجكم متاحة دوليًا؟',
      tr: 'Programlarınız uluslararası düzeyde mevcut mu?'
    },
    answer: {
      en: 'Yes, we operate globally with programs in over 45 countries. Many of our initiatives are designed to be accessible internationally, including virtual programs and online workshops. We also have regional chapters that coordinate local activities.',
      ar: 'نعم، نعمل على مستوى عالمي مع برامج في أكثر من 45 دولة. العديد من مبادراتنا مصممة لتكون متاحة دوليًا، بما في ذلك البرامج الافتراضية وورش العمل عبر الإنترنت. لدينا أيضًا فروع إقليمية تنسق الأنشطة المحلية.',
      tr: 'Evet, 45\'ten fazla ülkede programlarla küresel olarak faaliyet gösteriyoruz. Girişimlerimizin çoğu, sanal programlar ve çevrimiçi atölye çalışmaları da dahil olmak üzere uluslararası düzeyde erişilebilir olacak şekilde tasarlanmıştır. Ayrıca yerel faaliyetleri koordine eden bölgesel şubelerimiz var.'
    },
    category: 'programs'
  },
  {
    id: 'faq-4',
    question: {
      en: 'How can I donate to support your initiatives?',
      ar: 'كيف يمكنني التبرع لدعم مبادراتكم؟',
      tr: 'Girişimlerinizi desteklemek için nasıl bağış yapabilirim?'
    },
    answer: {
      en: 'You can make donations through our secure online platform, which accepts various payment methods including credit cards and digital wallets. We also accept bank transfers for larger donations. All donations are tax-deductible, and you\'ll receive a receipt for your records.',
      ar: 'يمكنك تقديم التبرعات من خلال منصتنا الإلكترونية الآمنة، والتي تقبل طرق دفع مختلفة بما في ذلك بطاقات الائتمان والمحافظ الرقمية. نقبل أيضًا التحويلات المصرفية للتبرعات الكبيرة. جميع التبرعات معفاة من الضرائب، وستتلقى إيصالاً لسجلاتك.',
      tr: 'Kredi kartları ve dijital cüzdanlar dahil olmak üzere çeşitli ödeme yöntemlerini kabul eden güvenli çevrimiçi platformumuz aracılığıyla bağış yapabilirsiniz. Büyük bağışlar için banka havalelerini de kabul ediyoruz. Tüm bağışlar vergiden düşülebilir ve kayıtlarınız için bir makbuz alacaksınız.'
    },
    category: 'donations'
  },
  {
    id: 'faq-5',
    question: {
      en: 'Do you offer certificates for program completion?',
      ar: 'هل تقدمون شهادات لإتمام البرنامج؟',
      tr: 'Program tamamlama sertifikaları sunuyor musunuz?'
    },
    answer: {
      en: 'Yes, we provide digital certificates for most of our structured programs and workshops. These certificates are officially recognized and can be verified online. For certain specialized programs, we also offer accredited certifications in partnership with educational institutions.',
      ar: 'نعم، نقدم شهادات رقمية لمعظم برامجنا المنظمة وورش العمل. هذه الشهادات معترف بها رسميًا ويمكن التحقق منها عبر الإنترنت. بالنسبة لبعض البرامج المتخصصة، نقدم أيضًا شهادات معتمدة بالشراكة مع المؤسسات التعليمية.',
      tr: 'Evet, yapılandırılmış programlarımızın ve atölye çalışmalarımızın çoğu için dijital sertifikalar sağlıyoruz. Bu sertifikalar resmi olarak tanınır ve çevrimiçi olarak doğrulanabilir. Belirli özel programlar için eğitim kurumlarıyla ortaklaşa akredite sertifikalar da sunuyoruz.'
    },
    category: 'programs'
  }
];

const categories = [
  { id: 'all', label: { en: 'All Questions', ar: 'جميع الأسئلة', tr: 'Tüm Sorular' } },
  { id: 'general', label: { en: 'General', ar: 'عام', tr: 'Genel' } },
  { id: 'programs', label: { en: 'Programs', ar: 'البرامج', tr: 'Programlar' } },
  { id: 'donations', label: { en: 'Donations', ar: 'التبرعات', tr: 'Bağışlar' } }
];

export default function FAQ() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const currentLanguage = i18n.language as 'en' | 'ar' | 'tr';

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Meta
        title={t('faq.title', 'Frequently Asked Questions')}
        description={t('faq.description', 'Find answers to common questions about our youth programs and initiatives')}
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
              {t('faq.title', 'Frequently Asked Questions')}
            </h1>
            <p className="text-lg text-base-content/80">
              {t('faq.subtitle', 'Find answers to common questions about our organization')}
            </p>
          </motion.div>

          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('faq.search_placeholder', 'Search questions...')}
                className="input input-bordered w-full pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn ${
                    selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'
                  }`}
                >
                  {category.label[currentLanguage]}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="collapse collapse-arrow bg-base-200">
                    <input
                      type="checkbox"
                      checked={expandedId === faq.id}
                      onChange={() => toggleExpanded(faq.id)}
                    />
                    <div className="collapse-title text-xl font-medium flex items-center justify-between pr-12">
                      <span>{faq.question[currentLanguage]}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedId === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    <div className="collapse-content">
                      <p className="text-base-content/80 mt-2">
                        {faq.answer[currentLanguage]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredFAQs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-lg text-base-content/60">
                  {t('faq.no_results', 'No questions found matching your criteria')}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn btn-primary mt-4"
                >
                  {t('faq.reset_search', 'Reset Search')}
                </button>
              </motion.div>
            )}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center bg-base-200 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">
              {t('faq.still_have_questions', 'Still have questions?')}
            </h2>
            <p className="text-base-content/80 mb-6">
              {t('faq.contact_description', "Can't find the answer you're looking for? Please contact our support team.")}
            </p>
            <a href="/contact" className="btn btn-primary">
              {t('faq.contact_us', 'Contact Us')}
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}