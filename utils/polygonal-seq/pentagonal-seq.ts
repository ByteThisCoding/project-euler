import { AbstractSequence } from "../sequence";

export class PentagonalSequence extends AbstractSequence<number> {

    private static instance = new PentagonalSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 5, 12, 22, 35];
    }

    protected calculateNthItem(n: number): number {
        return n*(3*n-1)/2;
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}