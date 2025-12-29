import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Briefcase, ChevronDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const isHome = location.pathname === '/';
  // Always use transparent/overlay nav on home until scrolled
  const showSolidNav = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileSubmenuOpen(null);
  }, [location]);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.services'), path: '/services' },
    {
      label: t('nav.news'),
      path: '/news',
      submenu: [
        { label: t('nav.blog'), path: '/news/blog' },
        { label: t('nav.faq'), path: '/news/faq' }
      ]
    },
    {
      label: t('nav.contact'),
      path: '/contact',
      submenu: [
        { label: t('nav.contact'), path: '/contact' },
        { label: t('nav.careers'), path: '/contact/careers' }
      ]
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMobileSubmenu = (label: string) => {
    if (mobileSubmenuOpen === label) {
      setMobileSubmenuOpen(null);
    } else {
      setMobileSubmenuOpen(label);
    }
  };

  // Text colors
  const textColorClass = showSolidNav ? 'text-dark-900' : 'text-white';

  return (
    <header className={`fixed w-full z-40 top-0 left-0 transition-all duration-300 ${showSolidNav
      ? 'bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
      : 'bg-transparent'
      }`}>
      {/* Top Bar - Darker Orange for Accessibility (Contrast > 4.5:1) */}
      <div className={`hidden lg:block overflow-hidden transition-all duration-300 h-10 opacity-100 py-2 bg-[#CC5200] text-white text-sm font-medium`}>
        <div className="container mx-auto px-4 lg:px-12 flex justify-between items-center h-full font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-white" /> Zekë Bathiri 30, Vushtrri</span>
            <a href="tel:+4747738137" className="flex items-center gap-2 hover:text-gray-200 transition-colors"><Phone size={14} className="text-white" /> +47 477 38 137 / +383 49 808 113</a>
            <a href="mailto:info@netvisionks.com" className="flex items-center gap-2 hover:text-gray-200 transition-colors"><Mail size={14} className="text-white" /> info@netvisionks.com</a>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-white" />
            <span>{t('nav.open')}</span>
          </div>
        </div>
      </div>

      <nav className={`container mx-auto px-4 lg:px-12 flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-2 md:gap-3 z-50 transition-all duration-300 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}>
          <img
            src="/logo-small.webp"
            alt="NetvisionKs Logo"
            width="180"
            height="60"
            className="h-full w-auto object-contain py-1"
          />
          <div className={`flex items-center tracking-widest font-bold ${scrolled ? 'text-lg md:text-xl' : 'text-lg md:text-2xl'} font-sans`}>
            <span className="text-gray-800">NETVISION</span>
            <span className="text-[#CC0000]">KS</span>
          </div>
        </Link>

        {/* Desktop Menu - Hidden on Mobile/Tablet/Small Laptop (xl breakpoint) */}
        <div className="hidden xl:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.submenu ? (
                // Dropdown Menu Item
                <div className="relative pb-2 pt-2 cursor-pointer">
                  <button
                    className={`font-bold text-sm uppercase tracking-wide flex items-center gap-1 transition-colors font-sans ${(isActive(link.path) ? 'text-primary' : `${textColorClass} hover:text-primary`)
                      } ${!showSolidNav ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : ''}`}
                  >
                    {link.label}
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown Content - Glass effect - ALWAYS LIGHT GLASS */}
                  <div className="absolute left-0 mt-2 w-52 backdrop-blur-3xl rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 bg-white/70 border border-white/50">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-2.5 text-sm transition-all border-l-2 border-transparent font-sans text-dark-900 font-medium hover:bg-white/40 hover:text-primary hover:border-primary hover:pl-5"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // Standard Link
                <Link
                  to={link.path}
                  className={`font-bold text-sm uppercase tracking-wide transition-colors font-sans ${(isActive(link.path) ? 'text-primary' : `${textColorClass} hover:text-primary`)
                    } ${!showSolidNav ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : ''}`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <div className="flex items-center gap-4">
            <Link to="/contact">
              {/* New Button Style */}
              <button className={`px-6 py-2 rounded-md font-bold text-sm transition-all tracking-wider font-sans ${showSolidNav
                ? 'btn-primary-glass'
                : 'btn-nav-transparent'
                }`}>
                {t('nav.quote')}
              </button>
            </Link>

            {/* Language Switcher - Text Based No Flag */}
            <div className={`flex items-center gap-2 font-sans font-bold text-sm ${showSolidNav ? 'text-dark-900' : 'text-white'}`}>
              <button
                onClick={() => setLanguage('sv')}
                aria-label="Byt språk till Svenska"
                className={`transition-all hover:text-primary ${language === 'sv' ? 'text-primary scale-110' : 'opacity-70'}`}
              >
                SV
              </button>
              <span className="opacity-50">|</span>
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch language to English"
                className={`transition-all hover:text-primary ${language === 'en' ? 'text-primary scale-110' : 'opacity-70'}`}
              >
                EN
              </button>
              <span className="opacity-50">|</span>
              <button
                onClick={() => setLanguage('sq')}
                aria-label="Ndërro gjuhën në Shqip"
                className={`transition-all hover:text-primary ${language === 'sq' ? 'text-primary scale-110' : 'opacity-70'}`}
              >
                SQ
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button - Visible on Mobile & Tablet/Laptop (xl breakpoint) */}
        <div className="flex items-center gap-4 xl:hidden">
          {/* Mobile Language Switcher */}
          <div className={`flex items-center gap-2 font-sans font-bold text-sm ${showSolidNav ? 'text-dark-900' : 'text-white'}`}>
            <button
              onClick={() => setLanguage('sv')}
              aria-label="Byt språk till Svenska"
              className={`${language === 'sv' ? 'text-primary' : 'opacity-70'}`}
            >
              SV
            </button>
            <span className="opacity-50">|</span>
            <button
              onClick={() => setLanguage('en')}
              aria-label="Switch language to English"
              className={`${language === 'en' ? 'text-primary' : 'opacity-70'}`}
            >
              EN
            </button>
            <span className="opacity-50">|</span>
            <button
              onClick={() => setLanguage('sq')}
              aria-label="Ndërro gjuhën në Shqip"
              className={`${language === 'sq' ? 'text-primary' : 'opacity-70'}`}
            >
              SQ
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`z-50 p-2 rounded ${isOpen ? 'text-dark-900' : textColorClass}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 pt-24 px-4 xl:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-100 pb-2">
                  {link.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu(link.label)}
                        className="flex items-center justify-between w-full text-lg font-bold text-dark-900 py-2 font-serif uppercase tracking-wide"
                      >
                        {link.label}
                        <ChevronDown
                          size={20}
                          className={`transform transition-transform ${mobileSubmenuOpen === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileSubmenuOpen === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-transparent rounded-md"
                          >
                            <div className="py-2 flex flex-col pl-4">
                              {link.submenu.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  className="py-2 text-gray-500 hover:text-primary block font-sans"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block text-lg font-bold py-2 font-serif uppercase tracking-wide ${isActive(link.path) ? 'text-primary' : 'text-dark-900'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full btn-primary-glass py-4 rounded-md font-bold tracking-widest font-sans">
                    {t('nav.request_quote')}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;