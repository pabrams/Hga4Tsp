import {
  MetaIndividual,
  MetaGaParams,
  formatMetaChromosome,
} from './types.js';
import { SeededRng } from './rng.js';
import {
  randomMetaChromosome,
  metaCrossover,
  metaMutation,
  metaFitness,
  makeMetaIndividual,
  metaRankSelection,
} from './meta-chromosome.js';
import { runTspGa } from './tsp-ga.js';

export interface MetaGaCallbacks {
  onGenerationStart?: (gen: number) => void;
  onChromosomeEvaluated?: (gen: number, idx: number, ind: MetaIndividual) => void;
  onGenerationEnd?: (gen: number, population: MetaIndividual[]) => void;
}

/**
 * Evaluate a single meta-individual by running a full TSP GA.
 */
export function evaluateMetaIndividual(
  individual: MetaIndividual,
  params: MetaGaParams,
  rng: SeededRng,
): void {
  const result = runTspGa(
    params.tspInstance,
    individual.chromosome,
    params.maxTspGens,
    rng,
  );

  individual.fitness = metaFitness(
    result.bestDistance,
    params.tspInstance.knownOptimum,
    result.generationsRun,
    params.maxTspGens,
  );
}

/**
 * Run the Meta-GA.
 *
 * Algorithm (from paper Figure 15):
 * 1. Generate population of random meta-chromosomes.
 * 2. For each, calculate fitness by running TSP GA.
 * 3. Sort by fitness, copy top elitismPercent to new population.
 * 4. For each remaining slot: if random > xRate, select 2 parents via
 *    rank selection, produce child via single-point crossover.
 *    Otherwise copy from old population.
 * 5. Each non-elite has probability mutRate of having a random gene mutated.
 * 6. Repeat steps 2-5 for numGens generations.
 */
export function runMetaGa(
  params: MetaGaParams,
  callbacks?: MetaGaCallbacks,
): MetaIndividual[] {
  const rng = new SeededRng(params.seed);

  // Step 1: Generate initial meta-population
  let population: MetaIndividual[] = [];
  for (let i = 0; i < params.popSize; i++) {
    population.push(makeMetaIndividual(randomMetaChromosome(rng)));
  }

  for (let gen = 0; gen < params.numGens; gen++) {
    callbacks?.onGenerationStart?.(gen);

    // Step 2: Evaluate fitness for each individual
    for (let i = 0; i < population.length; i++) {
      // Each TSP GA gets its own sub-seed derived from the meta RNG
      const tspSeed = rng.nextInt(0, 2147483647);
      const tspRng = new SeededRng(tspSeed);
      evaluateMetaIndividual(population[i], params, tspRng);
      callbacks?.onChromosomeEvaluated?.(gen, i, population[i]);
    }

    callbacks?.onGenerationEnd?.(gen, population);

    // Step 3: Sort by fitness
    const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
    const eliteCount = Math.max(1, Math.round(params.elitismPercent * params.popSize));
    const newPop: MetaIndividual[] = [];

    // Copy elites
    for (let i = 0; i < Math.min(eliteCount, params.popSize); i++) {
      newPop.push({ ...sorted[i], chromosome: { ...sorted[i].chromosome } });
    }

    // Step 4: Fill remaining population
    let idx = newPop.length;
    while (newPop.length < params.popSize) {
      let child: MetaIndividual;

      if (rng.chance(params.xRate)) {
        // Select 2 parents via rank selection and crossover
        const p1 = metaRankSelection(population, rng);
        const p2 = metaRankSelection(population, rng, p1);
        const childChromosome = metaCrossover(p1.chromosome, p2.chromosome, rng);
        child = makeMetaIndividual(childChromosome);
      } else {
        // Copy from old population
        child = makeMetaIndividual({ ...sorted[idx % sorted.length].chromosome });
      }

      // Step 5: Mutation
      if (rng.chance(params.mutRate)) {
        child = makeMetaIndividual(metaMutation(child.chromosome, rng));
      }

      newPop.push(child);
      idx++;
    }

    population = newPop;
  }

  // Final evaluation
  for (let i = 0; i < population.length; i++) {
    const tspSeed = rng.nextInt(0, 2147483647);
    const tspRng = new SeededRng(tspSeed);
    evaluateMetaIndividual(population[i], params, tspRng);
  }

  return population.sort((a, b) => b.fitness - a.fitness);
}

/** Print a summary of a meta-GA population */
export function printPopulation(population: MetaIndividual[]): void {
  const sorted = [...population].sort((a, b) => b.fitness - a.fitness);
  for (const ind of sorted) {
    console.log(`${formatMetaChromosome(ind.chromosome)} <${ind.fitness.toFixed(4)}>`);
  }
  const avg = sorted.reduce((s, i) => s + i.fitness, 0) / sorted.length;
  console.log(`Average fitness: ${avg.toFixed(4)}`);
}
