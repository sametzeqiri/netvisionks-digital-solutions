import React from 'react';
import SEO from '../components/Layout/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
    const { t, language } = useLanguage();

    const postsData: any = {
        sv: [
            { id: 1, title: "GEO: Nästa Generations SEO för AI-eran", excerpt: "Lär dig hur Generative Engine Optimization hjälper ditt företag att synas i ChatGPT och Google Gemini svar.", date: "2024-03-12", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", readTime: "8 min" },
            { id: 2, title: "Varför Kosovo är Europas dolda Tech-juvel", excerpt: "Vi utforskar den snabba tillväxten av IT-sektorn i Kosovo och varför nordiska företag väljer att outsourca hit.", date: "2024-03-05", author: "Samet Zeqiri", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800", readTime: "10 min" },
            { id: 3, title: "Video Design: Maximera din konvertering", excerpt: "Visuellt innehåll är kung. Se hur professionell rörelse grafik kan öka ditt engagemang med 300%.", date: "2024-02-28", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800", readTime: "6 min" },
            { id: 4, title: "Digital Transformation för Småföretag", excerpt: "En guide för hur mindre verksamheter kan använda molnlösningar för att skala effektivt utan höga fasta kostnader.", date: "2024-02-20", author: "Bujar Gashi", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", readTime: "12 min" },
            { id: 5, title: "Datasäkerhet i en distribuerad värld", excerpt: "Praktiska tips för hur man skyddar sitt företags immateriella rättigheter vid samarbete med remote-team.", date: "2024-02-15", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", readTime: "9 min" },
            { id: 6, title: "Konsten att bygga skalbara React-applikationer", excerpt: "Best practices för front-end arkitektur som håller över tid när din användarbas växer lavinartat.", date: "2024-02-10", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800", readTime: "15 min" },
            { id: 7, title: "Framtidens UX: Röst- och AI-gränssnitt", excerpt: "Hur vi designar för interaktioner som inte sker via traditionella skärmar utan genom naturligt språk.", date: "2024-02-01", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80", readTime: "7 min" },
            { id: 8, title: "Hållbar Tech: Hur vi bygger grön mjukvara", excerpt: "Optimering av kod för att minska energiförbrukning i serverhallar är både bra för miljön och din plånbok.", date: "2024-01-25", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80", readTime: "5 min" },
            { id: 9, title: "Dataanalys: Från siffror till Affärsbeslut", excerpt: "Gör din data handlingbar. Hur man transformerar rådata till tillväxtstrategier för ditt företag.", date: "2024-01-18", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80", readTime: "11 min" },
            { id: 10, title: "Framgångshistoria: HeltRent.no Resan", excerpt: "En inblick i hur vi hjälpte ett norskt fastighetsbolag att digitalisera hela sin verksamhet och öka sin omsättning.", date: "2024-01-10", author: "Bujar Gashi", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800", readTime: "14 min" }
        ],
        en: [
            { id: 1, title: "GEO: Next Generation SEO for the AI Era", excerpt: "Learn how Generative Engine Optimization helps your business appear in ChatGPT and Google Gemini answers.", date: "2024-03-12", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", readTime: "8 min" },
            { id: 2, title: "Why Kosovo is Europe's Hidden Tech Jewel", excerpt: "Exploring the rapid growth of the IT sector in Kosovo and why Nordic companies choose to outsource here.", date: "2024-03-05", author: "Samet Zeqiri", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800", readTime: "10 min" },
            { id: 3, title: "Video Design: Maximizing Your Conversion", excerpt: "Visual content is king. See how professional motion graphics can increase your engagement by 300%.", date: "2024-02-28", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800", readTime: "6 min" },
            { id: 4, title: "Digital Transformation for Small Businesses", excerpt: "A guide for how smaller operations can use cloud solutions to scale effectively without high fixed costs.", date: "2024-02-20", author: "Bujar Gashi", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", readTime: "12 min" },
            { id: 5, title: "Data Security in a Distributed World", excerpt: "Practical tips for protecting your company's intellectual property when collaborating with remote teams.", date: "2024-02-15", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", readTime: "9 min" },
            { id: 6, title: "The Art of Building Scalable React Applications", excerpt: "Best practices for front-end architecture that holds up over time as your user base grows rapidly.", date: "2024-02-10", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800", readTime: "15 min" },
            { id: 7, title: "Future UX: Voice and AI Interfaces", excerpt: "Designing for interactions that happen not through traditional screens but through natural language.", date: "2024-02-01", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80", readTime: "7 min" },
            { id: 8, title: "Sustainable Tech: Building Green Software", excerpt: "Optimizing code to reduce power consumption in data centers is good for both the planet and your wallet.", date: "2024-01-25", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80", readTime: "5 min" },
            { id: 9, title: "Data Analytics: From Numbers to Business Decisions", excerpt: "Make your data actionable. How to transform raw data into growth strategies for your business.", date: "2024-01-18", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80", readTime: "11 min" },
            { id: 10, title: "Success Story: The HeltRent.no Journey", excerpt: "An insight into how we helped a Norwegian property company digitize its performance and increase revenue.", date: "2024-01-10", author: "Bujar Gashi", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800", readTime: "14 min" }
        ],
        sq: [
            { id: 1, title: "GEO: SEO e Gjeneratës së Re për Epokën e AI", excerpt: "Mësoni se si Optimizimi i Motorit Gjenerativ ndihmon biznesin tuaj të shfaqet në përgjigjet e ChatGPT dhe Gemini.", date: "2024-03-12", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", readTime: "8 min" },
            { id: 2, title: "Pse Kosova është Xhevahiri i Fshehur Tech i Evropës", excerpt: "Eksplorimi i rritjes së shpejtë të sektorit të IT në Kosovë dhe pse kompanitë nordike zgjedhin outsourcing këtu.", date: "2024-03-05", author: "Samet Zeqiri", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800", readTime: "10 min" },
            { id: 3, title: "Dizajni i Videove: Maksimizimi i Konvertimit tuaj", excerpt: "Përmbajtja vizuale është mbret. Shihni se si motion graphics mund të rrisë angazhimin tuaj me 300%.", date: "2024-02-28", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800", readTime: "6 min" },
            { id: 4, title: "Transformimi Dixhital për Bizneset e Vogla", excerpt: "Një udhëzues se si bizneset e vogla mund të përdorin zgjidhjet cloud për t'u shkallëzuar me efikasitet.", date: "2024-02-20", author: "Bujar Gashi", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", readTime: "12 min" },
            { id: 5, title: "Siguria e të Dhënave në një Botë të Shpërndarë", excerpt: "Këshilla praktike për mbrojtjen e pronës intelektuale gjatë bashkëpunimit me ekipe remote.", date: "2024-02-15", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", readTime: "9 min" },
            { id: 6, title: "Arti i Ndërtimit të Aplikacioneve React të Shkallëzueshme", excerpt: "Praktikat më të mira për arkitekturën front-end që i reziston kohës dhe rritjes së përdoruesve.", date: "2024-02-10", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800", readTime: "15 min" },
            { id: 7, title: "E ardhmja e UX: Ndërfaqet me Zë dhe AI", excerpt: "Dizajnimi i ndërveprimeve që nuk ndodhin përmes ekraneve tradicinale, por përmes gjuhës natyrore.", date: "2024-02-01", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=80", readTime: "7 min" },
            { id: 8, title: "Teknologjia e Qëndrueshme: Zhvillimi i Software-it të Gjelbër", excerpt: "Optimizimi i kodit för të reduktuar konsumin e energjisë është i mirë për planetin och portofolin tuaj.", date: "2024-01-25", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80", readTime: "5 min" },
            { id: 9, title: "Analiza e të Dhënave: Nga Shifrat te Vendimet e Biznesit", excerpt: "Shndërroni të dhënat tuaja i veprime. Si t'i ktheni të dhënat bruto në strategji rritjeje.", date: "2024-01-18", author: "NetvisionKs Team", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80", readTime: "11 min" },
            { id: 10, title: "Historia e Suksesit: Udhëtimi i HeltRent.no", excerpt: "Një vështrim se si ndihmuam një kompani norvegjeze të dixhitallizojë operacionet och të rritë fitimet.", date: "2024-01-10", author: "Bujar Gashi", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800", readTime: "14 min" }
        ]
    };

    const posts = postsData[language] || postsData.sv;

    return (
        <div className="relative z-10">
            <SEO
                title={`${t('blog.title')} | NetvisionKs`}
                description={t('blog.desc')}
            />
            <main className="pt-60 pb-20 min-h-screen">
                <section className="container mx-auto px-6 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-3 block">
                            {t('blog.subtitle')}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-normal text-dark-900 mb-8 uppercase tracking-widest">
                            {t('blog.title')}
                        </h1>
                        <p className="text-xl text-dark-900/80 max-w-2xl mx-auto font-sans font-light tracking-wide">
                            {t('blog.desc')}
                        </p>
                    </motion.div>
                </section>

                <section className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any, index: number) => (
                            <Link to={`/news/blog/${post.id}`} key={post.id} className="block group">
                                <motion.article
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="card-liquid-glass h-full overflow-hidden"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col h-[calc(100%-240px)]">
                                        <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-6 font-bold tracking-[0.2em] uppercase">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={12} className="text-orange-600" />
                                                {post.date}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-dark-900 mb-4 group-hover:text-orange-600 transition-colors uppercase tracking-tight leading-tight">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-8 line-clamp-3 text-sm font-sans font-light leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-dark-900/10">
                                            <span className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                <User size={12} />
                                                {post.author}
                                            </span>
                                            <div className="text-orange-600 font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-[0.2em]">
                                                {t('blog.read_more')}
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BlogPage;
