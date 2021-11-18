import { AbstractSolution, RunSolution } from "../../utils/solution";
import { Totient } from "../../utils/totient";

@RunSolution
export class Solution69 extends AbstractSolution {

    getProblemName(): string {
        return "Totient Maximum";
    }

    protected solve() {
        return this.doSolve(1_000_000);
    }

    /**
     * We'll use a dynamic programming approach to save time
     * getTotientsUpTo builds an array of all totients up to limit
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {
        let maxN = 0;
        let maxRatio = 0;

        let totients = Totient.getTotientsUpTo(limit);

        for (let n=2; n<=limit; n++) {
            const totient = totients[n];
            const ratio = n/totient;
            if (ratio > maxRatio) {
                maxN = n;
                maxRatio = ratio;
            }
        }

        return maxN;
    }

}