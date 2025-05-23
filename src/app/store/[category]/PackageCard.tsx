'use client';

import { useState } from 'react';
import { settings } from '@/config/settings';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCartButton from '@/components/AddToCartButton';
import LoginForm from '@/components/LoginForm';
import { useUser } from '@/contexts/UserContext';

interface PackageCardProps {
    rank: {
        id: number;
        name: string;
        image: string;
        discount: number;
        total_price: number;
        description: string;
    };
}

export default function PackageCard({ rank }: PackageCardProps) {
    const [open, setOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { user } = useUser();

    const handleLoginRequired = () => {
        setShowLoginModal(true);
    };

    return (
        <>
            <div
                className="bg-[#181B29] rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl border border-[#23263a] cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <div className="relative w-full aspect-[4/3] bg-[#23263a] flex items-center justify-center">
                    <img
                        src={rank.image}
                        alt={rank.name}
                        className="object-contain max-h-40 w-auto h-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    {rank.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                            {rank.discount}% OFF
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                        <h3 className="text-lg font-bold mb-1 text-white truncate">{rank.name}</h3>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            {rank.discount > 0 ? (
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-400 line-through">
                                        {settings.currency_symbol}{rank.total_price + rank.discount}
                                    </span>
                                    <span className="text-xl font-bold text-green-400">
                                        {settings.currency_symbol}{rank.total_price}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-xl font-bold text-white">
                                    {settings.currency_symbol}{rank.total_price}
                                </span>
                            )}
                        </div>
                        <div onClick={e => e.stopPropagation()}>
                            <AddToCartButton
                                packageId={rank.id}
                                packageName={rank.name}
                                onLoginRequired={handleLoginRequired}
                                className="px-5 py-2 text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#181B29] max-w-lg w-full rounded-2xl shadow-2xl p-8 relative text-white border border-[#23263a] max-h-[80vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                                onClick={() => setOpen(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <div className="flex flex-col items-center mb-6">
                                <img src={rank.image} alt={rank.name} className="h-24 w-24 object-contain mb-2" />
                                <h2 className="text-2xl font-bold mb-1">{rank.name}</h2>
                                <div className="flex items-center gap-2 mb-2">
                                    {rank.discount > 0 && (
                                        <span className="text-gray-400 line-through text-lg">
                                            {settings.currency_symbol}{rank.total_price + rank.discount}
                                        </span>
                                    )}
                                    <span className="text-green-400 text-xl font-bold">
                                        {settings.currency_symbol}{rank.total_price}
                                    </span>
                                </div>
                            </div>
                            <div className="prose prose-invert max-w-none mb-6" dangerouslySetInnerHTML={{ __html: rank.description }} />
                            <AddToCartButton
                                packageId={rank.id}
                                packageName={rank.name}
                                onLoginRequired={handleLoginRequired}
                                className="text-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setShowLoginModal(false)}
                            style={{ pointerEvents: 'auto' }}
                        />
                        <LoginForm
                            onLogin={() => setShowLoginModal(false)}
                            onClose={() => setShowLoginModal(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 