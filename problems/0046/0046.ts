import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution46 extends AbstractSolution {

    getProblemName(): string {
        return "Goldbach's other conjecture";
    }

    protected solve() {
        return this.doSolve();
        //return this.isConjectureTrueFor(33);
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
        for (let primeIndex = 1; lastPrime < n-1; primeIndex++) {
            lastPrime = Primes.getNthPrime(primeIndex);

            if (this.isDoublePerfectSquare(n - lastPrime)) {
                return true;
            }
            
        }

        return false;
    }

    private isDoublePerfectSquare(n: number): boolean {
        return Number.isInteger(Math.sqrt(n/2));
    }

}