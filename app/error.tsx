'use client';

import { useEffect } from 'react';
import { RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <main className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-8 pb-32">
            <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 border border-white/10 flex flex-col items-center text-center min-h-[70vh] justify-center">

                <div className="relative w-48 h-48 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/20 rounded-full blur-2xl"></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="text-8xl">⚠️</div>
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                    Something Went Wrong
                </h2>

                <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                    An unexpected error occurred. Please try again or return to the homepage.
                </p>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 bg-red-950/30 border border-red-500/30 rounded-lg max-w-2xl w-full">
                        <p className="text-red-400 text-sm font-mono text-left break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        onClick={reset}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden w-full sm:w-auto min-w-[160px] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </span>
                        <div className="absolute inset-0 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </button>

                    <Link
                        href="/"
                        className="px-8 py-4 border-2 border-white/20 hover:border-lime-400 hover:bg-white/5 text-white rounded-full transition-all duration-300 w-full sm:w-auto min-w-[160px] font-bold flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                </div>

                <div className="mt-8 font-mono text-xs text-gray-600">
                    status: Error<br />
                    {error.digest && `digest: ${error.digest}`}
                </div>
            </div>
        </main>
    );
}