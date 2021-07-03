import { assertThrows, assertThrowsAsync } from '../x2-asserts.ts';
import { New, TAnyFunction } from '../x2-types.ts';

export class FunctionHandler {
    constructor(private readonly val: TAnyFunction) {}

    /**
     * verify correct overload
     */
    public isFunction(): boolean {
        return true;
    }

    /**
     * to throw error
     * @param cmp
     */
    toThrow(cmp: New<Error>): void {
        const { val } = this;

        if (val.constructor.name == 'AsyncFunction') {
            assertThrowsAsync(async () => {
                await val();
            }, cmp);
        } else {
            assertThrows(() => {
                val();
            }, cmp);
        }
    }
}
