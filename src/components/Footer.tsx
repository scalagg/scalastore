import Link from 'next/link';
import { settings } from '@/config/settings';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/store' },
  { name: 'Vote', href: '/vote' },
  { name: 'Discord', href: settings.discord_url, external: true },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#23263a] bg-[#181B29] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <img src="/logo.png" alt={settings.server_name} className="h-8 w-8 rounded bg-white/10 p-1" />
          <span className="font-bold text-lg text-white">{settings.server_name}</span>
        </div>
        <nav className="flex flex-wrap gap-4 items-center justify-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <a href={settings.discord_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#5865F2] transition-colors">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.074.074 0 0 0-.078.037c-.34.607-.719 1.396-.984 2.013a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.995-2.013.077.077 0 0 0-.078-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.51 6.222 3.155a.077.077 0 0 0 .084-.027c.478-.654.905-1.344 1.273-2.067a.076.076 0 0 0-.041-.104c-.676-.256-1.32-.571-1.934-.936a.077.077 0 0 1-.008-.127c.13-.098.26-.2.382-.304a.074.074 0 0 1 .077-.01c4.06 1.855 8.447 1.855 12.47 0a.075.075 0 0 1 .078.009c.123.104.253.206.384.305a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.936.935.076.076 0 0 0-.04.105c.37.723.797 1.413 1.273 2.067a.076.076 0 0 0 .084.028c2.027-.645 4.094-1.59 6.222-3.155a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.095 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/></svg>
          </a>
          <span className="hidden md:inline">&copy; {new Date().getFullYear()} {settings.server_name}. All rights reserved.</span>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-4 md:hidden">&copy; {new Date().getFullYear()} {settings.server_name}. All rights reserved.</div>
    </footer>
  );
} 