'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { settings } from '@/config/settings';
import { SparklesIcon, RocketLaunchIcon, StarIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

// Floating icons animation
const floatingIcons = [
  { icon: SparklesIcon, delay: 0 },
  { icon: RocketLaunchIcon, delay: 0.5 },
  { icon: StarIcon, delay: 1 },
];

export default function Home() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    x: number[];
    duration: number;
    delay: number;
  }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate particles only on client side
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
      x: [0, Math.random() * 20 - 10, 0],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      {/* Hero Section with Enhanced Effects */}
      <section className="relative h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden mb-[-60px] -mt-20">
        {/* Animated background layers */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_image.webp"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-60"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-yellow-900/70 via-amber-900/50 to-orange-900/70"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(180, 83, 9, 0.7), rgba(146, 64, 14, 0.5), rgba(154, 52, 18, 0.7))',
                'linear-gradient(45deg, rgba(146, 64, 14, 0.7), rgba(154, 52, 18, 0.5), rgba(180, 83, 9, 0.7))',
                'linear-gradient(45deg, rgba(154, 52, 18, 0.7), rgba(180, 83, 9, 0.5), rgba(146, 64, 14, 0.7))',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#1A1810]/90" />
        </div>

        {/* Floating particles around logo */}
        {isMounted && particles.length > 0 && (
          <div className="absolute inset-0 z-5">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: particle.x,
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block mb-6"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur-xl opacity-50"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <img 
              src="/logo.png" 
              alt={settings.server_name} 
              className="relative h-24 w-24 rounded-2xl shadow-2xl border-2 border-white/20" 
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Welcome to {settings.server_name} Store
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Enhance your experience on {settings.server_name}! Browse ranks, keys, tags, and more. 
            All purchases support the server and unlock awesome perks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/store" 
                className="group px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 relative overflow-hidden"
              >
                <span className="relative z-10">Visit Store</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href={settings.discord_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group px-8 py-4 bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c46a8] rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 relative overflow-hidden"
              >
                <span className="relative z-10">Join Discord</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating action icons */}
        <div className="absolute inset-0 z-5">
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${15 + index * 30}%`,
                top: `${25 + index * 15}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <item.icon className="w-8 h-8 text-yellow-400 opacity-40" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Category Grid */}
      <section className="max-w-5xl mx-auto py-20 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Browse Categories
          </motion.h2>
          <p className="text-gray-400 text-lg">Choose a category to get started</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {settings.home_category_widgets.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={category.url} className="block group">
                <motion.div 
                  className="relative bg-gradient-to-br from-[#181B29] to-[#0F1119] rounded-2xl shadow-2xl overflow-hidden border border-[#23263a] hover:border-yellow-500/50 transition-all duration-300"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 blur-xl"
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative p-8 text-center">
                    <motion.div
                      className="mx-auto mb-4 relative"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full blur-lg opacity-0 group-hover:opacity-30"
                        transition={{ duration: 0.3 }}
                      />
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="relative h-16 w-16 object-contain mx-auto filter drop-shadow-lg" 
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="text-lg font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors"
                      initial={false}
                    >
                      {category.name}
                    </motion.div>
                    
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {category.description}
                    </div>
                  </div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{
                      x: '200%',
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Server Mission Section */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative bg-gradient-to-br from-[#181B29]/80 to-[#0F1119]/80 backdrop-blur-sm rounded-3xl p-8 border border-[#23263a] shadow-2xl">
            <motion.h3 
              className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Supporting {settings.server_name}
            </motion.h3>
            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Here at {settings.server_name}, we aim to provide the best Minecraft experience for our players. 
              Purchases help us improve in many ways such as development, builds, graphics, and paying for hosting. 
              All purchases go towards improving and helping fund {settings.server_name} - we don't use any of it for personal use.
            </motion.p>
            <motion.p 
              className="text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your support allows us to continuously add new features, maintain high-quality server performance, 
              and create amazing content for our community. Thank you for helping us grow!
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Important Information Section */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm border border-yellow-600/30 rounded-3xl p-8 shadow-2xl">
            <motion.h3 
              className="text-3xl font-bold mb-6 text-yellow-400"
              whileHover={{ scale: 1.05 }}
            >
              Important Information
            </motion.h3>
            <div className="space-y-4 text-gray-300">
              {[
                'Account Ownership: Make sure that you own the account you are donating for! We do not offer rank transfers.',
                'VPN/Proxy Warning: Do not attempt to check out while using a VPN or Proxy. You will be flagged by the fraud protection system.',
                'In-Game Purchases: If you are in-game while purchasing your rank, please remember to relog after your purchase.',
                'Delivery Time: Most purchases are delivered instantly. If you experience delays, please contact support.'
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-yellow-400 mr-2">•</span>
                  <strong className="text-white mr-2">{text.split(':')[0]}:</strong>
                  {text.split(':')[1]}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Payment & Terms Section */}
      <section className="max-w-4xl mx-auto py-8 px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5 rounded-3xl blur-xl"
            animate={{ rotate: [0, 1, -1, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative bg-gradient-to-br from-[#181B29]/90 to-[#0F1119]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#23263a] shadow-2xl">
            <motion.h3 
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Payment Methods & Terms
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xl font-semibold mb-4 text-yellow-400">Accepted Payment Methods</h4>
                <div className="space-y-3 text-gray-300">
                  {['PayPal', 'Credit/Debit Cards', 'Apple Pay & Google Pay', 'Cryptocurrency (via Tebex)'].map((method, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <span className="text-green-400 mr-2">•</span>
                      {method}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-xl font-semibold mb-4 text-red-400">Terms & Conditions</h4>
                <div className="space-y-3 text-gray-300">
                  {[
                    'All purchases are non-refundable',
                    'Purchases are non-transferable',
                    'You must own the Minecraft account',
                    'Subject to server terms of service'
                  ].map((term, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <span className="text-red-400 mr-2">•</span>
                      {term}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="mt-8 pt-6 border-t border-[#23263a]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-400 text-center">
                By making a purchase, you agree to our terms of service and acknowledge that all sales are final.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-xl"
            animate={{
              background: [
                'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative bg-gradient-to-br from-[#181B29]/90 to-[#0F1119]/90 backdrop-blur-sm rounded-3xl p-8 border border-[#23263a] shadow-2xl">
            <motion.h3 
              className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Contact & Support
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xl font-semibold mb-4 text-yellow-400">Get Help</h4>
                <div className="space-y-4 text-gray-300">
                  <p>Need assistance with your purchase or have questions about our server? We're here to help!</p>
                  <div className="space-y-3">
                    <motion.p whileHover={{ x: 5 }} className="transition-transform">
                      <strong>Email:</strong> <a href="mailto:support@scala.gg" className="text-[#5865F2] hover:text-[#4752C4] transition-colors">support@scala.gg</a>
                    </motion.p>
                    <motion.p whileHover={{ x: 5 }} className="transition-transform">
                      <strong>Discord:</strong> Join our community server for instant support
                    </motion.p>
                    <motion.p whileHover={{ x: 5 }} className="transition-transform">
                      <strong>Response Time:</strong> Usually within 24 hours
                    </motion.p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-xl font-semibold mb-4 text-green-400">What We Can Help With</h4>
                <div className="space-y-2 text-gray-300">
                  {[
                    'Purchase issues and delivery problems',
                    'Account-related questions',
                    'Technical support for server issues',
                    'Billing inquiries',
                    'Terms of service questions',
                    'EULA compliance matters'
                  ].map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <span className="text-green-400 mr-2">•</span>
                      {item}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="mt-8 pt-6 border-t border-[#23263a] text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href={settings.discord_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block px-8 py-3 bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c46a8] rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    Join Discord Support
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href="mailto:support@scala.gg" 
                    className="inline-block px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
                  >
                    Send Email
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
