import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/Layout/SEO';
import MeetingBooking from '../components/Contact/MeetingBooking';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: t('contact.opt_quote'),
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Formspree to handle the backend
      const response = await fetch('https://formspree.io/f/xeejekaj', { // User should replace this with their ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: t('contact.opt_quote'),
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-60 min-h-screen">
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.desc')}
      />
      <div className="container mx-auto px-4 lg:px-12 pb-24 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase mb-4 block font-sans">{t('contact.label')}</span>
            <h1 className="text-6xl lg:text-7xl font-serif text-dark-900 mb-8 tracking-widest uppercase font-normal leading-tight">
              {t('contact.title')} <br /> {t('contact.title_2')}
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed font-sans font-light tracking-wide text-lg">
              {t('contact.desc')}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shadow-sm border border-primary/10 backdrop-blur-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-dark-900 tracking-wide uppercase font-serif">{t('contact.visit')}</h3>
                  <p className="text-gray-500 font-light font-sans">Sveavägen 1, 111 57 Stockholm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shadow-sm border border-primary/10 backdrop-blur-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-dark-900 tracking-wide uppercase font-serif">{t('contact.call')}</h3>
                  <a href="tel:+4747738137" className="text-gray-500 font-light font-sans hover:text-primary transition-colors">+47 477 38 137 / +383 49 808 113</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary shadow-sm border border-primary/10 backdrop-blur-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-dark-900 tracking-wide uppercase font-serif">{t('contact.mail')}</h3>
                  <a href="mailto:info@netvisionks.com" className="text-gray-500 font-light font-sans hover:text-primary transition-colors">info@netvisionks.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <CheckCircle size={80} className="text-green-500 mb-6" />
                  <h2 className="text-3xl font-serif font-bold text-dark-900 mb-4 uppercase tracking-widest">{t('reviews.success_title')}</h2>
                  <p className="text-gray-600 font-sans">{t('reviews.success_desc')}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-primary font-bold uppercase tracking-widest text-sm hover:underline"
                  >
                    Skicka ett till meddelande
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-dark-900 tracking-wide font-sans uppercase">{t('contact.form_name')}</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-100 bg-gray-50/50 text-dark-900 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-sans"
                        placeholder={t('contact.ph_name')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-dark-900 tracking-wide font-sans uppercase">{t('contact.form_phone')}</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-100 bg-gray-50/50 text-dark-900 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-sans"
                        placeholder="070-XXX XX XX"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-dark-900 tracking-wide font-sans uppercase">{t('contact.form_email')}</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-100 bg-gray-50/50 text-dark-900 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-sans"
                      placeholder="din@email.se"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-dark-900 tracking-wide font-sans uppercase">{t('contact.form_subject')}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-100 bg-gray-50/50 text-dark-900 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-sans appearance-none"
                    >
                      <option>{t('contact.opt_quote')}</option>
                      <option>{t('contact.opt_hr')}</option>
                      <option>{t('contact.opt_out')}</option>
                      <option>{t('contact.opt_other')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-dark-900 tracking-wide font-sans uppercase">{t('contact.form_message')}</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-4 border border-gray-100 bg-gray-50/50 text-dark-900 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-sans resize-none"
                      placeholder={t('contact.ph_msg')}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary-glass font-bold py-5 rounded-xl tracking-widest uppercase font-sans flex items-center justify-center gap-3 transition-all"
                  >
                    {loading ? 'Skickar...' : t('contact.form_btn')} <Send size={20} className={loading ? 'animate-pulse' : ''} />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Meeting Booking Section */}
        <div className="mt-32">
          <MeetingBooking />
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[450px] relative z-0 border-t border-gray-100 grayscale contrast-125">
        <iframe
          title="NetvisionKs Office Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.783963496035!2d18.0602656768856!3d59.33475967459635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6061386765%3A0x6266e7d69282531!2sSveav%C3%A4gen%201%2C%20111%2057%20Stockholm!5e0!3m2!1sv!2sse!4v1715690000000!5m2!1sv!2sse">
        </iframe>
      </div>
    </div>
  );
};

export default ContactPage;