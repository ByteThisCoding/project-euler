import { AbstractSequence } from "../sequence";

export class SquareBigIntSequence extends AbstractSequence<bigint> {

    private static instance = new SquareBigIntSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): bigint[] {
        return [1n, 4n, 9n, 16n, 25n];
    }

    protected calculateNthItem(n: number): bigint {
        return BigInt(n)**2n;
    }

    public static getNthItem(n: number): bigint {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: bigint, nEnd: bigint): bigint[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}