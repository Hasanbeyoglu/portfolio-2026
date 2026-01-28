"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Hook to detect if user prefers reduced motion
 * @returns boolean | undefined - true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean | undefined {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}
