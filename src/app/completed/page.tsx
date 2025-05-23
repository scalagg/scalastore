'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useBasket } from '@/contexts/BasketContext';
import { useUser } from '@/contexts/UserContext';
import { settings } from '@/config/settings';

export default function CompletedPage() {
  const { basket, updateBasket } = useBasket();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createNewBasket = async () => {
      if (user?.name) {
        try {
          // Create a new basket for future purchases
          const basketResponse = await fetch(`https://headless.tebex.io/api/accounts/${process.env.NEXT_PUBLIC_TEBEX_TOKEN}/baskets`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: user.name,
              cancel_url: window.location.origin,
              complete_url: `${window.location.origin}/completed`,
            })
          });

          if (basketResponse.ok) {
            const basketData = await basketResponse.json();
            updateBasket(basketData);
          }
        } catch (error) {
          console.error('Failed to create new basket:', error);
        }
      }
      setLoading(false);
    };

    createNewBasket();
  }, [user, updateBasket]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181B29] to-[#10121A] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-4"
        >
          Purchase Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-300 mb-2"
        >
          Thank you for supporting {settings.server_name}!
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-sm mb-8"
        >
          Your purchase has been processed successfully. Items should be available in-game within a few minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="space-y-4"
        >
          <div className="bg-[#181B29] border border-[#23263a] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">What's Next?</h3>
            <ul className="text-sm text-gray-300 space-y-1 text-left">
              <li>• Join our server to enjoy your new items</li>
              <li>• If you're online, please relog to receive items</li>
              <li>• Need help? Contact support on Discord</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/store"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href={settings.discord_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Join Discord
            </Link>
          </div>

          <Link
            href="/"
            className="block text-gray-400 hover:text-white transition-colors text-sm"
          >
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 