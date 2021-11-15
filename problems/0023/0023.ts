import { SortedArray } from "@byte-this/collections";
import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution23 extends AbstractSolution {

    //store in both data structures to save some lookup time
    private abundantNumbersList = new SortedArray(
        SortedArray.compareNumbers
    );
    private abundantNumbersSet = new Set<number>();

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
                this.abundantNumbersList.add(n);
                this.abundantNumbersSet.add(n);
            }
        }

        return nonAbundantSum;
    }

    private isSumOfTwoAbundantNumbers(n: number): boolean {
        const subAbundants = this.abundantNumbersList.filter(num => num <= n/2);
        for (let subN of subAbundants) {
            if (this.abundantNumbersSet.has(n - subN)) {
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