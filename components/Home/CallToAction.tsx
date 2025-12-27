import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CallToAction: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xeejekaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'Newsletter/CTA Signup' })
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-primary py-16 relative overflow-hidden">
      {/* Subtle pulse animation for background interest */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
      ></motion.div>

      <div className="container mx-auto px-4 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white text-center md:text-left"
        >
          <h2 className="text-3xl font-bold mb-2">{t('cta.title')}</h2>
          <p className="opacity-90">{t('cta.text')}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-8 py-4 rounded-xl text-white font-bold border border-white/30"
            >
              <CheckCircle size={24} /> {t('reviews.success_title')}
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex w-full md:w-auto bg-white/10 backdrop-blur-md rounded-xl p-1.5 shadow-lg border border-white/20"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('cta.placeholder')}
                className="flex-grow md:w-64 px-4 py-3 outline-none text-white placeholder-white/50 bg-transparent font-sans"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary-glass px-8 py-3 rounded-lg font-bold text-white shadow-none border-white/30 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? '...' : t('cta.btn')} <Send size={16} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CallToAction;