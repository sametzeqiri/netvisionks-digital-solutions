import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, MapPin, CheckCircle, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { jobsData } from '../data/jobsData';
import SEO from '../components/Layout/SEO';

const JobDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();

    const job = jobsData.find(j => j.id === id);

    if (!job) {
        return (
            <div className="pt-60 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-4xl font-serif text-dark-900 mb-4">Position not found</h1>
                <Link to="/contact/careers" className="text-primary hover:underline">Back to Careers</Link>
            </div>
        );
    }

    const requirements = t(job.requirementsKey).split(';');
    const benefits = t(job.benefitsKey).split(';');

    return (
        <main className="pt-60 pb-24 min-h-screen">
            <SEO
                title={`${t(job.titleKey)} | Careers @ NetvisionKs`}
                description={t(job.descKey)}
            />

            <div className="container mx-auto px-6 lg:px-12">
                {/* Back Link */}
                <Link to="/contact/careers" className="inline-flex items-center text-gray-500 hover:text-primary mb-12 uppercase tracking-widest text-sm font-bold transition-colors group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tillbaka till Lediga Tjänster
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
                        >
                            <div className="flex flex-wrap gap-4 mb-8">
                                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center">
                                    <Briefcase size={14} className="mr-2" /> {t(job.typeKey)}
                                </span>
                                <span className="bg-stone-100 text-stone-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center">
                                    <MapPin size={14} className="mr-2" /> {t(job.locationKey)}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-900 mb-8">
                                {t(job.titleKey)}
                            </h1>

                            <div className="prose prose-lg text-gray-700 font-sans leading-relaxed mb-12">
                                <p>{t(job.fullDescKey)}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-dark-900 mb-6 flex items-center">
                                        Krav
                                    </h3>
                                    <ul className="space-y-4">
                                        {requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
                                                <span className="text-gray-600">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-serif font-bold text-dark-900 mb-6 flex items-center">
                                        Förmåner
                                    </h3>
                                    <ul className="space-y-4">
                                        {benefits.map((ben, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                                    <CheckCircle size={12} />
                                                </div>
                                                <span className="text-gray-600">{ben}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Sidebar/CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-40 space-y-8">
                            <div className="bg-gradient-to-br from-primary to-orange-600 text-white p-8 rounded-3xl shadow-2xl shadow-orange-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Intresserad?</h3>
                                <p className="text-white/90 mb-8 font-light relative z-10">
                                    Vi ser fram emot att träffa dig! Skicka in din ansökan idag så hör vi av oss inom kort.
                                </p>
                                <Link to={`/contact/careers?job=${job.id}`}>
                                    <button className="w-full bg-white text-primary hover:bg-stone-50 py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all">
                                        Ansök Nu
                                    </button>
                                </Link>

                                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Clock size={16} className="text-primary mr-3" />
                                        Svar inom 48h
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <Calendar size={16} className="text-primary mr-3" />
                                        Snabb process
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                                <h4 className="font-bold text-dark-900 mb-2">Frågor?</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Kontakta vårt HR-team ifall du har några frågor om rollen.
                                </p>
                                <a href="mailto:hr@netvisionks.com" className="text-primary font-bold hover:underline text-sm tracking-widest uppercase">
                                    hr@netvisionks.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JobDetailPage;
