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
        const digits = Array.from(`${n}`).map(char => parseInt(char));
        return digits.reduce((acc, digit) => acc + digit**power, 0);
    }


}