import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/Layout/SEO';
import { servicesData } from '../data/servicesData';
import ServiceCard from '../components/Cards/ServiceCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  // Business & Creative Services
  const serviceIds = ['remote-outsourcing', 'digital-marknadsforing', 'hr-personal', 'grafisk-design', 'video-design', 'fotografering'];
  const businessServices = servicesData.filter(s => serviceIds.includes(s.id));

  // Tech & Innovation Services
  const techIds = ['datasakerhet', 'webbutveckling', 'apputveckling', 'dataanalys', 'seo', 'geo'];
  const techServices = servicesData.filter(s => techIds.includes(s.id));

  return (
    <div className="pt-60 pb-24 min-h-screen">
      <SEO
        title={t('seo.services.title')}
        description={t('seo.services.desc')}
      />
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl lg:text-7xl font-serif font-normal text-dark-900 mb-6 tracking-widest uppercase">{t('srv_page.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide font-sans">
            {t('srv_page.intro')}
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {businessServices.map((service) => (
            <ServiceCard key={service.id} service={service} variants={itemVariants} />
          ))}
        </motion.div>

        {/* Tech Services Section */}
        <div className="text-center mb-12 mt-20">
          <h2 className="text-4xl font-serif font-normal text-dark-900 mb-4 tracking-widest uppercase">{t('srv_page.tech_title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {techServices.map((service) => (
            <ServiceCard key={service.id} service={service} variants={itemVariants} />
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default ServicesPage;