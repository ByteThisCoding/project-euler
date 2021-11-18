import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution4 extends AbstractSolution {
    getProblemName(): string {
        return "Largest Palindrome Product";
    }

    /**
     * The product of two 3-digit numbers will have 5 or 6 digits
     * Find the largest for both, then take the max
     * @returns 
     */
    protected solve(): number {
        const largestFive = this.doSolve(5, 3);
        const largestSix = this.doSolve(6, 3);
        return Math.max(largestFive, largestSix);
    }

    private doSolve(numDigits: number, subNumDigit: number): number {
        let palindromicNumbers = this.listPalindromicNumberString(numDigits);
        palindromicNumbers = palindromicNumbers
            .reverse();

        //find the largest string which matches the conditions
        const largestPalindrome = palindromicNumbers.find(intStr => {
            const integer = parseInt(intStr);
            const factors = Integer.getUniqueFactors(integer);
            const nDigits = factors.filter(factor => {
                return factor.toString().length === subNumDigit;
            });

            for (let i = 0; i < nDigits.length; i++) {
                const iItem = nDigits[i];
                for (let j = 0; j < nDigits.length; j++) {
                    const jItem = nDigits[j];
                    if (iItem * jItem === integer) {
                        return true;
                    }
                }
            }
            return false;
        });

        return parseInt(largestPalindrome!);
    }

    /**
     * Generate a list of palindromic numbers with numDigits
     * This will return an array of strings
     * @param numDigits 
     * @param includeZero 
     * @returns 
     */
    private listPalindromicNumberString(numDigits: number, includeZero = false): string[] {
        //Even: 9 * numDigits/2
        //Odd: 9 * numDigits/2 + 9

        let listOfPalindromes: string[] = [];

        for (let i = 0; i < 10; i++) {
            if ((includeZero || i > 0)) {
                if (numDigits === 1) {
                    listOfPalindromes.push(`${i}`);
                } else if (numDigits === 2) {
                    listOfPalindromes.push(`${i}${i}`);
                } else {
                    const subList: string[] = this.listPalindromicNumberString(numDigits - 2, true);
                    subList.forEach(item => {
                        const fullItem = `${i}${item.toString()}${i}`;
                        listOfPalindromes.push(
                            fullItem
                        );
                    });
                }
            }
        }

        return listOfPalindromes;
    }


}