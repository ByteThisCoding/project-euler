import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution39 extends AbstractSolution {

    getProblemName(): string {
        return "Integer Right Triangles";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        let maxCount = 0;
        let maxP = 0;
        for (let i=1; i<=1_000; i++) {
            const numRight = this.findNumberIntegerRightTriangles(i);
            if (numRight > maxCount) {
                maxP = i;
                maxCount = numRight;
            }
        }
        return maxP;
    }

    /**
     * Iterate over different a and b combinations to find integer right triangles
     * There are more efficient ways of doing this (generating pythagorean triples)
     *      Those methods are used in later project euler problems
     * @param p 
     * @returns 
     */
    private findNumberIntegerRightTriangles(p: number): number {
        const maxAB = 2*Math.ceil(p/3);

        let count = 0;

        for (let b = 1; b<=maxAB; b++) {
            const bSquared = b*b;
            for (let a = 1; a<=b; a++) {
                const abSum = a + b;
                const aSquared = a*a;

                const c = p - abSum;
                if (aSquared+bSquared === c*c) {
                    count ++;
                }
            }

        }

        return count;
    }
    
    /**
     * a,b,c are integers
     * 
     * a^2 + b^2 = c^2
     * a + b + c = p
     * 
     * a < c
     * b < c
     * a === b
     * 
     * Add restriction: a<=b
     * 
     */

}