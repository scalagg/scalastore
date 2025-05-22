import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlockyMC Store',
  description: 'Official store for BlockyMC Minecraft server',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gradient-to-b from-[#181B29] to-[#10121A] min-h-screen'}>
        <Navbar />
        <main className="pt-20">{/* Add top padding to prevent overlap with navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
