import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution50 extends AbstractSolution {

    getProblemName(): string {
        return "Consecutive Prime Sum";
    }

    protected solve() {
        //return this.bruteForceSolve(1_000_000);
        return this.fanOutSolve(1_000_000);
    }

    private fanOutSolve(limit: number): number {
        let numConsecutiveMax = 0;
        let maxNumConsecutivePrime = 0;

        let lowerLimit = 1;

        //end of subsequence
        for (let upperPrimeIndex = 2; Primes.getNthPrime(upperPrimeIndex) < limit - maxNumConsecutivePrime; upperPrimeIndex++) {

            //start of subsequence
            for (let lowerPrimeIndex = lowerLimit; upperPrimeIndex - lowerPrimeIndex >= numConsecutiveMax && lowerPrimeIndex < upperPrimeIndex; lowerPrimeIndex++) {
                const primeSum = Primes.getSumOfPrimesInRange(lowerPrimeIndex, upperPrimeIndex);

                if (primeSum > 0 && primeSum < limit && Primes.isPrime(primeSum)) {
                    numConsecutiveMax = 1 + upperPrimeIndex - lowerPrimeIndex;
                    maxNumConsecutivePrime = primeSum;
                    //console.log({ primeSum, numConsecutiveMax, lowerPrimeIndex, upperPrimeIndex });
                } else if (primeSum >= limit) {
                    //console.log("===>", { primeSum, limit, lowerPrimeIndex, upperPrimeIndex });
                    lowerPrimeIndex = Infinity;
                    lowerLimit++;
                }
            }

        }

        return maxNumConsecutivePrime;
    }

    private getSumOfPrimesInRangeOrLimit(lowerPrimeIndex: number, higherPrimeIndex: number, limit: number): number {
        let sum = 0;
        for (let i = lowerPrimeIndex; i <= higherPrimeIndex; i++) {
            sum += Primes.getNthPrime(lowerPrimeIndex);
            if (sum >= limit) {
                return -1;
            }
        }
        return sum;
    }

    private bruteForceSolve(limit: number): number {
        let numConsecutiveMax = 0;
        let maxNumConsecutivePrime = 0;
        for (let primeIndex = 3, lastPrime = Primes.getNthPrime(primeIndex); lastPrime < limit; primeIndex++, lastPrime = Primes.getNthPrime(primeIndex)) {


            //end of subsequence
            for (let upperPrimeIndex = 2; upperPrimeIndex < primeIndex - 1; upperPrimeIndex++) {

                //start of subsequence
                for (let lowerPrimeIndex = 1; lowerPrimeIndex < upperPrimeIndex; lowerPrimeIndex++) {
                    const primeSum = Primes.getPrimesInRange(lowerPrimeIndex, upperPrimeIndex).reduce((acc, prime) => acc + prime);

                    if (primeSum === lastPrime && upperPrimeIndex - lowerPrimeIndex >= numConsecutiveMax) {
                        numConsecutiveMax = 1 + upperPrimeIndex - lowerPrimeIndex;
                        maxNumConsecutivePrime = lastPrime;
                    }
                }

            }

        }

        return maxNumConsecutivePrime;
    }

    /***
     * 
     * 4th: 07: 3 Terms Below: 3 Consecutive Sub Sequences
     * ---> 2+3; 2+3+5; 3+5;
     * 
     * 5th: 11: 4 Terms Below: 6 Consecutive Sub Sequences
     * ---> 2+3; 2+3+5; 2+3+5+7; 3+5; 3+5+7; 5+7;
     * 
     * 6th: 13: 5 Terms Below: 10 Consecutive Sub Sequences
     * ---> 2+3; 2+3+5; 2+3+5+7; 2+3+5+7+11; 3+5; 3+5+7; 3+5+7+11; 5+7; 5+7+11; 7+11
     * 
     * 7th: 17: 6 Terms Below: 15 Consecutive Sub Sequences
     * ---> 2+3; 2+3+5; 2+3+5+7; 2+3+5+7+11; 2+3+5+7+11+13; 3+5; 3+5+7; 3+5+7+11;
     * -----> 3+5+7+11+13; 5+7; 5+7+11; 5+7+11+13; 7+11; 7+11+13; 11+13
     * 
     */

}