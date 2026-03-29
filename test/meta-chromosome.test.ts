import { describe, it, expect } from 'vitest';
import { SeededRng } from '../src/rng.js';
import {
  randomMetaChromosome,
  metaToArray,
  arrayToMeta,
  metaCrossover,
  metaMutation,
  metaFitness,
} from '../src/meta-chromosome.js';
import { ReplacementScheme, MutationType, CrossoverType, SelectionMethod } from '../src/types.js';

describe('Meta-chromosome', () => {
  it('randomMetaChromosome produces valid alleles', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 100; i++) {
      const mc = randomMetaChromosome(rng);
      expect(mc.replacement).toBeGreaterThanOrEqual(0);
      expect(mc.replacement).toBeLessThanOrEqual(2);
      expect(mc.elitismRate).toBeGreaterThanOrEqual(0);
      expect(mc.elitismRate).toBeLessThanOrEqual(100);
      expect(mc.mutationType).toBeGreaterThanOrEqual(0);
      expect(mc.mutationType).toBeLessThanOrEqual(4);
      expect(mc.mutationRate).toBeGreaterThanOrEqual(0);
      expect(mc.mutationRate).toBeLessThanOrEqual(100);
      expect(mc.crossoverType).toBeGreaterThanOrEqual(0);
      expect(mc.crossoverType).toBeLessThanOrEqual(4);
      expect(mc.crossoverRate).toBeGreaterThanOrEqual(0);
      expect(mc.crossoverRate).toBeLessThanOrEqual(100);
      expect(mc.selectionMethod).toBeGreaterThanOrEqual(0);
      expect(mc.selectionMethod).toBeLessThanOrEqual(3);
    }
  });

  it('round-trips through array conversion', () => {
    const rng = new SeededRng(42);
    const mc = randomMetaChromosome(rng);
    const arr = metaToArray(mc);
    const mc2 = arrayToMeta(arr);
    expect(mc2).toEqual(mc);
  });

  it('metaToArray produces 7 genes', () => {
    const rng = new SeededRng(42);
    const mc = randomMetaChromosome(rng);
    expect(metaToArray(mc)).toHaveLength(7);
  });
});

describe('Meta-crossover', () => {
  it('produces valid meta-chromosome', () => {
    const rng = new SeededRng(42);
    const p1 = randomMetaChromosome(rng);
    const p2 = randomMetaChromosome(rng);
    const child = metaCrossover(p1, p2, rng);

    // Each gene should come from one of the two parents
    const g1 = metaToArray(p1);
    const g2 = metaToArray(p2);
    const gc = metaToArray(child);
    for (let i = 0; i < 7; i++) {
      expect(gc[i] === g1[i] || gc[i] === g2[i]).toBe(true);
    }
  });

  it('is deterministic', () => {
    const rng1 = new SeededRng(42);
    const rng2 = new SeededRng(42);
    const p1a = randomMetaChromosome(rng1);
    const p2a = randomMetaChromosome(rng1);
    const p1b = randomMetaChromosome(rng2);
    const p2b = randomMetaChromosome(rng2);
    expect(metaCrossover(p1a, p2a, rng1)).toEqual(metaCrossover(p1b, p2b, rng2));
  });
});

describe('Meta-mutation', () => {
  it('changes exactly one gene', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 50; i++) {
      const mc = randomMetaChromosome(rng);
      const mutated = metaMutation(mc, rng);
      const g1 = metaToArray(mc);
      const g2 = metaToArray(mutated);
      const diffs = g1.filter((v, j) => v !== g2[j]).length;
      // Should change 1 gene (or 0 if the random allele happens to be the same)
      expect(diffs).toBeLessThanOrEqual(1);
    }
  });
});

describe('Meta-fitness', () => {
  it('returns 100% when distance equals optimum at max generations', () => {
    // At max generations: 110 - (maxGens/maxGens)*10 = 100
    expect(metaFitness(100, 100, 500, 500)).toBeCloseTo(100);
  });

  it('returns 110 when optimum found at generation 0', () => {
    expect(metaFitness(100, 100, 0, 500)).toBeCloseTo(110);
  });

  it('returns percentage for non-optimal', () => {
    // optimum=100, distance=200 => 50%
    expect(metaFitness(200, 100, 500, 500)).toBeCloseTo(50);
  });

  it('returns > 100 when optimum found early', () => {
    // Found at gen 250 of 500: 110 - (250/500)*10 = 105
    expect(metaFitness(100, 100, 250, 500)).toBeCloseTo(105);
  });
});
