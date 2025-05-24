'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/contexts/UserContext';
import { useBasket } from '@/contexts/BasketContext';

interface AddToCartButtonProps {
  packageId: number;
  packageName: string;
  quantity?: number;
  onLoginRequired?: () => void;
  className?: string;
}

export default function AddToCartButton({ 
  packageId, 
  packageName, 
  quantity = 1, 
  onLoginRequired,
  className = ""
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useUser();
  const { basket, addToBasket } = useBasket();

  const handleAddToCart = async (event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!user || !basket?.data?.ident) {
      onLoginRequired?.();
      return;
    }

    setLoading(true);
    
    try {
      await addToBasket(basket.data.ident, packageId, quantity);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      // Could add toast notification here
      alert(error.message || 'Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${className || 'px-6 py-3 text-base'} 
        w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 disabled:cursor-not-allowed
        text-white font-semibold rounded-lg transition-all duration-200 
        flex items-center justify-center gap-2
        ${loading ? 'opacity-50' : ''}
        ${success ? 'bg-green-600 hover:bg-green-600' : ''}
      `}
    >
      <ShoppingCartIcon className="w-5 h-5" />
      {loading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Adding...
        </span>
      ) : success ? (
        'Added to Cart!'
      ) : (
        'Add to Cart'
      )}
    </motion.button>
  );
} 