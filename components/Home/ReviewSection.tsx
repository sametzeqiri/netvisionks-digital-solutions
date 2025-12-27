import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

const ReviewSection: React.FC = () => {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Initial published reviews (5 stars)
    const [publishedReviews, setPublishedReviews] = useState<Review[]>([
        {
            id: 1,
            name: "Marcus Svensson",
            rating: 5,
            comment: "Fantastisk service och otroligt skickliga utvecklare. NetvisionKs levererade över förväntan!",
            date: "2024-03-10"
        },
        {
            id: 2,
            name: "Linda Berg",
            rating: 5,
            comment: "Smidig kommunikation och toppkvalitet på de remote-team vi hyrde in. Rekommenderas varmt.",
            date: "2024-02-28"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0 || !name || !comment) return;
        setLoading(true);

        try {
            // All reviews are sent to the backend (info@netvisionks.com)
            const response = await fetch('https://formspree.io/f/xeejekaj', { // Replace with your Formspree ID
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    rating,
                    comment,
                    type: rating === 5 ? 'Public Review' : 'Private Feedback'
                })
            });

            if (response.ok) {
                if (rating === 5) {
                    // Also publish to site locally
                    const newReview: Review = {
                        id: Date.now(),
                        name,
                        rating,
                        comment,
                        date: new Date().toISOString().split('T')[0]
                    };
                    setPublishedReviews([newReview, ...publishedReviews]);
                }
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setRating(0);
                    setName('');
                    setComment('');
                }, 4000);
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 lg:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-dark-900 mb-4 uppercase tracking-[0.2em] font-light"
                    >
                        {t('reviews.title')}
                    </motion.h2>
                    <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Review List */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <h3 className="text-2xl font-serif text-dark-900 mb-8 uppercase tracking-widest border-b border-gray-200 pb-4">{t('reviews.subtitle')}</h3>
                        <div className="space-y-6">
                            {publishedReviews.map((review) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.comment}"</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest">
                                        <span className="font-bold text-dark-900">{review.name}</span>
                                        <span>{review.date}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Review Form */}
                    <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden order-1 lg:order-2">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none" aria-hidden="true">
                            <Star size={200} className="text-primary" />
                        </div>

                        <h3 className="text-2xl font-serif text-dark-900 mb-2 uppercase tracking-widest relative z-10">{t('reviews.form_title')}</h3>
                        <p className="text-gray-500 mb-8 font-sans relative z-10">{t('reviews.form_desc')}</p>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <CheckCircle size={64} className="text-green-500 mb-6" />
                                    <h4 className="text-2xl font-bold text-dark-900 mb-2">{t('reviews.success_title')}</h4>
                                    <p className="text-gray-600">{t('reviews.success_desc')}</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6 relative z-10"
                                >
                                    <div className="flex flex-col gap-3">
                                        <label className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em]">{t('reviews.label_rating')}</label>
                                        <div className="flex gap-3">
                                            {[...Array(5)].map((_, i) => {
                                                const starValue = i + 1;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={i}
                                                        aria-label={`${t('reviews.label_rating')}: ${starValue} / 5`}
                                                        className="transition-all transform hover:scale-110 focus:outline-none"
                                                        onClick={() => setRating(starValue)}
                                                        onMouseEnter={() => setHover(starValue)}
                                                        onMouseLeave={() => setHover(0)}
                                                    >
                                                        <Star
                                                            size={28}
                                                            className={`${starValue <= (hover || rating)
                                                                ? 'fill-orange-500 text-orange-500'
                                                                : 'text-gray-200'
                                                                } transition-colors`}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em]">{t('reviews.label_name')}</label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="..."
                                            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em]">{t('reviews.label_comment')}</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="..."
                                            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-sans resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn-primary px-8 py-5 rounded-xl font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all text-sm disabled:opacity-50"
                                    >
                                        {loading ? 'Skickar...' : t('reviews.btn_submit')} <Send size={18} />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
