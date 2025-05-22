'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { settings } from '@/config/settings';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#181B29] to-[#10121A] text-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden mb-[-60px] -mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_image.webp"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#181B29]/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <img src="/logo.png" alt={settings.server_name} className="mx-auto h-20 w-20 rounded-lg mb-4 bg-white/10 p-2 shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow">Welcome to {settings.server_name} Store</h1>
          <p className="text-lg text-gray-200 mb-6">Enhance your experience on {settings.server_name}! Browse ranks, keys, tags, and more. All purchases support the server and unlock awesome perks.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/store" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">Visit Store</Link>
            <Link href={settings.discord_url} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg font-semibold transition-colors">Join Discord</Link>
          </div>
        </motion.div>
      </section>

      {/* Category Grid */}
      <section className="max-w-5xl mx-auto py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Browse Categories</h2>
          <p className="text-gray-400">Choose a category to get started</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {settings.home_category_widgets.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <Link href={category.url} className="block bg-[#181B29] rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all p-6 text-center group border border-[#23263a]">
                <img src={category.image} alt={category.name} className="mx-auto h-16 w-16 object-contain mb-3 group-hover:scale-105 transition-transform" />
                <div className="text-lg font-bold text-white mb-1">{category.name}</div>
                <div className="text-xs text-gray-400">{category.description}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">About {settings.server_name}</h3>
          <p className="text-gray-300">{settings.server_name} is a Minecraft server dedicated to providing a fun and unique experience for all players. Our store helps keep the server running and allows us to add new features and content for the community. Thank you for your support!</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-1">Need Help?</h4>
          <p className="text-gray-400 mb-2">If you have any questions or issues related to payments, join our Discord or contact our support team. We're here to help!</p>
          <p className="text-gray-400 mb-2">Email: <a href="mailto:support@scala.gg" className="text-[#5865F2] hover:text-[#4752C4]">support@scala.gg</a></p>
          <Link href={settings.discord_url} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg font-semibold transition-colors">Contact Support</Link>
        </div>
      </section>
    </main>
  );
}
