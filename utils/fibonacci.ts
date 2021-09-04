import { AbstractSequence } from "./sequence";

export class Fibonacci extends AbstractSequence<BigInt> {

    private static instance = new Fibonacci();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): BigInt[] {
        return [1n, 1n];
    }

    protected calculateNthItem(n: number): BigInt {
        const left = this.getNthItem(n - 2);
        const right = this.getNthItem(n - 1);
        //@ts-ignore
        return BigInt(left) + BigInt(right);
    }

    public static getNthFibonacciItem(n: number): BigInt {
        return this.instance.getNthItem(n);
    }

}