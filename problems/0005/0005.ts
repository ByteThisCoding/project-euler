import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution5 extends AbstractSolution {

    getProblemName(): string {
        return "Smallest Multiple";
    }

    protected solve() {
        return this.doSolve(20); //232792560
    }

    private doSolve(maxNum: number): number {
        let workingValue = this.multiplyAcross(maxNum);

        for (let i=maxNum; i>=2; i--) {
            const mod = workingValue % i;
            if (mod !== 0) {
                const commonFactors = 
                    new Integer(i).getCommonFactors(new Integer(mod));

                let reducedI = i;
                let reducedMod = mod;

                commonFactors.forEach(factor => {
                    reducedI /= factor.value;
                    reducedMod /= factor.value;
                });

                workingValue *= reducedI;
            }
        }
        return workingValue;
    }

    private multiplyAcross(maxNum: number): number {
        let product: number = 1;
        for (let i=2; i<=maxNum; i++) {
            if (Primes.isPrime(i)) {
                product *= i;
            }
        }
        return product;
    }
    

}