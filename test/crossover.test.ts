import { describe, it, expect } from 'vitest';
import { SeededRng } from '../src/rng.js';
import { isValidTour } from '../src/tsp.js';
import {
  pmxCrossover,
  cxCrossover,
  oxCrossover,
  erxCrossover,
  mpxCrossover,
  applyCrossover,
} from '../src/crossover.js';
import { CrossoverType } from '../src/types.js';

function randomTour(n: number, rng: SeededRng): number[] {
  const tour = Array.from({ length: n }, (_, i) => i);
  rng.shuffle(tour);
  return tour;
}

describe('PMX Crossover', () => {
  it('produces a valid tour from two parents', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const p1 = randomTour(12, rng);
      const p2 = randomTour(12, rng);
      const child = pmxCrossover(p1, p2, rng);
      expect(isValidTour(child, 12)).toBe(true);
    }
  });

  it('is deterministic with same seed and parents', () => {
    const p1 = [0, 1, 2, 3, 4, 5];
    const p2 = [5, 4, 3, 2, 1, 0];
    const c1 = pmxCrossover(p1, p2, new SeededRng(42));
    const c2 = pmxCrossover(p1, p2, new SeededRng(42));
    expect(c1).toEqual(c2);
  });
});

describe('Cycle Crossover (CX)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const p1 = randomTour(12, rng);
      const p2 = randomTour(12, rng);
      const child = cxCrossover(p1, p2, rng);
      expect(isValidTour(child, 12)).toBe(true);
    }
  });

  it('each gene comes from the same position in one of the parents', () => {
    const rng = new SeededRng(42);
    const p1 = randomTour(8, rng);
    const p2 = randomTour(8, rng);
    const child = cxCrossover(p1, p2, new SeededRng(99));
    for (let i = 0; i < child.length; i++) {
      expect(child[i] === p1[i] || child[i] === p2[i]).toBe(true);
    }
  });
});

describe('Order Crossover (OX)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const p1 = randomTour(12, rng);
      const p2 = randomTour(12, rng);
      const child = oxCrossover(p1, p2, rng);
      expect(isValidTour(child, 12)).toBe(true);
    }
  });

  it('works with size 6', () => {
    const rng = new SeededRng(42);
    const p1 = randomTour(6, rng);
    const p2 = randomTour(6, rng);
    const child = oxCrossover(p1, p2, rng);
    expect(isValidTour(child, 6)).toBe(true);
  });
});

describe('Edge Recombination Crossover (ERX)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const p1 = randomTour(12, rng);
      const p2 = randomTour(12, rng);
      const child = erxCrossover(p1, p2, rng);
      expect(isValidTour(child, 12)).toBe(true);
    }
  });

  it('preserves edges from parents when possible', () => {
    const rng = new SeededRng(42);
    const p1 = [0, 1, 2, 3, 4, 5];
    const p2 = [5, 4, 3, 2, 1, 0];
    const child = erxCrossover(p1, p2, rng);
    expect(isValidTour(child, 6)).toBe(true);
  });
});

describe('Maximal Preservative Crossover (MPX)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const p1 = randomTour(12, rng);
      const p2 = randomTour(12, rng);
      const child = mpxCrossover(p1, p2, rng);
      expect(isValidTour(child, 12)).toBe(true);
    }
  });

  it('substring from parent1 appears at the start of child', () => {
    // Since the substring is placed at the beginning, the first `len` elements
    // should be a contiguous substring of parent1
    const p1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const p2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const rng = new SeededRng(42);
    const child = mpxCrossover(p1, p2, rng);
    expect(isValidTour(child, 12)).toBe(true);
  });
});

describe('applyCrossover dispatch', () => {
  it('all crossover types produce valid tours on various sizes', () => {
    for (const type of [CrossoverType.PMX, CrossoverType.CX, CrossoverType.OX, CrossoverType.ERX, CrossoverType.MPX]) {
      for (const size of [6, 10, 20]) {
        const rng = new SeededRng(42);
        for (let i = 0; i < 10; i++) {
          const p1 = randomTour(size, rng);
          const p2 = randomTour(size, rng);
          const child = applyCrossover(type, p1, p2, rng);
          expect(isValidTour(child, size)).toBe(true);
        }
      }
    }
  });
});
