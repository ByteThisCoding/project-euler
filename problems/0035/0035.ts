import { SortedArray } from "@byte-this/collections";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution35 extends AbstractSolution {

    getProblemName(): string {
        return "Circular Primes";
    }

    protected solve() {
        return this.doSolve(1_000_000);
    }

    /**
     * Iterate over primes until we're past the limit
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {
        //use a set to automatically filter duplicates
        let allCircularPrimes = new Set<number>();

        Primes.iterateOverPrimes((prime, stop) => {
            if (prime > limit) {
                stop();
            } else {
                if (!allCircularPrimes.has(prime)) {
                    const circularPrimes = this.determineCircularPrimes(prime);
                    circularPrimes.forEach(cp => allCircularPrimes.add(cp));
                }
            }
        })

        return allCircularPrimes.size;
    }

    /**
     * Method assumes input is definitely a prime number
     * Check if all rotations of the number are also prime
     * @param n 
     * @returns 
     */
    private determineCircularPrimes(n: number): number[] {
        const primesSet = new Set<number>();
        primesSet.add(n);

        const primeStr = `${n}`;
        for (let i = 1; i < primeStr.length; i++) {
            const rotatedPrimeStr = primeStr.substring(i)
                + primeStr.substring(0, i);
            const rotatedPrime = parseInt(rotatedPrimeStr);
            if (!Primes.isPrime(rotatedPrime)) {
                return [];
            }
            primesSet.add(rotatedPrime);
        }

        return Array.from(primesSet);
    }

}