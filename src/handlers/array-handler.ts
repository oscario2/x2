import { assertEquals, assertStrictEquals } from '../x2-asserts.ts';
import { TAnyArray } from '../x2-types.ts';

export class ArrayHandler {
    constructor(private readonly val: TAnyArray) {}

    /**
     * verify correct overload
     */
    isArray(): boolean {
        return true;
    }

    /**
     * is array of the same primitive type
     * @param cmp
     */
    public toBe(cmp: TAnyArray): void {
        const [t1, t2] = [typeof this.val[0], typeof cmp[0]];
        assertEquals(t1, t2);
    }

    /**
     * is each slot in array equal
     * @param cmp
     */
    public toEqual(cmp: TAnyArray): void {
        const { val } = this;
        assertStrictEquals(cmp.length, val.length);

        for (let i = 0; i < val.length; i++) {
            const [v1, v2] = [val[i], cmp[i]];
            assertStrictEquals(v1, v2);
        }
    }

    /**
     * is array empty
     */
    public isEmpty() {
        assertStrictEquals(this.val.length == 0, true);
    }

    /**
     * is array not empty
     */
    public isNotEmpty() {
        assertStrictEquals(this.val.length > 0, true);
    }
}
