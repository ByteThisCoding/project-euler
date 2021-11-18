import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution76 extends AbstractSolution {

    getProblemName(): string {
        return "Counting Summations";
    }

    protected solve() {
        //return this.doSolve(5);
        return this.doSolve(100);
    }

    /**
     * This uses the dynamic programming count counting approach
     * Each integer is its own coin
     * @param target 
     * @returns 
     */
    private doSolve(target: number): number {

        const matrix = new Array(target)
            .fill(null)
            .map(() => {
                const newAr = new Array(target + 1).fill(0);
                newAr[0] = 1;
                return newAr;
            });


        for (let rowIndex = 1; rowIndex < target; rowIndex++) {

            //const coin = rowIndex;
            for (let colIndex = 1; colIndex <= target; colIndex++) {

                let newValue = matrix[rowIndex - 1][colIndex];

                if (colIndex >= rowIndex) {
                    newValue += matrix[rowIndex][colIndex - rowIndex];
                }

                matrix[rowIndex][colIndex] = newValue;

            }

        }

        return matrix[target - 1][target];
    }

}