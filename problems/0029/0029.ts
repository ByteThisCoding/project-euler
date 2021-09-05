import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution29 extends AbstractSolution {

    getProblemName(): string {
        return "Distinct Powers";
    }

    protected solve() {
        return this.bruteForceSolve(100);
    }

    private bruteForceSolve(limit: number): number {
        const powerSet = new Set<BigInt>();
        for (let a = 2n; a<=limit; a++) {

            for (let b = 2n; b<=limit; b++) {

                powerSet.add(a**b);
                powerSet.add(b**a);

            }
        }
        return powerSet.size;
    }

}