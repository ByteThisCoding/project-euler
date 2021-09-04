import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
class Solution0002 extends AbstractSolution {
    getProblemName(): string {
        return "Even Fibonacci Numbers";
    }

    protected solve(): number {
        return this.doSolve(4000000);
    }

    private doSolve(limit: number): number {
        let sum: number = 2;
        let prevA: number = 1;
        let prevB: number = 2;
        
        let curr = this.getNextFibonacci(prevA, prevB);
        while (curr <= limit) {
            if (curr % 2 === 0) {
                sum += curr;
            }
            prevA = prevB;
            prevB = curr;
            curr = this.getNextFibonacci(prevA, prevB);
        }

        return sum;
    }

    private getNextFibonacci(prevA: number, prevB: number): number {
        return prevA + prevB;
    }

}