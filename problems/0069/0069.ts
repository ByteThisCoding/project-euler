import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";
import { Totient } from "../../utils/totient";

@RunSolution
export class Solution69 extends AbstractSolution {

    getProblemName(): string {
        return "Totient Maximum";
    }

    protected solve() {
        return this.doSolve(1_000_000);

        //return this.totientOfN(36);
    }

    private doSolve(limit: number): number {
        let maxN = 0;
        let maxRatio = 0;

        for (let n=2; n<=limit; n++) {
            const totient = Totient.getTotientOfN(n);
            const ratio = n/totient;
            if (ratio > maxRatio) {
                maxN = n;
                maxRatio = ratio;
            }
        }

        return maxN;
    }

}