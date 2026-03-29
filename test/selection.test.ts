import { describe, it, expect } from 'vitest';
import { SeededRng } from '../src/rng.js';
import { TspIndividual } from '../src/types.js';
import {
  uniformRandomSelection,
  rankSelection,
  rouletteWheelSelection,
  tournament5Selection,
  selectTwoParents,
} from '../src/selection.js';
import { SelectionMethod } from '../src/types.js';

function makePop(): TspIndividual[] {
  return [
    { tour: [0, 1, 2], distance: 10, fitness: 0.1 },
    { tour: [1, 0, 2], distance: 5, fitness: 0.2 },
    { tour: [2, 1, 0], distance: 3.33, fitness: 0.3 },
    { tour: [0, 2, 1], distance: 2.5, fitness: 0.4 },
    { tour: [1, 2, 0], distance: 2, fitness: 0.5 },
  ];
}

describe('Uniform Random Selection', () => {
  it('returns an individual from the population', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    for (let i = 0; i < 20; i++) {
      const selected = uniformRandomSelection(pop, rng);
      expect(pop).toContain(selected);
    }
  });

  it('excludes the specified individual', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    const excluded = pop[2];
    for (let i = 0; i < 50; i++) {
      const selected = uniformRandomSelection(pop, rng, excluded);
      expect(selected).not.toBe(excluded);
    }
  });
});

describe('Rank Selection', () => {
  it('returns an individual from the population', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    const selected = rankSelection(pop, rng);
    expect(pop).toContain(selected);
  });

  it('tends to select fitter individuals', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    let topCount = 0;
    const trials = 200;
    for (let i = 0; i < trials; i++) {
      const selected = rankSelection(pop, rng);
      if (selected.fitness >= 0.4) topCount++;
    }
    // Top 2 should be selected more than 30% of the time
    expect(topCount / trials).toBeGreaterThan(0.3);
  });
});

describe('Roulette Wheel Selection', () => {
  it('returns an individual from the population', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    const selected = rouletteWheelSelection(pop, rng);
    expect(pop).toContain(selected);
  });
});

describe('Tournament-5 Selection', () => {
  it('returns an individual from the population', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    const selected = tournament5Selection(pop, rng);
    expect(pop).toContain(selected);
  });

  it('with full population, tends to pick the best', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    let bestCount = 0;
    for (let i = 0; i < 100; i++) {
      const selected = tournament5Selection(pop, rng);
      if (selected.fitness === 0.5) bestCount++;
    }
    // With tournament of 5 from pop of 5, should almost always get the best
    expect(bestCount).toBeGreaterThan(50);
  });
});

describe('selectTwoParents', () => {
  it('returns two distinct parents', () => {
    const pop = makePop();
    const rng = new SeededRng(42);
    for (let i = 0; i < 20; i++) {
      const [p1, p2] = selectTwoParents(SelectionMethod.RS, pop, rng);
      expect(p1).not.toBe(p2);
      expect(pop).toContain(p1);
      expect(pop).toContain(p2);
    }
  });
});
