import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe, Heart, Zap, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/Layout/SEO';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const titleVar: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "backOut" } }
};

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-32 md:pt-60 pb-24">
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.desc')}
      />
      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-12 mb-20 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span variants={itemVariants} className="text-orange-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block font-sans text-shadow-sm">{t('about.label')}</motion.span>

          <motion.h1 variants={titleVar} className="text-5xl md:text-7xl font-serif text-dark-900 mb-8 leading-tight tracking-widest font-normal uppercase drop-shadow-sm">
            {t('about.title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">{t('about.title_2')}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-dark-900 leading-relaxed font-sans font-medium tracking-wide drop-shadow-sm">
            {t('about.intro')}
          </motion.p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="py-20 border-y border-white/20 bg-white/20 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-4xl font-serif text-dark-900 mb-6 tracking-widest uppercase font-normal">{t('about.mission_title')}</motion.h2>
              <div className="space-y-6 text-dark-900 text-lg leading-relaxed font-sans font-light tracking-wide">
                <motion.p variants={itemVariants}>
                  {t('about.mission_p1')}
                </motion.p>
                <motion.p variants={itemVariants} className="font-medium text-dark-900 font-bold">{t('about.mission_bold')}</motion.p>
                <motion.ul
                  variants={containerVariants}
                  className="space-y-4"
                >
                  <motion.li variants={itemVariants} className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-full text-orange-700 mt-1 backdrop-blur-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <span>{t('about.mission_li1')}</span>
                  </motion.li>
                  <motion.li variants={itemVariants} className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-full text-orange-700 mt-1 backdrop-blur-sm">
                      <Globe size={20} />
                    </div>
                    <span>{t('about.mission_li2')}</span>
                  </motion.li>
                </motion.ul>
                <motion.p variants={itemVariants}>
                  {t('about.mission_p2')}
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/about-team.webp"
                alt="Team collaboration"
                width="1200"
                height="800"
                loading="lazy"
                className="rounded-lg shadow-2xl relative z-10 border border-white/40 hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-orange-500/30 rounded-lg z-0 hidden md:block"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 container mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-dark-900 mb-4 tracking-widest uppercase font-normal"
          >
            {t('about.values_title')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-1 bg-orange-500 mx-auto"
          ></motion.div>
          <p className="mt-4 text-dark-900 max-w-2xl mx-auto font-sans font-medium tracking-wide">
            {t('about.values_intro')}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Link to="/about/value/val1" className="block group">
            <motion.div
              variants={itemVariants}
              className="card-liquid-glass p-8 h-full flex flex-col"
            >
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600 mb-6 shadow-sm border border-orange-500/10 backdrop-blur-sm relative z-10 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-dark-900 tracking-wide uppercase relative z-10 group-hover:text-orange-600 transition-colors">{t('about.val1_title')}</h3>
              <p className="text-gray-900 font-sans font-medium tracking-wide relative z-10">
                {t('about.val1_desc')}
              </p>
              <div className="mt-auto pt-6 text-orange-600 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center gap-2">
                {t('common.read_more')} <ArrowUpRight size={14} />
              </div>
            </motion.div>
          </Link>

          <Link to="/about/value/val2" className="block group">
            <motion.div
              variants={itemVariants}
              className="card-liquid-glass p-8 h-full flex flex-col"
            >
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600 mb-6 shadow-sm border border-orange-500/10 backdrop-blur-sm relative z-10 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-dark-900 tracking-wide uppercase relative z-10 group-hover:text-orange-600 transition-colors">{t('about.val2_title')}</h3>
              <p className="text-gray-900 font-sans font-medium tracking-wide relative z-10">
                {t('about.val2_desc')}
                <span className="block mt-2 font-bold italic text-dark-900">{t('about.val2_quote')}</span>
              </p>
              <div className="mt-auto pt-6 text-orange-600 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center gap-2">
                {t('common.read_more')} <ArrowUpRight size={14} />
              </div>
            </motion.div>
          </Link>

          <Link to="/about/value/val3" className="block group">
            <motion.div
              variants={itemVariants}
              className="card-liquid-glass p-8 h-full flex flex-col"
            >
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-600 mb-6 shadow-sm border border-orange-500/10 backdrop-blur-sm relative z-10 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4 text-dark-900 tracking-wide uppercase relative z-10 group-hover:text-orange-600 transition-colors">{t('about.val3_title')}</h3>
              <p className="text-gray-900 font-sans font-medium tracking-wide relative z-10">
                {t('about.val3_desc')}
              </p>
              <div className="mt-auto pt-6 text-orange-600 font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center gap-2">
                {t('common.read_more')} <ArrowUpRight size={14} />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Founders & Vision Section */}
      <div className="py-24 border-t border-white/30">
        <div className="container mx-auto px-4 lg:px-12">

          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-serif text-dark-900 mb-4 tracking-widest uppercase font-normal"
            >
              {t('about.founders_title')}
            </motion.h2>
            <p className="text-dark-900 max-w-2xl mx-auto font-sans font-medium tracking-wide">
              {t('about.founders_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-20">
            {/* Bujar Gashi */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5] bg-gray-200 shadow-md">
                <img
                  src="/bujar.webp"
                  alt="Bujar Gashi"
                  width="400"
                  height="500"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0"></div>
              </div>
              <motion.h3
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-2xl font-serif font-bold text-dark-900 mb-1 tracking-wide uppercase"
              >
                Bujar Gashi
              </motion.h3>
              <p className="text-orange-600 font-bold tracking-[0.2em] uppercase text-xs font-sans mb-4">{t('about.founder_ceo')}</p>
              <p className="text-dark-900 font-sans font-medium leading-relaxed text-sm">
                {t('about.founder_bujar_bio')}
              </p>
            </motion.div>

            {/* Samet Zeqiri */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5] bg-gray-200 shadow-md">
                <img
                  src="/samet.webp"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=60&w=800&fm=webp&fit=crop";
                    e.currentTarget.onerror = null;
                  }}
                  alt="Samet Zeqiri"
                  width="400"
                  height="500"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0"></div>
              </div>
              <motion.h3
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-2xl font-serif font-bold text-dark-900 mb-1 tracking-wide uppercase"
              >
                Samet Zeqiri
              </motion.h3>
              <p className="text-orange-600 font-bold tracking-[0.2em] uppercase text-xs font-sans mb-4">{t('about.founder')}</p>
              <p className="text-dark-900 font-sans font-medium leading-relaxed text-sm">
                {t('about.founder_samet_bio')}
              </p>
            </motion.div>
          </div>

          {/* Team Showcase */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-serif text-dark-900 mb-4 tracking-widest uppercase font-normal"
              >
                {t('about.team_title')}
              </motion.h2>
              <p className="text-dark-900 max-w-2xl mx-auto font-sans font-medium tracking-wide italic">
                {t('about.team_desc')}
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                className="h-1 bg-orange-500 mx-auto mt-6"
              />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10"
            >
              {[
                { name: 'Arta Hoxha', role: 'Lead UI/UX Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' },
                { name: 'Dardan Krasniqi', role: 'Senior Fullstack Dev', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
                { name: 'Besnik Berisha', role: 'Project Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop' },
                { name: 'Elena Gashi', role: 'HR Coordinator', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop' }
              ].map((member, idx) => (
                <motion.div key={idx} variants={itemVariants} className="group text-center">
                  <div className="card-liquid-glass p-0 overflow-hidden mb-6 aspect-square relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={member.img} alt={member.name} width="400" height="400" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-dark-900 mb-1 group-hover:text-primary transition-colors">{member.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Vision Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-liquid-glass p-8 md:p-12 max-w-4xl mx-auto text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            <motion.h3
              initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-3xl font-serif font-bold mb-6 text-orange-600 tracking-widest uppercase relative z-10"
            >
              {t('about.vision_title')}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-dark-900 italic text-xl leading-relaxed mb-6 font-serif font-light tracking-wide relative z-10"
            >
              {t('about.vision_quote')}
            </motion.p>
            <p className="text-dark-900 font-sans font-medium tracking-wide relative z-10">
              {t('about.vision_text')}
            </p>

            <div className="mt-8 relative z-10">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 rounded-md font-bold tracking-widest uppercase font-sans transition-colors shadow-lg shadow-orange-500/20"
                >
                  {t('nav.contact')}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;