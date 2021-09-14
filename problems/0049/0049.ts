import { Equals } from "@byte-this/funscript";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution49 extends AbstractSolution {

    getProblemName(): string {
        return "Prime Permutations";
    }

    solve() {
        //return Primes.getNthPrimeIndex(17);
        return this.doSolve();
    }

    protected doSolve(): string {
        let lastPrime = 0;
        for (let primeIndex = 1; lastPrime < 10000; primeIndex++) {
            lastPrime = Primes.getNthPrime(primeIndex);
            if (lastPrime > 1000) {
                const seq = this.getSequenceFromPrime(lastPrime);
                if (seq) {
                    return seq;
                }
            }
        }
        return "No prime found!";
    }

    private getSequenceFromPrime(firstPrime: number): string | null {
        //do not generate example sequence from problem
        /*if (firstPrime === 1487) {
            return null;
        }*/

        const firstPrimeDigits = this.getSortedUniqueDigits(firstPrime);
        if (firstPrimeDigits.length < 4) {
            return null;
        }


        let lastSecondPrimeValue = 0;
        const forLimit = 10000;
        const startIndex = Primes.getNthPrimeIndex(firstPrime) + 1;
        for (let secondPrimeIndex = startIndex; lastSecondPrimeValue < forLimit; secondPrimeIndex++) {
            let isValid = true;

            lastSecondPrimeValue = Primes.getNthPrime(secondPrimeIndex);
            const interval = lastSecondPrimeValue - firstPrime;

            /*if (firstPrime === 1487) {
                console.log({firstPrime, lastSecondPrimeValue, interval, forLimit});
            }*/

            const seqTwoDigits = this.getSortedUniqueDigits(lastSecondPrimeValue);
            if (!Equals(firstPrimeDigits, seqTwoDigits)) {
                isValid = false;
            } else {
                //console.log("Partial found:", {firstPrime, lastSecondPrimeValue, interval});

                const seqThree = lastSecondPrimeValue + interval;
                const seqThreeDigits = this.getSortedUniqueDigits(seqThree);
                if (seqThree >= 10000 || !Primes.isPrime(seqThree) || !Equals(firstPrimeDigits, seqThreeDigits)) {
                    isValid = false;
                }

                if (isValid) {
                    console.log("Solution found", {firstPrime, lastSecondPrimeValue, seqThree, interval});
                    const concat = `${firstPrime}${lastSecondPrimeValue}${seqThree}`;
                    //skip example given in problem
                    if (concat !== `148748178147`) {
                        return concat;
                    }
                }
            }
        }

        return null;
    }

    private getSortedUniqueDigits(n: number): string[] {
        return Array.from(`${n}`)
            .sort((a, b) => a.localeCompare(b))
            //.filter((char, index, ar) => ar.indexOf(char) === index);
    }

}