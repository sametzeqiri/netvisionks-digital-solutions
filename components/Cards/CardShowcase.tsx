import React from 'react';
import { Zap, Code, Shield, Rocket } from 'lucide-react';
import GlassCard from '../Cards/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';

const CardShowcase: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      title: 'Future Tech',
      description: 'Cutting-edge solutions för dina digitala behov',
      icon: <Zap className="text-orange-400" />,
      gradient: 'orange' as const,
    },
    {
      title: 'Code Quality',
      description: 'Robust och skalbar kod för långsiktig framgång',
      icon: <Code className="text-blue-400" />,
      gradient: 'blue' as const,
    },
    {
      title: 'Security First',
      description: 'Skyddad data och säkra transaktioner',
      icon: <Shield className="text-purple-400" />,
      gradient: 'purple' as const,
    },
    {
      title: 'Launch Ready',
      description: 'Snabb deployment och kontinuerlig support',
      icon: <Rocket className="text-pink-400" />,
      gradient: 'pink' as const,
    },
  ];

  return (
    <section className="relative py-20 bg-dark-900">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 uppercase tracking-wider">
            Glass Cards Showcase
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-sans">
            Neon-bordered glassmorphic cards med smooth hover-effekter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <GlassCard
              key={idx}
              title={card.title}
              description={card.description}
              icon={card.icon}
              gradient={card.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardShowcase;
