import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution47 extends AbstractSolution {

    getProblemName(): string {
        return "Distinct Primes Factors";
    }

    protected solve() {
        return this.doSolve(4);
    }

    private doSolve(numDistinct: number): number {
        for (let i=2; true; i+=numDistinct) {
            const numDistinctPrimes = Integer.getNumDistinctPrimes(i);

            if (numDistinctPrimes === numDistinct) {
                
                //scan left side
                let firstMatch = i;
                for (let j=i-1; j>i-5; j--) {
                    const jNumDistinct = Integer.getNumDistinctPrimes(j);
                    if (jNumDistinct === numDistinct) {
                        firstMatch = j;
                    } else {
                        break;
                    }
                }

                //scan right side
                const scanLimit = i+4-(i-firstMatch);
                let matches = true;
                for (let j=i+1; matches && j<scanLimit; j++) {
                    const jNumDistinct = Integer.getNumDistinctPrimes(j);
                    if (jNumDistinct === numDistinct) {
                        firstMatch = j;
                    } else {
                        matches = false;
                    }
                }

                if (matches) {
                    return firstMatch;
                }
            }
        }

    }


}