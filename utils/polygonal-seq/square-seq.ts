import { AbstractSequence } from "../sequence";

export class SquareSequence extends AbstractSequence<number> {

    private static instance = new SquareSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 4, 9, 16, 25];
    }

    protected calculateNthItem(n: number): number {
        return n**2;
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}