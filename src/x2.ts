// deno-lint-ignore-file no-explicit-any
import { X2Controller } from './x2-controller.ts';

import {
    PrimitiveHandler,
    ArrayHandler,
    ObjectHandler,
    FunctionHandler
} from './x2-service.ts';

import {
    TAnyArray,
    TAnyFunction,
    TAnyObject,
    TAnyPrimitive,
    TExpectOverload
} from './x2-types.ts';

export class X2 {
    private test!: X2Controller;

    /**
     * intialize
     * @param pkg
     */
    constructor(private readonly pkg?: string) {
        // .bind() each class method
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map(k => {
            const key = k as keyof InstanceType<typeof X2>;
            if (this[key] instanceof Function && k !== 'constructor') {
                (this as any)[key] = this[key].bind(this);
            }
        });
    }

    /**
     * top level function which defines current suite
     * @param name
     * @param fn
     */
    public describe(name: string, fn: TAnyFunction): X2Controller {
        this.test = new X2Controller(name, fn, this.pkg);
        return this.test;
    }

    /**
     * nested function of 'describe'
     * @param name
     * @param fn
     */
    public it(name: string, fn: TAnyFunction): void {
        this.test.add('it', { name, fn });
    }

    /**
     * before each 'it'
     * @param fn
     */
    public beforeEach(fn: TAnyFunction): void {
        this.test.add('beforeEach', { fn });
    }

    /**
     * before all 'it'
     * @param fn
     */
    public beforeAll(fn: TAnyFunction): void {
        this.test.add('beforeAll', { fn });
    }

    /**
     * after each 'it'
     * @param fn
     */
    public afterEach(fn: TAnyFunction): void {
        this.test.add('afterEach', { fn });
    }

    /**
     * after all 'it'
     * @param fn
     */
    public afterAll(fn: TAnyFunction): void {
        this.test.add('afterAll', { fn });
    }

    /**
     * overload of types to 'assert'
     * @param value
     */
    expect(value: TAnyPrimitive): PrimitiveHandler;
    expect(value: TAnyFunction): FunctionHandler;
    expect(value: TAnyArray): ArrayHandler;
    expect(value: TAnyObject): ObjectHandler;
    expect(value: TExpectOverload) {
        if (Array.isArray(value)) {
            return new ArrayHandler(value);
        }

        if (typeof value === 'function') {
            return new FunctionHandler(value as TAnyFunction);
        }

        if (typeof value === 'object') {
            return new ObjectHandler(value);
        }

        return new PrimitiveHandler(value as TAnyPrimitive);
    }
}
