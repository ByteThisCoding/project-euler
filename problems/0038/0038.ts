import { SortedArray } from "@byte-this/collections";
import { Equals } from "@byte-this/funscript";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution38 extends AbstractSolution {

    private minMaxMs = [
        [-1, -1],
        [5, 9],
        [4, 4],
        [3, 3],
        [2, 2]
    ];

    private sortedDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => `${digit}`);

    getProblemName(): string {
        return "Pandigital Multiples";
    }

    protected solve() {
        return this.doSolve();
        //return this.getPandigitalNumber(9);
    }

    private doSolve(): number {
        let largestPan = 123456789;
        for (let x=2; x<10_000; x++) {
            const pandigitalNumber = this.getPandigitalNumber(x);
            largestPan = Math.max(largestPan, pandigitalNumber);
        }
        return largestPan;
    }

    private getPandigitalNumber(x: number): number {
        const numDigitsX = `${x}`.length;
        const [minM, maxM] = this.minMaxMs[numDigitsX];

        let xMultiples: number[] = [x];
        let multiplierDigits = new SortedArray<string>(
            SortedArray.compareStrings,
            Array.from(`${x}`)
        );
        for (let m = 2; m<=maxM; m++) {
            const mMultiple = x*m;
            xMultiples.push(mMultiple);
            multiplierDigits.addMany(
                Array.from(`${mMultiple}`)
            );
            if (m >= minM && multiplierDigits.length >= 9) {
                const isSame = Equals(multiplierDigits.toArray(), this.sortedDigits);
                return isSame ? parseInt(xMultiples.join("")) : -1;
            }
        }
        return -1;
    }

    /***
     * x: input
     * m: multiplied by
     * y: input * m
     * n: maximum m
     * 
     * if x is 1 digit
     * ::: Min m is 5
     * ::: Max m is 9
     * 
     * if x is 2 digits
     * ::: Min m is 4
     * ::: Max m is 4
     * 
     * if x is 3 digits
     * ::: Min m is 3
     * ::: Max m is 3
     * 
     * if x is 4 digits
     * ::: Min m is 2
     * ::: Max m is 2
     * 
     * if x is >=5 digits
     * ::: Not possible
     * 
     * 
     */

}