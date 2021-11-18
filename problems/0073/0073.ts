import { Fraction } from "../../utils/fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution73 extends AbstractSolution {

    getProblemName(): string {
        return "Counting Fractions in a Range";
    }

    protected solve() {
        //return this.countFracForD(2);
        //return this.doSolve(8);
        return this.doSolve(12_000);
    }

    /**
     * Count fractions for each denominator 2<=n<=limit
     */
    private doSolve(limit: number): number {
        let count = 0;
        for (let n=2; n<=limit; n++) {
            count += this.countFracForD(n);
        }
        return count;
    }

    /**
     * Narrow down the search space to the left and right co prime range
     *      between 1/3 and 1/2
     * Coprime range is the denominator multiplied by those values
     * @param d 
     * @returns 
     */
    private countFracForD(d: number): number {

        let leftCoPrimeRange = Math.ceil(d * 1/3);
        let rightCoPrimeRange = Math.floor(d * 1/2);

        let count = 0;
        if (leftCoPrimeRange > 1) {
            for (let n=leftCoPrimeRange; n<=rightCoPrimeRange; n++) {
                if (Fraction.gcdTwoNums(n, d) === 1) {
                    count ++;
                }
            }
        }

        return count;

    }

}