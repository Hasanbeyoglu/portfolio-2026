'use client';

import { usePathname } from 'next/navigation';

export default function AnimatedBackground() {
    const pathname = usePathname();

    // Hide background on 404 page - show on /, /about, /contact, /projects
    if (pathname && !pathname.match(/^\/(about|contact|projects)?$/)) {
        return null;
    }

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient Orb 1 - Lime */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-40 blur-2xl animate-float-1"
                style={{
                    background: 'radial-gradient(circle, rgba(163, 230, 53, 0.6) 0%, rgba(163, 230, 53, 0) 70%)',
                    top: '10%',
                    left: '10%',
                }}
            />

            {/* Gradient Orb 2 - Cyan */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-35 blur-2xl animate-float-2"
                style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, rgba(34, 211, 238, 0) 70%)',
                    top: '60%',
                    right: '10%',
                }}
            />

            {/* Gradient Orb 3 - Purple */}
            <div
                className="absolute w-[450px] h-[450px] rounded-full opacity-35 blur-2xl animate-float-3"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%)',
                    bottom: '15%',
                    left: '30%',
                }}
            />

            {/* Gradient Orb 4 - Lime accent */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-2xl animate-float-1"
                style={{
                    background: 'radial-gradient(circle, rgba(163, 230, 53, 0.45) 0%, rgba(163, 230, 53, 0) 70%)',
                    top: '40%',
                    right: '30%',
                    animationDelay: '5s',
                }}
            />
        </div>
    );
}
