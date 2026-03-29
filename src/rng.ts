/**
 * Mulberry32 - a fast, seedable 32-bit PRNG.
 * Produces deterministic sequences given the same seed.
 */
export class SeededRng {
  private state: number;

  constructor(seed: number) {
    this.state = seed | 0;
  }

  /** Returns a float in [0, 1) */
  next(): number {
    this.state = (this.state + 0x6d2b79f5) | 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Returns an integer in [min, max) */
  nextInt(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min));
  }

  /** Returns an integer in [min, max] inclusive */
  nextIntInclusive(min: number, max: number): number {
    return this.nextInt(min, max + 1);
  }

  /** Fisher-Yates shuffle in place */
  shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /** Returns true with given probability */
  chance(probability: number): boolean {
    return this.next() < probability;
  }

  /** Pick a random element from an array */
  pick<T>(arr: readonly T[]): T {
    return arr[this.nextInt(0, arr.length)];
  }
}
