import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution56 extends AbstractSolution {

    getProblemName(): string {
        return "Powerful Digit Sum";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): bigint {
        //include all 1 sums
        let maxDigitalSum = 1n;

        for (let a=2n; a<100n; a++) {

            for (let b=1n; b<100n; b++) {

                const thisDigitalSum = this.getPowerDigitalSum(a, b);
                if (thisDigitalSum > maxDigitalSum) {
                    maxDigitalSum = thisDigitalSum;
                }

            }

        }

        return maxDigitalSum;
    }

    private getPowerDigitalSum(a: bigint, b: bigint): bigint {
        if (b === 1n) {
            return a;
        }

        if (a % 10n === 0n) {
            return 1n;
        }

        const powerValue = a**b;
        const powerDigits = Array.from(powerValue.toString());
        
        return powerDigits.reduce((acc, digitStr) => acc + BigInt(digitStr), 0n);

    }

}