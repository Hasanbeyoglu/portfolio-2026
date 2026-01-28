'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const router = useRouter();
    const pathname = usePathname();
    const [displayPath, setDisplayPath] = useState('');
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        setTimestamp(new Date().toLocaleString());
    }, []);

    useEffect(() => {
        if (!pathname) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= pathname.length) {
                setDisplayPath(pathname.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [pathname]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="flex gap-8 md:gap-16">
                    <h1 className="text-[20vw] md:text-[25vw] font-display font-bold text-white/[0.02] select-none leading-none">4</h1>
                    <h1 className="text-[20vw] md:text-[25vw] font-display font-bold text-white/[0.03] select-none leading-none">0</h1>
                    <h1 className="text-[20vw] md:text-[25vw] font-display font-bold text-white/[0.02] select-none leading-none">4</h1>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-4">
                <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 border border-white/10 flex flex-col items-center text-center">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-lime-400/20 to-white/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                        <Image
                            src="/404-not-found.jpg"
                            alt="Lost Robot"
                            width={256}
                            height={256}
                            className="relative w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500"
                        />


                        <div className="absolute -top-4 -right-4 glass-panel px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 backdrop-blur-md animate-bounce">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                <span className="text-xs font-mono text-red-400 font-bold">ERR_404_VOID</span>
                            </div>
                        </div>
                    </div>


                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                        System Malfunction
                    </h2>

                    <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                        The coordinates you are attempting to access do not exist in this sector. It seems you've drifted into the digital void.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            href="/"
                            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden w-full sm:w-auto min-w-[160px] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return Home
                            </span>
                            <div className="absolute inset-0 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                        </Link>

                        <button
                            onClick={() => router.back()}
                            className="px-8 py-4 border border-white/10 hover:border-white hover:bg-white/5 text-white rounded-full transition-all duration-300 w-full sm:w-auto min-w-[160px] font-medium"
                        >
                            Go Back
                        </button>
                    </div>
                    <div className="mt-8 font-mono text-xs text-gray-600">
                        path: <span className="text-red-400">{displayPath}<span className="animate-pulse">|</span></span><br />
                        status: 404 (Not Found)<br />
                        timestamp: {timestamp}<br />
                        server: ertudev.app
                    </div>

                </div>
            </div>
        </div>
    );
}