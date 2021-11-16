import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution97 extends AbstractSolution {
    
    getProblemName(): string {
        return "Large Non-Mersenne Prime";
    }

    /**
     * Keep performing operation
     * At each step, limit to modulus
     */
    protected solve() {
        let power = 2;
        for (let n=2; n<=7830457; n++) {
            //10_000_000_000 = 10 digits
            power = (power * 2) % 10_000_000_000;
        }
        return (power * 28433 + 1) % 10_000_000_000;
    }

}