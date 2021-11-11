import { AbstractSequence } from "../sequence";

export class CubeSequence extends AbstractSequence<number> {

    private static instance = new CubeSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 8, 27];
    }

    protected calculateNthItem(n: number): number {
        return n**3;
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}