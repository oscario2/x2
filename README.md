# X2

[![X2](https://github.com/oscario2/x2/actions/workflows/main.yaml/badge.svg)](https://github.com/oscario2/x2/actions/workflows/main.yaml)

## Introduction

A lightweight test runner inspired by popular libraries such as `mocha`. Made in `deno` as a learning experience.

* Supports `deno`, `node` and the `browser` bundled.
* Features `expect` overloads and pretty stack prints.

### Start

```js
// instantiate all supported methods
const { describe, it, expect, beforeEach, beforeAll, afterEach, afterAll } = new X2('TestSuiteName');

// runner
await describe('compare types', () => {
    it('equals two primitive values', () => {
        expect(1).toEqual(1);
    });

    // overload provides proper types for e.g Array
    it('ensures array is not empty', () => {
        expect([1, 2]).isNotEmpty()
    });

    it('catches errors', () => {
        expect(() => {
            throw new Error('crash');
        }).toThrow(Error);
    });

    it('ensure object structures are equal', () => {
        expect({ a: 1 }).toBe({ a: 1 });
    });

    // each overload can be verified with their corresponding is*()
    it('should be of type', () => {
        expect(1).isPrimitive();
        expect({ a: 1 }).isObject();
        expect([1]).isArray();
    })
})
```

More examples can be found under `tests/`
