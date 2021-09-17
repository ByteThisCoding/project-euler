import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution58 extends AbstractSolution {

    getProblemName(): string {
        return "Spiral Primes";
    }

    protected solve() {
        return this.doSolve();   
    }

    private doSolve(): number {
        let lastElement = 9;
        let plusValue = 4;

        let numPrime = 3;
        for (let n=6; numPrime / (n-1) >= .1; n+=4) {

            for (let iN=n; iN<n+3; iN++) {
                lastElement += plusValue;

                if (Primes.isPrime(lastElement)) {
                    numPrime++;
                }
            }
            lastElement += plusValue;
            plusValue+=2;
        }

        return Math.sqrt(lastElement);
    }

    /***
     * 
     * 1, 3, 5, 7,    9, 13, 17, 21,  25,   31, 37, 43, 49
     * +2              +4                 +6    
     * 
     * 
     */

}