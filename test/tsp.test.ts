import { describe, it, expect } from 'vitest';
import { cityDistance, tourDistance, buildDistanceMatrix, tourDistanceMatrix, isValidTour, generateCircleTsp } from '../src/tsp.js';

describe('TSP utilities', () => {
  it('cityDistance computes Euclidean distance', () => {
    expect(cityDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(cityDistance({ x: 1, y: 1 }, { x: 1, y: 1 })).toBe(0);
  });

  it('tourDistance computes total distance including return', () => {
    // Square: (0,0), (1,0), (1,1), (0,1)
    const cities = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
    const tour = [0, 1, 2, 3];
    expect(tourDistance(tour, cities)).toBeCloseTo(4.0);
  });

  it('distance matrix matches direct calculation', () => {
    const cities = [{ x: 0, y: 0 }, { x: 3, y: 4 }, { x: 6, y: 0 }];
    const matrix = buildDistanceMatrix(cities);
    const tour = [0, 1, 2];
    expect(tourDistanceMatrix(tour, matrix)).toBeCloseTo(tourDistance(tour, cities));
  });

  it('isValidTour detects valid and invalid tours', () => {
    expect(isValidTour([0, 1, 2, 3], 4)).toBe(true);
    expect(isValidTour([3, 2, 0, 1], 4)).toBe(true);
    expect(isValidTour([0, 1, 2], 4)).toBe(false);    // wrong length
    expect(isValidTour([0, 1, 1, 3], 4)).toBe(false);  // duplicate
    expect(isValidTour([0, 1, 2, 4], 4)).toBe(false);  // out of range
  });

  it('generateCircleTsp creates correct instance', () => {
    const tsp = generateCircleTsp(4, 1);
    expect(tsp.cities.length).toBe(4);
    expect(tsp.name).toBe('circle4');
    // Optimal for a unit-radius square: 4 * side = 4 * sqrt(2)
    expect(tsp.knownOptimum).toBeCloseTo(4 * Math.sqrt(2), 5);
  });
});
