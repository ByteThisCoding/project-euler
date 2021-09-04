import { Fibonacci } from "../../utils/fibonacci";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution25 extends AbstractSolution {

    getProblemName(): string {
        return "1000-Digit Fibonacci Number";
    }

    protected solve(): number {
        return this.doSolve(1000);
    }

    private doSolve(limit: number): number {
        let index = 1;
        let seqLength = 0;
        for (index=1; seqLength < limit; index++) {
            const fibNum = Fibonacci.getNthFibonacciItem(index);
            seqLength = fibNum.toString().length;
        }
        return index - 1;
    }

}