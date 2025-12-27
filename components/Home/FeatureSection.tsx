import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface FeatureSectionProps {
  id: string; // Used for translation keys (e.g., 'feat.1')
  images: string[];
  align?: 'left' | 'center' | 'right';
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ id, images, align = 'center' }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000); // Slightly slower than hero for variety

    return () => clearInterval(timer);
  }, [images]);

  const textVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const getAlignClass = () => {
    switch (align) {
      case 'left': return 'items-start text-left';
      case 'right': return 'items-end text-right';
      default: return 'items-center text-center';
    }
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Slideshow with Zoom Effect */}
      <div className="absolute inset-0 z-0 bg-dark-900">
        <AnimatePresence mode="popLayout">
          <img
            src={images[currentImage]}
            alt=""
            width="1200"
            height="800"
            loading="lazy"
            className="w-full h-full object-cover grayscale"
            style={{ objectPosition: 'center' }}
          />
        </AnimatePresence>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        {/* Optional decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10"></div>
      </div>

      <div className={`container mx-auto px-4 lg:px-12 relative z-20 flex flex-col justify-center h-full ${getAlignClass()}`}>
        <div className="max-w-4xl">
          <div className="overflow-hidden mb-6">
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="text-accent font-bold tracking-[0.2em] uppercase text-sm md:text-base block font-sans text-shadow-sm"
            >
              {t(`${id}.subtitle`)}
            </motion.span>
          </div>

          <div className="mb-8 overflow-hidden">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight uppercase tracking-widest font-normal"
            >
              {t(`${id}.title`)}
            </motion.h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className={`text-xl text-gray-200 mb-10 font-sans font-light tracking-wide max-w-2xl ${align === 'right' ? 'ml-auto' : ''}`}
          >
            {t(`${id}.desc`)}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.2 } } }}
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 btn-primary-glass font-medium rounded text-lg uppercase tracking-wider"
              >
                {t(`${id}.btn`)}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;