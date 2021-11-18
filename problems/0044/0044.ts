import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution44 extends AbstractSolution {

    getProblemName(): string {
        return "Pentagon Numbers";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Iterate over different values of k and j (pairs)
     * Find pairs which both add and subtract to pentagonal numbers
     * @returns 
     */
    private doSolve(): number {
        for (let kIndex = 2; true; kIndex++) {
            const kValue = this.pOfN(kIndex);

            for (let jIndex = 1; jIndex < kIndex; jIndex++) {

                const jValue = this.pOfN(jIndex);

                if (this.isPentagonal(jValue + kValue) && this.isPentagonal(Math.abs(jValue - kValue))) {
                    return Math.abs(jValue - kValue);
                }

            }

        }
    }

    /**
     * p(n) as described by the problem
     * @param n 
     * @returns 
     */
    private pOfN(n: number): number {
        return n*(3*n-1)/2;
    }

    private isPentagonal(n: number): boolean {
        const squareRoot = Math.sqrt(1+24*n);
        return squareRoot % 6 === 5;
    }

    /**
     * 
     * P(n) = n*(3*n-1)/2
     * QualifyP(n) = 
     * -----> x = n*(3n-1)/2
     * -----> 2x = n*(3n-1)
     * -----> 2x = 3n^2 - n
     * -----> 3n^2 - n - 2x = 0
     * -----> Quad Formula: (-b+sqrt(b^2-4ac))/(2a)
     * -----> n = (1+Math.sqrt(1+24*x))/6
     * QualifyP(n) = (1+Math.sqrt(1+24*x))/6 is an integer
     * 1, 5, 12, 22, 35, 51, 70, 92, 117, 145
     * 
     * Diff(n) = 3n + 1
     * QualifyDiff(n) = (n - 1) % 3 === 0 || n % 3 === 1
     * 4, 7, 10, 13, 16, 19, 22
     * 
     */

}