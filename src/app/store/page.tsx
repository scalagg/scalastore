'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Category, getPackages, getCategories, createBasket } from '@/lib/tebex';
import { settings } from '@/config/settings';

export default function Store() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesData, categoriesData] = await Promise.all([
          getPackages(),
          getCategories(),
        ]);
        setPackages(packagesData);
        setCategories(categoriesData);
      } catch (error) {
        setError('Failed to load store data. Please try again later.');
        console.error('Error fetching store data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      const matchesCategory = selectedCategory
        ? pkg.category === selectedCategory
        : true;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-lg p-6 animate-pulse h-64"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
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
        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-64"
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
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
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
              No packages found matching your criteria
            </h3>
          </div>
        )}
      </div>
    </main>
  );
} 