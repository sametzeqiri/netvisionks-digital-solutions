import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/Layout/SEO';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t, language } = useLanguage();

    // In a real app, you'd fetch this from an API using the ID
    // Using the same data as BlogPage for now
    const postsData: any = {
        sv: [
            {
                id: 1,
                title: "Framtiden för Digital Transformation",
                content: "Digital transformation handlar inte bara om teknik, det handlar om människor och hur vi arbetar tillsammans. I denna artikel utforskar vi hur AI och automation förändrar landskapet för små och medelstora företag under 2024. Vi ser en trend där personlig service kombineras med blixtsnabb digital leverans.\n\nFöretag som investerar i molnbaserade lösningar idag kommer att vara morgondagens vinnare. Det handlar om att sänka trösklarna för innovation och låta kreativiteten flöda utan tekniska hinder.",
                date: "2024-02-15",
                author: "NetvisionKs Team",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
                readTime: "5 min"
            },
            {
                id: 2,
                title: "Molnlösningar: En Guide",
                content: "Att flytta till molnet är ett stort steg, men absolut nödvändigt för skalbarhet. Många företag oroar sig för säkerhet och kostnader, men verkligheten är att moderna molnplattformar som AWS och Azure erbjuder högre säkerhet än de flesta lokala servrar någonsin kan uppnå.\n\nI denna guide går vi igenom steg för steg hur ni förbereder er organisation för en smidig migration. Vi tittar på strategier för datalagring, applikationsmodernisering och hur man optimerar sina kostnader i molnet.",
                date: "2024-02-10",
                author: "NetvisionKs Team",
                image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200",
                readTime: "7 min"
            }
        ],
        en: [
            {
                id: 1,
                title: "The Future of Digital Transformation",
                content: "Digital transformation is not just about technology; it's about people and how we work together. In this article, we explore how AI and automation are changing the landscape for small and medium-sized enterprises in 2024. We see a trend where personalized service is combined with lightning-fast digital delivery.\n\nCompanies that invest in cloud-based solutions today will be tomorrow's winners. It's about lowering the barriers to innovation and letting creativity flow without technical obstacles.",
                date: "2024-02-15",
                author: "NetvisionKs Team",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
                readTime: "5 min"
            },
            {
                id: 2,
                title: "Cloud Solutions: A Guide",
                content: "Moving to the cloud is a big step, but absolutely necessary for scalability. Many companies worry about security and costs, but the reality is that modern cloud platforms like AWS and Azure offer higher security than most local servers can ever achieve.\n\nIn this guide, we go through step-by-step how to prepare your organization for a smooth migration. We look at strategies for data storage, application modernization, and how to optimize your costs in the cloud.",
                date: "2024-02-10",
                author: "NetvisionKs Team",
                image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200",
                readTime: "7 min"
            }
        ],
        sq: [
            {
                id: 1,
                title: "E ardhmja e Transformimit Dixhital",
                content: "Transformimi dixhital nuk ka të bëjë vetëm me teknologjinë; ka të bëjë me njerëzit dhe se si ne punojmë së bashku. Në këtë artikull, ne hulumtojmë se si AI dhe automatizimi po ndryshojnë peizazhin për ndërmarrjet e vogla dhe të mesme në vitin 2024. Ne shohim një trend ku shërbimi i personalizuar kombinohet me dërgimin e shpejtë dixhital.\n\nKompanitë që investojnë në zgjidhjet cloud sot do të jenë fituesit e së nesërmes. Bëhet fjalë për uljen e barrierave ndaj inovacionit dhe lejimin e krijimtarisë pa pengesa teknike.",
                date: "2024-02-15",
                author: "NetvisionKs Team",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
                readTime: "5 min"
            },
            {
                id: 2,
                title: "Zgjidhjet Cloud: Një Udhëzues",
                content: "Kalimi në cloud është një hap i madh, por absolutisht i nevojshëm për shkallëzueshmërinë. Shumë kompani shqetësohen për sigurinë dhe kostot, por realiteti është se platformat moderne cloud si AWS dhe Azure ofrojnë siguri më të lartë se sa shumica e serverëve lokalë mund të arrijnë ndonjëherë.\n\nNë këtë udhëzues, ne shkojmë hap pas hapi se si të përgatisni organizatën tuaj për një migrim të qetë. Ne shikojmë strategjitë për ruajtjen e të dhënave, modernizimin e aplikacioneve dhe si të optimizoni kostot tuaja në cloud.",
                date: "2024-02-10",
                author: "NetvisionKs Team",
                image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200",
                readTime: "7 min"
            }
        ]
    };

    const post = (postsData[language] || postsData.sv).find((p: any) => p.id.toString() === id);

    if (!post) {
        return (
            <div className="pt-60 pb-20 text-center">
                <h2 className="text-3xl font-serif mb-4">{t('blog.not_found')}</h2>
                <Link to="/news/blog" className="text-primary font-bold hover:underline tracking-widest uppercase">{t('blog.back')}</Link>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-20 min-h-screen">
            <SEO
                title={`${post.title} | NetvisionKs`}
                description={post.content.substring(0, 150)}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="container mx-auto px-4 lg:px-12 max-w-4xl"
            >
                {/* Back Link */}
                <Link to="/news/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold tracking-widest uppercase text-xs">{t('blog.back')}</span>
                </Link>

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-12 aspect-video bg-gray-100">
                    <img src={post.image} alt={post.title} width="1200" height="675" className="w-full h-full object-cover" />
                </div>

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-500 border-y border-gray-100 py-6">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-primary" />
                            <span className="text-sm">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-primary" />
                            <span className="text-sm">{post.readTime} {t('blog.reading')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={18} className="text-primary" />
                            <span className="text-sm">{post.author}</span>
                        </div>
                        <button className="ml-auto text-gray-400 hover:text-primary transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <article className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </article>

                {/* Footer / CTA */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <h3 className="text-2xl font-serif font-bold text-dark-900 mb-4">{t('blog.like_article')}</h3>
                    <p className="text-gray-600 mb-6">{t('blog.cta_text')}</p>
                    <Link to="/contact" className="btn-primary-glass inline-block px-8 py-4 rounded-lg font-bold tracking-widest uppercase">
                        {t('blog.cta_btn')}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogDetailPage;
