import {
  describe, it, expect, jest,
} from '@jest/globals';

import { generateFibonacciSequence } from '../moduleTwo.mjs';

// Mockear Axios
jest.mock('axios');

describe('generateFibonacciSequence', () => {
  describe('generateFibonacciSequence', () => {
    it('debería generar una secuencia de Fibonacci hasta el límite especificado', () => {
      const limit = 2;
      const expectedSequence = [0, 1, 1, 2];
      const result = generateFibonacciSequence(limit);
      expect(result).toEqual(expectedSequence);
    });

    it('debería arrojar un error si el límite es menor o igual a 0', () => {
      expect(() => generateFibonacciSequence(0)).toThrow('Limit must be greater than 0');
      expect(() => generateFibonacciSequence(-5)).toThrow('Limit must be greater than 0');
    });
  });
});
