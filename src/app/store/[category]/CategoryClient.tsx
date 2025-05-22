'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Category, createBasket } from '@/lib/tebex';
import { settings } from '@/config/settings';

interface CategoryClientProps {
  initialPackages: Package[];
  category: Category;
}

export default function CategoryClient({ initialPackages, category }: CategoryClientProps) {
  const [packages] = useState(initialPackages);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async (packageId: number) => {
    try {
      const basket = await createBasket(packageId);
      window.location.href = `https://checkout.tebex.io/basket/${basket.id}`;
    } catch (error) {
      console.error('Error creating basket:', error);
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const filteredPackages = packages
    .filter((pkg) => {
      const matchesCategory = pkg.category === category.id.toString();
      const matchesSearch = pkg.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.total_price - b.total_price;
        case 'price-desc':
          return b.total_price - a.total_price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-400 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  <button
                    onClick={() => handleAddToCart(pkg.id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-400">
              No packages found in this category
            </h3>
          </div>
        )}
      </div>
    </main>
  );
} 