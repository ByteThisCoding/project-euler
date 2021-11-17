import { AbstractSequence } from "./sequence";

/**
 * Encapsulation of the Fibonacci sequence
 * This leverages AbstractSolution, which handles the sequence maintenance
 */
export class Fibonacci extends AbstractSequence<bigint> {

    private static instance = new Fibonacci();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): bigint[] {
        return [1n, 1n];
    }

    protected calculateNthItem(n: number): bigint {
        const left = this.getNthItem(n - 2);
        const right = this.getNthItem(n - 1);
        //@ts-ignore
        return BigInt(left) + BigInt(right);
    }

    public static getNthFibonacciItem(n: number): bigint {
        return this.instance.getNthItem(n);
    }

}