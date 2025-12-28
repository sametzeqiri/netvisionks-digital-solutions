import React from 'react';
import { motion } from 'framer-motion';

const VideoBackground = () => {
    // Crucial: Initialize with correct value to prevent any flicker or premature video loading
    const [isMobile, setIsMobile] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768;
        }
        return false;
    });

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden opacity-30" aria-hidden="true">
            {!isMobile ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/original-upload.webp"
                    className="w-full h-full object-cover"
                    title="Atmospheric background video"
                >
                    <source src="/D_Video_UI_Animation_Generated.mp4" type="video/mp4" />
                </video>
            ) : (
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-bg-1-mobile.webp')" }}
                />
            )}
            <div className="absolute inset-0 bg-[#F2F0EF]/80 mix-blend-overlay"></div>
        </div>
    );
};

const DesktopScene = () => (
    <div className="fixed inset-0 z-0 hidden md:block">
        <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
                <path d="M0,0 L1440,0 L1440,800 L0,800 Z" fill="#F2F0EF" />
                <defs>
                    <linearGradient id="swishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F9F8F7" />
                        <stop offset="100%" stopColor="#E6E2DF" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#swishGrad)" />
            </svg>
            <div className="absolute bottom-[-20%] right-[-10%] w-[150%] h-[80%] rounded-[100%] bg-[#E0Dbd7] transform rotate-[-10deg] blur-[80px]" />
        </div>

        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 opacity-60 blur-[40px]"
            style={{
                background: 'radial-gradient(circle, #FFB800 0%, #FF4D00 30%, rgba(255, 77, 0, 0) 70%)',
                boxShadow: '0 0 100px 30px rgba(255, 77, 0, 0.3)'
            }}
        />

        <motion.div
            className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full z-0"
            style={{
                background: 'radial-gradient(circle at 30% 30%, #FFB800 0%, #FF4D00 40%, #8B0000 100%)',
                boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.1), 0 0 80px rgba(255, 77, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.5)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 184, 0, 0.4)'
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
            className="absolute top-[10%] left-[15%] w-[180px] h-[180px] z-0"
            style={{
                border: '25px solid rgba(255, 77, 0, 0.6)',
                borderRadius: '50%',
                boxShadow: 'inset 5px 5px 15px rgba(255,255,255,0.6), 0 0 50px rgba(255, 77, 0, 0.4)',
                backdropFilter: 'blur(5px)',
            }}
            animate={{ y: [0, 30, 0], rotateX: [40, 50, 40], rotateY: [20, 30, 20] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at center, rgba(255, 184, 0, 0.15) 0%, rgba(242, 240, 239, 0) 70%)',
                mixBlendMode: 'multiply'
            }}
        />
    </div>
);

export const PremiumBackground: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
    const [isMobile, setIsMobile] = React.useState(true);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`relative w-full min-h-[100dvh] overflow-x-hidden bg-[#F2F0EF] ${className}`}>
            <VideoBackground />

            {!isMobile && <DesktopScene />}

            {isMobile && (
                <div className="fixed inset-0 z-0 bg-[#F2F0EF]">
                    <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-[#fff5eb] to-transparent opacity-50" />
                </div>
            )}

            <div className="fixed inset-0 z-10 pointer-events-none md:backdrop-blur-[4px]" />

            <div
                className="fixed inset-0 z-20 pointer-events-none opacity-[0.05] mix-blend-multiply"
                style={{
                    backgroundImage: "url('/water-overlay-clean.webp')",
                    backgroundSize: '300px',
                    backgroundRepeat: 'repeat',
                }}
            />

            <div className="relative z-50">
                {children}
            </div>
        </div>
    );
};
