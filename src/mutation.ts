import { Tour, MutationType } from './types.js';
import { SeededRng } from './rng.js';

/**
 * Exchange Mutation (EM): Swap two random cities.
 * [Banzhaf, 1990]
 */
export function exchangeMutation(tour: Tour, rng: SeededRng): Tour {
  const n = tour.length;
  const result = [...tour];
  const i = rng.nextInt(0, n);
  let j = rng.nextInt(0, n - 1);
  if (j >= i) j++;
  [result[i], result[j]] = [result[j], result[i]];
  return result;
}

/**
 * Insertion Mutation (ISM): Pick a random city, remove it, insert at a random position.
 * The insertion spot is taken to be the larger index for simplicity.
 */
export function insertionMutation(tour: Tour, rng: SeededRng): Tour {
  const n = tour.length;
  const result = [...tour];
  const fromIdx = rng.nextInt(0, n);
  let toIdx = rng.nextInt(0, n - 1);
  if (toIdx >= fromIdx) toIdx++;
  const city = result.splice(fromIdx, 1)[0];
  result.splice(toIdx, 0, city);
  return result;
}

/**
 * Simple Inversion Mutation (SIM): Reverse a random substring of length >= 3.
 */
export function simpleInversionMutation(tour: Tour, rng: SeededRng): Tour {
  const n = tour.length;
  if (n < 3) return [...tour];
  const result = [...tour];

  // Pick two cut points giving a substring of length >= 3
  let i = rng.nextInt(0, n - 2);
  let j = rng.nextInt(i + 3, n + 1); // j is exclusive end, so substring length = j - i >= 3
  if (j > n) j = n;
  if (j - i < 3) {
    // Fallback: ensure minimum length
    i = 0;
    j = Math.min(3, n);
  }

  // Reverse the substring in place
  const sub = result.slice(i, j).reverse();
  for (let k = 0; k < sub.length; k++) {
    result[i + k] = sub[k];
  }
  return result;
}

/**
 * Displacement Mutation (DM): Pick a random substring (length 3..n-1),
 * remove it, and insert it at a random position.
 */
export function displacementMutation(tour: Tour, rng: SeededRng): Tour {
  const n = tour.length;
  if (n < 4) return [...tour];

  // Pick substring of length 3..n-1
  const len = rng.nextInt(3, n); // [3, n-1]
  const start = rng.nextInt(0, n - len + 1);

  const result = [...tour];
  const sub = result.splice(start, len);

  // Insert at random position in remaining array
  const insertPos = rng.nextInt(0, result.length + 1);
  result.splice(insertPos, 0, ...sub);
  return result;
}

/**
 * Inversion Mutation (IVM): Pick a random substring, reverse it,
 * then insert the reversed substring at a random position.
 * Combination of SIM and DM.
 */
export function inversionMutation(tour: Tour, rng: SeededRng): Tour {
  const n = tour.length;
  if (n < 4) return [...tour];

  // Pick substring of length 3..n-1
  const len = rng.nextInt(3, n);
  const start = rng.nextInt(0, n - len + 1);

  const result = [...tour];
  const sub = result.splice(start, len).reverse();

  // Insert reversed substring at random position
  const insertPos = rng.nextInt(0, result.length + 1);
  result.splice(insertPos, 0, ...sub);
  return result;
}

/** Apply the specified mutation operator */
export function applyMutation(type: MutationType, tour: Tour, rng: SeededRng): Tour {
  switch (type) {
    case MutationType.EM: return exchangeMutation(tour, rng);
    case MutationType.ISM: return insertionMutation(tour, rng);
    case MutationType.SIM: return simpleInversionMutation(tour, rng);
    case MutationType.DM: return displacementMutation(tour, rng);
    case MutationType.IVM: return inversionMutation(tour, rng);
  }
}
