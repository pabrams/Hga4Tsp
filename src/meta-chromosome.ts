import {
  MetaChromosome,
  MetaIndividual,
  ReplacementScheme,
  MutationType,
  CrossoverType,
  SelectionMethod,
} from './types.js';
import { SeededRng } from './rng.js';

/** Number of alleles for each gene */
const GENE_ALLELE_COUNTS = [3, 101, 5, 101, 5, 101, 4];

/** Generate a random meta-chromosome */
export function randomMetaChromosome(rng: SeededRng): MetaChromosome {
  return {
    replacement: rng.nextInt(0, 3) as ReplacementScheme,
    elitismRate: rng.nextInt(0, 101),
    mutationType: rng.nextInt(0, 5) as MutationType,
    mutationRate: rng.nextInt(0, 101),
    crossoverType: rng.nextInt(0, 5) as CrossoverType,
    crossoverRate: rng.nextInt(0, 101),
    selectionMethod: rng.nextInt(0, 4) as SelectionMethod,
  };
}

/** Convert meta-chromosome to an array of integer gene values */
export function metaToArray(mc: MetaChromosome): number[] {
  return [
    mc.replacement,
    mc.elitismRate,
    mc.mutationType,
    mc.mutationRate,
    mc.crossoverType,
    mc.crossoverRate,
    mc.selectionMethod,
  ];
}

/** Convert array of gene values back to a meta-chromosome */
export function arrayToMeta(genes: number[]): MetaChromosome {
  return {
    replacement: genes[0] as ReplacementScheme,
    elitismRate: genes[1],
    mutationType: genes[2] as MutationType,
    mutationRate: genes[3],
    crossoverType: genes[4] as CrossoverType,
    crossoverRate: genes[5],
    selectionMethod: genes[6] as SelectionMethod,
  };
}

/**
 * Meta-GA single-point crossover.
 * Pick a random locus, swap the two halves, return one child (coin flip).
 */
export function metaCrossover(
  parent1: MetaChromosome,
  parent2: MetaChromosome,
  rng: SeededRng,
): MetaChromosome {
  const genes1 = metaToArray(parent1);
  const genes2 = metaToArray(parent2);
  const numGenes = genes1.length;

  // Single crossover point: [1, numGenes-1]
  const cp = rng.nextInt(1, numGenes);

  const child1 = [...genes1.slice(0, cp), ...genes2.slice(cp)];
  const child2 = [...genes2.slice(0, cp), ...genes1.slice(cp)];

  // Coin flip to decide which child to use
  return arrayToMeta(rng.chance(0.5) ? child1 : child2);
}

/**
 * Meta-GA mutation: pick a random gene, assign a random valid allele.
 */
export function metaMutation(mc: MetaChromosome, rng: SeededRng): MetaChromosome {
  const genes = metaToArray(mc);
  const geneIdx = rng.nextInt(0, genes.length);
  genes[geneIdx] = rng.nextInt(0, GENE_ALLELE_COUNTS[geneIdx]);
  return arrayToMeta(genes);
}

/**
 * Calculate meta-chromosome fitness.
 *
 * fitness = (knownOptimum / bestDistance) * 100
 * If optimum is found: fitness = 110 - (generationsRun / maxGenerations) * 10
 * So max fitness = 110 (if optimum found in generation 0).
 */
export function metaFitness(
  bestDistance: number,
  knownOptimum: number,
  generationsRun: number,
  maxGenerations: number,
): number {
  if (bestDistance <= knownOptimum) {
    return 110 - (generationsRun / maxGenerations) * 10;
  }
  return (knownOptimum / bestDistance) * 100;
}

/** Create a MetaIndividual with initial fitness 0 */
export function makeMetaIndividual(chromosome: MetaChromosome): MetaIndividual {
  return { chromosome, fitness: 0 };
}

/**
 * Select a parent from meta-population using rank selection (p=0.2).
 * This is the fixed selection method for the meta-GA itself.
 */
export function metaRankSelection(
  population: MetaIndividual[],
  rng: SeededRng,
  exclude?: MetaIndividual,
): MetaIndividual {
  const p = 0.2;
  const sorted = [...population]
    .filter(ind => ind !== exclude)
    .sort((a, b) => b.fitness - a.fitness);

  while (true) {
    for (const ind of sorted) {
      if (rng.chance(p)) {
        return ind;
      }
    }
  }
}
