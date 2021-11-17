import { Fraction } from "../../utils/fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution86 extends AbstractSolution {

    getProblemName(): string {
        return "Cuboid Route";
    }

    protected solve() {
        //return this.doSolve(2_000);
        return this.doSolve(1_000_000);
    }

    /**
     * Generate pythagorean triplets to determine integer line lengths
     * Triplet values will be used to determine cuboid dimensions
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {

        //keep track of count per dimension
        const dimMap = new Map<number, number>();

        let isSearching = true;
        //generate triplets
        for (let m = 2; isSearching; m++) {

            const mSq = m ** 2;

            for (let n = 1; n < m; n++) {

                if ((m + n) % 2 === 1 && Fraction.gcdTwoNums(m, n) === 1) {
                    const nSq = n ** 2;

                    const aRoot = mSq - nSq;
                    const bRoot = 2 * m * n;
                    const cRoot = mSq + nSq;

                    for (let k = 1; true; k++) {

                        const [a, b, c] = [aRoot * k, bRoot * k, cRoot * k].sort((a, b) => a - b);

                        if (b > limit) {
                            if (k === 1) {
                                isSearching = false;
                            }
                            break;
                        }
                        
                        //process a
                        dimMap.set(
                            a,
                            (dimMap.get(a) || 0) + this.calcSingle(b, a)
                        );

                        //procces b
                        dimMap.set(
                            b,
                            (dimMap.get(b) || 0) + this.calcSingle(a, b)
                        );
                        
                    }

                }

            }

        }

        /**
         * Iterate over results
         * Keep counting until we reach limit,
         *  then, return last m value seen
         */
        let count = 0;
        const mKeys = Array.from(dimMap)
            .sort((a, b) => a[0] - b[0]);

        let mMax = 0;
        for (let i = 0; count <= limit; i++) {
            //[m, thisCount]
            count += mKeys[i][1];
            mMax = mKeys[i][0];
        }

        console.log("Count: ", count);
        return mMax;
    }

    /**
     * Get the count for a single combo of:
     *  : a + (b-i) + i
     *  : (a+i) + i + b
     * 
     * single is unaltered
     */
    private calcSingle(plus: number, single: number): number {
        if (single >= plus) {
            return Math.floor(plus/2);
        }

        const calc = single - Math.floor((plus-1)/2);
        return Math.max(0, calc);
    }

}