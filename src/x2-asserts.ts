// deno-lint-ignore-file no-explicit-any
import { prettyStack, color } from '../deps.ts';
import { New } from './x2-types.ts';

/**
 * format error message for assert equals
 * @param a
 * @param b
 * @returns
 */
const errorEquals = (a: any, b: any) => {
    const expect = color.green('[Exp]: ') + b;
    const got = color.brightRed('[Got]: ') + a;

    return `\n${expect}\n${got}`;
};

/**
 * is of same type
 * @param a
 * @param b
 */
export const assertEquals = (a: any, b: any): void => {
    if (typeof a != typeof b) {
        throw prettyStack(new Error(errorEquals(a, b)));
    }
};

/**
 * is strictly of same type and same value
 * @param a
 * @param b
 */
export const assertStrictEquals = (a: any, b: any): void => {
    if (typeof a !== typeof b) {
        throw prettyStack(new Error(errorEquals(a, b)));
    }
    if (JSON.stringify(a) !== JSON.stringify(b)) {
        throw prettyStack(new Error(errorEquals(a, b)));
    }
};

/**
 * throws error T
 * @param fn
 * @param cls
 */
export const assertThrows = <T = void>(fn: () => T, cls: New<Error>) => {
    try {
        fn();
    } catch (e) {
        if (e instanceof Error === false) {
            throw new Error('A non-Error object was thrown.');
        }
        if (cls && !(e instanceof cls)) {
            const err = new Error(
                `Expected error to be instance of "${cls.name}", but was "${e.constructor.name}"`
            );
            throw prettyStack(err);
        }
    }
};

/**
 * throws error T async
 * @param fn
 * @param cls
 */
export const assertThrowsAsync = async <T = void>(
    fn: () => T,
    cls: New<Error>
) => {
    try {
        await fn();
    } catch (e) {
        if (e instanceof Error === false) {
            throw new Error('A non-Error object was thrown.');
        }
        if (cls && !(e instanceof cls)) {
            const err = new Error(
                `Expected error to be instance of "${cls.name}", but was "${e.constructor.name}"`
            );
            throw prettyStack(err);
        }
    }
};
