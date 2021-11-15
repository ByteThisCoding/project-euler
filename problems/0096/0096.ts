import { AbstractSolution, RunSolution } from "../../utils/solution";
import { SudokuPuzzle } from "./sudoku-puzzle";
import * as fs from "fs";
const readline = require('readline');

//useful for reordering & restoring matrix rows
interface iSortedMatrix {
    sorted: number[][],
    mapping: number[]
}

interface iSortedPuzzle {
    puzzle: SudokuPuzzle;
    mapping: number[];
}

@RunSolution
export class Solution96 extends AbstractSolution {

    getProblemName(): string {
        return "Su Doku";
    }

    protected solve() {
        return this.doSolve();
    }

    //reading the file is async
    private async doSolve(): Promise<number> {
        let sum = 0;
        await this.readFilePuzzles((data: iSortedPuzzle) => {
            const { mapping, puzzle } = data;
            //solve puzzle
            puzzle.solveSelf();

            //find entries based on mapping
            const row = mapping.indexOf(0)!;
            sum += puzzle.getCell(row, 0) * 100
                    + puzzle.getCell(row, 1) * 10 
                    + puzzle.getCell(row, 2);
        });
        return sum;
    }
    
    private async readFilePuzzles(callback: (data: iSortedPuzzle) => any) {
        const fileStream = fs.createReadStream(__dirname+"/sudoku.txt");;

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let matrix: number[][] = [];

        const doPuzzle = () => {
            if (matrix.length > 0) {
                const { mapping, sorted } = this.transposeRows(matrix);

                const puzzle = new SudokuPuzzle(sorted);
                callback({mapping, puzzle});
            }
            matrix = [];
        }

        for await (const line of rl) {
            //if G, starting a new puzzle
            if (line[0] === "G") {
                doPuzzle();
            } else {
                const row: number[] = [];
                for (let i=0; i<line.length; i++) {
                    row.push(parseInt(line[i]));
                }
                matrix.push(row);
            }
        }

        doPuzzle();
    }

    /**
     * Transpose rows of matrix and returns mapping
     * @param rows 
     */
    private transposeRows(rows: number[][]): iSortedMatrix {

        //sort each row within groups of 3 based on number of zeros
        const sortGroup = (a: number[], b: number[], c: number[]): {
            ref: number[];
            count: number
        }[] => {
            return [a, b, c].map(row => ({
                ref: row,
                count: row.reduce((acc, item) => acc + (item === 0 ? 1: 0), 0)
            })).sort((a, b) => b.count - a.count);
        };

        const subSorted = new Array(9).fill(null);
        const subMapping: number[] = [];

        for (let m=0; m<9; m+=3) {
            const group = sortGroup(rows[m], rows[m+1], rows[m+2]);
            group.forEach((data, ind) => {
                subSorted[m + ind] = data.ref;
                subMapping[m + ind] = rows.indexOf(data.ref);
            });
        }


        //now, sort the three groups themselves
        const sorted = new Array(9).fill(null);
        const mapping: number[] = []; 

        const bigGroup = sortGroup(subSorted[0], subSorted[3], subSorted[6]);

        bigGroup.forEach((data, ind) => {
            const offset = ind*3;
            const subIndex = subSorted.indexOf(data.ref);
            //first row
            sorted[offset] = data.ref;
            mapping[offset] = subMapping[subIndex];
            //second row
            sorted[offset + 1] = subSorted[subIndex + 1];
            mapping[offset + 1] = subMapping[subIndex + 1];
            //thrid row
            sorted[offset + 2] = subSorted[subIndex + 2];
            mapping[offset + 2] = subMapping[subIndex + 2];
        });

        return {
            sorted,
            mapping
        };
    }

}