import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution69 extends AbstractSolution {

    getProblemName(): string {
        return "Totient Maximum";
    }

    protected solve() {
        return this.doSolve(1_000_000);

        //return this.totientOfN(36);
    }

    private doSolve(limit: number): number {
        let maxN = 0;
        let maxRatio = 0;

        for (let n=2; n<=limit; n++) {
            const totient = this.totientOfN(n);
            const ratio = n/totient;
            if (ratio > maxRatio) {
                maxN = n;
                maxRatio = ratio;
            }
        }

        return maxN;
    }

    private totientOfN(n: number): number {
        //const factors = Integer.getUniqueFactors(n);
        //const primeFactors = factors.filter(factor => Primes.isPrime(factor));
        const primeFactors = Integer.getUniquePrimeFactors(n);

        //console.log(primeFactors);

        let product = n;
        for (let i=0; i<primeFactors.length; i++) {
            product *= (1 - 1/primeFactors[i]);
        }

        return Math.floor(product);

    }

}