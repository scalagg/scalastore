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

      {/* Server Mission Section */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-[#181B29] rounded-2xl p-8 border border-[#23263a] shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Supporting {settings.server_name}</h3>
          <p className="text-gray-300 mb-4">
            Here at {settings.server_name}, we aim to provide the best Minecraft experience for our players. Donations help us improve in many ways such as development, builds, graphics, and paying for hosting. All donations go towards improving and helping fund {settings.server_name} - we don't use any of it for personal use.
          </p>
          <p className="text-gray-300">
            Your support allows us to continuously add new features, maintain high-quality server performance, and create amazing content for our community. Thank you for helping us grow!
          </p>
        </div>
      </section>

      {/* Important Information Section */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Important Information</h3>
          <div className="space-y-3 text-gray-300">
            <p>• <strong>Account Ownership:</strong> Make sure that you own the account you are donating for! We do not offer rank transfers.</p>
            <p>• <strong>VPN/Proxy Warning:</strong> Do not attempt to check out while using a VPN or Proxy. You will be flagged by the fraud protection system.</p>
            <p>• <strong>In-Game Purchases:</strong> If you are in-game while purchasing your rank, please remember to relog after your purchase.</p>
            <p>• <strong>Delivery Time:</strong> Most purchases are delivered instantly. If you experience delays, please contact support.</p>
          </div>
        </div>
      </section>

      {/* Payment & Terms Section */}
      <section className="max-w-4xl mx-auto py-8 px-4 mb-12">
        <div className="bg-[#181B29] rounded-2xl p-8 border border-[#23263a] shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Payment Methods & Terms</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-400">Accepted Payment Methods</h4>
              <div className="space-y-2 text-gray-300">
                <p>• PayPal</p>
                <p>• Credit/Debit Cards</p>
                <p>• Apple Pay & Google Pay</p>
                <p>• Cryptocurrency (via Tebex)</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-red-400">Terms & Conditions</h4>
              <div className="space-y-2 text-gray-300">
                <p>• All donations are <strong>non-refundable</strong></p>
                <p>• Purchases are <strong>non-transferable</strong></p>
                <p>• You must own the Minecraft account</p>
                <p>• Subject to server terms of service</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#23263a]">
            <p className="text-sm text-gray-400 text-center">
              By making a purchase, you agree to our terms of service and acknowledge that all sales are final.
            </p>
          </div>
        </div>
      </section>

            {/* Contact Section */}
            <section className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-[#181B29] rounded-2xl p-8 border border-[#23263a] shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Contact & Support</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Get Help</h4>
              <div className="space-y-3 text-gray-300">
                <p>Need assistance with your purchase or have questions about our server? We're here to help!</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:support@scala.gg" className="text-[#5865F2] hover:text-[#4752C4] transition-colors">support@scala.gg</a></p>
                  <p><strong>Discord:</strong> Join our community server for instant support</p>
                  <p><strong>Response Time:</strong> Usually within 24 hours</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">What We Can Help With</h4>
              <div className="space-y-2 text-gray-300">
                <p>• Purchase issues and delivery problems</p>
                <p>• Account-related questions</p>
                <p>• Technical support for server issues</p>
                <p>• Billing inquiries</p>
                <p>• Terms of service questions</p>
                <p>• EULA compliance matters</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#23263a] text-center">
            <Link href={settings.discord_url} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg font-semibold transition-colors mr-4">
              Join Discord Support
            </Link>
            <a href="mailto:support@scala.gg" className="inline-block px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors">
              Send Email
            </a>
          </div>
        </div>
      </section>


    </main>
  );
}
