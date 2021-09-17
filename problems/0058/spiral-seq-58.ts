import { AbstractSequence } from "../../utils/sequence";

export class SpiralSequence58 extends AbstractSequence<number> {

    private static instance = new SpiralSequence58();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [1, 3, 5, 7, 9, 13];
    }

    protected calculateNthItem(n: number): number {
        return 2*Math.ceil((n-1)/4) + this.getNthItem(n-1);
    }

    public static getNthItem(n: number): number {
        return this.instance.getNthItem(n);
    }
    
    public static getItemsOverRange(nStart: number, nEnd: number): number[] {
        return this.instance.getItemsInRange(nStart, nEnd);
    }
}