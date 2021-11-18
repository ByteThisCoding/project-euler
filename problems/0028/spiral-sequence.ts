import { AbstractSequence } from "../../utils/sequence";

/**
 * This extends a class which handles maintaining the sequence values
 */
export class SpiralSequence28 extends AbstractSequence<bigint> {

    private static instance = new SpiralSequence28();

    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): bigint[] {
        return [1n, 3n, 5n, 7n, 9n, 13n, 17n, 21n, 25n];
    }

    protected calculateNthItem(n: number): bigint {
        /**
         *  * 1, 2,3,4   ,5,    6, 7, 8, 9     ,10,11 ,12, 13
         *  * 1, 3,5,7,   9,    13,17,21, 25,   31, 37, 43, 49
            * x, prev + 2    prev + 4       prev + 6
         */

        const prevValue = this.getNthItem(n-1);
        const increment = 2n*BigInt(Math.ceil((n-1)/4));

        return prevValue+increment;
    }

    static getNthSpiralNumber(n: number): bigint {
        return SpiralSequence28.instance.getNthItem(n);
    }

    static getSpiralSumOfRange(startN: number, endN: number): bigint {
        return SpiralSequence28.instance.getSumOfRange(startN, endN);
    }

    static getSpiralNumbersInRange(startN: number, endN: number): bigint[] {
        return SpiralSequence28.instance.getItemsInRange(startN, endN);
    }
    
}