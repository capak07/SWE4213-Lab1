import React, { useState } from 'react';

const ContactModal = ({ isOpen, onClose, email, title }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        if (email) {
            navigator.clipboard.writeText(email);
            setCopied(true);
            window.alert('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    ✕
                </button>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Interested in {title}?</h2>
                    <p className="text-slate-400 mb-6">
                        Send the seller an email to arrange a pickup or for additional information!
                    </p>

                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-2 relative group">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Seller Email:</p>
                        {email ? (
                            <div className="flex items-center justify-center gap-3">
                                <p className="text-lg text-blue-400 font-mono select-all">{email}</p>
                                <button
                                    onClick={handleCopy}
                                    className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-blue-400 transition-all border border-slate-700 active:scale-90"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <p className="text-lg text-slate-500">Email not available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;