import React from 'react';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Clock } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const footerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-900 text-gray-200 pt-16 pb-8 overflow-hidden">
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
      >
        {/* Brand */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6 font-serif">
            <Briefcase className="text-primary" size={28} />
            <span className="tracking-wider uppercase">Netvision<span className="text-accent">Ks</span></span>
          </div>
          <p className="mb-6 leading-relaxed max-w-sm text-gray-200 font-medium font-sans">
            {t('footer.desc')}
          </p>
          <div className="flex space-x-4">
            {['Facebook', 'Twitter', 'Linkedin', 'Instagram'].map((name, idx) => {
              const Icon = [Facebook, Twitter, Linkedin, Instagram][idx];
              return (
                <motion.a
                  key={idx}
                  href="#"
                  aria-label={name}
                  whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#FFEE00", color: "#111111" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants} className="md:ml-auto">
          <h3 className="text-white text-xl font-bold mb-6 relative inline-block font-serif tracking-widest uppercase">
            {t('footer.contact_title')}
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute bottom-[-8px] left-0 h-1 bg-accent"
            ></motion.span>
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 group">
              <div className="text-primary mt-1 group-hover:scale-110 transition-transform">📍</div>
              <div>
                <h4 className="text-white font-medium group-hover:text-accent transition-colors font-serif tracking-wide uppercase">{t('footer.address')}</h4>
                <p className="text-gray-200">Sveavägen 1, 111 57<br />Stockholm, Sverige</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="text-primary mt-1 group-hover:scale-110 transition-transform">📞</div>
              <div>
                <h4 className="text-white font-medium group-hover:text-accent transition-colors font-serif tracking-wide uppercase">{t('footer.phone')}</h4>
                <p className="text-gray-200">+47 477 38 137<br />+383 49 808 113</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="text-primary mt-1 group-hover:scale-110 transition-transform">✉️</div>
              <div>
                <h4 className="text-white font-medium group-hover:text-accent transition-colors font-serif tracking-wide uppercase">{t('footer.email')}</h4>
                <a href="mailto:info@netvisionks.com" className="text-gray-200 hover:text-primary transition-colors">info@netvisionks.com</a>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="text-primary mt-1 group-hover:scale-110 transition-transform"><Clock size={18} /></div>
              <div>
                <h4 className="text-white font-medium group-hover:text-accent transition-colors font-serif tracking-wide uppercase">{t('footer.hours')}</h4>
                <p className="text-gray-200">{t('footer.hours_text')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t border-white/5 pt-8 text-center"
      >
        <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} NetvisionKs. {t('footer.rights')}</p>
      </motion.div>
    </footer>
  );
};

export default Footer;