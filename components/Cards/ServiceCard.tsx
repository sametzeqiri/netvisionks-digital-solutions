import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Service } from '../../data/servicesData';

interface ServiceCardProps {
    service: Service;
    variants?: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, variants }) => {
    const { t } = useLanguage();

    return (
        <Link to={`/services/${service.id}`} className="block h-full group">
            <motion.div
                variants={variants}
                className="card-liquid-glass flex flex-col h-full overflow-hidden"
            >
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        loading="lazy"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-dark-900/10 group-hover:bg-transparent transition-colors duration-300"></div>

                    {/* Icon Floating */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg text-primary z-10">
                        <service.icon size={24} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif font-bold text-dark-900 mb-4 uppercase tracking-wide group-hover:text-primary transition-colors">
                        {t(service.titleKey)}
                    </h3>
                    <p className="text-dark-900 font-sans font-medium leading-relaxed mb-6 line-clamp-3">
                        {t(service.descriptionKey)}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-orange-600 font-bold text-sm tracking-widest uppercase gap-2 group-hover:gap-3 transition-all">
                        Läs Mer
                        <ArrowRight size={16} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ServiceCard;
