import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ToastProvider } from './components/Toast';
import './index.css';
import './utils/i18n'; // Initialize i18n before components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Loader } from './components/ui/Loader';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const ContactDonatePage = lazy(() => import('./pages/ContactDonatePage'));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'));
const Join = lazy(() => import('./pages/Join'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./components/NotFound'));

// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name?: string; avatar?: string; role?: string } | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check with Supabase
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        // Simulate app initialization
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    
    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Set document direction based on language
  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center">
        <Loader size="lg" color="white" text="Loading..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <BrowserRouter>
              <div className="App min-h-screen flex flex-col">
                <Header
                  isAuthenticated={isAuthenticated}
                  user={user}
                  onLogout={handleLogout}
                />
                
                <main className="flex-1">
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <Loader size="lg" />
                      </div>
                    }
                  >
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/programs" element={<ProgramsPage />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/projects/:id" element={<ProjectDetails />} />
                      <Route path="/events" element={<EventsPage />} />
                      <Route path="/contact" element={<ContactDonatePage />} />
                      <Route path="/volunteer" element={<VolunteerPage />} />
                      <Route path="/join" element={<Join />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      
                      {/* Admin Routes */}
                      <Route path="/admin/*" element={<AdminDashboard />} />
                      
                      {/* 404 Route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
                
                <Footer />
              </div>
            </BrowserRouter>
          </ToastProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}