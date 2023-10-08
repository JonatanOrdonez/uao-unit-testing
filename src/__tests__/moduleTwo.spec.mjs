import {
  describe, it, expect, jest,
} from '@jest/globals';

import axios from 'axios';

import { generateFibonacciSequence, getUsers } from '../moduleTwo.mjs';

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

describe('getUsers', () => {
  it('usuario ', async () => {
    const mock = [{ name: 'jhojan' }];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mock });
    const result = await getUsers();
    expect(result).toEqual(mock);
  });

  it('Clementine no aceptado', async () => {
    const mockData = [{ name: 'Clementine' }];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockData });

    try {
      await getUsers();
    } catch (error) {
      expect(error.message).toBe('Clementine is not allowed');
    }
  });

  it('Clementine no aceptado', async () => {
    const mockData = [{ name: 'Clementine' }];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockData });

    try {
      await getUsers();
    } catch (error) {
      expect(error.message).toBe('Clementine is not allowed');
    }
  });

  it('No encontrados', async () => {
    // Configurar el mock de Axios para que responda con una respuesta sin usuarios
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: [] });

    try {
      await getUsers();
    } catch (error) {
      expect(error.message).toBe('No users found');
    }
  });
});
