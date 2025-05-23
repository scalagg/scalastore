import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/contexts/UserContext';
import { BasketProvider } from '@/contexts/BasketContext';
import ParticleBackground, { FloatingShapes } from '@/components/ParticleBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockyMC Store',
  description: 'Official store for BlockyMC Minecraft server',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gradient-to-br from-[#0B0F1A] via-[#181B29] to-[#1A1F2E] min-h-screen relative overflow-x-hidden'}>
        <ParticleBackground />
        <FloatingShapes />
        
        {/* Animated gradient overlay */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-900/10" />
        </div>

        <UserProvider>
          <BasketProvider>
            <div className="relative z-10">
              <Navbar />
              <main className="pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </BasketProvider>
        </UserProvider>
      </body>
    </html>
  );
}
