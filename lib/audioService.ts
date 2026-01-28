import * as Tone from 'tone';

class AudioService {
    private isStarted = false;

    async start(): Promise<void> {
        if (!this.isStarted) {
            try {
                await Tone.start();
                this.isStarted = true;
            } catch (error) {
                console.warn('Audio initialization failed:', error);
            }
        }
    }

    playNavigationSound(): void {
        if (!this.isStarted) return;

        const synth = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 4,
            oscillator: { type: 'sine' }
        }).toDestination();

        synth.triggerAttackRelease("C2", "32n", Tone.now(), 0.2);

        setTimeout(() => synth.dispose(), 200);
    }

    playButtonSound(): void {
        if (!this.isStarted) return;

        const synth = new Tone.PluckSynth().toDestination();
        synth.triggerAttackRelease("E4", "64n", Tone.now(), 0.25);

        setTimeout(() => synth.dispose(), 200);
    }

    get started(): boolean {
        return this.isStarted;
    }
}

export const audioService = new AudioService();
