import { Tour, CrossoverType } from './types.js';
import { SeededRng } from './rng.js';

/**
 * Partially Mapped Crossover (PMX)
 * [Goldberg & Lingle, 1985]
 *
 * 1. Pick two random cut points, copy parent1's substring to child.
 * 2. Fill remaining from parent2, using mappings from the swapped substring
 *    to resolve conflicts.
 */
export function pmxCrossover(parent1: Tour, parent2: Tour, rng: SeededRng): Tour {
  const n = parent1.length;
  const child = new Array<number>(n).fill(-1);

  // Pick two cut points
  const cp1 = rng.nextInt(0, n - 1);
  const cp2 = rng.nextInt(cp1 + 1, n);

  // Copy substring from parent1
  const inChild = new Set<number>();
  for (let i = cp1; i <= cp2; i++) {
    child[i] = parent1[i];
    inChild.add(parent1[i]);
  }

  // Build mapping: for each position in the substring, parent1[i] <-> parent2[i]
  // When a value from parent2 conflicts, we follow the chain:
  // val -> find where val is in the p1 substring -> use the corresponding p2 value
  const p1ToP2 = new Map<number, number>();
  for (let i = cp1; i <= cp2; i++) {
    p1ToP2.set(parent1[i], parent2[i]);
  }

  // Fill remaining positions from parent2
  for (let i = 0; i < n; i++) {
    if (child[i] !== -1) continue;

    let val = parent2[i];
    // Follow the mapping chain until we find a value not already in child
    while (inChild.has(val)) {
      // val is in the child (from the p1 substring). Find the p2 value mapped to it.
      val = p1ToP2.get(val)!;
    }
    child[i] = val;
    inChild.add(val);
  }

  return child;
}

/**
 * Cycle Crossover (CX)
 * [Oliver et al., 1987]
 *
 * Each gene in the child comes from the same position in one of the parents.
 * Cycles are identified and alternately assigned to parent1 or parent2.
 */
export function cxCrossover(parent1: Tour, parent2: Tour, rng: SeededRng): Tour {
  const n = parent1.length;
  const child = new Array<number>(n).fill(-1);
  const visited = new Array<boolean>(n).fill(false);

  // Build position lookup for parent2
  const posInP2 = new Map<number, number>();
  for (let i = 0; i < n; i++) {
    posInP2.set(parent2[i], i);
  }

  let useParent1 = rng.chance(0.5);
  let cycleStart = 0;

  while (cycleStart < n) {
    // Find next unvisited position
    while (cycleStart < n && visited[cycleStart]) cycleStart++;
    if (cycleStart >= n) break;

    // Trace the cycle
    const cyclePositions: number[] = [];
    let pos = cycleStart;
    do {
      cyclePositions.push(pos);
      visited[pos] = true;
      // Find where parent1[pos] is in parent2, that's the next position
      const val = parent1[pos];
      const posOfValInP2 = posInP2.get(val)!;
      // Now we need to find where parent2[pos] is in parent1
      // Actually: cycle goes pos -> position of parent2[pos] in parent1
      const valInP2AtPos = parent2[pos];
      pos = parent1.indexOf(valInP2AtPos);
    } while (pos !== cycleStart);

    // Assign this cycle from the chosen parent
    for (const p of cyclePositions) {
      child[p] = useParent1 ? parent1[p] : parent2[p];
    }
    useParent1 = !useParent1;
  }

  return child;
}

/**
 * Order Crossover (OX)
 * [Davis, 1985]
 *
 * 1. Copy a random substring from parent1 to child.
 * 2. Fill remaining positions with cities from parent2 in order,
 *    starting from the end of the copied substring, skipping already-present cities.
 */
export function oxCrossover(parent1: Tour, parent2: Tour, rng: SeededRng): Tour {
  const n = parent1.length;
  const child = new Array<number>(n).fill(-1);

  // Pick substring of length [3, n-1]
  const len = rng.nextInt(3, n);
  const start = rng.nextInt(0, n - len + 1);
  const end = start + len; // exclusive

  // Copy substring from parent1
  const inChild = new Set<number>();
  for (let i = start; i < end; i++) {
    child[i] = parent1[i];
    inChild.add(parent1[i]);
  }

  // Fill from parent2, starting after the substring end, wrapping around
  let fillPos = end % n;
  let p2Pos = end % n;
  let filled = 0;
  const toFill = n - len;

  while (filled < toFill) {
    const city = parent2[p2Pos];
    if (!inChild.has(city)) {
      child[fillPos] = city;
      inChild.add(city);
      fillPos = (fillPos + 1) % n;
      filled++;
    }
    p2Pos = (p2Pos + 1) % n;
  }

  return child;
}

/**
 * Edge Recombination Crossover (ERX)
 * [Whitley et al., 1989]
 *
 * Builds an edge list from both parents, then constructs the child
 * by always choosing the neighbor with the shortest edge list.
 */
export function erxCrossover(parent1: Tour, parent2: Tour, rng: SeededRng): Tour {
  const n = parent1.length;

  // Build edge lists
  const edgeList = new Map<number, Set<number>>();
  for (let i = 0; i < n; i++) {
    edgeList.set(i, new Set());
  }

  function addEdges(parent: Tour) {
    for (let i = 0; i < n; i++) {
      const a = parent[i];
      const b = parent[(i + 1) % n];
      edgeList.get(a)!.add(b);
      edgeList.get(b)!.add(a);
    }
  }

  addEdges(parent1);
  addEdges(parent2);

  const child: number[] = [];
  const used = new Set<number>();

  // Start with the city having the shortest edge list
  let current = -1;
  let minEdges = Infinity;
  for (const [city, edges] of edgeList) {
    if (edges.size < minEdges) {
      minEdges = edges.size;
      current = city;
    }
  }

  child.push(current);
  used.add(current);

  // Remove current from all edge lists
  for (const edges of edgeList.values()) {
    edges.delete(current);
  }

  while (child.length < n) {
    const neighbors = edgeList.get(current)!;

    let next = -1;

    if (neighbors.size > 0) {
      // Choose neighbor with shortest edge list
      let minSize = Infinity;
      for (const neighbor of neighbors) {
        if (!used.has(neighbor)) {
          const size = edgeList.get(neighbor)!.size;
          if (size < minSize) {
            minSize = size;
            next = neighbor;
          }
        }
      }
    }

    if (next === -1) {
      // No unused neighbors; pick any unused city with shortest edge list
      let minSize = Infinity;
      for (let i = 0; i < n; i++) {
        if (!used.has(i)) {
          const size = edgeList.get(i)!.size;
          if (size < minSize) {
            minSize = size;
            next = i;
          }
        }
      }
    }

    child.push(next);
    used.add(next);
    current = next;

    // Remove current from all edge lists
    for (const edges of edgeList.values()) {
      edges.delete(current);
    }
  }

  return child;
}

/**
 * Maximal Preservative Crossover (MPX)
 * [Muhlenbein et al., 1988]
 *
 * Like OX but the substring is always placed at the beginning of the child.
 * Substring length: [3, n-1]
 */
export function mpxCrossover(parent1: Tour, parent2: Tour, rng: SeededRng): Tour {
  const n = parent1.length;
  const child = new Array<number>(n).fill(-1);

  // Pick substring of length [3, n-1] from parent1
  const len = rng.nextInt(3, n);
  const start = rng.nextInt(0, n - len + 1);

  // Copy substring to beginning of child
  const inChild = new Set<number>();
  for (let i = 0; i < len; i++) {
    child[i] = parent1[start + i];
    inChild.add(parent1[start + i]);
  }

  // Fill remaining from parent2 in order
  let fillPos = len;
  for (let i = 0; i < n; i++) {
    const city = parent2[i];
    if (!inChild.has(city)) {
      child[fillPos] = city;
      fillPos++;
    }
  }

  return child;
}

/** Apply the specified crossover operator */
export function applyCrossover(
  type: CrossoverType,
  parent1: Tour,
  parent2: Tour,
  rng: SeededRng,
): Tour {
  switch (type) {
    case CrossoverType.PMX: return pmxCrossover(parent1, parent2, rng);
    case CrossoverType.CX: return cxCrossover(parent1, parent2, rng);
    case CrossoverType.OX: return oxCrossover(parent1, parent2, rng);
    case CrossoverType.ERX: return erxCrossover(parent1, parent2, rng);
    case CrossoverType.MPX: return mpxCrossover(parent1, parent2, rng);
  }
}
