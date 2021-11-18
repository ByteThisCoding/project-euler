import { Combinations } from "../../utils/combinations";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution52 extends AbstractSolution {

    getProblemName(): string {
        return "Permuted Multiples";
    }

    protected solve() {
        return this.doSolve(6);
    }

    /**
     * Keep searching until we find something which matches the criteria
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {
        for (let x=10; true; x++) {
            if (this.isValidPerm(x, limit)) {
                return x;
            }
        }
    }


    /**
     * Check if x, and multiple from limit down to 1, are digit permutations
     * If a non-match is found, return false
     * @param x 
     * @param limit 
     * @returns 
     */
    private isValidPerm(x: number, limit: number): boolean {

        for (let i=limit; i>1; i--) {
            const xMultiple = x*i;
            if (!Combinations.areDigitsPermutations(x, xMultiple)) {
                return false;
            }
        }

        return true;
    }

}