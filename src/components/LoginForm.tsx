'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { useBasket } from '@/contexts/BasketContext';

interface LoginFormProps {
  onLogin?: (userData: any) => void;
  onClose?: () => void;
}

export default function LoginForm({ onLogin, onClose }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();
  const { updateBasket } = useBasket();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch user data from Mojang
      const userResponse = await fetch(`/api/fetchUser?username=${username}`);
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.error || 'User not found');
      }
      const userData = await userResponse.json();

      // Create Tebex basket
      const basketResponse = await fetch(`https://headless.tebex.io/api/accounts/${process.env.NEXT_PUBLIC_TEBEX_TOKEN}/baskets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          cancel_url: window.location.origin,
          complete_url: `${window.location.origin}/completed`,
        })
      });

      if (!basketResponse.ok) {
        throw new Error('Failed to create basket');
      }

      const basketData = await basketResponse.json();

      // Update contexts
      login(userData.userData);
      updateBasket(basketData);

      // Close modal and call callback
      onClose?.();
      onLogin?.(userData.userData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-60 bg-[#181B29] border border-[#23263a] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Login to Start Shopping</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold leading-none"
            type="button"
          >
            ×
          </button>
        )}
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Minecraft Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Enter your username"
            required
            autoComplete="off"
            style={{ pointerEvents: 'auto' }}
          />
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          style={{ pointerEvents: 'auto' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          We'll verify your Minecraft account and create a shopping basket for you.
        </p>
      </div>
    </motion.div>
  );
} 