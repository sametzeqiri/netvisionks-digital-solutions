import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Calendar, Clock, X, HeartHandshake } from 'lucide-react';

const MeetingBooking: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Call to Action Button/Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="card-liquid-glass p-10 md:p-14 text-center relative overflow-hidden group"
            >
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-8 text-orange-600 transform group-hover:rotate-6 transition-transform duration-500 shadow-inner border border-orange-200">
                        <HeartHandshake size={40} />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif text-dark-900 mb-6 tracking-widest uppercase font-normal">
                        FÖREDRAR DU ETT <span className="text-orange-600 font-bold">VIDEOMÖTE?</span>
                    </h2>

                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 font-sans font-medium text-lg leading-relaxed">
                        Skippa formuläret och boka ett direktmöte med oss via Google Meet. Välj en tid som passar dig bäst i vår kalender.
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="btn-primary-glass px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] shadow-2xl shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all text-sm"
                    >
                        BOKA ETT MÖTE NU
                    </button>

                    <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-60">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark-900">
                            <Video size={16} className="text-orange-600" /> Google Meet
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark-900">
                            <Clock size={16} className="text-orange-600" /> 30 Minuter
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark-900">
                            <Calendar size={16} className="text-orange-600" /> Direktbekräftelse
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-orange-600/10 transition-colors" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            </motion.div>

            {/* Booking Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-dark-900/80 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-600 text-white p-3 rounded-xl shadow-lg shadow-orange-600/20">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-dark-900 uppercase tracking-widest">Boka ditt möte</h3>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Säker bokning via Google Calendar</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 hover:bg-gray-200 rounded-full transition-all text-gray-400 hover:text-dark-900 hover:rotate-90"
                                >
                                    <X size={28} />
                                </button>
                            </div>

                            {/* Iframe Container */}
                            <div className="flex-grow overflow-y-auto bg-white p-1 md:p-4">
                                <div className="w-full h-full min-h-[600px] rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50/30">
                                    <iframe
                                        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3C7y_z0yX_yN5G5D5D5D5D5D5D5D5D5D5D5D5D?gv=true"
                                        style={{ border: 0 }}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        title="Google Calendar Appointment Schedule"
                                        className="w-full min-h-[700px]"
                                    ></iframe>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 text-center border-t border-gray-50 bg-gray-50/30">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                                    NetvisionKs använder Google Workspace för säkra möten
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MeetingBooking;
