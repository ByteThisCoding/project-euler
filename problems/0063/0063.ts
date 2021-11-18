import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution63 extends AbstractSolution {

    getProblemName(): string {
        return "Powerful Digit Counts";
    }

    protected solve() {
        return this.doSolve();
        //return this.getNumNSatisfying(2n);
    }

    /**
     * Iterate over roots until we reach a point where the values grow too large
     * @returns 
     */
    private doSolve(): bigint {
        let lastSum = 9n;
        let sum = 9n;
        for (let n=2n; lastSum > 0; n++) {
            lastSum = this.getNumNSatisfying(n);
            sum += lastSum;
        }
        return sum;
    }

    /**
     * Check n digit numbers to see how many are n powers
     * @param n 
     * @returns 
     */
    private getNumNSatisfying(n: bigint): bigint {
        const nMin = 10n**(n-1n);
        const nMax = nMin*10n - 1n;

        let firstRoot = this.bigIntRoot(nMin, n);
        if (firstRoot**n < nMin) {
            firstRoot += 1n;
        }
        
        const lastRoot = this.bigIntRoot(nMax, n);

        return lastRoot - firstRoot + 1n;
    }

    /**
     * Get the root of a given bigint
     * @param base 
     * @param root 
     * @returns 
     */
    private bigIntRoot(base: bigint, root: bigint) {
        let s = base + 1n;
        let k1 = root - 1n;
        let u = base;
        while (u < s) {
          s = u;
          u = ((u*k1) + base / (u ** k1)) / root;
        }
        return s;
      }

}