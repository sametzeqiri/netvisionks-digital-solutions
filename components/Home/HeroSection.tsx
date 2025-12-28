import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const heroImages = [
  {
    mobile: "/hero-bg-1-mobile.jpg",
    desktop: "/hero-bg-1.webp",
    alt: "Företagsutveckling och strategi"
  },
  {
    mobile: "/hero-bg-2.webp", // Fallback to webp as no specific mobile crop exists yet
    desktop: "/hero-bg-2.webp",
    alt: "Digital transformation"
  },
  {
    mobile: "/hero-bg-3.webp", // Fallback to webp
    desktop: "/hero-bg-3.webp",
    alt: "Kreativa tekniska lösningar"
  }
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
        staggerChildren: 0.1, // Faster sequence
        delayChildren: 0.1
      }
    }
  };

  // Improved Fade-Blur-Up Effect
  const textRevealVariants: Variants = {
    hidden: {
      y: 0, // No movement from below
      opacity: 1, // Visible immediately
      filter: "blur(0px)" // No blur
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
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
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0 w-full h-full"
            initial={currentImage === 0 ? { opacity: 1, scale: 1.0 } : { opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5 },
              scale: { duration: 7, ease: "linear" }
            }}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={heroImages[currentImage].mobile} />
              <source media="(min-width: 769px)" srcSet={heroImages[currentImage].desktop} />
              <img
                src={heroImages[currentImage].desktop}
                alt={heroImages[currentImage].alt}
                className="w-full h-full object-cover"
                fetchPriority={currentImage === 0 ? "high" : "auto"}
                loading={currentImage === 0 ? "eager" : "lazy"}
                decoding="async"
                width="1920"
                height="1080"
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay - Adjusted to 50% */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-20 text-center pt-20">
        {/* Mobile: Static Content (Zero TBT) */}
        <div className="md:hidden flex flex-col items-center">
          <div className="mb-6">
            <span className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm block font-sans drop-shadow-md">
              {t('hero.subtitle')}
            </span>
          </div>
          <div className="mb-2 px-2">
            <h1
              className="text-3xl sm:text-4xl font-serif leading-tight uppercase tracking-widest font-bold text-white"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {t('hero.title_1')}
            </h1>
          </div>
          <div className="mb-2 px-2">
            <h1
              className="text-3xl sm:text-4xl font-serif leading-tight uppercase tracking-widest font-bold text-white"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {t('hero.title_2')}
            </h1>
          </div>
          <div className="mb-10 px-2">
            <h1
              className="text-3xl sm:text-4xl font-serif leading-tight uppercase tracking-widest font-bold text-white"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              {t('hero.title_3')}
            </h1>
          </div>
          <div className="flex flex-col gap-6 justify-center mt-4 w-full px-4">
            <Link to="/contact" className="w-full">
              <button
                className="w-full px-10 py-4 bg-primary text-black font-bold rounded text-lg uppercase tracking-wider shadow-xl border border-primary/20"
                aria-label={t('hero.btn_quote')}
              >
                {t('hero.btn_quote')}
              </button>
            </Link>
            <Link to="/contact" className="w-full">
              <button
                className="w-full px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded text-lg uppercase tracking-wider shadow-xl border border-white/40"
                aria-label={t('hero.btn_contact')}
              >
                {t('hero.btn_contact')}
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop: Animated Content */}
        <div className="hidden md:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <div className="overflow-hidden mb-6">
              <motion.span
                variants={textRevealVariants}
                className="text-accent font-extrabold tracking-[0.2em] uppercase text-base block font-sans drop-shadow-md"
              >
                {t('hero.subtitle')}
              </motion.span>
            </div>

            <div className="mb-2 overflow-hidden px-2 max-w-[100vw]">
              <motion.h1 variants={textRevealVariants} className="text-5xl lg:text-7xl xl:text-8xl font-serif leading-tight uppercase tracking-widest font-normal text-reflective">
                {t('hero.title_1')}
              </motion.h1>
            </div>

            <div className="mb-2 overflow-hidden px-2 max-w-[100vw]">
              <motion.h1 variants={textRevealVariants} className="text-5xl lg:text-7xl xl:text-8xl font-serif leading-tight uppercase tracking-widest font-normal text-reflective">
                {t('hero.title_2')}
              </motion.h1>
            </div>

            <div className="mb-10 overflow-hidden px-2 max-w-[100vw]">
              <motion.h1 variants={textRevealVariants} className="text-5xl lg:text-7xl xl:text-8xl font-serif leading-tight uppercase tracking-widest font-normal text-reflective">
                {t('hero.title_3')}
              </motion.h1>
            </div>

            <motion.div variants={buttonVariants} className="flex flex-row gap-6 justify-center mt-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 btn-primary-glass font-bold rounded text-lg uppercase tracking-wider shadow-xl"
                >
                  {t('hero.btn_quote')}
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 btn-transparent-glass font-bold rounded text-lg uppercase tracking-wider shadow-xl"
                >
                  {t('hero.btn_contact')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;