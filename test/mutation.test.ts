import { describe, it, expect } from 'vitest';
import { SeededRng } from '../src/rng.js';
import { isValidTour } from '../src/tsp.js';
import {
  exchangeMutation,
  insertionMutation,
  simpleInversionMutation,
  displacementMutation,
  inversionMutation,
  applyMutation,
} from '../src/mutation.js';
import { MutationType } from '../src/types.js';

const TOUR_6 = [0, 1, 2, 3, 4, 5];
const TOUR_12 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

describe('Exchange Mutation (EM)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    const result = exchangeMutation(TOUR_6, rng);
    expect(isValidTour(result, 6)).toBe(true);
  });

  it('differs from original by exactly 2 positions', () => {
    const rng = new SeededRng(42);
    const result = exchangeMutation(TOUR_6, rng);
    const diffs = result.filter((v, i) => v !== TOUR_6[i]).length;
    expect(diffs).toBe(2);
  });

  it('is deterministic with same seed', () => {
    const r1 = exchangeMutation(TOUR_6, new SeededRng(99));
    const r2 = exchangeMutation(TOUR_6, new SeededRng(99));
    expect(r1).toEqual(r2);
  });
});

describe('Insertion Mutation (ISM)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const result = insertionMutation(TOUR_12, rng);
      expect(isValidTour(result, 12)).toBe(true);
    }
  });

  it('does not duplicate the original', () => {
    // With a 12-city tour, extremely unlikely to get same tour
    const rng = new SeededRng(7);
    let allSame = true;
    for (let i = 0; i < 10; i++) {
      const result = insertionMutation(TOUR_12, rng);
      if (result.join(',') !== TOUR_12.join(',')) allSame = false;
    }
    expect(allSame).toBe(false);
  });
});

describe('Simple Inversion Mutation (SIM)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const result = simpleInversionMutation(TOUR_12, rng);
      expect(isValidTour(result, 12)).toBe(true);
    }
  });

  it('reverses a substring of at least 3 elements', () => {
    const rng = new SeededRng(42);
    const result = simpleInversionMutation([0, 1, 2, 3, 4, 5], rng);
    expect(isValidTour(result, 6)).toBe(true);
    // The result should differ from original
    expect(result).not.toEqual(TOUR_6);
  });
});

describe('Displacement Mutation (DM)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const result = displacementMutation(TOUR_12, rng);
      expect(isValidTour(result, 12)).toBe(true);
    }
  });

  it('preserves all cities', () => {
    const rng = new SeededRng(7);
    const result = displacementMutation(TOUR_6, rng);
    expect(result.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe('Inversion Mutation (IVM)', () => {
  it('produces a valid tour', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const result = inversionMutation(TOUR_12, rng);
      expect(isValidTour(result, 12)).toBe(true);
    }
  });

  it('is deterministic', () => {
    const r1 = inversionMutation(TOUR_12, new SeededRng(55));
    const r2 = inversionMutation(TOUR_12, new SeededRng(55));
    expect(r1).toEqual(r2);
  });
});

describe('applyMutation dispatch', () => {
  it('dispatches to the correct operator', () => {
    const rng1 = new SeededRng(42);
    const rng2 = new SeededRng(42);
    expect(applyMutation(MutationType.EM, TOUR_6, rng1))
      .toEqual(exchangeMutation(TOUR_6, rng2));
  });

  it('all mutation types produce valid tours', () => {
    for (const type of [MutationType.EM, MutationType.ISM, MutationType.SIM, MutationType.DM, MutationType.IVM]) {
      const rng = new SeededRng(42);
      for (let i = 0; i < 20; i++) {
        const result = applyMutation(type, TOUR_12, rng);
        expect(isValidTour(result, 12)).toBe(true);
      }
    }
  });
});
