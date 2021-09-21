import { AbstractSequence } from "../sequence";

export class HexagonalSequence extends AbstractSequence<number> {

    private static instance = new HexagonalSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 6, 15, 28, 45];
    }

    protected calculateNthItem(n: number): number {
        return n*(2*n-1);
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}