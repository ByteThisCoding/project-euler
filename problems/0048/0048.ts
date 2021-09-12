import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution48 extends AbstractSolution {

    getProblemName(): string {
        return "Self Powers";
    }

    protected solve() {
        return this.doSolve(1000n);
    }

    private doSolve(limit: bigint): string {
        let sum = 0n; //bigint
        for (let i=1n; i<=limit; i++) {
            sum += i**i;
        }

        const sumStr = sum.toString();
        return sumStr.substring(sumStr.length - 10);
    }

}