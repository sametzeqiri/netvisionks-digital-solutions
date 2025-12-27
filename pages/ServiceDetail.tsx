import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { servicesData } from '../data/servicesData';
import SEO from '../components/Layout/SEO';

const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();

    const service = servicesData.find(s => s.id === id);

    if (!service) {
        return (
            <div className="pt-40 pb-20 container mx-auto px-4 text-center">
                <h1 className="text-4xl font-serif text-dark-900 mb-4">Service not found</h1>
                <Link to="/services" className="text-primary hover:underline">Back to Services</Link>
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <SEO
                title={`${t(service.titleKey)} | NetvisionKs`}
                description={t(service.descriptionKey)}
            />

            {/* Hero Image Area */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden mb-12">
                <img
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="container mx-auto px-6 lg:px-12 pb-12">
                        <Link to="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 uppercase tracking-widest text-sm font-bold transition-colors">
                            <ArrowLeft size={16} className="mr-2" />
                            {t('nav.services')}
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif font-bold text-white shadow-sm"
                        >
                            {t(service.titleKey)}
                        </motion.h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white/50"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-primary/10 rounded-xl text-primary">
                                <Icon size={32} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-dark-900">Översikt</h2>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
                            {service.fullDescription || t(service.descriptionKey)}
                        </p>

                        <h3 className="text-xl font-bold text-dark-900 mb-4 font-serif">Vad vi erbjuder inom {t(service.titleKey)}</h3>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-primary mt-1" />
                                <span className="text-gray-600">Skräddarsydda lösningar anpassade efter era behov.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-primary mt-1" />
                                <span className="text-gray-600">Dedikerat team med senior expertis.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-primary mt-1" />
                                <span className="text-gray-600">Full transparens och löpande rapportering.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-primary mt-1" />
                                <span className="text-gray-600">Stöd och support genom hela processen.</span>
                            </li>
                        </ul>

                        <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                            <h4 className="font-bold text-dark-900 mb-2">Varför välja oss?</h4>
                            <p className="text-gray-600 text-sm">
                                Vi kombinerar svensk projektledning med internationell spetskompetens för att leverera världsklasslösningar till konkurrenskraftiga priser.
                            </p>
                        </div>

                        {service.id === 'video-design' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mt-12"
                            >
                                <h3 className="text-2xl font-serif font-bold text-dark-900 mb-6 uppercase tracking-wider">Showcase Animation</h3>
                                <div className="card-liquid-glass p-0 overflow-hidden shadow-2xl aspect-video relative group border border-white/20">
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src="/D_Video_UI_Animation_Generated.mp4" type="video/mp4" />
                                        Din webbläsare stöder inte videofiler.
                                    </video>
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <p className="mt-4 text-gray-500 text-sm italic font-light">
                                    Exempel på modern UI-animering producerad av vårt team.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Sidebar CTA */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-gradient-to-br from-dark-900 to-gray-800 text-white p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-serif font-bold mb-4">Redo att starta?</h3>
                            <p className="text-gray-300 mb-8 font-light">
                                Boka ett kostnadsfritt möte med oss för att diskutera hur vi kan hjälpa er med {t(service.titleKey)}.
                            </p>
                            <Link to="/contact">
                                <button className="w-full bg-primary hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest text-sm">
                                    Kontakta Oss
                                </button>
                            </Link>
                            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                                <p className="text-sm text-gray-400 mb-2">Eller ring oss direkt:</p>
                                <a href="tel:081234567" className="text-xl font-bold hover:text-primary transition-colors">08-123 45 67</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
