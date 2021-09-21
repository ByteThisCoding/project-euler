import { AbstractSequence } from "../sequence";

export class OctagonalSequence extends AbstractSequence<number> {

    private static instance = new OctagonalSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 8, 21, 40];
    }

    protected calculateNthItem(n: number): number {
        return n*(3*n-2);
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}