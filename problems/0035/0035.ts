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

    private doSolve(limit: number): number {
        let allCircularPrimes = new Set<number>();

        let lastPrime: number = 0;
        for (let i=1; lastPrime < limit; i++) {
            lastPrime = Primes.getNthPrime(i);
            if (!allCircularPrimes.has(lastPrime)) {
                const circularPrimes = this.determineCircularPrimes(lastPrime);
                circularPrimes.forEach(cp => allCircularPrimes.add(cp));
            }
        }

        //console.log(allCircularPrimes.toArray());
        return allCircularPrimes.size;
    }

    //method assumes input is definitely a prime number
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