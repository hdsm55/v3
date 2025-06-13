import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  X,
  ArrowRight,
  Tag,
  CheckCircle,
  User,
  Mail,
  Phone,
  Heart,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Form, FormGroup } from '../components/ui/Form';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import { Loader } from '../components/ui/Loader';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  category: string;
  featured: boolean;
  image: string;
  price: number;
  organizer: string;
}

interface RegistrationForm {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  motivation: string;
}

const EventsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  
  // Registration modal state
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    eventId: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Categories
  const categories = [
    { id: 'all', label: t('events.categories.all') },
    { id: 'workshop', label: t('events.categories.workshop') },
    { id: 'conference', label: t('events.categories.conference') },
    { id: 'seminar', label: t('events.categories.seminar') },
    { id: 'training', label: t('events.categories.training') },
    { id: 'social', label: t('events.categories.social') },
  ];
  
  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await fetch('/api/events');
        // const data = await response.json();
        
        // Simulated data
        const data: Event[] = [
          {
            id: 'tech-conference',
            title: 'Tech Innovation Conference',
            description: 'Join us for a day of innovation, inspiration, and networking with tech leaders from around the world.',
            date: '2024-06-15',
            time: '09:00',
            location: 'Dubai, UAE',
            participants: 450,
            maxParticipants: 500,
            category: 'conference',
            featured: true,
            image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
            price: 0,
            organizer: 'Global Youth Organization',
          },
          {
            id: 'leadership-workshop',
            title: 'Youth Leadership Workshop',
            description: 'Learn essential leadership skills and strategies to make a positive impact in your community.',
            date: '2024-06-20',
            time: '14:00',
            location: 'Online',
            participants: 85,
            maxParticipants: 100,
            category: 'workshop',
            featured: false,
            image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
            price: 25,
            organizer: 'Leadership Academy',
          },
          {
            id: 'environmental-camp',
            title: 'Environmental Volunteer Camp',
            description: 'Join us for a weekend of environmental conservation activities, including beach cleanups and tree planting.',
            date: '2024-06-25',
            time: '07:00',
            location: 'Coastal Area, Qatar',
            participants: 120,
            maxParticipants: 150,
            category: 'social',
            featured: true,
            image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
            price: 0,
            organizer: 'Environmental Society',
          },
          {
            id: 'arts-festival',
            title: 'Youth Arts Festival',
            description: 'Celebrate creativity with music performances, art exhibitions, and interactive workshops.',
            date: '2024-07-01',
            time: '18:00',
            location: 'Beirut, Lebanon',
            participants: 300,
            maxParticipants: 400,
            category: 'social',
            featured: false,
            image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
            price: 15,
            organizer: 'Arts Foundation',
          },
          {
            id: 'career-seminar',
            title: 'Career Development Seminar',
            description: 'Expert speakers share insights on career planning, job searching, and professional development.',
            date: '2024-07-10',
            time: '10:00',
            location: 'Amman, Jordan',
            participants: 60,
            maxParticipants: 80,
            category: 'seminar',
            featured: false,
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
            price: 0,
            organizer: 'Career Center',
          },
          {
            id: 'coding-bootcamp',
            title: 'Youth Coding Bootcamp',
            description: 'Intensive training program teaching programming fundamentals and web development skills.',
            date: '2024-07-15',
            time: '09:00',
            location: 'Cairo, Egypt',
            participants: 40,
            maxParticipants: 50,
            category: 'training',
            featured: true,
            image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
            price: 50,
            organizer: 'Tech Hub',
          },
        ];
        
        // Sort by date (upcoming first)
        const sortedEvents = [...data].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch events'));
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Filter events
  useEffect(() => {
    const filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredEvents(filtered);
  }, [searchQuery, selectedCategory, events]);
  
  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Calculate days remaining until event
  const getDaysRemaining = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Handle registration
  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setRegistrationForm({
      eventId: event.id,
      name: '',
      email: '',
      phone: '',
      experience: '',
      motivation: '',
    });
    setShowRegistration(true);
    setRegistrationSuccess(false);
  };
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/event-registrations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(registrationForm),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRegistrationSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowRegistration(false);
        setRegistrationForm({
          eventId: '',
          name: '',
          email: '',
          phone: '',
          experience: '',
          motivation: '',
        });
        setRegistrationSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to register for event'));
      console.error('Error registering for event:', err);
    } finally {
      setIsSubmitting(false);
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
            {t('events.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-almarai">
            {t('events.subtitle')}
          </p>
        </div>
        
        {/* Filters and View Toggles */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-grow">
              {/* Search */}
              <div className="flex-1">
                <Input
                  leftIcon={<Search className="w-5 h-5" />}
                  placeholder={t('events.search')}
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
                  aria-label={t('events.filter_category')}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-4">
              {/* View Toggles */}
              <div className="flex rounded-md shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={t('events.grid_view')}
                >
                  {t('events.grid')}
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    viewMode === 'calendar'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label={t('events.calendar_view')}
                >
                  {t('events.calendar')}
                </button>
              </div>
              
              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all') && (
                <Button
                  variant="outline"
                  leftIcon={<X className="w-5 h-5" />}
                  onClick={clearFilters}
                >
                  {t('events.clear_filters')}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Events Grid */}
        {viewMode === 'grid' && (
          filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card hover className="h-full overflow-hidden">
                    <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Featured Badge */}
                      {event.featured && (
                        <div className="absolute top-4 right-4 z-10 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold font-almarai flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {t('events.featured')}
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span className="font-almarai">
                            {t(`events.categories.${event.category}`)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Days Remaining */}
                      {getDaysRemaining(event.date) > 0 && (
                        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold font-almarai flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getDaysRemaining(event.date)} {t('events.days_remaining')}
                        </div>
                      )}
                    </div>
                    
                    <CardContent>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 font-tajawal group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 font-almarai line-clamp-2">
                        {event.description}
                      </p>
                      
                      {/* Event Details */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-almarai">
                          <Calendar className="w-4 h-4 text-primary" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-almarai">
                          <Clock className="w-4 h-4 text-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-almarai">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-almarai">
                          <Users className="w-4 h-4 text-primary" />
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span>
                                {event.participants}/{event.maxParticipants} {t('events.participants')}
                              </span>
                              <span>
                                {Math.round((event.participants / event.maxParticipants) * 100)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary rounded-full h-1.5" 
                                style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price & Register */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-primary font-bold font-almarai">
                          {event.price === 0 ? t('events.free') : `$${event.price}`}
                        </div>
                        
                        <Button
                          onClick={() => handleRegister(event)}
                          variant="primary"
                          rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                          size="sm"
                        >
                          {t('events.register')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-tajawal">
                {t('events.no_results')}
              </h3>
              <p className="text-gray-600 mb-6 font-almarai">
                {t('events.try_different')}
              </p>
              <Button onClick={clearFilters}>
                {t('events.clear_filters')}
              </Button>
            </div>
          )
        )}
        
        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-tajawal">
                {t('events.calendar_title')}
              </h2>
              <p className="text-gray-600 font-almarai">
                {t('events.calendar_subtitle')}
              </p>
            </div>
            
            {/* Simple calendar implementation */}
            <div className="grid grid-cols-1 gap-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-full md:w-32 h-24 md:h-auto rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 font-tajawal">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {t(`events.categories.${event.category}`)}
                          </div>
                          
                          {event.featured && (
                            <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                              {t('events.featured')}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-primary" />
                          {formatDate(event.date)}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-primary" />
                          {event.time}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-primary font-bold font-almarai">
                          {event.price === 0 ? t('events.free') : `$${event.price}`}
                        </div>
                        
                        <Button
                          onClick={() => handleRegister(event)}
                          variant="primary"
                          size="sm"
                        >
                          {t('events.register')}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-almarai">
                    {t('events.no_results')}
                  </p>
                  <Button onClick={clearFilters} className="mt-4">
                    {t('events.clear_filters')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Registration Modal */}
      <Modal
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        title={registrationSuccess ? t('events.registration_success') : selectedEvent ? `${t('events.register_for')}: ${selectedEvent.title}` : ''}
        size="lg"
      >
        {registrationSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-tajawal">
              {t('events.registration_success_title')}
            </h3>
            <p className="text-gray-600 font-almarai">
              {t('events.registration_success_message')}
            </p>
          </div>
        ) : selectedEvent && (
          <Form onSubmit={handleSubmit}>
            {/* Event Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0 w-full md:w-32 h-24 rounded-lg overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-tajawal">
                    {selectedEvent.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      {formatDate(selectedEvent.date)}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      {selectedEvent.time}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      {selectedEvent.location}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {selectedEvent.participants}/{selectedEvent.maxParticipants} {t('events.participants')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormGroup
                label={t('events.form.name')}
                required
              >
                <Input
                  name="name"
                  value={registrationForm.name}
                  onChange={handleInputChange}
                  leftIcon={<User className="w-5 h-5" />}
                  placeholder={t('events.form.name_placeholder')}
                  required
                />
              </FormGroup>
              
              <FormGroup
                label={t('events.form.email')}
                required
              >
                <Input
                  type="email"
                  name="email"
                  value={registrationForm.email}
                  onChange={handleInputChange}
                  leftIcon={<Mail className="w-5 h-5" />}
                  placeholder="your@email.com"
                  required
                />
              </FormGroup>
            </div>
            
            <FormGroup
              label={t('events.form.phone')}
            >
              <Input
                type="tel"
                name="phone"
                value={registrationForm.phone}
                onChange={handleInputChange}
                leftIcon={<Phone className="w-5 h-5" />}
                placeholder="+1 (123) 456-7890"
              />
            </FormGroup>
            
            <FormGroup
              label={t('events.form.experience')}
            >
              <textarea
                name="experience"
                value={registrationForm.experience}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder={t('events.form.experience_placeholder')}
              />
            </FormGroup>
            
            <FormGroup
              label={t('events.form.motivation')}
              required
            >
              <div className="relative">
                <Heart className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="motivation"
                  value={registrationForm.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder={t('events.form.motivation_placeholder')}
                  required
                />
              </div>
            </FormGroup>
            
            {/* Price information if applicable */}
            {selectedEvent.price > 0 && (
              <div className="mb-6 p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {t('events.registration_fee')}:
                  </span>
                  <span className="font-bold text-primary">
                    ${selectedEvent.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {t('events.payment_note')}
                </p>
              </div>
            )}
            
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowRegistration(false)}
              >
                {t('common.cancel')}
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                loadingText={t('events.submitting')}
              >
                {t('events.confirm_registration')}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default EventsPage;