import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution56 extends AbstractSolution {

    getProblemName(): string {
        return "Powerful Digit Sum";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Iterate over a and b values and perform digital sums
     * @returns 
     */
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

    /**
     * If multiple of ten, then everything but 
     * @param a 
     * @param b 
     * @returns 
     */
    private getPowerDigitalSum(a: bigint, b: bigint): bigint {
        if (a % 10n === 0n) {
            //it could be anything from 1 to 9, but since it won't be largest anyway, this is fine
            return 1n;
        }

        const powerValue = a**b;
        const powerString = powerValue.toString();
        let sum = 0n;
        for (let i=0; i<powerString.length; i++) {
            sum += BigInt(powerString[i]);
        }
        return sum;

    }

}