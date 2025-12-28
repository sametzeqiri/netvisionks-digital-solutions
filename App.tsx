import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Layout/Navbar';
import { PremiumBackground } from './components/Layout/PremiumBackground';
// Lazy load non-critical UI components
const AIChatWidget = lazy(() => import('./components/Cards/AIChatWidget'));
const CookieConsent = lazy(() => import('./components/Layout/CookieConsent'));
const Footer = lazy(() => import('./components/Layout/Footer'));

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Sandbox = lazy(() => import('./pages/Sandbox'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const ValueDetailPage = lazy(() => import('./pages/ValueDetailPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'));

// Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F2F0EF]">
    <div className="w-12 h-12 border-4 border-primary border-t-gray-700 rounded-full animate-spin shadow-xl"></div>
  </div>
);

// ScrollToTop wrapper component to handle route changes
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTopOnNavigate />
        <PremiumBackground>
          <div className="flex flex-col min-h-[100dvh] font-sans bg-transparent">
            <Navbar />
            <div className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/sandbox" element={<Sandbox />} />

                  {/* Placeholder routes for demo purposes */}
                  <Route path="/news" element={<Home />} />
                  <Route path="/news/blog" element={<BlogPage />} />
                  <Route path="/news/blog/:id" element={<BlogDetailPage />} />
                  <Route path="/about/value/:id" element={<ValueDetailPage />} />
                  <Route path="/news/faq" element={<FAQPage />} />
                  <Route path="/contact/careers" element={<CareersPage />} />
                  <Route path="/careers/job/:id" element={<JobDetailPage />} />
                </Routes>
              </Suspense>
            </div>
            <Suspense fallback={null}>
              <Footer />

              <AIChatWidget />
              <CookieConsent />
            </Suspense>
          </div>
        </PremiumBackground>
      </Router>
    </LanguageProvider>
  );
};

export default App;