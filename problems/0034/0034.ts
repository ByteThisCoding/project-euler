import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution34 extends AbstractSolution {

    private factorials = [
        1,
        1,
        2,
        2*3,
        2*3*4,
        2*3*4*5,
        2*3*4*5*6,
        2*3*4*5*6*7,
        2*3*4*5*6*7*8,
        2*3*4*5*6*7*8*9
    ];

    getProblemName(): string {
        return "Digit Factorials";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        /**
         * 
         * Since 9!*8 < 10^8, we will stop searching once we reach 10 million
         * 
         */

        let sum = 0;
        for (let i = 10; i < 2_540_160; i++) {
            if (this.isCuriousNumber(i)) {
                sum += i;
            }
        }
        return sum;
    }

    private isCuriousNumber(n: number): boolean {
        const digits = Array.from(`${n}`)
            .map(digit => parseInt(digit));

        let sum = 0;
        for (let i=0; i<digits.length; i++) {
            if (sum > n) {
                return false;
            }

            sum += this.factorials[
                digits[i]
            ];
        }
        return sum === n;
    
    }

}