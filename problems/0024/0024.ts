import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution24 extends AbstractSolution {

    getProblemName(): string {
        return "Lexicographic Permutations";
    }

    protected solve(): any {
        return this.getPermutation(1000000 - 1, [0,1,2,3,4,5,6,7,8,9]);
    }

    private getPermutation(index: number, seq: number[]): string {
        if (seq.length === 0) {
            return "";
        }

        const firstDigitOccurences = this.factorialOf(seq.length - 1);
        const firstDigitIndex =  Math.floor(index/firstDigitOccurences);
        const firstIndexFirstDigitIndex = firstDigitIndex*firstDigitOccurences;

        const firstDigit = seq[firstDigitIndex];

        const recursiveIndex = index - firstIndexFirstDigitIndex;
        const recursiveSeq = seq.filter(item => item !== firstDigit);

        return `${firstDigit}` + this.getPermutation(recursiveIndex, recursiveSeq);
    }

    private factorialOf(n: number): number {
        let product = 1;
        for (let i=2; i<=n; i++) {
            product *= i;
        }
        return product;
    }

    /***
     * 
     * Total Choices: (3)(2)(1) = 3*2*1 = 6 === 3!
     * First Digit Occurences: (#digits - 1)!
     * 
     * First Digit Index: Math.floor(index/#(first digit occurences))
     * First Digit: seq[first digit index]
     * First Index of First Digit Index: (First Digit Index)*(First Digit Occurences)
     * 
     * Recursive Index = index - (First Index of First Digit Index)
     * Recursive Sequence = Sequence - First Digit
     * 
     * 
     * 
     */

}