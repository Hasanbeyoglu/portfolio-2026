"use client";

import { useState, useEffect } from "react";

/**
 * @param query
 * @returns
 */

export function useMediaQuery(query: string): boolean | undefined {
    const [matches, setMatches] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        setMatches(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, [query]);

    return matches;
}
