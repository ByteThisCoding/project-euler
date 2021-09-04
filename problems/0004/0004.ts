import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
class Solution4 extends AbstractSolution {
    getProblemName(): string {
        return "Largest Palindrome Product";
    }

    protected solve(): number {
        const largestFive = this.doSolve(5, 3);
        const largestSix = this.doSolve(6, 3);
        return Math.max(largestFive, largestSix);
    }

    private doSolve(numDigits: number, subNumDigit: number): number {
        let palindromicNumbers = this.listPalindromicNumberString(numDigits).map(
            numStr => Integer.fromString(numStr)
        );
        palindromicNumbers = palindromicNumbers
            .reverse();

        const largestPalindrome = palindromicNumbers.find(integer => {
            const factors = integer.getUniqueFactors();
            const nDigits = factors.filter(factor => {
                return factor.toString().length === subNumDigit;
            });

            for (let i = 0; i < nDigits.length; i++) {
                const iItem = nDigits[i];
                for (let j = 0; j < nDigits.length; j++) {
                    const jItem = nDigits[j];
                    if (iItem.value * jItem.value === integer.value) {
                        return true;
                    }
                }
            }
            return false;
        });

        return largestPalindrome!.value;
    }

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