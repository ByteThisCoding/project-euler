import { Palindrome } from "../../utils/palindrome";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution55 extends AbstractSolution {

    getProblemName(): string {
        return "Lychrel Numbers";
    }

    protected solve() {
        return this.doSolve();
        //return this.isLychrelNumber(47);
    }

    /**
     * Loop through numbers
     * Count # of lychrel numbers and return
     */
    private doSolve(): number {
        let numLychrelCount = 0;

        for (let n=1; n<10_000; n++) {
            if (this.isLychrelNumber(n)) {
                numLychrelCount++;
            }
        }

        return numLychrelCount;
    }

    private isLychrelNumber(n: number): boolean {

        let currentN = n;
        for (let numSteps=0; numSteps<50; numSteps++) {
            //make the number to array of chars, reverse array, join, and parse int
            const nReverse = parseInt(Array.from(currentN.toString()).reverse().join(""));
            currentN += nReverse;
            if (Palindrome.isPalindrome(currentN)) {
                return false;
            }
        }

        return true;

    }

    

}