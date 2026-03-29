import { describe, it, expect } from 'vitest';
import { SeededRng } from '../src/rng.js';

describe('SeededRng', () => {
  it('produces deterministic sequences from the same seed', () => {
    const rng1 = new SeededRng(42);
    const rng2 = new SeededRng(42);
    for (let i = 0; i < 100; i++) {
      expect(rng1.next()).toBe(rng2.next());
    }
  });

  it('produces different sequences from different seeds', () => {
    const rng1 = new SeededRng(42);
    const rng2 = new SeededRng(43);
    const same = Array.from({ length: 20 }, () => rng1.next() === rng2.next());
    expect(same.some(s => !s)).toBe(true);
  });

  it('next() returns values in [0, 1)', () => {
    const rng = new SeededRng(123);
    for (let i = 0; i < 1000; i++) {
      const v = rng.next();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('nextInt returns values in [min, max)', () => {
    const rng = new SeededRng(99);
    for (let i = 0; i < 500; i++) {
      const v = rng.nextInt(3, 10);
      expect(v).toBeGreaterThanOrEqual(3);
      expect(v).toBeLessThan(10);
    }
  });

  it('shuffle produces a valid permutation', () => {
    const rng = new SeededRng(7);
    const arr = [0, 1, 2, 3, 4, 5];
    rng.shuffle(arr);
    expect(arr.sort()).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('shuffle is deterministic with same seed', () => {
    const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = [...arr1];
    new SeededRng(42).shuffle(arr1);
    new SeededRng(42).shuffle(arr2);
    expect(arr1).toEqual(arr2);
  });
});
