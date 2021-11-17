import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution10 extends AbstractSolution {

    getProblemName(): string {
        return "Summation of Primes";
    }

    protected solve(): number {
        //return this.doSolve(10);
        return this.doSolve(2000000);
    }

    private doSolve(limit: number): number {
        let sum = 0;
        Primes.iterateOverPrimes((prime, stop) => {
            if (prime > limit) {
                stop();
            } else {
                sum += prime;
            }
        })

        return sum;
    }
    

}