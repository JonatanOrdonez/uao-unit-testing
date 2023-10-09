import { describe, test, expect, jest } from '@jest/globals';
import { divide, getPosts } from '../moduleOne.mjs';
import axios from 'axios';

describe('divide', () => {
    test('división válida', () => {
        const a = 10;
        const b = 2;
        const expected = 5;

        const result = divide(a, b);

        expect(result).toBe(expected);
    });

    test('división por cero debe generar un error', () => {
        const a = 10;
        const b = 0;

        expect(() => divide(a, b)).toThrow('Error dividing by zero');
    });
});

describe('getPosts', () => {
    test('obtiene una lista de publicaciones', async () => {
        const response = { status: 200, data: [{ title: 'Post 1' }, { title: 'Post 2' }] };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        const posts = await getPosts();

        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThan(0);

        axiosTest.mockRestore();
    });

    test('genera error si no se obtienen las publicaciones', async () => {
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockRejectedValue(new Error('Error fetching posts'));

        await expect(getPosts()).rejects.toThrow('Error fetching posts');

        axiosTest.mockRestore();
    });

    test('cuando no se obtiene una respuesta de array', async () => {
        const response = { status: 200, data: {} };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        await expect(getPosts()).rejects.toThrow('Data is not an array');

        axiosTest.mockRestore();
    });

    test('cuando no se encuentran publicaciones', async () => {
        const response = { status: 200, data: [] };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        await expect(getPosts()).rejects.toThrow('No posts found');

        axiosTest.mockRestore();
    });

    test('cuando se obtienen demasiadas publicaciones', async () => {
        const response = { status: 200, data: new Array(11) };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        await expect(getPosts()).rejects.toThrow('Too many posts');

        axiosTest.mockRestore();
    });
});
