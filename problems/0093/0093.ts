import { Fraction } from "../../utils/fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution93 extends AbstractSolution {

    private ops = ["+", "-", "*", "/"];

    getProblemName(): string {
        return "Arithmetic Expressions";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Basic approach:
     * 1. Generate sets of 4 different digits
     * 2. Get permutations of the orders in each set
     * 3. For each perm, apply all possible operations in all possible orders
     * 4. Return best result
     */
    private doSolve(): string {
        let digits: number[] = [];
        let longestConsecutive = 0;

        this.generateSet(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [],
            (set: number[]) => {
                const thisLen = this.getConsecutiveLen(set);
                if (thisLen > longestConsecutive) {
                    longestConsecutive = thisLen;
                    digits = set;
                }
            }
        )

        return digits.sort((a, b) => a - b).join("");
    }

    /**
     * Get the consecutive len by performing operations
     *      over all permutations of the set
     * @param set 
     */
    private getConsecutiveLen(set: number[]): number {
        let totalResults = new Set<number>();
        //iterate over permutations of the set
        this.getPermutationsOfSet(set, [], (perm: number[]) => {
            this.performCalc(
                perm.map(n => new Fraction(n, 1)),
                new Fraction(0, 1),
                totalResults
            );
        });

        //find longest consecutive sequence
        //if it doesn't have 1, return 0
        if (!totalResults.has(1)) {
            return 0;
        }

        const sorted = Array.from(totalResults)
            .filter(n => n > 0)
            .sort((a, b) => a - b);

        let longestSeqLen = 0;

        let thisSeqLen = 0;
        let lastN = 0;
        for (const n of sorted) {
            if (n === lastN + 1) {
                thisSeqLen++;

                if (thisSeqLen > longestSeqLen) {
                    longestSeqLen = thisSeqLen;
                }
            } else {
                thisSeqLen = 0;
            }
            lastN = n;
        }

        return longestSeqLen;
    }

    /**
     * Perform calculations in all combinations over the set
     * Note: this performs operations on the partialSet throught (like mutation)
     */
    private performCalc(
        set: Fraction[],
        partialCalc: Fraction,
        partialIntegerSet: Set<number>
    ): void {
        const remaining = set.slice(1);

        //recursive case, perform each available calc
        this.ops.forEach((op) => {
            const newPartial = this.performSingleCalc(partialCalc, set[0], op);
            if (newPartial !== null) {
                //recursive if ops left
                if (remaining.length > 0) {
                    this.performCalc(remaining, newPartial, partialIntegerSet);
                } else if (newPartial.getDenominator() === 1) { //base case if not
                    partialIntegerSet.add(newPartial.getNumerator());
                }
            }

        });
    }

    private performSingleCalc(a: Fraction, b: Fraction, op: string): Fraction | null {
        switch (op) {
            case "+":
                return a.addFraction(b);
            case "-":
                return a.subtractFraction(b);
            case "*":
                return a.multiplyFraction(b);
            //case "/":
            default:
                return b.getNumerator() === 0 ? null : a.divideFraction(b);
        }
    }

    /**
     * Generate sets of size 4 given choices
     * Recursive implementation
     * @param choices 
     * @param partialSet 
     * @param callback 
     * @returns 
     */
    private generateSet(
        choices: number[],
        partialSet: number[],
        callback: (set: number[]) => void
    ): void {
        //base case, not enough choices left
        if (4 - partialSet.length > choices.length) {
            return;
        }

        //base case, no choices left
        if (partialSet.length === 4) {
            callback(partialSet);
            return;
        }

        const choicesLeft = choices.slice(1);
        //recursive case, don't add choice
        this.generateSet(choicesLeft, partialSet, callback);

        const newPartialSet = [...partialSet, choices[0]];
        this.generateSet(choicesLeft, newPartialSet, callback);

    }

    /**
     * Given a set of numbers, get all possible orderings
     * @param set 
     * @param callback 
     */
    private getPermutationsOfSet(choices: number[], setSoFar: number[], callback: (set: number[]) => void): void {
        //base case
        if (choices.length === 1) {
            setSoFar.push(choices[0]);
            callback(setSoFar);
            return;
        }

        //recursive case
        for (let i = 0; i < choices.length; i++) {
            const remainingChoices = [...choices];
            remainingChoices.splice(i, 1);

            const newSet = [...setSoFar, choices[i]];
            this.getPermutationsOfSet(remainingChoices, newSet, callback);
        }
    }
}