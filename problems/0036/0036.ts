import { Palindrome } from "../../utils/palindrome";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution36 extends AbstractSolution {

    getProblemName(): string {
        return "Double-Base Palindromes";
    }

    protected solve() {
        return this.doSolve(1_000_000);
    }

    private doSolve(limit: number): number {
        let sum = 0;
        for (let i=1; i<limit; i++) {
            if (Palindrome.isPalindrome(i)) {
                const iBaseTwo = i.toString(2);
                if (Palindrome.isPalindrome(iBaseTwo)) {
                    sum += i;
                }
            }
        }
        return sum;
    }

}