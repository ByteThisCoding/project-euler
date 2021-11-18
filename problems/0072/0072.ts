import { AbstractSolution, RunSolution } from "../../utils/solution";
import { Totient } from "../../utils/totient";

@RunSolution
export class Solution72 extends AbstractSolution {

    getProblemName(): string {
        return "Counting Fractions";
    }

    protected solve() {
        //return this.bruteForceSolve(1_000_000);
        return this.smartSolve(1_000_000);
    }

    /**
     * Use a dynamic programming approach to build up results, then reduce
     * @param limit 
     * @returns 
     */
    private smartSolve(limit: number): number {
        return Totient.getTotientsUpTo(limit)
            .reduce((acc, num) => acc + num, -1);
    }

    /**
     * Without dynamic programming approach, we'd have to calculate for each
     * @param limit 
     * @returns 
     */
    private bruteForceSolve(limit: number): number {
        let sum = 0;
        for (let i=2; i<=limit; i++) {
            sum += Totient.getTotientOfN(i);
        }
        return sum;
    }

}