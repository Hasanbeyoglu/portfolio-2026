'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    // Memoize selector
    const interactiveSelector = useMemo(
        () => 'a, button, [role="button"], .nav-link, .bento-card',
        []
    );

    // Memoize event handlers
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const cursorDot = dotRef.current;
        const cursorOutline = outlineRef.current;
        if (!cursorDot || !cursorOutline) return;

        try {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate(
                { left: `${posX}px`, top: `${posY}px` },
                { duration: 500, fill: 'forwards' }
            );
        } catch (error) {
            console.warn('Cursor animation error:', error);
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        const cursorOutline = outlineRef.current;
        if (!cursorOutline) return;

        try {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        } catch (error) {
            console.warn('Cursor hover error:', error);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const cursorOutline = outlineRef.current;
        if (!cursorOutline) return;

        try {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        } catch (error) {
            console.warn('Cursor leave error:', error);
        }
    }, []);

    useEffect(() => {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const interactiveElements = document.querySelectorAll<HTMLElement>(
            interactiveSelector
        );

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
            el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave, interactiveSelector]);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
        </>
    );
}
