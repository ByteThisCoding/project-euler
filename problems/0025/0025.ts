import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution25 extends AbstractSolution {

    getProblemName(): string {
        return "1000-Digit Fibonacci Number";
    }

    protected solve(): number {
        return this.doSolve(1_000);
    }

    /**
     * Keep iterating over the sequence and checking the term length
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {
        let index = 0;
        let seqLength = 0;

        let termA = 1n;
        let termB = 1n;
        let fibNum = 0n;
        for (index=1; seqLength < limit; index++) {
            //const fibNum = Fibonacci.getNthFibonacciItem(index);

            fibNum = termA + termB;
            seqLength = fibNum.toString().length

            //prep for next loop
            termA = termB;
            termB = fibNum;
        }
        return index + 1;
    }

}