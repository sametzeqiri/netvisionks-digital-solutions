import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  gradient?: 'orange' | 'purple' | 'blue' | 'pink';
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  title,
  description,
  icon,
  gradient = 'orange',
  children,
  onClick,
  className = ''
}) => {
  const gradientMap = {
    orange: 'from-orange-500 to-orange-400',
    purple: 'from-purple-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-400',
    pink: 'from-pink-500 to-purple-500',
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Liquid Mesh Background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/30 shadow-2xl transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/50">
        <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br ${gradientMap[gradient]} opacity-20 blur-[100px] animate-[spin_20s_linear_infinite] group-hover:opacity-40 transition-opacity`} />
      </div>

      {/* Card Content */}
      <div className="relative p-8 h-full z-10 flex flex-col">
        {/* Icon */}
        {icon && (
          <div className="mb-6 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 text-3xl group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-serif group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-base text-white/70 mb-6 leading-relaxed font-sans font-light">
            {description}
          </p>
        )}

        {/* Children Slot */}
        {children && (
          <div className="text-white/80 font-sans text-sm mt-auto">
            {children}
          </div>
        )}

        {/* Subtle Bottom Glow */}
        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradientMap[gradient]} opacity-50 blur-sm group-hover:h-2 transition-all duration-500`} />
      </div>
    </motion.div>
  );
};

export default GlassCard;
