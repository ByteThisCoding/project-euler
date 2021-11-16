import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution7 extends AbstractSolution {

    getProblemName(): string {
        return "10001st Prime";
    }

    /**
     * The main logic is implemented in primes.ts
     */
    protected solve(): number {
        return Primes.getNthPrime(10001);
        //return Primes.getNthPrime(9);
    }
}