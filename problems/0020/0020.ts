import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution20 extends AbstractSolution {

    getProblemName(): string {
        return "Factorial Digit Sum";
    }
    
    protected solve(): number {
        return this.doSolve(100);
    }

    /**
     * 1. Multiply out the factorial
     * 2. Convert to a string
     * 3. Iterate over string
     * 4. For each char, parseInt and add to sum
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {

        let bigProduct = 1n;
        for (let i=2n; i<=limit; i++) {
            bigProduct *= i;
        }

        const bigStr = bigProduct.toString();
        let sum = 0;
        for (let i=0; i<bigStr.length; i++) {
            sum += parseInt(bigStr[i]);
        }

        return sum;
    }

}