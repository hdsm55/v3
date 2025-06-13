import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  Globe,
  Calendar,
  Mail,
  Phone,
  User,
  FileText,
  Upload,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Form, FormGroup } from '../components/ui/Form';
import { Alert } from '../components/ui/Alert';

interface VolunteerForm {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  experience: string;
  message: string;
  resume: File | null;
}

interface Opportunity {
  id: string;
  title: string;
  description: string;
  commitment: string;
  icon: React.ElementType;
  color: string;
}

const VolunteerPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Form state
  const [formData, setFormData] = useState<VolunteerForm>({
    name: '',
    email: '',
    phone: '',
    interests: [],
    availability: '',
    experience: '',
    message: '',
    resume: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof VolunteerForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Volunteer opportunities
  const opportunities: Opportunity[] = [
    {
      id: 'community-service',
      title: t('volunteer.opportunities.community'),
      description: t('volunteer.opportunities.community_desc'),
      commitment: '4-6 hours/week',
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      id: 'mentorship',
      title: t('volunteer.opportunities.mentorship'),
      description: t('volunteer.opportunities.mentorship_desc'),
      commitment: '2-3 hours/week',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      id: 'global-initiatives',
      title: t('volunteer.opportunities.global'),
      description: t('volunteer.opportunities.global_desc'),
      commitment: t('volunteer.opportunities.flexible'),
      icon: Globe,
      color: 'text-green-500',
    },
  ];
  
  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof VolunteerForm]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof VolunteerForm];
        return newErrors;
      });
    }
  };
  
  // Handle checkbox change
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value),
    }));
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0],
      }));
      
      // Clear error when field is edited
      if (errors.resume) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Partial<Record<keyof VolunteerForm, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('volunteer.errors.name');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('volunteer.errors.email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('volunteer.errors.emailInvalid');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('volunteer.errors.phone');
    }
    
    if (formData.interests.length === 0) {
      newErrors.interests = t('volunteer.errors.interests');
    }
    
    if (!formData.availability) {
      newErrors.availability = t('volunteer.errors.availability');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('volunteer.errors.message');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call with FormData for file upload
      // const formData = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (key === 'interests') {
      //     formData.append(key, JSON.stringify(value));
      //   } else if (key === 'resume' && value) {
      //     formData.append(key, value);
      //   } else {
      //     formData.append(key, String(value));
      //   }
      // });
      // 
      // const response = await fetch('/api/volunteer', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        interests: [],
        availability: '',
        experience: '',
        message: '',
        resume: null,
      });
    } catch (err) {
      console.error('Error submitting volunteer application:', err);
      setErrors({
        ...errors,
        message: t('volunteer.errors.general'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-tajawal">
            {t('volunteer.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {t('volunteer.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Volunteer Form */}
          <Card>
            <CardContent>
              {submitSuccess ? (
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
                    {t('volunteer.success.title')}
                  </h3>
                  <p className="text-gray-600 font-almarai">
                    {t('volunteer.success.message')}
                  </p>
                </motion.div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                    {t('volunteer.form.title')}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormGroup
                      label={t('volunteer.form.name')}
                      error={errors.name}
                      required
                    >
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        leftIcon={<User className="w-5 h-5" />}
                        placeholder={t('volunteer.form.name_placeholder')}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup
                      label={t('volunteer.form.email')}
                      error={errors.email}
                      required
                    >
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        leftIcon={<Mail className="w-5 h-5" />}
                        placeholder={t('volunteer.form.email_placeholder')}
                        required
                      />
                    </FormGroup>
                  </div>
                  
                  <FormGroup
                    label={t('volunteer.form.phone')}
                    error={errors.phone}
                    required
                  >
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      leftIcon={<Phone className="w-5 h-5" />}
                      placeholder={t('volunteer.form.phone_placeholder')}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup
                    label={t('volunteer.form.interests')}
                    error={errors.interests}
                    required
                  >
                    <div className="space-y-2">
                      {opportunities.map((opportunity) => (
                        <label
                          key={opportunity.id}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name="interests"
                            value={opportunity.id}
                            checked={formData.interests.includes(opportunity.id)}
                            onChange={handleInterestChange}
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <span className="font-almarai">{opportunity.title}</span>
                        </label>
                      ))}
                    </div>
                  </FormGroup>
                  
                  <FormGroup
                    label={t('volunteer.form.availability')}
                    error={errors.availability}
                    required
                  >
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="">{t('volunteer.form.select_availability')}</option>
                      <option value="weekdays">{t('volunteer.form.weekdays')}</option>
                      <option value="weekends">{t('volunteer.form.weekends')}</option>
                      <option value="flexible">{t('volunteer.form.flexible')}</option>
                    </select>
                  </FormGroup>
                  
                  <FormGroup
                    label={t('volunteer.form.experience')}
                    error={errors.experience}
                  >
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={t('volunteer.form.experience_placeholder')}
                    />
                  </FormGroup>
                  
                  <FormGroup
                    label={t('volunteer.form.message')}
                    error={errors.message}
                    required
                  >
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={t('volunteer.form.message_placeholder')}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup
                    label={t('volunteer.form.resume')}
                    error={errors.resume}
                    helperText={t('volunteer.form.resume_help')}
                  >
                    <div className="flex items-center">
                      <label className="flex-1">
                        <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-6 h-6 text-gray-400" />
                            <span className="font-medium text-gray-600 font-almarai">
                              {formData.resume
                                ? formData.resume.name
                                : t('volunteer.form.resume_placeholder')}
                            </span>
                            <span className="text-xs text-gray-500">
                              PDF, DOC, DOCX up to 5MB
                            </span>
                          </div>
                          <input
                            type="file"
                            name="resume"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </div>
                      </label>
                    </div>
                  </FormGroup>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    leftIcon={<Heart className="w-5 h-5" />}
                    isLoading={isSubmitting}
                    loadingText={t('volunteer.form.submitting')}
                  >
                    {t('volunteer.form.submit')}
                  </Button>
                </Form>
              )}
            </CardContent>
          </Card>
          
          {/* Information Section */}
          <div className="space-y-6">
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                  {t('volunteer.opportunities.title')}
                </h2>
                
                <div className="space-y-6">
                  {opportunities.map((opportunity) => {
                    const Icon = opportunity.icon;
                    return (
                      <div key={opportunity.id} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 bg-${opportunity.color.split('-')[0]}-100 rounded-full flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${opportunity.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1 font-tajawal">
                            {opportunity.title}
                          </h3>
                          <p className="text-gray-600 mb-2 font-almarai">
                            {opportunity.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-almarai">
                              {t('volunteer.commitment')}: {opportunity.commitment}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                  {t('volunteer.requirements.title')}
                </h2>
                
                <ul className="space-y-4 list-disc list-inside text-gray-600 font-almarai">
                  <li>{t('volunteer.requirements.age')}</li>
                  <li>{t('volunteer.requirements.commitment')}</li>
                  <li>{t('volunteer.requirements.language')}</li>
                  <li>{t('volunteer.requirements.training')}</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h2 className="text-xl font-bold text-gray-900 mb-6 font-tajawal">
                  {t('volunteer.contact.title')}
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      href="mailto:volunteer@globalyouth.org"
                      className="text-gray-600 hover:text-primary transition-colors font-almarai"
                    >
                      volunteer@globalyouth.org
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      href="tel:+1234567890"
                      className="text-gray-600 hover:text-primary transition-colors font-almarai"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Alert status="info" showIcon>
              <p className="font-almarai">
                {t('volunteer.note')}
              </p>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;