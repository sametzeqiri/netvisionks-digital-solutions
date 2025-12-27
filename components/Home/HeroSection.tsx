import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const heroImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=60&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=60&w=1600",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=60&w=1600"
];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Slower sequence between lines
        delayChildren: 0.2
      }
    }
  };

  // Improved Fade-Blur-Up Effect
  const textRevealVariants: Variants = {
    hidden: {
      y: 40,
      opacity: 0,
      filter: "blur(10px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.2, 0.65, 0.3, 0.9] // Elegant easing
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div
        className="absolute inset-0 z-0 bg-dark-900"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 100px), 0 100%)' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 7, ease: "linear" }
            }}
          >
            <img
              src={heroImages[currentImage]}
              alt=""
              className="w-full h-full object-cover"
              fetchpriority={currentImage === 0 ? "high" : "auto"}
              loading={currentImage === 0 ? "eager" : "lazy"}
              width="1600"
              height="900"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay - Adjusted to 50% */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-20 text-center pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden mb-6">
            <motion.span
              variants={textRevealVariants}
              className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm md:text-base block font-sans drop-shadow-md"
            >
              {t('hero.subtitle')}
            </motion.span>
          </div>

          <div className="mb-2 overflow-hidden px-2">
            <motion.h1 variants={textRevealVariants} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight uppercase tracking-widest font-normal text-reflective">
              {t('hero.title_1')}
            </motion.h1>
          </div>

          <div className="mb-2 overflow-hidden px-2">
            <motion.h1 variants={textRevealVariants} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight uppercase tracking-widest font-normal text-reflective">
              {t('hero.title_2')}
            </motion.h1>
          </div>

          <div className="mb-10 overflow-hidden px-2">
            <motion.h1 variants={textRevealVariants} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight uppercase tracking-widest font-normal text-reflective">
              {t('hero.title_3')}
            </motion.h1>
          </div>

          <motion.div variants={buttonVariants} className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 btn-primary-glass font-bold rounded text-lg uppercase tracking-wider shadow-xl"
              >
                {t('hero.btn_quote')}
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 btn-transparent-glass font-bold rounded text-lg uppercase tracking-wider shadow-xl"
              >
                {t('hero.btn_contact')}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;