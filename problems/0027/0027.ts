import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution27 extends  AbstractSolution {

    getProblemName(): string {
        return "Quadratic Primes";
    }

    protected solve(): number {
        return this.doSolve();   
    }

    /**
     * Iterate over different values of a and b to find the max values
     * We can skip certain values:
     * : a - skip even numbers
     * : b - use primes only
     * @returns 
     */
    private doSolve(): number {

        /****
         * 
         *        n*n +  n +  41
         * even:  even  even      ==> odd
         * odd:   odd   odd  odd ===> odd
         */

        let maxA = -Infinity;
        let maxB = -Infinity;
        let maxSeqLength = 0;

        for (let a = -999; a<1000; a+=2) {

            let lastPrimeValue = 0;
            let lastPrimeIndex = 1;

            for (lastPrimeIndex = 1; lastPrimeValue < 1000; lastPrimeIndex += 1) {
                const b = Primes.getNthPrime(lastPrimeIndex);
                lastPrimeValue = b;

                let thisSequenceLength = 0;
                let isStillPrime = true;
                for (let n=0; isStillPrime; n++) {
                    const quadResult = this.calcVariableQuad(n, a, b);
                    if (Primes.isPrime(quadResult)) {
                        thisSequenceLength++;
                    } else {
                        isStillPrime = false;
                        if (thisSequenceLength > maxSeqLength) {
                            maxA = a;
                            maxB = b;
                            maxSeqLength = thisSequenceLength;
                        }
                    }
                }
            }
        }

        return maxA*maxB;

    }

    //calculate the quadratic value for different values of n, a, and b
    private calcVariableQuad(n: number, a: number, b: number): number {
        return n**2 + a*n + b;
    }

}