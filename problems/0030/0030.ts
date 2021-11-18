import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution30 extends AbstractSolution {

    /**
     * Cache redundant operations to save time
     * Map of map of number, first level is base, second is exponent
     */
    private powerMap: {[key: number]: {[key: number]: number}} = {};

    getProblemName(): string {
        return "Digit Fifth Powers";
    }

    protected solve() {
        return this.doSolve(5);
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
        let total = 0;
        while (n > 0) {
            const digit = n % 10;
            n = Math.floor(n / 10);
            total += this.getPower(digit, power);
        }
        //return digits.reduce((acc, digit) => acc + digit**power, 0);
        return total;
    }

    /**
     * Cache redundant operations to save time
     * Will perform power once and only once
     * @param base 
     * @param exp 
     * @returns 
     */
    private getPower(base: number, exp: number): number {
        if (!this.powerMap[base]) {
            this.powerMap[base] = {};
        }
        if (!this.powerMap[base][exp]) {
            this.powerMap[base][exp] = base**exp;
        }

        return this.powerMap[base][exp];
    }


}