import { useCallback } from 'react';
import { audioService } from '@/lib/audioService';

/**
 * Custom hook for audio feedback
 * Provides easy-to-use functions for playing sounds with automatic audio context initialization
 */
export function useAudioFeedback() {
    const playNavigationSound = useCallback(async () => {
        await audioService.start();
        audioService.playNavigationSound();
    }, []);

    const playButtonSound = useCallback(async () => {
        await audioService.start();
        audioService.playButtonSound();
    }, []);

    return {
        playNavigationSound,
        playButtonSound,
    };
}
