import React, { useState } from 'react';
import SEO from '../components/Layout/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Heart, Globe, Coffee, ArrowRight, MapPin, CheckCircle, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobsData } from '../data/jobsData';

const CareersPage: React.FC = () => {
    const { t, language } = useLanguage();
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        link: '',
        message: ''
    });

    const benefits = [
        {
            id: 'ben1',
            icon: <Globe className="w-6 h-6 text-primary" />,
            title: t('careers.benefits_1_title'),
            desc: t('careers.benefits_1_desc')
        },
        {
            id: 'ben2',
            icon: <Briefcase className="w-6 h-6 text-primary" />,
            title: t('careers.benefits_2_title'),
            desc: t('careers.benefits_2_desc')
        },
        {
            id: 'ben3',
            icon: <Heart className="w-6 h-6 text-primary" />,
            title: t('careers.benefits_3_title'),
            desc: t('careers.benefits_3_desc')
        },
        {
            id: 'ben4',
            icon: <Coffee className="w-6 h-6 text-primary" />,
            title: t('careers.benefits_4_title'),
            desc: t('careers.benefits_4_desc')
        }
    ];

    const positions = jobsData;

    const handleApply = (jobTitle: string) => {
        setSelectedJob(jobTitle);
        const formElement = document.getElementById('application-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://formspree.io/f/xeejekaj', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    job: selectedJob || 'Spontaneous Application',
                    type: 'Job Application'
                })
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', link: '', message: '' });
                setTimeout(() => {
                    setSubmitted(false);
                    setSelectedJob(null);
                }, 5000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pt-60 pb-20 min-h-screen">
            <SEO
                title={`${t('nav.careers')} | NetvisionKs`}
                description={t('careers.desc')}
            />

            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3 block">
                        {t('careers.subtitle')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark-900 mb-6">
                        {t('careers.title_prefix')} <span className="text-primary">NetvisionKs</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('careers.desc')}
                    </p>
                </motion.div>
            </section>

            {/* Benefits Content */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <Link to={`/about/value/${benefit.id}`} key={index} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 items-center text-center hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col"
                            >
                                <div className="bg-primary/5 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/1 transition-colors">
                                    {benefit.icon}
                                </div>
                                <h3 className="font-serif font-bold text-xl mb-2 text-dark-900 group-hover:text-primary transition-colors">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{benefit.desc}</p>
                                <div className="mt-auto text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Läs Mer <ArrowRight size={12} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section className="container mx-auto px-6 max-w-5xl">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-serif font-bold text-dark-900">{t('careers.positions_title')}</h2>
                    <div className="hidden md:block h-px bg-gray-200 flex-grow ml-8"></div>
                </div>

                <div className="grid gap-6">
                    {positions.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="card-liquid-glass p-8 flex flex-col md:flex-row md:items-center justify-between group h-full transition-all duration-500"
                        >
                            <div className="flex-grow md:pr-8">
                                <Link to={`/careers/job/${job.id}`}>
                                    <h3 className="text-2xl font-bold text-dark-900 mb-2 group-hover:text-primary transition-colors underline-offset-4 hover:underline">
                                        {t(job.titleKey)}
                                    </h3>
                                </Link>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4 uppercase tracking-widest font-bold">
                                    <span className="flex items-center"><Briefcase size={14} className="mr-2 text-primary" /> {t(job.typeKey)}</span>
                                    <span className="flex items-center"><MapPin size={14} className="mr-2 text-primary" /> {t(job.locationKey)}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{t(job.descKey)}</p>
                                <Link to={`/careers/job/${job.id}`} className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                    Läs Mer <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="mt-6 md:mt-0 flex flex-col gap-3">
                                <button
                                    onClick={() => handleApply(t(job.titleKey))}
                                    className="btn-primary-glass px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase whitespace-nowrap w-full md:w-auto"
                                >
                                    {t('careers.apply_btn')}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Application Form Section */}
            <section id="application-form" className="container mx-auto px-6 mb-20 scroll-mt-32">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-2 bg-dark-900 p-10 md:p-12 text-white relative">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary to-transparent"></div>
                        <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">
                            {selectedJob ? `Sök: ${selectedJob}` : t('careers.spontaneous_title')}
                        </h2>
                        <p className="text-gray-400 mb-10 font-light leading-relaxed relative z-10">
                            {t('careers.spontaneous_desc')}
                        </p>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center text-sm text-gray-300">
                                <CheckCircle size={18} className="text-primary mr-3" />
                                {t('careers.response')}
                            </div>
                            <div className="flex items-center text-sm text-gray-300">
                                <CheckCircle size={18} className="text-primary mr-3" />
                                {t('careers.confidentiality')}
                            </div>
                        </div>

                        {selectedJob && (
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="mt-12 flex items-center text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors"
                            >
                                <X size={14} className="mr-2" /> Återställ till spontanansökan
                            </button>
                        )}
                    </div>

                    <div className="md:col-span-3 p-10 md:p-12 relative">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-dark-900 mb-2">{t('reviews.success_title')}</h3>
                                    <p className="text-gray-500">{t('reviews.success_desc')}</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t('contact.form_name')}</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="..."
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 p-4 rounded-xl outline-none transition-all font-sans"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t('contact.form_email')}</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="..."
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 p-4 rounded-xl outline-none transition-all font-sans"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Portfolio / LinkedIn Link</label>
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 p-4 rounded-xl outline-none transition-all font-sans"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t('contact.form_message')}</label>
                                        <textarea
                                            rows={4}
                                            placeholder="..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 p-4 rounded-xl outline-none transition-all font-sans resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn-primary px-8 py-5 rounded-xl font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all text-sm disabled:opacity-50"
                                    >
                                        {loading ? '...' : t('careers.send_spontaneous')} <Send size={18} />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default CareersPage;
