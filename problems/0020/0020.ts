import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution20 extends AbstractSolution {

    getProblemName(): string {
        return "Factorial Digit Sum";
    }
    
    protected solve(): bigint {
        return this.doSolve(9876, "string");
        //return this.doSolve(9876, "number");
    }

    private doSolve(limit: number, mode: "string" | "number"): bigint {

        let bigProduct = 1n;

        for (let i=2n; i<=limit; i++) {
            bigProduct *= i;
        }

        let bigSum = 0n;
        if (mode === "string") {
            let digits = Array.from(bigProduct.toString()).map(str => {
                return BigInt(str);
            });
            bigSum = digits.reduce((acc, digit) => acc + digit);
        } else {
            let workingProduct = bigProduct;
            while (workingProduct >= 10n) {
                bigSum += workingProduct % 10n;
                workingProduct = workingProduct / 10n;
            }
            bigSum += workingProduct;
        }

        return bigSum;
    }

}