import { Equals } from "@byte-this/funscript";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution52 extends AbstractSolution {

    getProblemName(): string {
        return "Permuted Multiples";
    }

    protected solve() {
        return this.doSolve(6);
    }

    private doSolve(limit: number): number {
        for (let x=10; true; x++) {
            if (this.isValidPerm(x, limit)) {
                return x;
            }
        }
    }


    private isValidPerm(x: number, limit: number): boolean {
        const xDigits = Array.from(x.toString()).sort();

        for (let i=limit; i>1; i--) {
            const xMultiple = x*i;
            const xmDigits = Array.from(xMultiple.toString()).sort();
            if (!Equals(xDigits, xmDigits)) {
                return false;
            }
        }

        return true;
    }

}