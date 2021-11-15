/**
 * Helper to problem 96 to encapsulate certain logic
 */
export class SudokuPuzzle {

    private _numZeros = 0;

    get numZeros(): number {
        return this._numZeros;
    }

    constructor(
        private readonly cells: number[][]
    ) {
        this.countZeros();
    }

    /**
     * Recursively solve the puzzle
     * This will mutate the cells in place
     * @param puzzle 
     */
    solveSelf(row: number = 0, col: number = 0): boolean {
        const proceedAndComplete = (): boolean => {
            const nextRow = col === 8 ? row + 1 : row;
            const nextCol = col === 8 ? 0 : col + 1;
            if (row < 8 || col < 8) {
                return this.solveSelf(nextRow, nextCol);
            } else {
                return this.numZeros === 0;
            }
        }

        if (this.getCell(row, col) !== 0) {
            //if cell is already set, ignore and continue
            return proceedAndComplete();
        } else {
            const choices = this.getCellPossibilities(row, col);

            //for each choice, branch
            for (const choice of choices) {
                this.setCell(row, col, choice);

                if (proceedAndComplete()) {
                    return true;
                }

                //if that didn't work, continue
            }
        }
        //if nothing happened, reset cell and return -1
        this.setCell(row, col, 0);
        return false;
    }

    /**
     * Check which values are available to any particular cell
     * @param puzzle 
     * @param row 
     * @param col 
     * @returns 
     */
    private getCellPossibilities(
        row: number,
        col: number
    ): Set<number> {
        let possibilities = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (let i = 0; i < 9; i++) {

            //remove entries which exist in the row
            const item = this.getCell(row, i);
            possibilities.delete(item);

            //remove entries which exist in column
            possibilities.delete(this.getCell(i, col));
        }

        //remove entries which exist in the square
        const rowSquare = Math.floor(row / 3) * 3;
        const colSquare = Math.floor(col / 3) * 3;

        for (let rDel = rowSquare; rDel < rowSquare + 3; rDel++) {
            for (let cDel = colSquare; cDel < colSquare + 3; cDel++) {
                possibilities.delete(this.getCell(rDel, cDel));
            }
        }

        return possibilities;
    }

    getCell(row: number, col: number): number {
        return this.cells[row][col];
    }

    setCell(row: number, col: number, value: number): void {
        const existing = this.cells[row][col];
        if (existing === 0 && value !== 0) {
            this._numZeros--;
        } else if (existing !== 0 && value === 0) {
            this._numZeros++;
        }
        this.cells[row][col] = value;
    }

    toString(): string {
        let str = "";
        for (let row = 0; row < 9; row++) {
            if (row % 3 === 0) {
                str += "_".repeat(11) + "\n";
            }
            for (let col = 0; col < 9; col++) {
                if (col % 3 === 0 && col > 0) {
                    str += "|";
                }
                str += this.getCell(row, col);
            }
            str += "\n";
        }
        return str;
    }

    private countZeros(): void {
        let count = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.cells[row][col] === 0) {
                    count++;
                }
            }
        }
        this._numZeros = count;
    }
}