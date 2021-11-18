import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution21 extends AbstractSolution {

    /**
     * Store partial pairs in a map
     * For every n, store d(n)
     * When we check for a pair, we'll grab the "new" n
     *      then map it back and see if it equals the original
     */
    private partialPairMap = new Map<number, number>();

    getProblemName(): string {
        return "Amicable Numbers";
    }
    protected solve(): any {
        //return this.dOfN(16)
        return this.doSolve(10_000);
    }

    private doSolve(limit: number): number {
        let sum = 0;
        for (let n=1; n<limit; n++) {
            //if it is in the map, see if we can map it back
            //if so, it is an amicable number pair
            if (this.partialPairMap.has(n)) {
                const dOfN = this.partialPairMap.get(n)!;
                const mapBack = this.dOfN(n);
                if (mapBack === dOfN) {
                    if (dOfN < limit) {
                        sum += dOfN;
                    }
                    sum += n;
                }
            } else {
                //calculate and add to the map for future use
                const dOfN = this.dOfN(n);
                if (n !== dOfN) {
                    this.partialPairMap.set(
                        dOfN,
                        n
                    );
                }
            }
        }

        return sum;
    }

    /**
     * Calculate the d(n) value of n as described in the problem
     * @param n 
     * @returns 
     */
    private dOfN(n: number): number {
        return Integer.getUniqueFactors(n).reduce((acc, int) => {
            if (int === n) {
                return acc;
            }
            return acc + int;
        }, 0);
    }

}