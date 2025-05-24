'use client';

import { useState, useEffect } from 'react';
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
    const [isHovered, setIsHovered] = useState(false);
    const [floatingParticles, setFloatingParticles] = useState<Array<{
        id: number;
        x: string;
        y: string;
    }>>([]);
    const [sparkles, setSparkles] = useState<Array<{
        id: number;
        left: string;
        top: string;
    }>>([]);
    const [isMounted, setIsMounted] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        setIsMounted(true);
        // Generate particles and sparkles on client side
        const particles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: `${50 + (Math.random() - 0.5) * 200}%`,
            y: `${50 + (Math.random() - 0.5) * 200}%`,
        }));
        setFloatingParticles(particles);

        const sparkleArray = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
        }));
        setSparkles(sparkleArray);
    }, []);

    const handleLoginRequired = () => {
        setShowLoginModal(true);
    };

    return (
        <>
            <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Animated glow effect */}
                <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-3xl blur opacity-0 group-hover:opacity-30"
                    animate={{
                        rotate: isHovered ? 360 : 0,
                    }}
                    transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
                />

                {/* Floating particles */}
                {isHovered && isMounted && floatingParticles.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                        {floatingParticles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                initial={{
                                    x: '50%',
                                    y: '50%',
                                    opacity: 0,
                                }}
                                animate={{
                                    x: particle.x,
                                    y: particle.y,
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: particle.id * 0.1,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>
                )}

                <motion.div
                    className="relative bg-gradient-to-br from-[#181B29] via-[#1E2139] to-[#0F1119] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#23263a] group-hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setOpen(true)}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Animated background gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.5 }}
                    />

                    {/* Shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                        initial={{ x: '-100%' }}
                        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />

                    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#23263a] to-[#1a1e2e] flex items-center justify-center overflow-hidden">
                        <motion.img
                            src={rank.image}
                            alt={rank.name}
                            className="object-contain max-h-40 w-auto h-auto filter drop-shadow-lg"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.3 }
                            }}
                        />
                        
                        {rank.discount > 0 && (
                            <motion.div 
                                className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, -2, 2, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {rank.discount}% OFF
                            </motion.div>
                        )}

                        {/* Floating sparkles */}
                        {isMounted && sparkles.length > 0 && (
                            <div className="absolute inset-0">
                                {sparkles.map((sparkle) => (
                                    <motion.div
                                        key={sparkle.id}
                                        className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30"
                                        style={{
                                            left: sparkle.left,
                                            top: sparkle.top,
                                        }}
                                        animate={{
                                            y: [0, -10, 0],
                                            opacity: [0.3, 0.8, 0.3],
                                            scale: [1, 1.5, 1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            delay: sparkle.id * 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative flex-1 flex flex-col justify-between p-6">
                        <div>
                            <motion.h3 
                                className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors"
                                whileHover={{ scale: 1.02 }}
                            >
                                {rank.name}
                            </motion.h3>
                        </div>
                        
                        <div className="flex items-end justify-between mt-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col"
                            >
                                {rank.discount > 0 ? (
                                    <>
                                        <span className="text-sm text-gray-400 line-through">
                                            {settings.currency_symbol}{rank.total_price + rank.discount}
                                        </span>
                                        <motion.span 
                                            className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                                            animate={{
                                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            {settings.currency_symbol}{rank.total_price}
                                        </motion.span>
                                    </>
                                ) : (
                                    <motion.span 
                                        className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        {settings.currency_symbol}{rank.total_price}
                                    </motion.span>
                                )}
                            </motion.div>
                            
                            <div onClick={e => e.stopPropagation()}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <AddToCartButton
                                        packageId={rank.id}
                                        packageName={rank.name}
                                        onLoginRequired={handleLoginRequired}
                                        className="px-5 py-2 text-sm bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 shadow-lg hover:shadow-yellow-500/25"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Enhanced Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotateX: -30 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateX: 30 }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                            className="relative max-w-lg w-full mx-4"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal glow effect */}
                            <motion.div
                                className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            <div className="relative bg-gradient-to-br from-[#181B29]/95 via-[#1E2139]/95 to-[#0F1119]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-white border border-[#23263a]/50 max-h-[80vh] overflow-y-auto">
                                <motion.button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-all"
                                    onClick={() => setOpen(false)}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Close"
                                >
                                    ×
                                </motion.button>

                                <motion.div 
                                    className="flex flex-col items-center mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <motion.div
                                        className="relative mb-4"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur-lg opacity-50"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.3, 0.6, 0.3]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <img 
                                            src={rank.image} 
                                            alt={rank.name} 
                                            className="relative h-28 w-28 object-contain rounded-2xl shadow-2xl" 
                                        />
                                    </motion.div>
                                    
                                    <motion.h2 
                                        className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {rank.name}
                                    </motion.h2>
                                    
                                    <motion.div 
                                        className="flex items-center gap-3 mb-4"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {rank.discount > 0 && (
                                            <motion.span 
                                                className="text-gray-400 line-through text-lg"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                {settings.currency_symbol}{rank.total_price + rank.discount}
                                            </motion.span>
                                        )}
                                        <motion.span 
                                            className="text-green-400 text-2xl font-bold drop-shadow-lg"
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                textShadow: [
                                                    '0 0 10px rgba(74, 222, 128, 0.5)',
                                                    '0 0 20px rgba(74, 222, 128, 0.8)',
                                                    '0 0 10px rgba(74, 222, 128, 0.5)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {settings.currency_symbol}{rank.total_price}
                                        </motion.span>
                                    </motion.div>
                                </motion.div>

                                <motion.div 
                                    className="prose prose-invert max-w-none mb-8 text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: rank.description }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <AddToCartButton
                                        packageId={rank.id}
                                        packageName={rank.name}
                                        onLoginRequired={handleLoginRequired}
                                        className="text-lg bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 hover:from-yellow-700 hover:via-amber-700 hover:to-orange-700 shadow-2xl hover:shadow-yellow-500/25"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enhanced Login Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                        style={{ pointerEvents: 'auto' }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setShowLoginModal(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ pointerEvents: 'auto' }}
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
                            transition={{ duration: 0.4, type: "spring" }}
                        >
                            <LoginForm
                                onLogin={() => setShowLoginModal(false)}
                                onClose={() => setShowLoginModal(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 