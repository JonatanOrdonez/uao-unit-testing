import {
  describe, expect, test, jest,
} from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getPosts, divide } from '../moduleOne.mjs';

const mock = new MockAdapter(axios);

// Se configura el mock para simular una respuesta exitosa.
mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
]);

describe('divide function', () => {
  test('test divide two numbers correctly', () => {
    expect(divide(50, 5)).toBe(10);
  });

  test('test divide two numbers when b is zero', () => {
    expect(() => divide(50, 0)).toThrow();
  });
});

describe('getPosts function', () => {
  test('data correctly', async () => {
    const posts = await getPosts();
    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.length).toBeLessThanOrEqual(10);
  });

  test('response status is not 200', async () => {
    // Mockea axios para simular una respuesta con un estado diferente de 200.
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 500 });

    await expect(getPosts()).rejects.toThrow('Error fetching posts');
  });

  test('should throw an error when data is not an array', async () => {
    // Mockea axios para simular una respuesta con datos que no son un array.
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: {} });

    await expect(getPosts()).rejects.toThrow('Data is not an array');
  });

  test('should throw an error when no posts are found', async () => {
    // Mockea axios para simular una respuesta con un arreglo vacío.
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: [] });

    await expect(getPosts()).rejects.toThrow('No posts found');
  });

  test('should throw an error when too many posts are found', async () => {
    // Mockea axios para simular una respuesta con más de 10 elementos.
    const data = Array.from({ length: 11 }, (_, i) => ({ id: i, title: `Post ${i}` }));
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data });

    await expect(getPosts()).rejects.toThrow('Too many posts');
  });
});
