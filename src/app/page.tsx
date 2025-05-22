'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { settings } from '@/config/settings';
import { getPackages, Package } from '@/lib/tebex';

export default function Home() {
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        const packages = await getPackages();
        const featured = packages.filter(pkg => 
          settings.featured_package_ids.includes(pkg.id.toString())
        );
        setFeaturedPackages(featured);
      } catch (error) {
        console.error('Error fetching featured packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_image.webp"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to {settings.server_name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Join our amazing community and enhance your gameplay
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/store"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Visit Store
            </Link>
            <Link
              href={settings.discord_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg font-medium transition-colors"
            >
              Join Discord
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Packages
            </h2>
            <p className="text-gray-400">
              Check out our most popular items
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-lg p-6 animate-pulse h-64"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
                >
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-48 object-cover"
                    />
                    {pkg.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">
                        {pkg.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        {pkg.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through">
                              {settings.currency_symbol}
                              {pkg.base_price}
                            </span>
                            <span className="text-green-500 font-bold">
                              {settings.currency_symbol}
                              {pkg.total_price}
                            </span>
                          </div>
                        ) : (
                          <span className="text-white font-bold">
                            {settings.currency_symbol}
                            {pkg.total_price}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/store/${pkg.id}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Categories
            </h2>
            <p className="text-gray-400">
              Find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {settings.home_category_widgets.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={category.url}
                  className="block bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
                >
                  <div className="relative h-48">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
