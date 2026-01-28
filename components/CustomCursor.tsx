'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        const cursorDot = dotRef.current;
        const cursorOutline = outlineRef.current;
        if (!cursorDot || !cursorOutline) return;

        const handleMouseMove = (e: MouseEvent) => {
            try {
                const posX = e.clientX;
                const posY = e.clientY;

                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                cursorOutline.animate(
                    {
                        left: `${posX}px`,
                        top: `${posY}px`,
                    },
                    {
                        duration: 500,
                        fill: 'forwards',
                    }
                );
            } catch (error) {
                // Silently handle cursor animation errors
                console.warn('Cursor animation error:', error);
            }
        };

        const handleMouseEnter = () => {
            try {
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
            } catch (error) {
                console.warn('Cursor hover error:', error);
            }
        };

        const handleMouseLeave = () => {
            try {
                if (cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.backgroundColor = 'transparent';
                }
            } catch (error) {
                console.warn('Cursor leave error:', error);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const interactiveElements = document.querySelectorAll<HTMLElement>(
            'a, button, [role="button"], .nav-link, .bento-card'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
        </>
    );
}
