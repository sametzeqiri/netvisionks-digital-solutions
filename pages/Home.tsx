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
          "logo": "https://netvisionks.com/logo-transparent-v5.webp",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+47 477 38 137",
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
          "/feat-1-2.webp",
          "/feat-1-3.webp",
          "/feat-1-2.webp"
        ]}
      />

      <ProjectsSection />

      {/* Second "Video" Style Section - Future Tech */}
      <FeatureSection
        id="feat.2"
        align="left"
        images={[
          "/feat-2-1.webp",
          "/feat-2-2.webp",
          "/feat-2-3.webp"
        ]}
      />

      <AboutFeature />
      <ReviewSection />
      <CallToAction />
    </main>
  );
};

export default Home;