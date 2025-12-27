import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { servicesData } from '../../data/servicesData';
import ServiceCard from '../Cards/ServiceCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  // Select services for Home Page (Mix of tech and maybe 1 business?)
  // Let's show: Cyber, Web, App, Data, SEO (The original set)
  // BUT using the new CARD style.
  // Select services for Home Page
  // Now including GEO (Generative Engine Optimization)
  const homeServiceIds = ['datasakerhet', 'webbutveckling', 'apputveckling', 'geo', 'seo'];
  const services = servicesData.filter(s => homeServiceIds.includes(s.id));

  return (
    <section className="py-32 relative z-10 bg-transparent overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="mb-20 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif text-dark-900 mb-6 uppercase tracking-widest font-normal"
          >
            {t('services.title')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            className="h-1 bg-dark-900"
          />
        </div>

        {/* Uniform Grid of Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;