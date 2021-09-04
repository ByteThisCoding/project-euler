import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
class Solution7 extends AbstractSolution {

    getProblemName(): string {
        return "10001st Prime";
    }

    protected solve(): number {
        //104743
        return Primes.getNthPrime(10001);
        //return Primes.getNthPrime(9);
    }

    

}