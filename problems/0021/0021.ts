import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution21 extends AbstractSolution {

    private partialPairMap = new Map<number, number>();

    getProblemName(): string {
        return "Amicable Numbers";
    }

    protected solve(): any {
        //return this.dOfN(16)
        return this.doSolve(10000);
    }

    private doSolve(limit: number): number {
        let sum = 0;
        for (let n=1; n<limit; n++) {
            if (this.partialPairMap.has(n)) {
                const dOfN = this.partialPairMap.get(n)!;
                const mapBack = this.dOfN(n);
                if (mapBack === dOfN) {
                    if (dOfN < limit) {
                        sum += dOfN;
                    }
                    sum += n;
                }
            } else {
                const dOfN = this.dOfN(n);
                if (n !== dOfN) {
                    this.partialPairMap.set(
                        dOfN,
                        n
                    );
                }
            }
        }

        return sum;
    }

    private dOfN(n: number): number {
        return Integer.getUniqueFactors(n).reduce((acc, int) => {
            if (int === n) {
                return acc;
            }
            return acc + int;
        }, 0);
    }

}