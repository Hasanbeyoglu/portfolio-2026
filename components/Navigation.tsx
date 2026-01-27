'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, User, Grid2X2, Mail } from 'lucide-react';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';

export default function Navigation() {
    const pathname = usePathname();
    const { playNavigationSound } = useAudioFeedback();

    const navItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'About', href: '/about', icon: User },
        { name: 'Projects', href: '/projects', icon: Grid2X2 },
        { name: 'Contact', href: '/contact', icon: Mail },
    ];

    const handleNavClick = async () => {
        await playNavigationSound();
    };

    return (
        <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-2 scale-90 md:scale-100 shadow-2xl ring-1 ring-white/10 bg-black/20">
                <ul className="flex items-center gap-2 list-none m-0 p-0">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={`nav-link group relative p-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center ${isActive ? 'active' : ''
                                        }`}
                                >
                                    <span
                                        className={`bg-indicator absolute inset-0 bg-white/5 rounded-full transition-transform ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                                            }`}
                                    ></span>
                                    <item.icon className="w-5 h-5 text-white" />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}