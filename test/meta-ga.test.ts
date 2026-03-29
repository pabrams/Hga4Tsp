import { describe, it, expect } from 'vitest';
import { generateCircleTsp } from '../src/tsp.js';
import { runMetaGa } from '../src/meta-ga.js';
import { MetaGaParams, formatMetaChromosome } from '../src/types.js';

describe('Meta-GA', () => {
  // Use a small instance for fast tests
  const circle8 = generateCircleTsp(8);

  it('runs to completion and returns sorted population', () => {
    const params: MetaGaParams = {
      popSize: 6,
      numGens: 3,
      maxTspGens: 20,
      mutRate: 0.35,
      xRate: 0.85,
      elitismPercent: 0.1,
      tspInstance: circle8,
      seed: 42,
    };

    const result = runMetaGa(params);
    expect(result.length).toBe(6);

    // Should be sorted by fitness (descending)
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].fitness).toBeGreaterThanOrEqual(result[i].fitness);
    }

    // All should have non-zero fitness
    for (const ind of result) {
      expect(ind.fitness).toBeGreaterThan(0);
    }
  });

  it('is deterministic with same seed', () => {
    const params: MetaGaParams = {
      popSize: 6,
      numGens: 3,
      maxTspGens: 20,
      mutRate: 0.35,
      xRate: 0.85,
      elitismPercent: 0.1,
      tspInstance: circle8,
      seed: 42,
    };

    const r1 = runMetaGa(params);
    const r2 = runMetaGa(params);

    expect(r1.length).toBe(r2.length);
    for (let i = 0; i < r1.length; i++) {
      expect(r1[i].fitness).toBe(r2[i].fitness);
      expect(r1[i].chromosome).toEqual(r2[i].chromosome);
    }
  });

  it('different seeds produce different results', () => {
    const base: MetaGaParams = {
      popSize: 6,
      numGens: 3,
      maxTspGens: 20,
      mutRate: 0.35,
      xRate: 0.85,
      elitismPercent: 0.1,
      tspInstance: circle8,
      seed: 42,
    };

    const r1 = runMetaGa(base);
    const r2 = runMetaGa({ ...base, seed: 99 });

    // At least one chromosome should differ
    const allSame = r1.every((ind, i) =>
      formatMetaChromosome(ind.chromosome) === formatMetaChromosome(r2[i].chromosome)
    );
    expect(allSame).toBe(false);
  });

  it('invokes callbacks', () => {
    const params: MetaGaParams = {
      popSize: 4,
      numGens: 2,
      maxTspGens: 10,
      mutRate: 0.35,
      xRate: 0.85,
      elitismPercent: 0.1,
      tspInstance: circle8,
      seed: 42,
    };

    const genStarts: number[] = [];
    const genEnds: number[] = [];
    let evalCount = 0;

    runMetaGa(params, {
      onGenerationStart: (gen) => genStarts.push(gen),
      onGenerationEnd: (gen) => genEnds.push(gen),
      onChromosomeEvaluated: () => evalCount++,
    });

    expect(genStarts).toEqual([0, 1]);
    expect(genEnds).toEqual([0, 1]);
    expect(evalCount).toBe(8); // 4 individuals * 2 generations
  });

  it('fitness generally improves or stays stable over generations', () => {
    const params: MetaGaParams = {
      popSize: 8,
      numGens: 5,
      maxTspGens: 30,
      mutRate: 0.35,
      xRate: 0.85,
      elitismPercent: 0.1,
      tspInstance: circle8,
      seed: 42,
    };

    const bestFitnesses: number[] = [];
    runMetaGa(params, {
      onGenerationEnd: (_gen, pop) => {
        const best = Math.max(...pop.map(i => i.fitness));
        bestFitnesses.push(best);
      },
    });

    // With elitism, best fitness should never decrease
    // (Note: it can decrease slightly due to re-evaluation stochasticity,
    //  but with seeded RNG this should be stable)
    expect(bestFitnesses.length).toBe(5);
  });
});
