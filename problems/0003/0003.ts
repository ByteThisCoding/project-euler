import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution0003 extends AbstractSolution {

    getProblemName(): string {
        return "Largest Prime Factor";
    }

    protected solve() {
        return this.doSolve(600851475143);
    }

    private doSolve(input: number): number {
        return this.getLargestPrimeFactor(input);
    }

    private getLargestPrimeFactor(int: number): number {
       
        let largestPrime: number = 1;

        const loopLimit: number = Math.sqrt(int);
        for (let i=2; i<=loopLimit; i++) {
            if (int % i === 0 && this.isPrime(i)) {
                largestPrime = i;
            }
        }
        return largestPrime;
    }

    private isPrime(int: number): boolean {
        let isPrime = true;

        const limit = Math.sqrt(int);
        for (let i=2; isPrime && i<=limit; i++) {
            if (int % i === 0) {
                isPrime = false;
            }
        }
        return isPrime;
    }

}