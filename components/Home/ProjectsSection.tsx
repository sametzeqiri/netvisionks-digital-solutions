import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  const projects = [
    { id: 1, title: t('projects.p1'), img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop&fm=webp', cat: 'Digital', url: '#' },
    { id: 2, title: t('projects.p2'), img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop&fm=webp', cat: 'Branding', url: '#' },
    { id: 5, title: t('projects.p5'), img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop&fm=webp', cat: 'Cleaning Tech', url: 'https://www.heltrent.no/' }, // Stable cleaning image
    { id: 6, title: 'GEO Performance', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop&fm=webp', cat: 'AI Optimization', url: '#' },
    { id: 3, title: t('projects.p3'), img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop&fm=webp', cat: 'Development', url: '#' },
    { id: 4, title: t('projects.p4'), img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop&fm=webp', cat: 'Marketing', url: '#' },
  ];

  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-serif text-dark-900 mb-2 uppercase font-normal tracking-widest">
              {t('projects.title')}
            </h2>
            <div className="h-1 w-24 bg-primary mt-4"></div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-dark-900 font-bold uppercase tracking-widest hover:text-primary transition-colors mt-8 md:mt-0"
          >
            View All Work <ArrowUpRight size={20} />
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project) => (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={project.id}
              className="block group"
            >
              <motion.div
                variants={cardVariants}
                className="card-liquid-glass p-6 group cursor-pointer"
              >
                {/* Image Container */}
                <div className="rounded-2xl overflow-hidden mb-8 relative aspect-[4/3] bg-transparent">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                <div className="px-2">
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] block mb-2 font-sans">{project.cat}</span>
                  <div className="flex justify-between items-start gap-4">
                    <motion.h3
                      className="text-dark-900 text-2xl font-serif font-bold uppercase tracking-wide group-hover:text-primary transition-colors leading-tight"
                    >
                      {project.title}
                    </motion.h3>
                    <ArrowUpRight className="text-primary group-hover:text-dark-900 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 mt-2 flex-shrink-0" />
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;