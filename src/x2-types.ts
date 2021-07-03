// deno-lint-ignore-file no-explicit-any
import { X2 } from './x2.ts';

export type TObjectish = TAnyObject | TAnyArray | TAnyMap | TAnySet;
export type TObjectishNoSet = TAnyObject | TAnyArray | TAnyMap;

export type TAnyNumber = number | bigint;
export type TAnyPrimitive = string | boolean | TAnyNumber;
export type TAnyObject = { [key: string]: any };
export type TAnyArray = Array<any>;
export type TAnyFunction = () => void | Promise<void>;
export type TAnySet = Set<any>;
export type TAnyMap = Map<any, any>;

export type TAvaliable = keyof InstanceType<typeof X2>;
export type TExpectOverload = TAnyPrimitive | TAnyArray | TAnyObject;
export type TSuite = Record<string, Record<TAvaliable, TAnyFunction[]>>;

export interface ITest {
    name?: string;
    fn: TAnyFunction;
}

export interface New<T> {
    new (...args: any[]): T;
}
