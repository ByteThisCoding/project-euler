import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution46 extends AbstractSolution {

    getProblemName(): string {
        return "Goldbach's Other Conjecture";
    }

    protected solve() {
        return this.doSolve();
        //return this.isConjectureTrueFor(17);
    }

    private doSolve(): number {

        for (let i = 9; true; i+=2) {
            if (!this.isConjectureTrueFor(i)) {
                return i;
            }
        }
    }

    private isConjectureTrueFor(n: number): boolean {
        if (n < 4) {
            return false;
        }

        let lastPrime = 0;
        for (let primeIndex = 1; lastPrime < n; primeIndex++) {
            lastPrime = Primes.getNthPrime(primeIndex);

            if (this.isDoublePerfectSquare(n - lastPrime)) {
                return true;
            }
            const diff = n - lastPrime;
            if (Primes.isPrime(diff) && this.isDoublePerfectSquare(n - diff)) {
                return true;
            }
            
        }

        return false;
    }

    private isDoublePerfectSquare(n: number): boolean {
        return Integer.isPerfectSquare(n/2);
    }

}