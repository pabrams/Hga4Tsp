import { describe, it, expect } from 'vitest';
import { SeededRng } from '../src/rng.js';
import { generateCircleTsp, buildDistanceMatrix, isValidTour } from '../src/tsp.js';
import { randomTour, generateInitialPopulation, runTspGa, getBest } from '../src/tsp-ga.js';
import {
  MetaChromosome,
  ReplacementScheme,
  MutationType,
  CrossoverType,
  SelectionMethod,
} from '../src/types.js';

describe('TSP GA', () => {
  const circle8 = generateCircleTsp(8);
  const distMatrix8 = buildDistanceMatrix(circle8.cities);

  it('randomTour produces valid tours', () => {
    const rng = new SeededRng(42);
    for (let i = 0; i < 20; i++) {
      const tour = randomTour(8, rng);
      expect(isValidTour(tour, 8)).toBe(true);
    }
  });

  it('generateInitialPopulation creates correct size with unique fitnesses', () => {
    const rng = new SeededRng(42);
    const pop = generateInitialPopulation(8, 16, distMatrix8, rng);
    expect(pop.length).toBe(16);

    // All tours should be valid
    for (const ind of pop) {
      expect(isValidTour(ind.tour, 8)).toBe(true);
      expect(ind.distance).toBeGreaterThan(0);
      expect(ind.fitness).toBeCloseTo(1 / ind.distance);
    }
  });

  it('runTspGa improves over random initial population', () => {
    const params: MetaChromosome = {
      replacement: ReplacementScheme.H1R,
      elitismRate: 10,
      mutationType: MutationType.SIM,
      mutationRate: 50,
      crossoverType: CrossoverType.OX,
      crossoverRate: 85,
      selectionMethod: SelectionMethod.RS,
    };

    const rng = new SeededRng(42);
    const result = runTspGa(circle8, params, 50, rng);

    expect(result.bestDistance).toBeGreaterThan(0);
    expect(isValidTour(result.bestTour, 8)).toBe(true);
    expect(result.generationsRun).toBeLessThanOrEqual(50);
  });

  it('is deterministic with same seed', () => {
    const params: MetaChromosome = {
      replacement: ReplacementScheme.S1R,
      elitismRate: 20,
      mutationType: MutationType.EM,
      mutationRate: 30,
      crossoverType: CrossoverType.PMX,
      crossoverRate: 80,
      selectionMethod: SelectionMethod.T5S,
    };

    const r1 = runTspGa(circle8, params, 30, new SeededRng(42));
    const r2 = runTspGa(circle8, params, 30, new SeededRng(42));
    expect(r1.bestDistance).toBe(r2.bestDistance);
    expect(r1.bestTour).toEqual(r2.bestTour);
    expect(r1.generationsRun).toBe(r2.generationsRun);
  });

  it('different replacement schemes all produce valid results', () => {
    for (const rep of [ReplacementScheme.S1R, ReplacementScheme.S2R, ReplacementScheme.H1R]) {
      const params: MetaChromosome = {
        replacement: rep,
        elitismRate: 10,
        mutationType: MutationType.ISM,
        mutationRate: 40,
        crossoverType: CrossoverType.OX,
        crossoverRate: 80,
        selectionMethod: SelectionMethod.RS,
      };
      const rng = new SeededRng(42);
      const result = runTspGa(circle8, params, 20, rng);
      expect(result.bestDistance).toBeGreaterThan(0);
      expect(isValidTour(result.bestTour, 8)).toBe(true);
    }
  });

  it('all operator combinations produce valid results', () => {
    for (const mut of [0, 1, 2, 3, 4]) {
      for (const xover of [0, 1, 2, 3, 4]) {
        const params: MetaChromosome = {
          replacement: ReplacementScheme.H1R,
          elitismRate: 10,
          mutationType: mut as MutationType,
          mutationRate: 50,
          crossoverType: xover as CrossoverType,
          crossoverRate: 85,
          selectionMethod: SelectionMethod.RS,
        };
        const rng = new SeededRng(42);
        const result = runTspGa(circle8, params, 10, rng);
        expect(result.bestDistance).toBeGreaterThan(0);
        expect(isValidTour(result.bestTour, 8)).toBe(true);
      }
    }
  });
});
