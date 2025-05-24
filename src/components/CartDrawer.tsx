'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useBasket } from '@/contexts/BasketContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { basket, removeFromBasket, updateQuantity } = useBasket();
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());

  const basketItems = basket?.data?.packages || [];
  const subtotal = basketItems.reduce((acc, item) => acc + (item.in_basket.price * item.in_basket.quantity), 0);

  const handleUpdateQuantity = async (packageId: number, newQuantity: number) => {
    if (!basket?.data?.ident) return;
    
    setLoadingItems(prev => new Set(prev).add(packageId));
    
    try {
      if (newQuantity <= 0) {
        await removeFromBasket(basket.data.ident, packageId);
      } else {
        await updateQuantity(basket.data.ident, packageId, newQuantity);
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(packageId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (packageId: number) => {
    if (!basket?.data?.ident) return;
    
    setLoadingItems(prev => new Set(prev).add(packageId));
    
    try {
      await removeFromBasket(basket.data.ident, packageId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(packageId);
        return newSet;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[90]"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#181B29] border-l border-[#23263a] z-[95] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#23263a]">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCartIcon className="w-6 h-6" />
                Shopping Cart ({basketItems.length})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {basketItems.length === 0 ? (
                <div className="p-6 text-center">
                  <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mt-2">Add some items to get started!</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {basketItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="bg-[#23263a] rounded-xl p-4 border border-[#3a3f5c]"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image || '/placeholder-item.png'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                          <p className="text-yellow-400 font-bold">${item.in_basket.price.toFixed(2)}</p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.in_basket.quantity - 1)}
                                disabled={loadingItems.has(item.id)}
                                className="w-8 h-8 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span className="text-white font-semibold px-3 py-1 bg-[#181B29] rounded-lg min-w-[3rem] text-center">
                                {item.in_basket.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.in_basket.quantity + 1)}
                                disabled={loadingItems.has(item.id)}
                                className="w-8 h-8 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center transition-colors"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={loadingItems.has(item.id)}
                              className="text-red-400 hover:text-red-300 disabled:text-red-600 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {basketItems.length > 0 && (
              <div className="p-6 border-t border-[#23263a] bg-[#0f1017]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-2xl font-bold text-yellow-400">${subtotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => {
                    if (basket?.data?.links?.checkout) {
                      window.location.href = basket.data.links.checkout;
                    }
                  }}
                  disabled={!basket?.data?.links?.checkout}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <p className="text-xs text-gray-400 text-center mt-2">
                  You'll be redirected to secure Tebex checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 