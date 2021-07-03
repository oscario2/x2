import { assertEquals, assertStrictEquals } from '../x2-asserts.ts';
import { TAnyNumber, TAnyPrimitive } from '../x2-types.ts';

export class PrimitiveHandler {
    constructor(private readonly val: TAnyPrimitive) {}

    /**
     * verify correct overload
     */
    public isPrimitive(): boolean {
        return true;
    }

    /**
     * is 'value' of the same primitive type
     * @param cmp
     */
    public toBe(cmp: TAnyPrimitive): void {
        assertEquals(this.val, cmp);
    }

    /**
     * is 'value' strictly equal to
     * @param cmp
     */
    public toEqual(cmp: TAnyPrimitive): void {
        assertStrictEquals(this.val, cmp);
    }

    /**
     * is numeric greater then
     * @param cmp
     */
    public moreThen(cmp: TAnyNumber): void {
        const { val } = this;
        assertStrictEquals(isNaN(Number(val)), false);
        assertStrictEquals(this.val > cmp, true);
    }

    /**
     * is numeric less then
     * @param cmp
     */
    public lessThen(cmp: TAnyNumber): void {
        const { val } = this;
        assertStrictEquals(isNaN(Number(val)), false);
        assertStrictEquals(this.val < cmp, true);
    }

    /**
     * value not zero
     */
    public notZero(): void {
        assertStrictEquals(this.val !== 0, true);
    }
}
