import React, { useState } from 'react';

const ItemCard = ({ image, title, price, createdAt, email, onView, onDelete }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation();
        if (email) {
            navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col h-full">

            {/* --- Product Image Section --- */}
            <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="absolute top-2 z-10 bg-red-600/90 hover:bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 opacity-0 group-hover:opacity-100"
                        title="Delete Listing"
                        style={{display:'flex',position:'relative', left:'25%',}}
                    >
                        ✕
                    </button>
                )}
                <img
                    src={image || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* --- Product Details Section --- */}
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-white font-medium text-base truncate mb-1">
                    {title}
                </h3>
                {createdAt && (
                    <p className="text-slate-500 text-[10px] mb-2">
                        Posted on {new Date(createdAt).toLocaleDateString()}
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-lg font-bold text-white">
                        ${price}
                    </span>

                    <div className="flex items-center gap-2 relative">
                        {email && (
                            <button
                                onClick={handleCopy}
                                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-blue-400 transition-all border border-slate-700 active:scale-90"
                                title="Copy seller email"
                            >
                                {copied && (
                                    <span className="absolute -top-8 right-0 bg-blue-600 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                                        Copied!
                                    </span>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onView(); // Triggers the modal in App.jsx
                            }}
                            className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded transition-colors border border-slate-600 active:scale-95"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;