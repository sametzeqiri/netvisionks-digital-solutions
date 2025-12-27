import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutFeature: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-transparent overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* Text Content */}
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block text-sm font-sans"
            >
              {t('about_feat.label')}
            </motion.span>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-dark-900 mb-8 leading-tight uppercase tracking-widest font-normal"
            >
              {t('about_feat.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark-900 to-gray-600">
                {t('about_feat.look_here')}
              </span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-gray-500 text-base mb-10 leading-relaxed font-sans"
            >
              {t('about_feat.text')}
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
              <Link to="/contact" className="inline-block border border-gray-300 px-8 py-4 rounded text-dark-900 font-bold hover:bg-primary hover:text-white hover:border-primary transition-colors font-serif tracking-wider uppercase backdrop-blur-sm">
                {t('about_feat.btn')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Content - Man in suit */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative">
              <img
                src="/bujar.webp"
                alt="Business professional"
                width="400"
                height="500"
                loading="lazy"
                className="w-full max-w-sm h-auto object-cover rounded shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutFeature;