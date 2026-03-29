import {
  TspIndividual,
  TspInstance,
  MetaChromosome,
  TspGaResult,
  Tour,
} from './types.js';
import { SeededRng } from './rng.js';
import { buildDistanceMatrix, tourDistanceMatrix } from './tsp.js';
import { generateNextGeneration } from './replacement.js';

/** Generate a random legal tour */
export function randomTour(n: number, rng: SeededRng): Tour {
  const tour = Array.from({ length: n }, (_, i) => i);
  rng.shuffle(tour);
  return tour;
}

/** Create a TspIndividual from a tour */
export function makeTspIndividual(tour: Tour, distMatrix: number[][]): TspIndividual {
  const distance = tourDistanceMatrix(tour, distMatrix);
  return { tour, distance, fitness: 1 / distance };
}

/**
 * Generate the initial population of random tours.
 * Population size = 2 * numCities (as per the paper).
 * Each tour must have a unique fitness (distance).
 */
export function generateInitialPopulation(
  numCities: number,
  popSize: number,
  distMatrix: number[][],
  rng: SeededRng,
): TspIndividual[] {
  const population: TspIndividual[] = [];
  const seenDistances = new Set<number>();
  let attempts = 0;
  const maxAttempts = popSize * 100;

  while (population.length < popSize && attempts < maxAttempts) {
    const tour = randomTour(numCities, rng);
    const individual = makeTspIndividual(tour, distMatrix);

    // Ensure unique fitness (distance)
    if (!seenDistances.has(individual.distance)) {
      seenDistances.add(individual.distance);
      population.push(individual);
    }
    attempts++;
  }

  // If we couldn't get enough unique ones, just fill with what we have
  while (population.length < popSize) {
    const tour = randomTour(numCities, rng);
    population.push(makeTspIndividual(tour, distMatrix));
  }

  return population;
}

/**
 * Run a TSP GA with the given meta-chromosome parameters.
 * Returns the best distance found and number of generations run.
 *
 * If the optimum is found, evolution stops early.
 */
export function runTspGa(
  instance: TspInstance,
  params: MetaChromosome,
  maxGenerations: number,
  rng: SeededRng,
): TspGaResult {
  const n = instance.cities.length;
  const popSize = 2 * n;
  const distMatrix = buildDistanceMatrix(instance.cities);

  let population = generateInitialPopulation(n, popSize, distMatrix, rng);
  let bestIndividual = getBest(population);
  let generationsRun = 0;

  for (let gen = 0; gen < maxGenerations; gen++) {
    // Check if optimum found
    if (bestIndividual.distance <= instance.knownOptimum) {
      generationsRun = gen;
      break;
    }

    population = generateNextGeneration(population, params, distMatrix, rng);
    const currentBest = getBest(population);
    if (currentBest.fitness > bestIndividual.fitness) {
      bestIndividual = currentBest;
    }
    generationsRun = gen + 1;
  }

  return {
    bestDistance: bestIndividual.distance,
    bestTour: bestIndividual.tour,
    generationsRun,
  };
}

/** Get the fittest individual from a population */
export function getBest(population: TspIndividual[]): TspIndividual {
  return population.reduce((best, ind) =>
    ind.fitness > best.fitness ? ind : best
  );
}
