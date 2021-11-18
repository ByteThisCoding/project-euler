import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution29 extends AbstractSolution {

    getProblemName(): string {
        return "Distinct Powers";
    }

    protected solve() {
        return this.bruteForceSolve(100);
    }

    /**
     * Iterate over different powers
     * We'll use a set to handle filtering duplicates automatically
     * @param limit 
     * @returns 
     */
    private bruteForceSolve(limit: number): number {
        const powerSet = new Set<number>();

        //iterate over different values of a and b and store powers
        for (let a = 2; a<=limit; a++) {
            for (let b = 2; b<=limit; b++) {
                powerSet.add(a**b);
            }
        }
        return powerSet.size;
    }

}