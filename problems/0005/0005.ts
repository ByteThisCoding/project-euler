import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution5 extends AbstractSolution {

    getProblemName(): string {
        return "Smallest Multiple";
    }

    protected solve() {
        return this.doSolve(20);
    }

    private doSolve(maxNum: number): number {
        let workingValue = this.multiplyAcross(maxNum);

        //reduce the working value by dividing out common factors
        for (let i=maxNum; i>=2; i--) {
            const mod = workingValue % i;
            if (mod !== 0) {
                const commonFactors = Integer.getCommonFactors(i, mod);

                let reducedI = i;
                let reducedMod = mod;

                commonFactors.forEach(factor => {
                    reducedI /= factor;
                    reducedMod /= factor;
                });

                workingValue *= reducedI;
            }
        }
        return workingValue;
    }

    /**
     * This will multiply all primes up to max number and return the product
     * This implementation is sufficient for this problem
     * However, this can be optimized to have much less iteration and primality checking
     * Future Project Euler solutions will use more efficient methods
     * @param maxNum 
     * @returns 
     */
    private multiplyAcross(maxNum: number): number {
        let product: number = 2;
        for (let i=3; i<=maxNum; i+=2) {
            if (Primes.isPrime(i)) {
                product *= i;
            }
        }
        return product;
    }
    

}