import * as Tone from 'tone';

/**
 * Audio Service for managing sound effects across the application
 * Handles Tone.js initialization and provides reusable sound effects
 */
class AudioService {
    private isStarted = false;

    /**
     * Initialize Tone.js audio context
     * Must be called after user interaction (click, touch, etc.)
     */
    async start(): Promise<void> {
        if (!this.isStarted) {
            await Tone.start();
            this.isStarted = true;
        }
    }

    /**
     * Play navigation sound - subtle bass tick for navigation links
     */
    playNavigationSound(): void {
        if (!this.isStarted) return;

        const synth = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: { type: 'sine' }
        }).toDestination();

        synth.triggerAttackRelease("C2", "32n", Tone.now(), 0.2);

        // Clean up synth after sound plays
        setTimeout(() => synth.dispose(), 200);
    }

    /**
     * Play button sound - playful pluck for regular buttons
     */
    playButtonSound(): void {
        if (!this.isStarted) return;

        const synth = new Tone.PluckSynth().toDestination();
        synth.triggerAttackRelease("E4", "64n", Tone.now(), 0.25);

        // Clean up synth after sound plays
        setTimeout(() => synth.dispose(), 200);
    }

    /**
     * Check if audio context is started
     */
    get started(): boolean {
        return this.isStarted;
    }
}

// Export singleton instance
export const audioService = new AudioService();
