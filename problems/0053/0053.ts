import { Combinations } from "../../utils/combinations";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution53 extends AbstractSolution {

    getProblemName(): string {
        return "Combinatoric Selections";
    }

    protected solve() {
        //return Combinations.chooseNFromRCount(23n, 1n);
        return this.doSolve();
    }

    private doSolve(): number {

        let numGreater = 0;

        for (let n=1n; n<=100n; n++) {

            for (let r=1n; r<=n; r++) {

                if (Combinations.chooseNFromRCount(n, r) > 1_000_000) {
                    numGreater ++;
                }

            }

        }

        return numGreater;

    }

    /****
     * 
     * (n/r) = n!/(r!*(n-r)!)
     * (5/3) = 5!/(3!*2!)
     * 
     * 
     */

}