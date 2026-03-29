import {
  TspIndividual,
  MetaChromosome,
  ReplacementScheme,
} from './types.js';
import { SeededRng } from './rng.js';
import { applyCrossover } from './crossover.js';
import { applyMutation } from './mutation.js';
import { selectTwoParents } from './selection.js';
import { tourDistanceMatrix } from './tsp.js';

function makeTspIndividual(tour: number[], distMatrix: number[][]): TspIndividual {
  const distance = tourDistanceMatrix(tour, distMatrix);
  return { tour, distance, fitness: 1 / distance };
}

/**
 * Generate the next generation using the parameters from a meta-chromosome.
 *
 * All schemes:
 * 1. Copy elite individuals directly to new generation.
 * 2. For remaining slots, flip crossover coin:
 *    - If met: select 2 parents, produce offspring via crossover
 *    - If not met: copy individual from old population
 * 3. Each non-elite individual has probability mutationRate of being mutated.
 *
 * S1R: Single offspring from crossover (coin flip for parent order)
 * S2R: Two offspring per pair (processes 2 slots at a time)
 * H1R: Like S1R, but keeps the fittest among {parent1, parent2, child}
 */
export function generateNextGeneration(
  population: TspIndividual[],
  params: MetaChromosome,
  distMatrix: number[][],
  rng: SeededRng,
): TspIndividual[] {
  const popSize = population.length;
  const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
  const eliteCount = Math.max(1, Math.round((params.elitismRate / 100) * popSize));
  const newPop: TspIndividual[] = [];

  // Copy elites
  for (let i = 0; i < Math.min(eliteCount, popSize); i++) {
    newPop.push(sorted[i]);
  }

  const xRate = params.crossoverRate / 100;
  const mutRate = params.mutationRate / 100;

  switch (params.replacement) {
    case ReplacementScheme.S1R:
      return generateS1R(newPop, population, sorted, popSize, params, xRate, mutRate, distMatrix, rng);
    case ReplacementScheme.S2R:
      return generateS2R(newPop, population, sorted, popSize, params, xRate, mutRate, distMatrix, rng);
    case ReplacementScheme.H1R:
      return generateH1R(newPop, population, sorted, popSize, params, xRate, mutRate, distMatrix, rng);
  }
}

function generateS1R(
  newPop: TspIndividual[],
  population: TspIndividual[],
  _sorted: TspIndividual[],
  popSize: number,
  params: MetaChromosome,
  xRate: number,
  mutRate: number,
  distMatrix: number[][],
  rng: SeededRng,
): TspIndividual[] {
  let idx = newPop.length;
  while (newPop.length < popSize) {
    let child: TspIndividual;

    if (rng.chance(xRate)) {
      const [p1, p2] = selectTwoParents(params.selectionMethod, population, rng);
      // Coin flip for parent order
      const childTour = rng.chance(0.5)
        ? applyCrossover(params.crossoverType, p1.tour, p2.tour, rng)
        : applyCrossover(params.crossoverType, p2.tour, p1.tour, rng);
      child = makeTspIndividual(childTour, distMatrix);
    } else {
      child = population[idx % population.length];
    }

    // Mutation
    if (rng.chance(mutRate)) {
      const mutatedTour = applyMutation(params.mutationType, child.tour, rng);
      child = makeTspIndividual(mutatedTour, distMatrix);
    }

    newPop.push(child);
    idx++;
  }
  return newPop;
}

function generateS2R(
  newPop: TspIndividual[],
  population: TspIndividual[],
  _sorted: TspIndividual[],
  popSize: number,
  params: MetaChromosome,
  xRate: number,
  mutRate: number,
  distMatrix: number[][],
  rng: SeededRng,
): TspIndividual[] {
  let idx = newPop.length;
  while (newPop.length < popSize) {
    if (rng.chance(xRate)) {
      const [p1, p2] = selectTwoParents(params.selectionMethod, population, rng);
      const child1Tour = applyCrossover(params.crossoverType, p1.tour, p2.tour, rng);
      const child2Tour = applyCrossover(params.crossoverType, p2.tour, p1.tour, rng);

      let c1 = makeTspIndividual(child1Tour, distMatrix);
      let c2 = makeTspIndividual(child2Tour, distMatrix);

      if (rng.chance(mutRate)) {
        c1 = makeTspIndividual(applyMutation(params.mutationType, c1.tour, rng), distMatrix);
      }
      if (rng.chance(mutRate)) {
        c2 = makeTspIndividual(applyMutation(params.mutationType, c2.tour, rng), distMatrix);
      }

      newPop.push(c1);
      if (newPop.length < popSize) {
        newPop.push(c2);
      }
    } else {
      let child = population[idx % population.length];
      if (rng.chance(mutRate)) {
        child = makeTspIndividual(applyMutation(params.mutationType, child.tour, rng), distMatrix);
      }
      newPop.push(child);
    }
    idx++;
  }

  // Trim if we overshot
  return newPop.slice(0, popSize);
}

function generateH1R(
  newPop: TspIndividual[],
  population: TspIndividual[],
  _sorted: TspIndividual[],
  popSize: number,
  params: MetaChromosome,
  xRate: number,
  mutRate: number,
  distMatrix: number[][],
  rng: SeededRng,
): TspIndividual[] {
  let idx = newPop.length;
  while (newPop.length < popSize) {
    let child: TspIndividual;

    if (rng.chance(xRate)) {
      const [p1, p2] = selectTwoParents(params.selectionMethod, population, rng);
      // Coin flip for parent order
      const childTour = rng.chance(0.5)
        ? applyCrossover(params.crossoverType, p1.tour, p2.tour, rng)
        : applyCrossover(params.crossoverType, p2.tour, p1.tour, rng);
      child = makeTspIndividual(childTour, distMatrix);

      // H1R: keep the fittest among parent1, parent2, and child
      if (p1.fitness > child.fitness && p1.fitness > p2.fitness) {
        child = p1;
      } else if (p2.fitness > child.fitness) {
        child = p2;
      }
    } else {
      child = population[idx % population.length];
    }

    // Mutation
    if (rng.chance(mutRate)) {
      const mutatedTour = applyMutation(params.mutationType, child.tour, rng);
      child = makeTspIndividual(mutatedTour, distMatrix);
    }

    newPop.push(child);
    idx++;
  }
  return newPop;
}
