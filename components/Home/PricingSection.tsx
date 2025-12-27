import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const PricingSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden bg-black">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-serif text-white mb-6 uppercase tracking-widest font-normal"
          >
            {t('pricing.standard_title')} & {t('pricing.pro_title')}
          </motion.h2>
          <p className="text-gray-400 font-sans tracking-wide max-w-xl mx-auto">Choose the plan that fits your ambition.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
          
          {/* Standard Plan - Card Style Matching Contact Us */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white text-dark-900 p-8 md:p-10 rounded-xl shadow-2xl border border-gray-100 flex flex-col h-full hover:scale-[1.02] transition-all duration-500 group card-shine-effect"
          >
             <div className="mb-8 relative z-10">
                 <h3 className="text-3xl font-serif text-dark-900 mb-2 uppercase tracking-wide">{t('pricing.standard_title')}</h3>
                 <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase">{t('pricing.sprint')}</span>
             </div>
             
             <ul className="space-y-6 mb-12 flex-grow relative z-10">
                {[
                  t('pricing.std_1'),
                  t('pricing.std_2'),
                  t('pricing.std_3'),
                  t('pricing.std_4'),
                  t('pricing.std_5')
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-600 font-sans font-light tracking-wide border-b border-gray-100 pb-4 last:border-0">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
             </ul>

             <Link to="/contact" className="relative z-10">
               <button className="w-full py-4 rounded-xl border-2 border-dark-900 text-dark-900 font-bold text-xs hover:bg-dark-900 hover:text-white transition-all uppercase tracking-[0.2em] font-sans">
                 {t('pricing.btn')}
               </button>
             </Link>
          </motion.div>

          {/* Pro Plan - Card Style Matching Contact Us (With extra highlight) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white text-dark-900 p-8 md:p-10 rounded-xl shadow-[0_25px_50px_-12px_rgba(255,238,0,0.15)] border-2 border-accent/50 flex flex-col h-full hover:scale-[1.02] transition-all duration-500 group relative card-shine-effect"
          >
             <div className="mb-8 flex justify-between items-start relative z-10">
                 <div>
                    <h3 className="text-3xl font-serif text-dark-900 mb-2 uppercase tracking-wide">{t('pricing.pro_title')}</h3>
                    <span className="text-primary font-bold text-xs tracking-[0.2em] uppercase">{t('pricing.monthly')}</span>
                 </div>
                 <span className="px-3 py-1 bg-accent text-dark-900 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm">{t('pricing.tag_pro')}</span>
             </div>

             <ul className="space-y-6 mb-12 flex-grow relative z-10">
                {[
                  t('pricing.pro_1'),
                  t('pricing.pro_2'),
                  t('pricing.pro_3'),
                  t('pricing.pro_4'),
                  t('pricing.pro_5')
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-dark-900 font-sans font-normal tracking-wide border-b border-gray-100 pb-4 last:border-0">
                    <Check size={16} className="mt-0.5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
             </ul>

             <Link to="/contact" className="relative z-10">
               <button className="w-full py-4 rounded-xl bg-primary text-white font-bold text-xs hover:bg-dark-900 transition-all uppercase tracking-[0.2em] font-sans shadow-lg">
                 {t('pricing.btn')}
               </button>
             </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;