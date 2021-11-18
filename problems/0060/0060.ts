import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

interface iPathSum {
    path: number[];
    sum: number;
}

@RunSolution
export class Solution60 extends AbstractSolution {

    private primesPairMap = new Map<number, number[]>();
    private isPrimePairMap = new Map<number, Map<number, boolean>>();


    getProblemName(): string {
        return "Prime Pair Sets";
    }

    protected solve() {
        return this.doSolve(5);
    }

    /**
     * Keep searching primes until we reduce the min path sum to a value < current prime
     * @param familySize 
     * @returns 
     */
    private doSolve(familySize: number): number {

        let minPathSum = Infinity;
        let primeValue = 0;
        for (let primeIndex = 1; primeValue < minPathSum; primeIndex++) {
            primeValue = Primes.getNthPrime(primeIndex);

            this.primesPairMap.set(
                primeValue,
                []
            );

            const newPairs: number[] = [];
            let prevPrimeValue = 0;
            for (let prevPrimeIndex = 1; (prevPrimeValue + primeValue) <= minPathSum / (familySize - 2) && prevPrimeIndex < primeIndex; prevPrimeIndex++) {
                prevPrimeValue = Primes.getNthPrime(prevPrimeIndex);

                if (this.isPrimePair(prevPrimeValue, primeValue)) {
                    this.primesPairMap.get(prevPrimeValue)!.push(primeValue);

                    newPairs.push(prevPrimeValue);
                }
            }

            if (newPairs.length >= familySize - 1) {
                const families = newPairs.flatMap(startPrime => {
                    return this.getFamilyPath(startPrime, primeValue, {
                        path: [],
                        sum: 0
                    }, minPathSum, familySize);
                });

                minPathSum = Math.min(minPathSum, families.reduce((min, family) => {
                    if (family.path.length === familySize && family.sum < minPathSum) {
                        return family.sum;
                    }
                    return min;
                }, minPathSum));
            }

        }

        return minPathSum;

    }

    /**
     * Recursive implementation
     * @param startPrime 
     * @param endPrime 
     * @param familySoFar 
     * @param maxSum 
     * @param familySize 
     * @returns 
     */
    private getFamilyPath(startPrime: number, endPrime: number, familySoFar: iPathSum, maxSum: number, familySize: number): iPathSum[] {

        let paths: iPathSum[] = [];
        if (this.isPrimePair(startPrime, endPrime)) {

            const newFamily: iPathSum = {
                path: [...familySoFar.path, startPrime],
                sum: familySoFar.sum + startPrime
            }
            if (newFamily.path.length < familySize
                && newFamily.sum < maxSum / (familySize - newFamily.path.length)
                && this.arePrimePairs(newFamily.path)
            ) {
                const startPrimePairs = this.primesPairMap.get(startPrime)!;

                for (let i = 0; i < startPrimePairs.length; i++) {
                    const pair = startPrimePairs[i];
                    if (newFamily.sum + pair > maxSum) {
                        i = Infinity;
                    } else {
                        if (pair === endPrime) {
                            paths.push({
                                path: [...newFamily.path, endPrime],
                                sum: newFamily.sum + endPrime
                            })
                        } else {
                            const recPairs = this.getFamilyPath(pair, endPrime, newFamily, maxSum, familySize);
                            paths = paths.concat(recPairs);
                        }
                    }
                }
            }
        }
        return paths;
    }

    /**
     * Check against primes in an array
     * @param primes 
     * @returns 
     */
    private arePrimePairs(primes: number[]): boolean {
        for (let a = 0; a < primes.length - 1; a++) {
            for (let b = a + 1; b < primes.length; b++) {
                if (!this.isPrimePair(primes[a], primes[b])) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Determine if we have a prime pair
     * This uses caching for optimization
     * @param a prime
     * @param b prime > a
     * @returns 
     */
    private isPrimePair(a: number, b: number): boolean {
        if (!this.isPrimePairMap.has(a)) {
            this.isPrimePairMap.set(a, new Map<number, boolean>());
        }

        if (!this.isPrimePairMap.get(a)!.has(b)) {
            let isPrime;
            if (!Primes.isPrime(parseInt(`${a}${b}`))) {
                isPrime = false;
            } else {
                isPrime = Primes.isPrime(parseInt(`${b}${a}`));
            }

            this.isPrimePairMap.get(a)!.set(b, isPrime);
        }

        return this.isPrimePairMap.get(a)!.get(b)!;

    }

}