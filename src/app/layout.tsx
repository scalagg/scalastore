import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/contexts/UserContext';
import { BasketProvider } from '@/contexts/BasketContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockyMC Store',
  description: 'Official store for BlockyMC Minecraft server',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gradient-to-b from-[#181B29] to-[#10121A] min-h-screen'}>
        <UserProvider>
          <BasketProvider>
            <Navbar />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
          </BasketProvider>
        </UserProvider>
      </body>
    </html>
  );
}
