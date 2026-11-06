// Web Audio API Synthesizer for Zen Bells, Chimes, and Focus Cues

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Read mute preference from localStorage
    try {
      this.isMuted = localStorage.getItem('zenfocus_muted') === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('zenfocus_muted', String(this.isMuted));
    } catch {
      // ignore
    }
    if (!this.isMuted) {
      this.playTactileClick();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Tibetan Singing Bowl / Temple Zen Gong
  public playZenGong(fundamentalFreq: number = 216, duration: number = 3.5): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    // Warm low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + duration);
    filter.connect(masterGain);

    // Multiple harmonics typical of singing bowls: 1x, 2.76x, 5.4x, 8.9x
    const harmonics = [
      { ratio: 1.0, gain: 0.6 },
      { ratio: 2.76, gain: 0.25 },
      { ratio: 5.4, gain: 0.1 },
      { ratio: 8.93, gain: 0.05 }
    ];

    harmonics.forEach(({ ratio, gain }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamentalFreq * ratio, now);
      
      oscGain.gain.setValueAtTime(gain, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * (1 / (ratio * 0.5 + 0.5))));
      
      osc.connect(oscGain);
      oscGain.connect(filter);
      
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  // Session Start: Serene rising two-tone chime
  public playStartChime(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25]; // A4, C#5, E5 (Major triad)
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      }, i * 140);
    });
  }

  // Session Complete: Rich Harmonic Bell Celebration
  public playCompleteBell(): void {
    if (this.isMuted) return;
    this.playZenGong(180, 4.5);
    setTimeout(() => {
      this.playZenGong(270, 3.5);
    }, 400);
  }

  // Tactile subtle click
  public playTactileClick(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Shield verify trigger tone
  public playShieldVerdict(isAllowed: boolean): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (isAllowed) {
      // Pleasant bamboo tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    } else {
      // Low muted thud
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }
}

export const sound = new SoundEngine();
