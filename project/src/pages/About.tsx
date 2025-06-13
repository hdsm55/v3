import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, ArrowRight, Users, Globe, Award, Heart, Target, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import timelineData from '../data/timeline.json'
import statsData from '../data/stats.json'
import Meta from '../components/Meta'
import ImageLoader from '../components/ImageLoader'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading, Text } from '../components/ui/Typography'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { logger } from '../utils/logger'

interface TimelineEvent {
  year: number
  title: {
    en: string
    ar: string
    tr: string
  }
  description: {
    en: string
    ar: string
    tr: string
  }
}

interface Stat {
  value: number
  label: {
    en: string
    ar: string
    tr: string
  }
}

const values = [
  {
    icon: Heart,
    title: 'values.leadership.title',
    description: 'values.leadership.description',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Users,
    title: 'values.diversity.title',
    description: 'values.diversity.description',
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    color: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Target,
    title: 'values.impact.title',
    description: 'values.impact.description',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-500/10',
  },
]

const missionPoints = [
  {
    icon: Heart,
    title: 'about.mission.empower.title',
    description: 'about.mission.empower.description',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Globe,
    title: 'about.mission.connect.title',
    description: 'about.mission.connect.description',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Target,
    title: 'about.mission.innovate.title',
    description: 'about.mission.innovate.description',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
]

export default function About() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const currentLanguage = i18n.language as keyof TimelineEvent['title']
  const isRTL = i18n.dir() === 'rtl'

  // Log page view for analytics
  React.useEffect(() => {
    logger.info('About page viewed', {
      tags: ['about', 'pageview'],
      metadata: { language: i18n.language }
    })
  }, [i18n.language])

  return (
    <>
      <Meta
        title={t('about.title', 'About Us')}
        description={t(
          'about.description',
          'Learn about our mission, history, and impact in youth empowerment',
        )}
      />

      {/* Hero Section */}
      <Section 
        className="min-h-[80vh] flex items-center relative"
        background="transparent"
        fullWidth
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/hero-poster.jpg"
          >
            <source src="/videos/hero-hevc.mp4" type="video/mp4" />
          </video>
        </div>

        <Container className="relative text-white">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Heading level={1} className="text-white mb-6 font-tajawal">
              {t('about.hero.title', 'Empowering Youth Globally')}
            </Heading>

            <Text size="xl" className="text-white/90 mb-8 font-almarai">
              {t(
                'about.hero.subtitle',
                'Building bridges across cultures, fostering leadership, and creating positive change',
              )}
            </Text>

            <div className="flex flex-wrap gap-4">
              <Link to="/join">
                <Button 
                  variant="secondary" 
                  size="lg"
                  rightIcon={<ArrowRight className={`${isRTL ? 'rotate-180' : ''}`} />}
                  className="font-tajawal"
                >
                  {t('about.hero.cta_primary', 'Join Our Mission')}
                </Button>
              </Link>

              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 font-tajawal"
              >
                {t('about.hero.cta_secondary', 'Learn More')}
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4 font-tajawal">
              {t('about.mission.title', 'Our Mission')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto font-almarai">
              {t(
                'about.mission.description',
                'We are dedicated to empowering youth through education, leadership development, and global connections',
              )}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent>
                      <div className={`w-12 h-12 ${point.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className={`w-6 h-6 ${point.color}`} />
                      </div>
                      <Heading level={3} className="mb-2 font-tajawal">
                        {t(point.title)}
                      </Heading>
                      <Text color="muted" className="font-almarai">
                        {t(point.description)}
                      </Text>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Vision Section */}
      <Section background="primary">
        <Container>
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Heading level={2} className="text-white mb-6 font-tajawal">
              {t('about.vision.title', 'Our Vision')}
            </Heading>
            <Text className="text-white/90 max-w-3xl mx-auto text-lg font-almarai">
              {t(
                'about.vision.description',
                'We aspire to build a strong and cohesive youth community, capable of facing challenges and leading change towards a better future for all.'
              )}
            </Text>
          </motion.div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4 font-tajawal">
              {t('about.values.title', 'Our Values')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto font-almarai">
              {t(
                'about.values.subtitle',
                'Our values are the foundation that guides our work and relationships',
              )}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden">
                    <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                      <ImageLoader
                        src={value.image}
                        alt={t(value.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      
                      {/* Floating icon */}
                      <motion.div
                        className={`absolute top-4 right-4 p-3 ${value.bgColor} rounded-full`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <CardContent>
                      <Heading level={3} className="mb-2 font-tajawal">
                        {t(value.title)}
                      </Heading>
                      <Text color="muted" className="font-almarai">
                        {t(value.description)}
                      </Text>
                      
                      {/* Animated accent line */}
                      <motion.div
                        className={`mt-4 h-1 w-0 bg-gradient-to-r ${value.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4 font-tajawal">
              {t('about.timeline.title', 'Our Journey')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto font-almarai">
              {t(
                'about.timeline.description',
                "Key milestones in our organization's history",
              )}
            </Text>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
            {(timelineData.events as TimelineEvent[]).map((event, index) => (
              <motion.div
                key={index}
                initial={
                  shouldReduceMotion
                    ? {}
                    : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-12 ${
                  index % 2 === 0
                    ? 'md:ml-auto md:mr-8'
                    : 'md:mr-auto md:ml-8'
                } md:w-1/2`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                <Card hover={true}>
                  <CardContent>
                    <div className="flex items-center gap-2 text-primary mb-2 font-tajawal">
                      <Calendar className="w-5 h-5" />
                      <span>{event.year}</span>
                    </div>
                    <Heading level={3} className="mb-2 font-tajawal">
                      {event.title[currentLanguage]}
                    </Heading>
                    <Text color="muted" className="font-almarai">
                      {event.description[currentLanguage]}
                    </Text>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4 font-tajawal">
              {t('about.stats.title', 'Our Impact')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto font-almarai">
              {t('about.stats.description', 'Numbers that tell our story')}
            </Text>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {(statsData.stats as Stat[]).map((stat, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 10,
                        delay: 0.2 + index * 0.1 
                      }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      {index === 0 && <Users className="w-8 h-8 text-primary" />}
                      {index === 1 && <Globe className="w-8 h-8 text-primary" />}
                      {index === 2 && <Target className="w-8 h-8 text-primary" />}
                      {index === 3 && <Award className="w-8 h-8 text-primary" />}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Heading level={3} className="mb-2 font-tajawal">
                        {stat.value.toLocaleString()}
                      </Heading>
                      <Text color="muted" className="font-almarai">
                        {stat.label[currentLanguage]}
                      </Text>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4 font-tajawal">
              {t('about.team.title', 'Our Team')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto font-almarai">
              {t('about.team.description', 'Meet the dedicated individuals behind our mission')}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center overflow-hidden">
                  <div className="relative h-64 -mx-6 -mt-6 mb-6">
                    <ImageLoader
                      src={`https://images.pexels.com/photos/3184${300 + index}/pexels-photo-3184${300 + index}.jpeg`}
                      alt={`Team Member ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <CardContent>
                    <Heading level={3} className="mb-1 font-tajawal">
                      {index === 0 ? 'Sarah Ahmed' : index === 1 ? 'Mohammed Al-Rashid' : 'Ayşe Yılmaz'}
                    </Heading>
                    <Text color="primary" className="font-medium mb-4 font-almarai">
                      {index === 0 ? t('about.team.role1', 'Executive Director') : 
                       index === 1 ? t('about.team.role2', 'Programs Director') : 
                       t('about.team.role3', 'Community Impact Lead')}
                    </Text>
                    <Text color="muted" className="font-almarai">
                      {t(`about.team.bio${index + 1}`, 'Passionate about youth empowerment and community development.')}
                    </Text>
                    
                    <div className="flex justify-center gap-4 mt-4">
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary">
        <Container className="text-center">
          <Heading level={2} className="text-white mb-4 font-tajawal">
            {t('about.cta.title', 'Join Our Mission')}
          </Heading>
          <Text className="text-white/90 max-w-3xl mx-auto mb-8 font-almarai">
            {t(
              'about.cta.description',
              'Be part of something bigger. Together, we can create lasting change.',
            )}
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/volunteer">
              <Button 
                variant="secondary"
                className="font-tajawal"
              >
                {t('about.cta.volunteer', 'Volunteer With Us')}
              </Button>
            </Link>
            <Link to="/donate">
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-tajawal"
              >
                {t('about.cta.donate', 'Make a Donation')}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
      
      {/* FAQ Teaser */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} align="center" className="mb-4 font-tajawal">
              {t('faq.title', 'Frequently Asked Questions')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto font-almarai">
              {t('faq.subtitle', 'Find answers to common questions about our organization')}
            </Text>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="mb-4">
              <CardContent>
                <Heading level={3} className="mb-2 font-tajawal">
                  {t('faq.faq1.question', 'What is Shababna?')}
                </Heading>
                <Text color="muted" className="font-almarai">
                  {t('faq.faq1.answer', 'Shababna is a youth empowerment platform...')}
                </Text>
              </CardContent>
            </Card>
            
            <Card className="mb-4">
              <CardContent>
                <Heading level={3} className="mb-2 font-tajawal">
                  {t('faq.faq2.question', 'How can I volunteer?')}
                </Heading>
                <Text color="muted" className="font-almarai">
                  {t('faq.faq2.answer', 'Sign up using the form on our website...')}
                </Text>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <Link to="/faq">
                <Button 
                  variant="primary"
                  rightIcon={<ArrowRight className={isRTL ? 'rotate-180' : ''} />}
                  className="font-tajawal"
                >
                  {t('faq.view_all', 'View All FAQs')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}