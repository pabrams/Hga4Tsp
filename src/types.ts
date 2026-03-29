/** A tour is a permutation of city indices [0..n-1] */
export type Tour = number[];

/** A city with x,y coordinates */
export interface City {
  x: number;
  y: number;
}

/** A TSP instance: a list of cities with known optimum distance */
export interface TspInstance {
  name: string;
  cities: City[];
  knownOptimum: number;
}

/** Mutation operator types */
export enum MutationType {
  EM = 0,   // Exchange Mutation
  ISM = 1,  // Insertion Mutation
  SIM = 2,  // Simple Inversion Mutation
  DM = 3,   // Displacement Mutation
  IVM = 4,  // Inversion Mutation
}

/** Crossover operator types */
export enum CrossoverType {
  PMX = 0,  // Partially Mapped Crossover
  CX = 1,   // Cycle Crossover
  OX = 2,   // Order Crossover
  ERX = 3,  // Edge Recombination Crossover
  MPX = 4,  // Maximal Preservative Crossover
}

/** Selection method types */
export enum SelectionMethod {
  S = 0,    // Uniform Random Selection
  RS = 1,   // Rank Selection
  RWS = 2,  // Roulette Wheel Selection
  T5S = 3,  // Tournament-5 Selection
}

/** Replacement scheme types */
export enum ReplacementScheme {
  S1R = 0,  // Simple Single-Offspring Replacement
  S2R = 1,  // Simple Double-Offspring Replacement
  H1R = 2,  // Heuristic Single-Offspring Replacement
}

/** The 7-gene meta-chromosome encoding TSP GA parameters */
export interface MetaChromosome {
  replacement: ReplacementScheme;   // gene 1: 0-2
  elitismRate: number;              // gene 2: 0-100 (percentage)
  mutationType: MutationType;       // gene 3: 0-4
  mutationRate: number;             // gene 4: 0-100 (percentage)
  crossoverType: CrossoverType;     // gene 5: 0-4
  crossoverRate: number;            // gene 6: 0-100 (percentage)
  selectionMethod: SelectionMethod; // gene 7: 0-3
}

/** A meta-GA individual: a meta-chromosome with its fitness */
export interface MetaIndividual {
  chromosome: MetaChromosome;
  fitness: number;
}

/** A TSP GA individual: a tour with its fitness (inverse of distance) */
export interface TspIndividual {
  tour: Tour;
  distance: number;
  fitness: number;
}

/** Result of running a TSP GA */
export interface TspGaResult {
  bestDistance: number;
  bestTour: Tour;
  generationsRun: number;
}

/** Parameters for the meta-GA itself */
export interface MetaGaParams {
  popSize: number;
  numGens: number;
  maxTspGens: number;
  mutRate: number;        // 0-1
  xRate: number;          // 0-1
  elitismPercent: number; // 0-1
  tspInstance: TspInstance;
  seed: number;
}

/** Human-readable labels for meta-chromosome genes */
export const MUTATION_LABELS: Record<MutationType, string> = {
  [MutationType.EM]: 'EM',
  [MutationType.ISM]: 'ISM',
  [MutationType.SIM]: 'SIM',
  [MutationType.DM]: 'DM',
  [MutationType.IVM]: 'IVM',
};

export const CROSSOVER_LABELS: Record<CrossoverType, string> = {
  [CrossoverType.PMX]: 'PMX',
  [CrossoverType.CX]: 'CX',
  [CrossoverType.OX]: 'OX',
  [CrossoverType.ERX]: 'ERX',
  [CrossoverType.MPX]: 'MPX',
};

export const SELECTION_LABELS: Record<SelectionMethod, string> = {
  [SelectionMethod.S]: 'S',
  [SelectionMethod.RS]: 'RS',
  [SelectionMethod.RWS]: 'RWS',
  [SelectionMethod.T5S]: 'T5S',
};

export const REPLACEMENT_LABELS: Record<ReplacementScheme, string> = {
  [ReplacementScheme.S1R]: 'S1R',
  [ReplacementScheme.S2R]: 'S2R',
  [ReplacementScheme.H1R]: 'H1R',
};

export function formatMetaChromosome(mc: MetaChromosome): string {
  return `[[${REPLACEMENT_LABELS[mc.replacement]} E${(mc.elitismRate / 100).toFixed(2)} ${MUTATION_LABELS[mc.mutationType]} ${(mc.mutationRate / 100).toFixed(2)} ${CROSSOVER_LABELS[mc.crossoverType]} ${(mc.crossoverRate / 100).toFixed(2)} ${SELECTION_LABELS[mc.selectionMethod]}]]`;
}
