import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";

@RunSolution
export class Solution82 extends AbstractSolution {

    getProblemName(): string {
        return "Path Sum: Three Ways";
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
     * Since we'll never want to move up, then down, in the same colum
     *      we'll ignore that possibility (same for down, then up)
     */
    private findPathSum(matrix: number[][]): number {
        const subSums = new Array(matrix.length)
            .fill(null).map(() => {
                return new Array(matrix[0].length)
                    .fill(0);
            });

        const lastColInd = matrix[0].length - 1;

        //populate solution matrix with rightmost column
        for (let row=0; row<matrix.length; row++) {
            subSums[row][lastColInd] = matrix[row][lastColInd];
        }

        //populate remaining columns
        for (let col=lastColInd-1; col>=0; col--) {
            //focus on rows in this column
            for (let row=0; row<matrix.length; row++) {
                //keep track of min so far
                let minValue = matrix[row][col] + subSums[row][col+1];

                //lookup until no spaces left
                let rowFind;
                let pastMin = false;
                let searchValue = matrix[row][col];
                for (rowFind=row-1; !pastMin && rowFind>=0; rowFind--) {
                    searchValue += matrix[rowFind][col];
                    pastMin = searchValue >= minValue;
                    minValue = Math.min(
                        minValue,
                        searchValue + subSums[rowFind][col+1]
                    );
                }

                //look down until no spaces left
                pastMin = false;
                searchValue = matrix[row][col];
                for (rowFind=row+1; !pastMin && rowFind<matrix.length; rowFind++) {
                    //duplicate of before (merge code?)
                    searchValue += matrix[rowFind][col];
                    pastMin = searchValue >= minValue;
                    minValue = Math.min(
                        minValue,
                        searchValue + subSums[rowFind][col+1]
                    );
                }

                subSums[row][col] = minValue;
            }
        }

        //find smallest first col item
        return subSums.reduce((min, row) => {
            return row[0] < min ? row[0] : min;
        }, Infinity);
    }

    private readFile(): number[][] {
        const fileContents = fs.readFileSync(__dirname + "/matrix.txt", "utf-8");
        return fileContents.split("\r\n").map(line => {
            return line.split(",").map(item => parseInt(item));
        });
    }

}