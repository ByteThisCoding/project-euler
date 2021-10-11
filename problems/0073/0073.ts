import { Fraction } from "../../utils/fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution73 extends AbstractSolution {

    getProblemName(): string {
        return "Counting Fractions in a Range";
    }

    protected solve() {
        //return this.countFracForD(2);
        //return this.doSolve(8);
        return this.doSolve(12_000);
    }

    private doSolve(limit: number): number {
        let count = 0;
        for (let n=2; n<=limit; n++) {
            //console.log(n, this.countFracForD(n));
            count += this.countFracForD(n);
        }
        return count;
    }

    private countFracForD(d: number): number {

        let leftCoPrimeRange = Math.ceil(d * 1/3);
        let rightCoPrimeRange = Math.floor(d * 1/2);

        //console.log({leftCoPrimeRange, rightCoPrimeRange});

        let count = 0;
        if (leftCoPrimeRange > 1) {
            for (let n=leftCoPrimeRange; n<=rightCoPrimeRange; n++) {
                if (Fraction.gcdTwoNums(n, d) === 1) {
                    count ++;
                }
            }
        }

        return count;

    }

}