import { AbstractSequence } from "../sequence";

export class TriangleSequence extends AbstractSequence<number> {

    private static instance = new TriangleSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 3, 6, 10, 15];
    }

    protected calculateNthItem(n: number): number {
        return n*(n+1)/2;
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}