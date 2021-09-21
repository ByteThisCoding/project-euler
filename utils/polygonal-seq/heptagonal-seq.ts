import { AbstractSequence } from "../sequence";

export class HeptagonalSequence extends AbstractSequence<number> {

    private static instance = new HeptagonalSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 7, 18, 34, 55];
    }

    protected calculateNthItem(n: number): number {
        return n*(5*n-3)/2;
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}