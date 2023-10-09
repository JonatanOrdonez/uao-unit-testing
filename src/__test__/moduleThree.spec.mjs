import { describe, test, expect, jest } from '@jest/globals';
import { sortNumbers, getTodos } from '../moduleThree.mjs';
import axios from 'axios';

describe('sortNumbers', () => {
    test('ordenar numeros de arreglo', () => {
        const input = [3, 1, 2];
        const expected = [1, 2, 3];

        const result = sortNumbers(input);

        expect(result).toEqual(expected);
    });

    test('generaria error cuando no reciba numeros', () => {
        expect(() => sortNumbers([])).toThrow('No numbers provided');
    });
});

describe('getTodos', () => {
    test('obtiene lista con todos los datos completos', async () => {
        const response = { status: 200, data: [{ completed: true }] };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        const todos = await getTodos();

        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBeGreaterThan(0);

        const completedTodos = todos.filter((todo) => todo.completed);
        expect(completedTodos.length).toBeGreaterThan(0);

        axiosTest.mockRestore();
    });

    test('genera error si no se obtienen los todos datos', async () => {
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockRejectedValue(new Error('Error fetching todos'));

        await expect(getTodos()).rejects.toThrow('Error fetching todos');

        axiosTest.mockRestore();
    });

    test('cuando no se tiene respuesta vacia', async () => {
        const response = { status: 200, data: [] };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        await expect(getTodos()).rejects.toThrow('No todos found');

        axiosTest.mockRestore();
    });

    test('prueba para estado de respuesta diferenta a 200', async () => {
        const response = { status: 404, data: [] };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        await expect(getTodos()).rejects.toThrow('Error fetching todos');

        axiosTest.mockRestore();
    });

    test('gernera error si no estan todos los datos completos', async () => {
        const response = { status: 200, data: [{ completed: false }, { completed: false }] };
        const axiosTest = jest.spyOn(axios, 'get');
        axiosTest.mockResolvedValue(response);

        await expect(getTodos()).rejects.toThrow('No completed todos found');

        axiosTest.mockRestore();
    });
});