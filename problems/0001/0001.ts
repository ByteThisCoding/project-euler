import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution1 extends AbstractSolution {
    getProblemName(): string {
        return "Multiples of 3 or 5";
    }

    protected solve() {
        //return this.bruteForceSolve(9876543);
        //solution: 233168
        //return this.smartSolve(9876543);
        return this.smarterSolve(9876543);
    }

    private smarterSolve(limit: number): number {
        const sum3 = 3*this.sumFromOneToN(limit/3);
        const sum5 = 5*this.sumFromOneToN(limit/5);
        const sum15 = 15*this.sumFromOneToN(limit/15);

        return sum3 + sum5 - sum15 - limit;
    }

    private sumFromOneToN(n: number): number {
        n = Math.floor(n);
        return (n*(n+1))/2;
    }

    private smartSolve(limit: number): number {
        let sum: number = 0;
        for (let i=3; i<limit; i+=3) {
            sum += i;
        }

        for (let i=5; i<limit; i+=5) {
            if (i % 3 !== 0) {
                sum += i;
            }
        }

        return sum;
    }

    private bruteForceSolve(limit: number): number {
        let sum: number = 0;
        for (let i=1; i<limit; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }
        return sum;
    }

}