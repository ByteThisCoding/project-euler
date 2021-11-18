import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution2 extends AbstractSolution {
    
    getProblemName(): string {
        return "Even Fibonacci Numbers";
    }

    protected solve(): number {
        return this.doSolve(4_000_000);
    }

    private doSolve(limit: number): number {
        let sum: number = 2;
        let prevA: number = 1;
        let prevB: number = 2;
        
        //keep iterating over fibonacci values until we reach the limit
        let curr = this.getNextFibonacci(prevA, prevB);
        while (curr <= limit) {
            //only add to sum if the current is even
            if (curr % 2 === 0) {
                sum += curr;
            }
            //update values and prepare for the next loop iteration
            prevA = prevB;
            prevB = curr;
            curr = this.getNextFibonacci(prevA, prevB);
        }

        return sum;
    }

    /**
     * We don't really need a separate method for this
     * It's just included for clarity for presenting the solution
     * @param prevA 
     * @param prevB 
     * @returns 
     */
    private getNextFibonacci(prevA: number, prevB: number): number {
        return prevA + prevB;
    }

}