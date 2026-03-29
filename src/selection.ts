import { TspIndividual, SelectionMethod } from './types.js';
import { SeededRng } from './rng.js';

/**
 * Uniform Random Selection (S): Pick a random individual.
 */
export function uniformRandomSelection(
  population: TspIndividual[],
  rng: SeededRng,
  exclude?: TspIndividual,
): TspIndividual {
  if (exclude) {
    const filtered = population.filter(ind => ind !== exclude);
    return rng.pick(filtered);
  }
  return rng.pick(population);
}

/**
 * Rank Selection (RS): Iterate through population sorted by fitness.
 * Each individual is selected with probability p=0.2.
 * If none selected after a full pass, restart.
 */
export function rankSelection(
  population: TspIndividual[],
  rng: SeededRng,
  exclude?: TspIndividual,
): TspIndividual {
  const p = 0.2;
  const sorted = [...population]
    .filter(ind => ind !== exclude)
    .sort((a, b) => b.fitness - a.fitness); // best first

  while (true) {
    for (const ind of sorted) {
      if (rng.chance(p)) {
        return ind;
      }
    }
  }
}

/**
 * Roulette Wheel Selection (RWS): Fitness-proportional selection.
 * Each individual gets a slice proportional to its fitness.
 */
export function rouletteWheelSelection(
  population: TspIndividual[],
  rng: SeededRng,
  exclude?: TspIndividual,
): TspIndividual {
  const candidates = exclude
    ? population.filter(ind => ind !== exclude)
    : population;

  const totalFitness = candidates.reduce((sum, ind) => sum + ind.fitness, 0);

  if (totalFitness <= 0) {
    return rng.pick(candidates);
  }

  const spin = rng.next() * totalFitness;
  let cumulative = 0;
  for (const ind of candidates) {
    cumulative += ind.fitness;
    if (cumulative >= spin) {
      return ind;
    }
  }
  return candidates[candidates.length - 1];
}

/**
 * Tournament-5 Selection (T5S): Pick 5 random individuals,
 * return the fittest.
 */
export function tournament5Selection(
  population: TspIndividual[],
  rng: SeededRng,
  exclude?: TspIndividual,
): TspIndividual {
  const candidates = exclude
    ? population.filter(ind => ind !== exclude)
    : population;

  const tournamentSize = Math.min(5, candidates.length);
  let best: TspIndividual = rng.pick(candidates);

  for (let i = 1; i < tournamentSize; i++) {
    const contender = rng.pick(candidates);
    if (contender.fitness > best.fitness) {
      best = contender;
    }
  }

  return best;
}

/** Select a parent using the specified method */
export function selectParent(
  method: SelectionMethod,
  population: TspIndividual[],
  rng: SeededRng,
  exclude?: TspIndividual,
): TspIndividual {
  switch (method) {
    case SelectionMethod.S: return uniformRandomSelection(population, rng, exclude);
    case SelectionMethod.RS: return rankSelection(population, rng, exclude);
    case SelectionMethod.RWS: return rouletteWheelSelection(population, rng, exclude);
    case SelectionMethod.T5S: return tournament5Selection(population, rng, exclude);
  }
}

/**
 * Select two distinct parents from the population.
 * The first parent is removed from consideration when selecting the second.
 */
export function selectTwoParents(
  method: SelectionMethod,
  population: TspIndividual[],
  rng: SeededRng,
): [TspIndividual, TspIndividual] {
  const parent1 = selectParent(method, population, rng);
  const parent2 = selectParent(method, population, rng, parent1);
  return [parent1, parent2];
}
