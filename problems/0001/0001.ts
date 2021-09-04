import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
class Solution0001 extends AbstractSolution {
    getProblemName(): string {
        return "Multiples of 3 or 5";
    }

    protected solve() {
        //return this.bruteForceSolve(9876543);
        //solution: 233168
        return this.smartSolve(9876543);
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