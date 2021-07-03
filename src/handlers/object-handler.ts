import { assertEquals } from '../x2-asserts.ts';
import { TAnyObject } from '../x2-types.ts';

export class ObjectHandler {
    constructor(private readonly val: TAnyObject) {}

    /**
     * verify correct overload
     */
    public isObject(): boolean {
        return true;
    }

    /**
     * is 'object' of the same primitive type
     * @param cmp
     */
    public toBe(cmp: TAnyObject): void {
        assertEquals(this.val, cmp);
    }
}
