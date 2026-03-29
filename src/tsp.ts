import { City, Tour, TspInstance } from './types.js';

/** Euclidean distance between two cities */
export function cityDistance(a: City, b: City): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Total tour distance (including return to start) */
export function tourDistance(tour: Tour, cities: City[]): number {
  let dist = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    dist += cityDistance(cities[tour[i]], cities[tour[i + 1]]);
  }
  // Return to start
  dist += cityDistance(cities[tour[tour.length - 1]], cities[tour[0]]);
  return dist;
}

/** Pre-compute distance matrix for efficiency */
export function buildDistanceMatrix(cities: City[]): number[][] {
  const n = cities.length;
  const matrix: number[][] = Array.from({ length: n }, () => new Array(n));
  for (let i = 0; i < n; i++) {
    matrix[i][i] = 0;
    for (let j = i + 1; j < n; j++) {
      const d = cityDistance(cities[i], cities[j]);
      matrix[i][j] = d;
      matrix[j][i] = d;
    }
  }
  return matrix;
}

/** Total tour distance using pre-computed distance matrix */
export function tourDistanceMatrix(tour: Tour, distMatrix: number[][]): number {
  let dist = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    dist += distMatrix[tour[i]][tour[i + 1]];
  }
  dist += distMatrix[tour[tour.length - 1]][tour[0]];
  return dist;
}

/** Check if a tour is a valid permutation of [0..n-1] */
export function isValidTour(tour: Tour, n: number): boolean {
  if (tour.length !== n) return false;
  const seen = new Set(tour);
  if (seen.size !== n) return false;
  for (const city of tour) {
    if (city < 0 || city >= n) return false;
  }
  return true;
}

/** Parse a TSPLIB-format .tsp file */
export function parseTsplib(content: string, knownOptimum: number = Infinity): TspInstance {
  const lines = content.split('\n');
  let name = 'unknown';
  const cities: City[] = [];
  let inCoordSection = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('NAME')) {
      name = trimmed.split(':')[1]?.trim() ?? name;
    } else if (trimmed === 'NODE_COORD_SECTION') {
      inCoordSection = true;
    } else if (trimmed === 'EOF') {
      break;
    } else if (inCoordSection) {
      const parts = trimmed.split(/\s+/);
      if (parts.length >= 3) {
        cities.push({ x: parseFloat(parts[1]), y: parseFloat(parts[2]) });
      }
    }
  }

  return { name, cities, knownOptimum };
}

/** Generate a circular TSP instance (useful for testing) */
export function generateCircleTsp(n: number, radius: number = 100): TspInstance {
  const cities: City[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n;
    cities.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    });
  }
  // Optimal distance for a circle: n * chord length between adjacent points
  const chordLength = 2 * radius * Math.sin(Math.PI / n);
  const knownOptimum = n * chordLength;

  return { name: `circle${n}`, cities, knownOptimum };
}
