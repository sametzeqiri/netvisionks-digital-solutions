import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import ServicesSection from '../components/Home/ServicesSection';
import FeatureSection from '../components/Home/FeatureSection';
import ProjectsSection from '../components/Home/ProjectsSection';
import AboutFeature from '../components/Home/AboutFeature';
import ReviewSection from '../components/Home/ReviewSection';
import CallToAction from '../components/Home/CallToAction';
import SEO from '../components/Layout/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <main>
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.desc')}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NetvisionKs",
          "url": "https://netvisionks.com",
          "logo": "https://netvisionks.com/logo-transparent-v5.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+46-8-123-45-67",
            "contactType": "customer service",
            "email": "info@netvisionks.com"
          },
          "sameAs": [
            "https://www.linkedin.com/company/netvisionks",
            "https://twitter.com/netvisionks"
          ]
        }}
      />
      <HeroSection />

      <ServicesSection />

      {/* First "Video" Style Section - Global Connectivity */}
      <FeatureSection
        id="feat.1"
        align="center"
        images={[
          "https://images.unsplash.com/photo-1512428559087-560fa5ce7d94?q=80&w=1200&auto=format&fit=crop&fm=webp",
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop&fm=webp",
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop&fm=webp"
        ]}
      />

      <ProjectsSection />

      {/* Second "Video" Style Section - Future Tech */}
      <FeatureSection
        id="feat.2"
        align="left"
        images={[
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop&fm=webp",
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop&fm=webp",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop&fm=webp"
        ]}
      />

      <AboutFeature />
      <ReviewSection />
      <CallToAction />
    </main>
  );
};

export default Home;