import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution3 extends AbstractSolution {

    getProblemName(): string {
        return "Largest Prime Factor";
    }

    protected solve() {
        return this.getLargestPrimeFactor(600851475143);
    }

    /**
     * Loop through numbers up to the sqrt limit
     * If it is a factor of the int and is prime, save it
     * 
     * Note: this can be done more efficiently by iterating over primes directly
     * More efficient implementations are used in later Project Euler problems
     * @param int 
     * @returns 
     */

    private getLargestPrimeFactor(int: number): number {
       
        let largestPrime: number = 1;

        const loopLimit: number = Math.sqrt(int);
        for (let i=2; i<=loopLimit; i++) {
            if (int % i === 0 && Primes.isPrime(i)) {
                largestPrime = i;
            }
        }
        return largestPrime;
    }

    /**
     * This is the original implementation of the "isPrime" method
     * The code above has been updated to use the version in "Primes" class
     *      which is more efficient.
     * 
     * This is kept here for reference purposes
     * @param int 
     * @returns 
     */
    private isPrime(int: number): boolean {
        let isPrime = true;

        const limit = Math.sqrt(int);
        for (let i=2; isPrime && i<=limit; i++) {
            if (int % i === 0) {
                isPrime = false;
            }
        }
        return isPrime;
    }

}