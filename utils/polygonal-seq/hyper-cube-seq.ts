import { AbstractSequence } from "../sequence";

export class HyperCubeSequence extends AbstractSequence<number> {

    private static instance = new HyperCubeSequence();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 16];
    }

    protected calculateNthItem(n: number): number {
        return n**4;
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }

    public static getItemsInValueRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInValueRange(nStart, nEnd);
    }
    
}