import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Zap, Users, ArrowLeft, ShieldCheck, CheckCircle2, Globe, Coffee } from 'lucide-react';
import SEO from '../components/Layout/SEO';

const ValueDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const valuesInfo: any = {
        'val1': {
            icon: <Heart size={48} className="text-orange-600" />,
            titleKey: 'about.val1_title',
            descKey: 'about.val1_desc',
            fullTextKey: 'value.val1_full',
            bullets: [
                'value.bullet1_val1',
                'value.bullet2_val1',
                'value.bullet3_val1',
                'value.bullet4_val1'
            ],
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
        },
        'val2': {
            icon: <Zap size={48} className="text-orange-600" />,
            titleKey: 'about.val2_title',
            descKey: 'about.val2_desc',
            fullTextKey: 'value.val2_full',
            bullets: [
                'value.bullet1_val2',
                'value.bullet2_val2',
                'value.bullet3_val2',
                'value.bullet4_val2'
            ],
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
        },
        'val3': {
            icon: <Users size={48} className="text-orange-600" />,
            titleKey: 'about.val3_title',
            descKey: 'about.val3_desc',
            fullTextKey: 'value.val3_full',
            bullets: [
                'value.bullet1_val3',
                'value.bullet2_val3',
                'value.bullet3_val3',
                'value.bullet4_val3'
            ],
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
        },
        'ben1': {
            icon: <Globe size={48} className="text-orange-600" />,
            titleKey: 'careers.benefits_1_title',
            descKey: 'careers.benefits_1_desc',
            fullTextKey: 'careers.benefits_1_full',
            bullets: ['value.bullet1_val2', 'value.bullet4_val2', 'value.bullet3_val3'],
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
        },
        'ben2': {
            icon: <Zap size={48} className="text-orange-600" />,
            titleKey: 'careers.benefits_2_title',
            descKey: 'careers.benefits_2_desc',
            fullTextKey: 'careers.benefits_2_full',
            bullets: ['value.bullet2_val1', 'value.bullet3_val1', 'value.bullet4_val1'],
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
        },
        'ben3': {
            icon: <Heart size={48} className="text-orange-600" />,
            titleKey: 'careers.benefits_3_title',
            descKey: 'careers.benefits_3_desc',
            fullTextKey: 'careers.benefits_3_full',
            bullets: ['value.bullet2_val2', 'value.bullet3_val2', 'value.bullet1_val2'],
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
        },
        'ben4': {
            icon: <Coffee size={48} className="text-orange-600" />,
            titleKey: 'careers.benefits_4_title',
            descKey: 'careers.benefits_4_desc',
            fullTextKey: 'careers.benefits_4_full',
            bullets: ['value.bullet1_val3', 'value.bullet2_val3', 'value.bullet4_val3'],
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"
        }
    };

    const info = valuesInfo[id || 'val1'];

    if (!info) {
        return (
            <div className="pt-60 pb-20 text-center">
                <h2 className="text-3xl font-serif mb-4">{t('blog.not_found')}</h2>
                <Link to="/about" className="text-primary font-bold hover:underline tracking-widest uppercase">{t('value.back')}</Link>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 min-h-screen">
            <SEO
                title={`${t(info.titleKey)} | NetvisionKs`}
                description={t(info.descKey)}
            />

            <div className="container mx-auto px-4 lg:px-12">
                {/* Back Link */}
                <Link to={id?.startsWith('ben') ? '/contact/careers' : '/about'} className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-12 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold tracking-widest uppercase text-xs">{t('value.back')}</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-6 bg-orange-50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner">
                            {info.icon}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-dark-900 mb-6 uppercase tracking-widest leading-tight">
                            {t(info.titleKey)}
                        </h1>
                        <p className="text-xl text-orange-600 font-medium mb-8 font-sans">
                            {t(info.descKey)}
                        </p>

                        <div className="prose prose-lg text-gray-700 font-sans leading-relaxed mb-10">
                            {t(info.fullTextKey)}
                        </div>

                        <ul className="space-y-4 mb-10">
                            {info.bullets.map((bulletKey: string, i: number) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-3 text-gray-800"
                                >
                                    <CheckCircle2 size={20} className="text-orange-500 flex-shrink-0" />
                                    <span className="font-medium tracking-wide">{t(bulletKey)}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <Link to="/contact" className="btn-primary-glass inline-block px-10 py-5 rounded-xl font-bold tracking-widest uppercase shadow-xl hover:shadow-orange-500/20 transition-all">
                            {t('value.cta_btn')}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-2xl z-0"></div>
                        <img
                            src={info.image}
                            alt={t(info.titleKey)}
                            width="800"
                            height="600"
                            className="relative z-10 w-full rounded-2xl shadow-2xl transition-all duration-700 border border-white/40"
                        />
                        <div className="absolute -bottom-10 -right-10 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50 max-w-xs hidden md:block z-20">
                            <ShieldCheck size={40} className="text-orange-600 mb-4" />
                            <p className="text-sm font-serif italic text-dark-900 leading-relaxed font-bold">
                                "{t('value.quote_text')}"
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ValueDetailPage;
