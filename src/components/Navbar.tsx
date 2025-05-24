'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { settings } from '@/config/settings';
import { useUser } from '@/contexts/UserContext';
import { useBasket } from '@/contexts/BasketContext';
import LoginForm from './LoginForm';
import CartDrawer from './CartDrawer';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/store' },
  { name: 'Vote', href: '/vote' },
  { name: 'Discord', href: settings.discord_url, external: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useUser();
  const { basket } = useBasket();

  const basketItemCount = basket?.data?.packages?.length || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    if (user) {
      setShowCartDrawer(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 bg-[#181B29] shadow-md`}
        style={{ minHeight: 64 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <img
                  className="h-9 w-9 rounded-lg shadow-md object-contain bg-white/10 p-1"
                  src="/logo.png"
                  alt={settings.server_name}
                />
                <span className="hidden md:block font-extrabold text-lg tracking-tight text-white drop-shadow">{settings.server_name}</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-2 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-sm flex items-center gap-1
                    ${pathname === item.href
                      ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'}
                  `}
                >
                  {item.name}
                  {item.external && (
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7m5-5l-6 6m6-6H9" /></svg>
                  )}
                </Link>
              ))}

              {/* User/Cart Section */}
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setShowCartDrawer(true)}
                  className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  {basketItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {basketItemCount}
                    </span>
                  )}
                </button>

                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg">
                      <img
                        src={`https://visage.surgeplay.com/face/32/${user.id}`}
                        alt={user.name}
                        className="w-6 h-6 rounded"
                      />
                      <span className="text-white text-sm font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setShowCartDrawer(true)}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {basketItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {basketItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                ) : (
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden px-4 pb-4 pt-2"
            >
              <div className="flex flex-col gap-2 rounded-2xl bg-[#23263a] shadow-lg p-4 border border-[#23263a]">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 text-base flex items-center gap-1
                      ${pathname === item.href
                        ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.external && (
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7m5-5l-6 6m6-6H9" /></svg>
                    )}
                  </Link>
                ))}

                {/* Mobile Login/User Section */}
                <div className="border-t border-white/10 pt-2 mt-2">
                  {user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-4 py-2">
                        <img
                          src={`https://visage.surgeplay.com/face/32/${user.id}`}
                          alt={user.name}
                          className="w-6 h-6 rounded"
                        />
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      Login
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowLoginModal(false)}
              style={{ pointerEvents: 'auto' }}
            />
            <LoginForm
              onLogin={() => setShowLoginModal(false)}
              onClose={() => setShowLoginModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
      />
    </>
  );
} 