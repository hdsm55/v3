import React from 'react';
import { Button } from './UI/Button';
import { Section } from './UI/Section';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './UI/Card';
import { ArrowRight, Heart, Mail } from 'lucide-react';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A consistent design system for the Shababna platform
          </p>
        </div>

        {/* Colors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Primary</h3>
              <div className="space-y-2">
                <div className="h-12 bg-primary rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Primary</span>
                  <span className="text-white text-sm">#003362</span>
                </div>
                <div className="h-12 bg-primary-light rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Primary Light</span>
                  <span className="text-white text-sm">#0A4A7F</span>
                </div>
                <div className="h-12 bg-primary-dark rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Primary Dark</span>
                  <span className="text-white text-sm">#002345</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Accent</h3>
              <div className="space-y-2">
                <div className="h-12 bg-accent rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Accent</span>
                  <span className="text-white text-sm">#8b5cf6</span>
                </div>
                <div className="h-12 bg-accent-light rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Accent Light</span>
                  <span className="text-white text-sm">#a78bfa</span>
                </div>
                <div className="h-12 bg-accent-dark rounded-md flex items-center justify-between px-4">
                  <span className="text-white font-medium">Accent Dark</span>
                  <span className="text-white text-sm">#7c3aed</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Surface</h3>
              <div className="space-y-2">
                <div className="h-12 bg-surface border border-gray-200 rounded-md flex items-center justify-between px-4">
                  <span className="text-gray-900 font-medium">Surface</span>
                  <span className="text-gray-500 text-sm">#FFFFFF</span>
                </div>
                <div className="h-12 bg-surface-100 border border-gray-200 rounded-md flex items-center justify-between px-4">
                  <span className="text-gray-900 font-medium">Surface 100</span>
                  <span className="text-gray-500 text-sm">#F8FAFC</span>
                </div>
                <div className="h-12 bg-surface-200 border border-gray-200 rounded-md flex items-center justify-between px-4">
                  <span className="text-gray-900 font-medium">Surface 200</span>
                  <span className="text-gray-500 text-sm">#F1F5F9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Default</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" isLoading>Loading</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
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
              <h3 className="text-lg font-semibold mb-4">Full Width</h3>
              <div className="max-w-md">
                <Button variant="primary" fullWidth>
                  Full Width Button
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Component */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section Component</h2>
          
          <div className="border border-gray-300 border-dashed rounded-lg overflow-hidden">
            <Section className="bg-gray-100">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Section Example</h3>
                <p className="text-gray-600 mb-6">
                  This section has responsive padding: 16px on mobile, 24px on tablet, and 32px on desktop.
                </p>
                <Button variant="primary">Call to Action</Button>
              </div>
            </Section>
          </div>
          
          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              The Section component applies responsive padding:
              <br />
              - Mobile: 16px (px-4)
              <br />
              - Tablet: 24px (sm:px-6)
              <br />
              - Desktop: 32px (lg:px-8)
              <br />
              - Vertical padding: 64px (py-16)
            </p>
          </div>
        </div>

        {/* Card Component */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Card Component</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This is a basic card with default styling. It has a white background, rounded corners, and a medium shadow.
                </p>
              </CardContent>
            </Card>
            
            <Card bordered>
              <CardHeader>
                <CardTitle>Bordered Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This card uses a border instead of a shadow for its visual separation.
                </p>
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
                <p className="text-gray-600">
                  This card doesn't change its shadow on hover, unlike the default card behavior.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>
          
          <Section className="bg-primary text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Be part of our global network of youth leaders making a difference in communities worldwide.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                rightIcon={<ArrowRight size={20} />}
              >
                Sign Up Today
              </Button>
            </div>
          </Section>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leadership Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our flagship program developing the next generation of community leaders through workshops and mentorship.
                </p>
                <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" fullWidth rightIcon={<ArrowRight size={16} />}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Environmental Initiative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join our efforts to create sustainable communities through local environmental projects.
                </p>
                <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" fullWidth rightIcon={<ArrowRight size={16} />}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Digital Skills Workshop</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Equipping youth with essential digital skills for the modern workplace and entrepreneurship.
                </p>
                <div className="aspect-video bg-gray-200 rounded-md mb-4"></div>
              </CardContent>
              <CardFooter>
                <Button variant="primary" fullWidth rightIcon={<ArrowRight size={16} />}>
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}