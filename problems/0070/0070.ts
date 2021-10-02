import { Combinations } from "../../utils/combinations";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution70 extends AbstractSolution {

    getProblemName(): string {
        return "Totient Permutation";
    }

    protected solve() {
        return this.getMaximalTotientN(10 ** 7);
    }

    /**
     * To get minimal n/totient, we will get maximum totient
     * Maximal totient will be product of the smallest amount of primes
     * 
     * Number cannot be a prime itself, as totient of a prime is prime - 1 
     * Thus, take approach where n is product of two primes
     */
    private getMaximalTotientN(limit: number): number {

        //find maximum n which is the product of two primes
        const maxPrime = Primes.getClosestLowerPrime(
            //reasonable upper bound for limit
            Math.sqrt(limit) * 1.5
        );
        let maxPrimeIndex = Primes.getNthPrimeIndex(maxPrime);

        console.log({ maxPrime, maxPrimeIndex })

        let n = 0;
        let totientRatio = Infinity;
        let totient = 0;
        for (let i = 2; i < maxPrimeIndex; i++) {
            const primeI = Primes.getNthPrime(i);
            for (let j = 1; j < i; j++) {
                const primeJ = Primes.getNthPrime(j);
                const product = primeI * primeJ;

                if (product < limit) {

                    /**
                    * simplification of totient with only two prime values
                    * totient = Product(1 - 1/p) over distinct primes
                    */
                    const thisTotient = Math.floor(product * (1 - 1 / primeI) * (1 - 1 / primeJ));
                    const thisTotientRatio = product / thisTotient;
                    if (thisTotientRatio < totientRatio && Combinations.areDigitsPermutations(product, thisTotient)) {
                        n = product;
                        totientRatio = thisTotientRatio;
                        totient = thisTotient;
                    }
                }
            }
        }

        console.log({ n, totient, totientRatio })
        return n;

    }

}
//8319823