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

                const quad = this.createQuadratic(a, b);
                let thisSequenceLength = 0;
                let isStillPrime = true;
                for (let n=0; isStillPrime; n++) {
                    const quadResult = quad(n);
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

        console.log({maxA, maxB, maxSeqLength})
        return maxA*maxB;

    }

    private createQuadratic(a: number, b: number): (n: number) => number {
        return (n: number) => {
            return n*n + a*n + b;
        }
    }

}