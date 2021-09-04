import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
class Solution10 extends AbstractSolution {

    getProblemName(): string {
        return "Summation of Primes";
    }

    protected solve(): number {
        //return this.doSolve(10);
        return this.doSolve(2000000);
        //142913828922 : 546ms
    }

    private doSolve(limit: number): number {
        let sum = 0;
        let lastPrime = 2;

        for (let i=2; lastPrime < limit; i++) {
            sum += lastPrime;
            lastPrime = Primes.getNthPrime(i);
        }

        return sum;
    }
    

}