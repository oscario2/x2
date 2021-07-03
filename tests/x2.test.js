// @deno-types="../build/index.d.ts"
import { X2 } from '../build/index.js';

// >= es17 for top level async
const { describe, it, expect, beforeEach, beforeAll, afterEach, afterAll } =
    new X2('X2');

await describe('X2Test', () => {
    let count = 0;

    beforeEach(() => {
        count++;
    });

    afterEach(() => {
        count--;
    });

    beforeAll(() => {
        expect(count).toBe(0);
    });

    afterAll(() => {
        expect(count).toBe(0);
    });

    it('equal value', () => {
        expect(1).toEqual(1);
    });

    it('array equal type', () => {
        expect([20, 25]).toBe([1, 2]);
    });

    it('array equal value', () => {
        expect([1, 2]).toEqual([1, 2]);
    });

    it('should throw', () => {
        expect(() => {
            throw new Error('crash');
        }).toThrow(Error);
    });

    it('equal object structure', () => {
        expect({ a: 1 }).toBe({ a: 1 });
    });
}).run();

await describe('Run without it', () => {}).run();

await describe('Second round', () => {
    it('should start a second round', () => {
        expect(1).toBe(1);
    });
}).run();
