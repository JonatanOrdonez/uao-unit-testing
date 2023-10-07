import {
  describe, it, expect, jest,
} from '@jest/globals';
import axios from 'axios';
import { sortNumbers, getTodos } from '../moduleThree.mjs';

describe('sortNumbers', () => {
  it('should sort an array of numbers in ascending order', () => {
    const numbers = [3, 1, 4, 2, 5];
    const expected = [1, 2, 3, 4, 5];
    const result = sortNumbers(numbers);
    expect(result).toEqual(expected);
  });

  it('should throw an error if no numbers are provided', () => {
    const numbers = [];
    expect(() => sortNumbers(numbers)).toThrow('No numbers provided');
  });
});

describe('getTodos', () => {
  it('should fetch todos from the API and return an array', async () => {
    const todos = await getTodos();
    expect(Array.isArray(todos)).toBe(true);
  });

  it('should throw an error if the API returns a non-200 status code', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 500 });
    await expect(getTodos()).rejects.toThrow('Error fetching todos');
  });

  it('should throw an error if no todos are found', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: [] });
    await expect(getTodos()).rejects.toThrow('No todos found');
  });

  it('should throw an error if no completed todos are found', async () => {
    const mockTodos = [
      { id: 1, completed: false },
      { id: 2, completed: false },
      { id: 3, completed: false },
    ];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockTodos });
    await expect(getTodos()).rejects.toThrow('No completed todos found');
  });
});
