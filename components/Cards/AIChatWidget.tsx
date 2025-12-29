import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Minimize2, Mic, Volume2, VolumeX, MicOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: Date;
}

const AIChatWidget: React.FC = () => {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: 'Hej! 👋 Jag heter Sofia och är NetvisionKs AI-agent. Hur kan jag hjälpa dig med våra digitala lösningar idag?',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
    const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef('');
    const shouldBeListeningRef = useRef(true);
    const isOpenRef = useRef(false);
    const isSpeakingRef = useRef(false);

    // Sync refs with state for use in event listeners
    useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);
    useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
    useEffect(() => { inputRef.current = inputValue; }, [inputValue]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsSpeaking(false);
        setActiveSpeakingId(null);
    }, []);

    const startRecognition = useCallback(() => {
        if (!shouldBeListeningRef.current || isSpeakingRef.current) return;

        try {
            if (recognitionRef.current) {
                recognitionRef.current.start();
                setIsListening(true);
            }
        } catch (e) {
            // Already active or error, ignore
        }
    }, []);

    // satisfy browser user-gesture requirement
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!isListening && shouldBeListeningRef.current) {
                startRecognition();
            }
        };
        window.addEventListener('click', handleFirstInteraction, { once: true });
        return () => window.removeEventListener('click', handleFirstInteraction);
    }, [isListening, startRecognition]);

    const toggleListening = () => {
        if (isListening) {
            shouldBeListeningRef.current = false;
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            shouldBeListeningRef.current = true;
            startRecognition();
        }
    };

    // Voice selection for browser TTS
    const updateVoice = useCallback(() => {
        const voices = window.speechSynthesis.getVoices();
        const langCode = language === 'sv' ? 'sv' : language === 'sq' ? 'sq' : 'en';
        const filteredVoices = voices.filter(v => v.lang.startsWith(langCode));
        const bestVoice = filteredVoices.find(v => v.name.includes('Natural') || v.name.includes('Neural')) ||
            filteredVoices.find(v => v.name.includes('Google')) ||
            filteredVoices[0];
        if (bestVoice) setPreferredVoice(bestVoice);
    }, [language]);

    useEffect(() => {
        updateVoice();
        window.speechSynthesis.onvoiceschanged = updateVoice;
        return () => { window.speechSynthesis.onvoiceschanged = null; };
    }, [updateVoice]);

    const speak = useCallback(async (text: string, id: string) => {
        if (isMuted) return;

        recognitionRef.current?.stop(); // Turn off mic
        stopSpeaking();

        const env = (import.meta as any).env;
        const key = env?.VITE_ELEVENLABS_API_KEY || (window as any).process?.env?.REACT_APP_ELEVENLABS_API_KEY || '';
        const voiceId = language === 'sv' ? '9BWtsm6S4pxI5S8p84qf' : '21m00Tcm4TbcDqHe8dBC';

        const onDone = () => {
            setIsSpeaking(false);
            setActiveSpeakingId(null);
            if (shouldBeListeningRef.current) setTimeout(startRecognition, 200);
        };

        if (key) {
            try {
                setIsSpeaking(true);
                setActiveSpeakingId(id);
                const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'xi-api-key': key },
                    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
                });
                if (!res.ok) throw new Error();
                const blob = await res.blob();
                if (!audioRef.current) audioRef.current = new Audio();
                audioRef.current.src = URL.createObjectURL(blob);
                audioRef.current.onended = onDone;
                audioRef.current.play();
                return;
            } catch (e) {
                console.error('ElevenLabs failed');
            }
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = preferredVoice || null;
        if (!preferredVoice) utterance.lang = language === 'sv' ? 'sv-SE' : language === 'sq' ? 'sq-AL' : 'en-US';
        utterance.onstart = () => { setIsSpeaking(true); setActiveSpeakingId(id); };
        utterance.onend = onDone;
        window.speechSynthesis.speak(utterance);
    }, [isMuted, stopSpeaking, language, preferredVoice, startRecognition]);

    const generateResponse = (input: string) => {
        const low = input.toLowerCase();
        if (low.includes('pris') || low.includes('kostnad') || low.includes('offert')) return "Våra priser är skräddarsydda efter varje projekts behov. För outsourcing erbjuder vi ofta lösningar som är 30-50% mer kostnadseffektiva än lokala alternativ. Vill du ha en offert? [Kontakta oss via formuläret](/contact)!";
        if (low.includes('kontakt') || low.includes('mail') || low.includes('telefon')) return "Du kan nå oss via:\n📧 info@netvisionks.com\n📞 +47 477 38 137 eller +383 49 808 113\n📍 [Hitta oss på Sveavägen 1, Stockholm](/contact)";
        if (low.includes('jobb') || low.includes('karriär') || low.includes('rekrytering')) return "Vi söker alltid efter nya talanger! Just nu letar vi efter Senior React Developers och .NET experter. Kolla in vår [Karriär-sida](/contact) för mer info.";
        if (low.includes('tjänster') || low.includes('erbjuder')) return "Vi specialiserar oss på:\n✅ Staff Augmentation\n✅ Skräddarsydd Utveckling\n✅ Molnlösningar\n✅ Apputveckling";
        if (low.includes('hej') || low.includes('tja')) return "Hej där! Kul att du tittar förbi. Vad kan jag hjälpa till med?";
        return "Jag är fortfarande under upplärning! 😊 Jag kan svara på frågor om våra tjänster, priser, karriär eller kontaktuppgifter.";
    };

    const submitMessage = useCallback((text: string) => {
        const clean = text.trim();
        if (clean.length < 2) return;
        stopSpeaking();
        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: clean, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        inputRef.current = '';
        setIsTyping(true);
        setTimeout(() => {
            const botText = generateResponse(clean);
            const botId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: botId, sender: 'bot', text: botText, timestamp: new Date() }]);
            setIsTyping(false);
            speak(botText, botId);
        }, 1500);
    }, [stopSpeaking, speak]);

    useEffect(() => {
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) return;

        if (!recognitionRef.current) {
            recognitionRef.current = new SR();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
        }

        recognitionRef.current.onresult = (e: any) => {
            if (isSpeakingRef.current) return;
            let final = '', interim = '';
            for (let i = e.resultIndex; i < e.results.length; ++i) {
                if (e.results[i].isFinal) final += e.results[i][0].transcript;
                else interim += e.results[i][0].transcript;
            }
            if (!final && !interim) return;

            const text = (final + interim).toLowerCase();

            // Wake word
            if (text.includes('hej sofia') && !isOpenRef.current) {
                setIsOpen(true);
                // Trigger a small sound or visual if needed
                return;
            }

            if (isOpenRef.current && final) {
                setInputValue(prev => {
                    const next = prev + (prev ? ' ' : '') + final;
                    inputRef.current = next;
                    return next;
                });

                if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
                silenceTimerRef.current = setTimeout(() => {
                    if (inputRef.current.trim().length >= 2 && !isSpeakingRef.current) {
                        submitMessage(inputRef.current);
                    }
                }, 2000);
            }
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
            if (shouldBeListeningRef.current && !isSpeakingRef.current) {
                setTimeout(startRecognition, 100);
            }
        };

        recognitionRef.current.onerror = (e: any) => {
            if (e.error === 'not-allowed') {
                shouldBeListeningRef.current = false;
                setIsListening(false);
            }
            // Error is handled, attempt restart via onend
        };

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onresult = null;
                recognitionRef.current.onend = null;
                recognitionRef.current.onerror = null;
            }
        };
    }, [submitMessage, startRecognition]);

    useEffect(() => {
        if (recognitionRef.current) recognitionRef.current.lang = language === 'sv' ? 'sv-SE' : language === 'sq' ? 'sq-AL' : 'en-US';
    }, [language]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[380px] h-[500px] bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl z-[9999] overflow-hidden flex flex-col font-sans"
                    >
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full"><Bot size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-sm">Sofia — AI Agent</h3>
                                    <span className="text-xs text-white/80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>Online
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { if (isSpeaking) stopSpeaking(); setIsMuted(!isMuted); }}
                                    className="p-1.5 hover:bg-white/10 rounded-lg"
                                    aria-label={isMuted ? "Slå på ljud" : "Stäng av ljud"}
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg"
                                    aria-label="Minimera chatt"
                                >
                                    <Minimize2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-2xl text-sm max-w-[85%] relative ${msg.sender === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white border text-gray-800 rounded-tl-none'}`}>
                                        {msg.sender === 'bot' ? (
                                            <div>
                                                {msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                                                    const m = part.match(/\[(.*?)\]\((.*?)\)/);
                                                    return m ? <a key={i} href={m[2]} className="text-orange-600 font-bold hover:underline">{m[1]}</a> : part;
                                                })}
                                            </div>
                                        ) : msg.text}
                                        {activeSpeakingId === msg.id && (
                                            <span className="absolute -left-6 top-1/2 -translate-y-1/2 flex gap-0.5">
                                                <span className="w-1 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                                                <span className="w-1 h-5 bg-orange-500 rounded-full animate-pulse"></span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <div className="p-3 bg-white border w-max rounded-2xl rounded-tl-none animate-pulse">...</div>}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t">
                            <form onSubmit={(e) => { e.preventDefault(); submitMessage(inputValue); }} className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={isListening ? "Lyssnar..." : "Skriv här..."}
                                        className={`w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-orange-500 ${isListening ? 'ring-2 ring-orange-400' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleListening}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 ${isListening ? 'text-red-500' : 'text-gray-400'}`}
                                        aria-label={isListening ? "Sluta lyssna" : "Starta röstinmatning"}
                                    >
                                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="bg-orange-600 text-white p-3 rounded-xl"
                                    aria-label="Skicka meddelande"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-32 right-6 md:bottom-8 md:right-8 z-[9999] bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-full shadow-lg"
                aria-label={isOpen ? "Stäng AI-chatt" : "Öppna AI-chatt"}
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.button>
        </>
    );
};

export default AIChatWidget;
