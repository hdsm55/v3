import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  CreditCard,
  DollarSign,
  Gift,
  Send,
  CheckCircle,
  User,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Form, FormGroup } from '../components/ui/Form';
import { Alert } from '../components/ui/Alert';

// Contact form interface
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Donation form interface
interface DonationForm {
  amount: string;
  customAmount: string;
  isCustomAmount: boolean;
  isRecurring: boolean;
  name: string;
  email: string;
  message: string;
}

const ContactDonatePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  // Active tab state
  const [activeTab, setActiveTab] = useState<'contact' | 'donate'>('contact');
  
  // Contact form state
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<Partial<ContactForm>>({});
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Donation form state
  const [donationForm, setDonationForm] = useState<DonationForm>({
    amount: '25',
    customAmount: '',
    isCustomAmount: false,
    isRecurring: false,
    name: '',
    email: '',
    message: '',
  });
  const [donationErrors, setDonationErrors] = useState<Partial<DonationForm>>({});
  const [isDonationSubmitting, setIsDonationSubmitting] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  
  // Predefined donation amounts
  const predefinedAmounts = ['10', '25', '50', '100'];
  
  // Handle contact form input change
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (contactErrors[name as keyof ContactForm]) {
      setContactErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactForm];
        return newErrors;
      });
    }
  };
  
  // Validate contact form
  const validateContactForm = () => {
    const errors: Partial<ContactForm> = {};
    
    if (!contactForm.name.trim()) {
      errors.name = t('contact.form.errors.name');
    }
    
    if (!contactForm.email.trim()) {
      errors.email = t('contact.form.errors.email');
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = t('contact.form.errors.emailInvalid');
    }
    
    if (!contactForm.message.trim()) {
      errors.message = t('contact.form.errors.message');
    }
    
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContactForm()) return;
    
    setIsContactSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(contactForm),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setContactSuccess(true);
      
      // Reset form after success
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setContactSuccess(false);
      }, 5000);
    } catch (err) {
      setContactErrors({
        ...contactErrors,
        message: t('contact.form.errors.general'),
      });
      console.error('Form submission error:', err);
    } finally {
      setIsContactSubmitting(false);
    }
  };
  
  // Handle donation amount selection
  const handleAmountSelect = (value: string) => {
    setDonationForm(prev => ({
      ...prev,
      amount: value,
      isCustomAmount: false,
      customAmount: '',
    }));
  };
  
  // Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setDonationForm(prev => ({
      ...prev,
      customAmount: value,
      amount: value,
      isCustomAmount: true,
    }));
  };
  
  // Handle donation form input change
  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (donationErrors[name as keyof DonationForm]) {
      setDonationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof DonationForm];
        return newErrors;
      });
    }
  };
  
  // Validate donation form
  const validateDonationForm = () => {
    const errors: Partial<DonationForm> = {};
    
    if (!donationForm.amount || parseFloat(donationForm.amount) <= 0) {
      errors.amount = t('donate.errors.amount');
    }
    
    if (!donationForm.name.trim()) {
      errors.name = t('donate.errors.name');
    }
    
    if (!donationForm.email.trim()) {
      errors.email = t('donate.errors.email');
    } else if (!/\S+@\S+\.\S+/.test(donationForm.email)) {
      errors.email = t('donate.errors.emailInvalid');
    }
    
    setDonationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle donation form submission
  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDonationForm()) return;
    
    setIsDonationSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/donate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(donationForm),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDonationSuccess(true);
      
      // Reset form after success
      setDonationForm({
        amount: '25',
        customAmount: '',
        isCustomAmount: false,
        isRecurring: false,
        name: '',
        email: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setDonationSuccess(false);
      }, 5000);
    } catch (err) {
      setDonationErrors({
        ...donationErrors,
        message: t('donate.errors.general'),
      });
      console.error('Error submitting donation form:', err);
    } finally {
      setIsDonationSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-tajawal">
            {activeTab === 'contact' ? t('contact.title') : t('donate.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {activeTab === 'contact' ? t('contact.subtitle') : t('donate.subtitle')}
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                activeTab === 'contact'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('contact.title')}
            </button>
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                activeTab === 'donate'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('donate.title')}
            </button>
          </div>
        </div>
        
        {/* Contact Form */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent>
                {contactSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-tajawal">
                      {t('contact.form.success.title')}
                    </h3>
                    <p className="text-gray-600 font-almarai">
                      {t('contact.form.success.message')}
                    </p>
                  </motion.div>
                ) : (
                  <Form onSubmit={handleContactSubmit}>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                      {t('contact.form.title')}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormGroup
                        label={t('contact.form.name')}
                        error={contactErrors.name}
                        required
                      >
                        <Input
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactChange}
                          leftIcon={<User className="w-5 h-5" />}
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup
                        label={t('contact.form.email')}
                        error={contactErrors.email}
                        required
                      >
                        <Input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactChange}
                          leftIcon={<Mail className="w-5 h-5" />}
                          placeholder={t('contact.form.emailPlaceholder')}
                          required
                        />
                      </FormGroup>
                    </div>
                    
                    <FormGroup
                      label={t('contact.form.subject')}
                      error={contactErrors.subject}
                    >
                      <Input
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        placeholder={t('contact.form.subjectPlaceholder')}
                      />
                    </FormGroup>
                    
                    <FormGroup
                      label={t('contact.form.message')}
                      error={contactErrors.message}
                      required
                    >
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder={t('contact.form.messagePlaceholder')}
                        required
                      />
                    </FormGroup>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      leftIcon={<Send className="w-5 h-5" />}
                      isLoading={isContactSubmitting}
                      loadingText={t('contact.form.sending')}
                    >
                      {t('contact.form.submit')}
                    </Button>
                  </Form>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                    {t('contact.info.title')}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                          {t('contact.info.email')}
                        </h3>
                        <a
                          href="mailto:info@globalyouth.org"
                          className="text-gray-600 hover:text-primary transition-colors font-almarai"
                        >
                          info@globalyouth.org
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                          {t('contact.info.phone')}
                        </h3>
                        <a
                          href="tel:+1234567890"
                          className="text-gray-600 hover:text-primary transition-colors font-almarai"
                        >
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                          {t('contact.info.address')}
                        </h3>
                        <p className="text-gray-600 font-almarai">
                          123 Main Street<br />
                          City, State 12345<br />
                          Country
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                    {t('contact.hours.title')}
                  </h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-almarai">
                        {t('contact.hours.weekdays')}
                      </span>
                      <span className="font-medium text-gray-900 font-almarai">
                        9:00 AM - 5:00 PM
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-almarai">
                        {t('contact.hours.saturday')}
                      </span>
                      <span className="font-medium text-gray-900 font-almarai">
                        10:00 AM - 2:00 PM
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-almarai">
                        {t('contact.hours.sunday')}
                      </span>
                      <span className="font-medium text-gray-900 font-almarai">
                        {t('contact.hours.closed')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-lg overflow-hidden h-64 shadow-md">
                <iframe
                  title="Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627917975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1611816611234!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Donation Form */}
        {activeTab === 'donate' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent>
                {donationSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-tajawal">
                      {t('donate.success.title')}
                    </h3>
                    <p className="text-gray-600 font-almarai">
                      {t('donate.success.message')}
                    </p>
                  </motion.div>
                ) : (
                  <Form onSubmit={handleDonationSubmit}>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                      {t('donate.form.title')}
                    </h2>
                    
                    {/* Amount Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-almarai">
                        {t('donate.select_amount')}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                        {predefinedAmounts.map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={`px-4 py-2 rounded-md text-center transition-colors ${
                              donationForm.amount === value && !donationForm.isCustomAmount
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => handleAmountSelect(value)}
                          >
                            ${value}
                          </button>
                        ))}
                      </div>
                      
                      {/* Custom Amount */}
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={donationForm.customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder={t('donate.custom_amount')}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      
                      {donationErrors.amount && (
                        <p className="mt-1 text-sm text-red-600">
                          {donationErrors.amount}
                        </p>
                      )}
                    </div>
                    
                    {/* Donation Frequency */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-almarai">
                        {t('donate.frequency')}
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                            !donationForm.isRecurring
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => setDonationForm(prev => ({ ...prev, isRecurring: false }))}
                        >
                          <Gift className="w-5 h-5" />
                          {t('donate.one_time')}
                        </button>
                        <button
                          type="button"
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                            donationForm.isRecurring
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => setDonationForm(prev => ({ ...prev, isRecurring: true }))}
                        >
                          <Heart className="w-5 h-5" />
                          {t('donate.monthly')}
                        </button>
                      </div>
                    </div>
                    
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormGroup
                        label={t('donate.form.name')}
                        error={donationErrors.name}
                        required
                      >
                        <Input
                          name="name"
                          value={donationForm.name}
                          onChange={handleDonationChange}
                          placeholder={t('donate.form.name_placeholder')}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup
                        label={t('donate.form.email')}
                        error={donationErrors.email}
                        required
                      >
                        <Input
                          type="email"
                          name="email"
                          value={donationForm.email}
                          onChange={handleDonationChange}
                          placeholder={t('donate.form.email_placeholder')}
                          required
                        />
                      </FormGroup>
                    </div>
                    
                    <FormGroup
                      label={t('donate.form.message')}
                      error={donationErrors.message}
                    >
                      <textarea
                        name="message"
                        value={donationForm.message}
                        onChange={handleDonationChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder={t('donate.form.message_placeholder')}
                      />
                    </FormGroup>
                    
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      leftIcon={<CreditCard className="w-5 h-5" />}
                      isLoading={isDonationSubmitting}
                      loadingText={t('donate.processing')}
                    >
                      {t('donate.submit')}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4 font-almarai">
                      {t('donate.secure_payment')}
                    </p>
                  </Form>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                    {t('donate.impact.title')}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Gift className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                          {t('donate.impact.education.title')}
                        </h3>
                        <p className="text-gray-600 font-almarai">
                          {t('donate.impact.education.description')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                          {t('donate.impact.mentorship.title')}
                        </h3>
                        <p className="text-gray-600 font-almarai">
                          {t('donate.impact.mentorship.description')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                          {t('donate.impact.resources.title')}
                        </h3>
                        <p className="text-gray-600 font-almarai">
                          {t('donate.impact.resources.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                    {t('donate.transparency.title')}
                  </h2>
                  <p className="text-gray-600 mb-6 font-almarai">
                    {t('donate.transparency.description')}
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium font-almarai">
                      {t('donate.transparency.thank_you')}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Alert status="info" showIcon>
                <p className="font-almarai">
                  {t('donate.tax_deductible')}
                </p>
              </Alert>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDonatePage;