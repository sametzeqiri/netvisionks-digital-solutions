import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // Shorter delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[9999]"
                >
                    <div className="bg-white/95 backdrop-blur-3xl border border-white/50 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                                <Cookie size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-dark-900 font-serif leading-none mb-2">{t('cookies.title')}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-sans">
                                    {t('cookies.desc')}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleAccept}
                                className="flex-1 bg-dark-900 hover:bg-black text-white px-6 py-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-xl shadow-black/10"
                            >
                                <Check size={16} /> {t('cookies.accept')}
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-6 py-4 text-gray-600 hover:text-dark-900 text-xs font-bold transition-colors uppercase tracking-widest"
                            >
                                {t('cookies.decline')}
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                            <a href="#" className="text-[10px] text-gray-700 hover:text-primary transition-colors uppercase tracking-[0.2em] font-bold flex items-center gap-1.5">
                                <Shield size={12} /> {t('cookies.policy')}
                            </a>
                            <span className="text-gray-300 font-light">|</span>
                            <a href="#" className="text-[10px] text-gray-700 hover:text-primary transition-colors uppercase tracking-[0.2em] font-bold">
                                {t('cookies.settings')}
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
