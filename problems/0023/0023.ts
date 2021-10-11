import { SortedArray } from "@byte-this/collections";
import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution23 extends AbstractSolution {

    private abundantNumbers = new SortedArray(
        SortedArray.compareNumbers
    );

    getProblemName(): string {
        return "Non-Abundant Sums";
    }

    protected solve(): any {
        let nonAbundantSum = 0;
        for (let n = 1; n < 28124; n++) {
            //for this iteration
            if (!this.isSumOfTwoAbundantNumbers(n)) {
                nonAbundantSum += n;
            }

            //for future iterations
            if (this.isAbundant(n)) {
                this.abundantNumbers.add(n);
            }
        }

        return nonAbundantSum;
    }

    private isSumOfTwoAbundantNumbers(n: number): boolean {
        const subAbundants = this.abundantNumbers.filter(num => num <= n/2);
        for (let subN of subAbundants) {
            if (this.abundantNumbers.contains(n - subN)) {
                return true;
            }
        }
        return false;
    }

    private isAbundant(n: number): boolean {
        const factors = Integer.getUniqueFactors(n);
        
        let factorSum = 0;
        for (let i=0; factorSum <= n && i<factors.length-1; i++) {
            factorSum += factors[i];
        }

        return factorSum > n;
    }

}