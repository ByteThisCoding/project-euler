import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution100 extends AbstractSolution {

    /**
     * We will consider: a is number of blue, b is total count
     * Find a and b such that:
     * ==> (a/b)*((a-1)/(b-1)) = 1/2
     * ==> (a^2-a) / (b^2-b) = 1/2
     * 
     * Diophantine Equation:
     * ==> 2a^2 - 2a - (b^2 - b) = 0
     * ==> 2a^2 - 2a - b^2 + b = 0
     * ==> sqrt(2)a^2 - 2a = b^2 - b
     * https://www.wolframalpha.com/input/?i=2a%5E2+-+2a+-+b%5E2+%2B+b+%3D+0
     */

    //intermediate values
    private sqrt2 = Math.sqrt(2);
    private c3mSqrt2 = 3 - 2 * this.sqrt2;
    private c3pSqrt2 = 3 + 2 * this.sqrt2;

    getProblemName(): string {
        return "Arranged Probability";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        const limit = 10 ** 12;
        for (let n = 1; true; n++) {
            const blueCount = this.calcNthA(n);
            const redCount = this.calcBFromA(blueCount);
            if (blueCount + redCount > limit) {
                return blueCount;
            }
        }
    }

    /**
     * Calculate the Nth item of A
     *  given the integer solution equation
     * @param n 
     * @returns 
     */
    private calcNthA(n: number): number {
        const cm3p = this.c3mSqrt2 ** n;
        const cp3p = this.c3pSqrt2 ** n;
        const calc = -(1 / 8) * (
            -2 * cm3p - this.sqrt2 * cm3p
            - 2 * cp3p + this.sqrt2 * cp3p
            + 4
        );
        return Math.round(calc) + 1;
    }

    private calcBFromA(a: number): number {
        return 1 / 2 * (
            Math.sqrt(8 * a ** 2 - 8 * a + 1)
            + 1
        );
    }

}