import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution77 extends AbstractSolution {

    getProblemName(): string {
        return "Prime Summations";
    }

    protected solve() {
        //return this.doSolve(4);
        return this.doSolve(5_000);
    }

    /**
     * This uses the dynamic programming coin counting algorithm
     * Each prime is a coin
     * Since the target will be a value in a cell, not a coin
     *      we'll need to resize the matrix and fill in entries as we go
     * @param target 
     * @returns 
     */
    private doSolve(target: number): number {

        const startNumPrimes = 3;

        const coins = new Array(startNumPrimes)
            .fill(0)
            .map((_, ind) => Primes.getNthPrime(ind + 1));

        const matrix = new Array(startNumPrimes + 1)
            .fill(null)
            .map(() => {
                const newAr = new Array(coins[coins.length - 1] + 1)
                    .fill(0);
                newAr[0] = 1;
                return newAr;
            });

        //helper to calculate a particular matrix value given previous values
        const calcMatrixValue = (rowIndex: number, colIndex: number): number => {
            let cellValue = matrix[rowIndex - 1][colIndex];

            if (colIndex >= coins[rowIndex - 1]) {
                cellValue += matrix[rowIndex][colIndex - coins[rowIndex - 1]];
            }

            return cellValue;
        }

        //fill in default matrix
        for (let rowIndex = 1; rowIndex < matrix.length; rowIndex ++) {
            for (let colIndex = 1; colIndex <= coins[coins.length - 1]; colIndex++) {
                
                matrix[rowIndex][colIndex] = calcMatrixValue(rowIndex, colIndex);
            }
        }

        //keep searching until we find the target
        while (true) {

            const prevPrime = coins[coins.length - 1];
            const thisPrime = Primes.getNthPrime(coins.length + 1);
            
            coins.push(thisPrime);

            while (matrix[0].length <= thisPrime) {
                matrix[0].push(0);
            }

            //fill out cols to the right
            for (let rowIndex = 1; rowIndex < matrix.length; rowIndex ++) {

                for (let colIndex = prevPrime + 1; colIndex <= thisPrime; colIndex++) {

                    const cellValue = calcMatrixValue(rowIndex, colIndex);
                    if (cellValue > target) {
                        return colIndex;
                    }

                    matrix[rowIndex].push(cellValue);
                }
            }

            //add new row
            const newRow = new Array(matrix[0].length)
                .fill(0);
            newRow[0] = 1;

            for (let colIndex=1; colIndex<=thisPrime; colIndex++) {
                let cellValue = matrix[matrix.length - 1][colIndex];

                if (colIndex >= thisPrime) {
                    cellValue += matrix[matrix.length - 1][colIndex - thisPrime];
                }

                if (cellValue > target) {
                    return colIndex;
                }
    
                newRow[colIndex] = cellValue;
            }

            matrix.push(
                newRow
            );
        }

    }

}