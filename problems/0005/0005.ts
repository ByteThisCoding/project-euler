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