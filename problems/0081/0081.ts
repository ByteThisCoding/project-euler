import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";

@RunSolution
export class Solution81 extends AbstractSolution {

    getProblemName(): string {
        return "Path Sum: Two Ways";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        const matrix = this.readFile();
        return this.findPathSum(matrix);
    }

    /**
     * Use dynamic approach to construct from bottom right to top left
     * Since there is no possibility of loop, we do not need to account for it
     */
    private findPathSum(matrix: number[][]): number {
        //initialize array with 0s
        const sumMatrix: number[][] = new Array(matrix.length)
            .fill(null).map(() => {
                return new Array(matrix[0].length).fill(0);
            });

        for (let row=matrix.length - 1; row >=0; row--) {
            const sumRow = matrix.length - 1 - row;

            for (let col=matrix[0].length - 1; col >=0; col--) {
                const sumCol = matrix[0].length - 1 - col;

                const currentCellValue = matrix[row][col];

                //get previous values
                const prevRowVal = sumMatrix?.[sumRow - 1]?.[sumCol] || Infinity;
                const prevColVal = sumMatrix?.[sumRow]?.[sumCol - 1] || Infinity;

                //if no previous values, set directly based on currrent cell value
                if (prevRowVal === Infinity && prevColVal === Infinity) {
                    sumMatrix[sumRow][sumCol] = currentCellValue;
                } else {
                    //set to current cell value + smallest of previous values
                    sumMatrix[sumRow][sumCol] = currentCellValue
                        + Math.min(prevRowVal, prevColVal);
                }

            }
        }

        return sumMatrix[sumMatrix.length - 1][sumMatrix[0].length - 1];
    }

    //read file in and split by lines and commas
    private readFile(): number[][] {
        const fileContents = fs.readFileSync(__dirname + "/matrix.txt", "utf-8");
        return fileContents.split("\r\n").map(line => {
            return line.split(",").map(item => parseInt(item));
        });
    }

}