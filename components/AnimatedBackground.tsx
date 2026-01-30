'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function AnimatedBackground() {
    const pathname = usePathname();

    // Memoize visibility check
    const isVisible = useMemo(() => {
        return pathname?.match(/^\/(about|contact|projects)?$/);
    }, [pathname]);

    // Memoize styles
    const orb1Style = useMemo(() => ({
        background: 'radial-gradient(circle, rgba(163, 230, 53, 0.6) 0%, rgba(163, 230, 53, 0) 70%)',
        top: '10%',
        left: '10%',
    }), []);

    const orb2Style = useMemo(() => ({
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, rgba(34, 211, 238, 0) 70%)',
        top: '60%',
        right: '10%',
    }), []);

    const orb3Style = useMemo(() => ({
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%)',
        bottom: '15%',
        left: '30%',
    }), []);

    const orb4Style = useMemo(() => ({
        background: 'radial-gradient(circle, rgba(163, 230, 53, 0.45) 0%, rgba(163, 230, 53, 0) 70%)',
        top: '40%',
        right: '30%',
        animationDelay: '5s',
    }), []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient Orb 1 - Lime */}
            <div className="absolute w-[500px] h-[500px] rounded-full opacity-40 blur-2xl animate-float-1" style={orb1Style} />

            {/* Gradient Orb 2 - Cyan */}
            <div className="absolute w-[600px] h-[600px] rounded-full opacity-35 blur-2xl animate-float-2" style={orb2Style} />

            {/* Gradient Orb 3 - Purple */}
            <div className="absolute w-[450px] h-[450px] rounded-full opacity-35 blur-2xl animate-float-3" style={orb3Style} />

            {/* Gradient Orb 4 - Lime accent */}
            <div className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-2xl animate-float-1" style={orb4Style} />
        </div>
    );
}
