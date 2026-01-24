'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, User, Grid2X2, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navigation() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'About', href: '/about', icon: User },
        { name: 'Projects', href: '/projects', icon: Grid2X2 },
        { name: 'Contact', href: '/contact', icon: Mail },
    ];

    return (
        <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-2 scale-90 md:scale-100 shadow-2xl ring-1 ring-white/10 dark:ring-white/10 ring-black/10 bg-white/40 dark:bg-black/20">
                <ul className="flex items-center gap-2 list-none m-0 p-0">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`nav-link group relative p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center ${isActive ? 'active' : ''
                                        }`}
                                >
                                    <span
                                        className={`bg-indicator absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full transition-transform ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                                            }`}
                                    ></span>
                                    <item.icon className="w-5 h-5 text-black dark:text-white" />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1"></div>
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="group relative p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-black dark:text-white" />
                        ) : (
                            <Moon className="w-5 h-5 text-black dark:text-white" />
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}