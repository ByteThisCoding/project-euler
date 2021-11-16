import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution30 extends AbstractSolution {

    getProblemName(): string {
        return "Digit Fifth Powers";
    }

    protected solve() {
        return this.doSolve(4);
    }

    private doSolve(power: number): number {

        let sum = 0;
        const limit = 10**(power+1);
        for (let i=10; i<limit; i++) {

            const powerDigitSum = this.getPowerDigitSum(i, power);
            if (powerDigitSum === i) {
                sum += i;
            }

        }

        return sum;

    }

    private getPowerDigitSum(n: number, power: number): number {
        //keep dividing by 10 and mod until we get all digits
        const digits = [];
        let dN = n;
        while (dN > 0) {
            const digit = dN % 10;
            digits.push(digit);
            dN = Math.floor(dN / 10);
        }
        return digits.reduce((acc, digit) => acc + digit**power, 0);
    }


}