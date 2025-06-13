import React from 'react';
import { Button } from '../components/ui/Button';
import { Section } from '../components/ui/Section';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { ArrowRight, Heart, Mail, Star, Calendar, Users } from 'lucide-react';

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Section background="primary">
        <Container>
          <Heading level={1} align="center" className="mb-4 text-white">
            Shababna Design System
          </Heading>
          <Text align="center" size="xl" className="text-white/80 max-w-3xl mx-auto">
            A comprehensive guide to our UI components and design patterns
          </Text>
        </Container>
      </Section>

      {/* Colors */}
      <Section>
        <Container>
          <Heading level={2} className="mb-8">
            Color System
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Heading level={3} className="mb-4">
                Primary Colors
              </Heading>
              <div className="space-y-3">
                <div className="h-16 bg-primary rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Primary</span>
                  <span className="text-white text-sm">#003362</span>
                </div>
                <div className="h-16 bg-primary-light rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Primary Light</span>
                  <span className="text-white text-sm">#0A4A7F</span>
                </div>
                <div className="h-16 bg-primary-dark rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Primary Dark</span>
                  <span className="text-white text-sm">#002345</span>
                </div>
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-4">
                Accent Colors
              </Heading>
              <div className="space-y-3">
                <div className="h-16 bg-accent rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Accent</span>
                  <span className="text-white text-sm">#8b5cf6</span>
                </div>
                <div className="h-16 bg-accent-light rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Accent Light</span>
                  <span className="text-white text-sm">#a78bfa</span>
                </div>
                <div className="h-16 bg-accent-dark rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Accent Dark</span>
                  <span className="text-white text-sm">#7c3aed</span>
                </div>
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-4">
                Surface Colors
              </Heading>
              <div className="space-y-3">
                <div className="h-16 bg-surface border border-gray-200 rounded-md flex items-center justify-between px-4">
                  <span className="text-gray-900 font-medium">Surface</span>
                  <span className="text-gray-500 text-sm">#FFFFFF</span>
                </div>
                <div className="h-16 bg-surface-100 border border-gray-200 rounded-md flex items-center justify-between px-4">
                  <span className="text-gray-900 font-medium">Surface 100</span>
                  <span className="text-gray-500 text-sm">#F8FAFC</span>
                </div>
                <div className="h-16 bg-surface-200 border border-gray-200 rounded-md flex items-center justify-between px-4">
                  <span className="text-gray-900 font-medium">Surface 200</span>
                  <span className="text-gray-500 text-sm">#F1F5F9</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section background="light">
        <Container>
          <Heading level={2} className="mb-8">
            Typography
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Heading level={3} className="mb-4">
                Headings
              </Heading>
              <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Heading level={4}>Heading 4</Heading>
                <Heading level={5}>Heading 5</Heading>
                <Heading level={6}>Heading 6</Heading>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">
                Text Styles
              </Heading>
              <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                <Text size="xl" weight="bold">Extra Large Text</Text>
                <Text size="lg">Large Text</Text>
                <Text size="md">Medium Text (Default)</Text>
                <Text size="sm">Small Text</Text>
                <Text size="xs">Extra Small Text</Text>
                <Text color="muted">Muted Text</Text>
                <Text color="primary">Primary Text</Text>
                <Text color="accent">Accent Text</Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section>
        <Container>
          <Heading level={2} className="mb-8">
            Buttons
          </Heading>
          
          <div className="space-y-12">
            <div>
              <Heading level={3} className="mb-4">
                Variants
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">
                Sizes
              </Heading>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">
                States
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Default</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">
                With Icons
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" leftIcon={<Mail size={18} />}>
                  Email Us
                </Button>
                <Button variant="primary" rightIcon={<ArrowRight size={18} />}>
                  Learn More
                </Button>
                <Button variant="secondary" leftIcon={<Heart size={18} />}>
                  Like
                </Button>
              </div>
            </div>
            
            <div>
              <Heading level={3} className="mb-4">
                Full Width
              </Heading>
              <div className="max-w-md">
                <Button variant="primary" fullWidth>
                  Full Width Button
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Card Component */}
      <Section background="light">
        <Container>
          <Heading level={2} className="mb-8">
            Card Component
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
              </CardHeader>
              <CardContent>
                <Text color="muted">
                  This is a basic card with default styling. It has a white background, rounded corners, and a medium shadow.
                </Text>
              </CardContent>
            </Card>
            
            <Card bordered>
              <CardHeader>
                <CardTitle>Bordered Card</CardTitle>
              </CardHeader>
              <CardContent>
                <Text color="muted">
                  This card uses a border instead of a shadow for its visual separation.
                </Text>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm" fullWidth>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card hover={false}>
              <CardHeader>
                <CardTitle>No Hover Effect</CardTitle>
              </CardHeader>
              <CardContent>
                <Text color="muted">
                  This card doesn't change its shadow on hover, unlike the default card behavior.
                </Text>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Section Component */}
      <Section background="accent">
        <Container>
          <Heading level={2} className="mb-8 text-white">
            Section Component
          </Heading>
          
          <Card>
            <CardContent>
              <Text>
                The Section component applies responsive padding and can have different background colors.
                It automatically handles container width and provides consistent spacing.
              </Text>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-md">
                  <Text size="sm" weight="medium" className="mb-2">
                    Responsive Padding:
                  </Text>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Mobile: 16px (px-4)</li>
                    <li>Tablet: 24px (sm:px-6)</li>
                    <li>Desktop: 32px (lg:px-8)</li>
                    <li>Vertical: 64px (py-16)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md">
                  <Text size="sm" weight="medium" className="mb-2">
                    Background Options:
                  </Text>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>light (default)</li>
                    <li>dark</li>
                    <li>primary</li>
                    <li>accent</li>
                    <li>transparent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Usage Examples */}
      <Section>
        <Container>
          <Heading level={2} className="mb-8">
            Usage Examples
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Star className="w-12 h-12 text-white/30 mb-2" />
                    <Text size="lg" weight="bold" className="text-white">Featured Event</Text>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle>Youth Leadership Summit</CardTitle>
              </CardHeader>
              
              <CardContent>
                <Text color="muted" className="mb-4">
                  Join us for our annual leadership summit featuring workshops, keynote speakers, and networking opportunities.
                </Text>
                
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-primary" />
                    <Text size="sm">June 15-17, 2024</Text>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-primary" />
                    <Text size="sm">250 Participants</Text>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="primary" rightIcon={<ArrowRight size={16} />} fullWidth>
                  Register Now
                </Button>
              </CardFooter>
            </Card>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white">
              <Heading level={3} className="text-white mb-4">
                Join Our Community
              </Heading>
              
              <Text className="text-white/80 mb-6">
                Be part of our global network of youth leaders and change-makers. Together, we can create lasting impact in communities worldwide.
              </Text>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  rightIcon={<ArrowRight size={16} />}
                >
                  Join Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}