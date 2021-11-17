import { Fraction } from "./fraction";

/**
 * Encapsulation of matrix functionality
 * multiplication, division, etc
 */
export class Matrix {

    constructor(
        public readonly matrix: Fraction[][]
    ) { }


    toArray(): Fraction[][] {
        return [...this.matrix];
    }

    getWidth(): number {
        return this.matrix.length;
    }

    getHeight(): number {
        return this.matrix[0].length;
    }

    transposeMatrix(): Matrix {

        const thisMatrix = this.toArray();
        const transposedMatrix: Fraction[][] = [];

        //initialize transposed
        for (let iRow = 0; iRow < thisMatrix.length; iRow++) {
            transposedMatrix.push([]);
            for (let iCol = 0; iCol < thisMatrix[iRow].length; iCol++) {
                transposedMatrix[iRow].push(new Fraction(0, 1));
            }
        }

        for (let iRow = 0; iRow < thisMatrix.length; iRow++) {

            for (let iCol = 0; iCol < thisMatrix[iRow].length; iCol++) {

                transposedMatrix[iCol][iRow] = thisMatrix[iRow][iCol];

            }

        }

        return new Matrix(transposedMatrix);

    }

    multiplyScalar(scalar: Fraction): Matrix {
        const newMatrix = this.toArray().map(row => {
            return row.map(cell => cell.multiplyFractions([scalar]))
        });

        return new Matrix(newMatrix);
    }

    addMatrix(matrix: Matrix): Matrix {
        if (matrix.getWidth() !== this.getWidth() || matrix.getHeight() !== this.getHeight()) {
            throw new Error(`Add / subtract matrices must be the same size`);
        }

        const otherMatrix = matrix.toArray();
        const newMatrix: Fraction[][] = this.toArray().map((row, rowInd) => {
            return row.map((cell, cellInd) => {
                return cell.addFractions([otherMatrix[rowInd][cellInd]]);
            })
        });

        return new Matrix(newMatrix);
    }

    subtractMatrix(matrix: Matrix): Matrix {
        const negativeMatrix = matrix.toArray().map(row => row.map(cell => new Fraction(cell.getNumerator() * -1, cell.getDenominator())));
        return this.addMatrix(
            new Matrix(negativeMatrix)
        );
    }

    multiplyMatrix(matrix: Matrix): Matrix {
        const selfMatrix = this.toArray();
        const thatMatrix = matrix.toArray();

        if (selfMatrix[0].length !== thatMatrix.length) {
            throw new Error(`# Cols in the first matrix must = # Rows in the second`)
        }

        const newMatrix: Fraction[][] = [];

        //iterate to the particular row/colum
        for (let iRow = 0; iRow < thatMatrix.length; iRow++) {
            const newRow: Fraction[] = [];
            for (let iCol = 0; iCol < thatMatrix[iRow].length; iCol++) {
                let newCell: Fraction = new Fraction(0, 1);
                //iterate again to get the current values
                for (let iSumCol = 0; iSumCol < selfMatrix[iRow].length; iSumCol++) {
                    const left = selfMatrix[iRow][iSumCol];
                    const right = thatMatrix[iSumCol][iCol];
                    const product = left.multiplyFractions(
                        [right]
                    );
                    newCell = newCell.addFractions(
                        [product]
                    );
                }
                newRow.push(newCell);
            }
            newMatrix.push(newRow);
        }

        return new Matrix(newMatrix);
    }

    getNthPower(power: number): Matrix {
        if (power === 0) {
            //todo: if not square, chop off bottom / side
            return Matrix.getIdentityMatrix(this.getWidth());
        }

        let matrix: Matrix = new Matrix(this.toArray());
        for (let i = 2; i < power; i++) {
            matrix = matrix.multiplyMatrix(this);
        }
        return matrix;
    }

    /**
     * Find the determinant 
     */
    getDeterminant(): Fraction {
        //base cases
        if (this.matrix.length === 1) {
            return this.matrix[0][0];
        }

        if (this.matrix.length === 2) {
            return this.matrix[0][0].multiplyFractions([this.matrix[1][1]]).subtractFractions([this.matrix[0][1].multiplyFractions([this.matrix[1][0]])]);
        }

        //recursively find the minors
        return this.matrix[0].reduce((accFrac, cell, cellIndex) => {
            const subMatrix = this.getSubMatrix(0, cellIndex);
            const subDeterminant = subMatrix.getDeterminant();
            const total = cell.multiplyFractions([subDeterminant]);
            if (cellIndex % 2 === 0) {
                return accFrac.subtractFractions([total]);
            } else {
                return accFrac.addFractions([total]);
            }
        }, new Fraction(0, 1));
    }

    /**
     * Create a sub matrix with ignoreRow and ignoreColumn absent
     */
    getSubMatrix(ignoreRow: number, ignoreColumn: number): Matrix {
        let newMatrix = [...this.matrix];
        newMatrix.splice(ignoreRow, 1);
        newMatrix = newMatrix.map(row => {
            const newRow = [...row];
            newRow.splice(ignoreColumn, 1);
            return newRow;
        });
        return new Matrix(newMatrix);
    }

    getInverseMatrix(): Matrix {
        const determinant = this.getDeterminant();
        const inverseDeterminant = determinant.getReciprocal();

        const adjointMatrix = this.getAdjointMatrix();

        return adjointMatrix.multiplyScalar(inverseDeterminant);
    }

    getCofactorMatrix(): Matrix {
        const thisMatrix = this.toArray();
        const newMatrix: Fraction[][] = [];

        for (let iRow = 0; iRow < thisMatrix.length; iRow++) {
            const newRow: Fraction[] = [];
            for (let iCol = 0; iCol < thisMatrix[iRow].length; iCol++) {
                const minorMatrix = this.getSubMatrix(iRow, iCol);
                const minorMatrixDet = minorMatrix.getDeterminant();
                const newCell: Fraction = new Fraction(
                    Math.pow(-1, iRow + iCol),
                    1
                ).multiplyFractions([minorMatrixDet]);
                newRow.push(newCell);
            }
            newMatrix.push(newRow);
        }

        const scalarFrac = new Fraction(
            (this.getWidth() % 2 === 0 ? -1 : 1),
            1
        );

        return new Matrix(newMatrix).multiplyScalar(scalarFrac);
    }

    getAdjointMatrix(): Matrix {
        return this.getCofactorMatrix().transposeMatrix();
    }

    toString(): string {
        return this.matrix.reduce((str, row) => {
            return str + ",\n[" + row.reduce((cStr, cell) => {
                return cStr + ", " + cell.toString()
            }, "").substring(1) + "]";
        }, "").substring(2);
    }

    enlargeWithZeros(numNewRows: number, numNewCols: number): Matrix {
        const qMatrix = [...this.toArray()];
        const originalLength = qMatrix.length;

        const numRowsTotal = qMatrix.length + numNewRows;
        const numColsTotal = qMatrix[0].length + numNewCols;

        for (let i = 0; i < originalLength; i++) {
            for (let j = qMatrix[i].length; j < numColsTotal; j++) {
                qMatrix[i].push(new Fraction(0, 1));
            }
        }

        for (let i = originalLength; i < numRowsTotal; i++) {
            const newRow: Fraction[] = [];
            for (let j = 0; j < numColsTotal; j++) {
                newRow.push(new Fraction(0, 1));
            }
            qMatrix.push(newRow);
        }

        return new Matrix(qMatrix);
    }

    static getIdentityMatrix(width: number): Matrix {
        const matrix: Fraction[][] = [];
        for (let i = 0; i < width; i++) {
            const row: Fraction[] = [];
            for (let j = 0; j < width; j++) {
                row.push(
                    j === i
                        ? new Fraction(1, 1)
                        : new Fraction(0, 1)
                );
            }
            matrix.push(row);
        }
        return new Matrix(matrix);
    }
}

export class MarkovChainMatrix extends Matrix {

    constructor(
        matrix: Fraction[][]
    ) {
        super(matrix);
        this.normalizeRows();
    }


    /**
     * Set all row values so sum adds to one
     */
    private normalizeRows(): void {
        this.matrix.forEach((row, rowIndex) => {
            const rowSum = row.reduce((acc, frac) => acc.addFractions([frac]), new Fraction(0, 1));
            //if row has non zero, normalize
            if (rowSum.getNumerator() > 0) {
                row.forEach((cell, columnIndex) => {
                    this.matrix[rowIndex][columnIndex] = cell.divideFractions([rowSum])
                });
            } else { //else, put 1/1 for identity
                this.matrix[rowIndex][rowIndex] = new Fraction(1, 1);
            }
        });
    }

    /**
     * Determine the probabilities and return in array:
     * Last entry is denominator, all previous are numerators
     */
    determineEndStateProbabilities(): number[] {
        const probabilityMatrix = this.getProbabilityMatrix();
        const probAr = probabilityMatrix.toArray();

        const fromStartState = probAr[0].filter((item, ind) => ind < this.getAbsorbingStates().length);
        const lcm = Fraction.lcm(
            ...fromStartState.map(fss => fss.getDenominator())
        );
        
        const numerators = fromStartState.map(fss => Math.abs(fss.getNumerator()) * (lcm / fss.getDenominator()));
        return [...numerators, lcm];
    }

    getProbabilityMatrix(): Matrix {
        const fundamentalMatrix = this.getFundamentalMatrix();
        const rMatrix = this.getRSubMatrix();

        const rMatrixObj = rMatrix.enlargeWithZeros(
            Math.abs(fundamentalMatrix.getWidth() - rMatrix.getWidth()),
            Math.abs(fundamentalMatrix.getHeight() - rMatrix.getHeight())
        );

        return fundamentalMatrix.multiplyMatrix(rMatrixObj);
    }

    getFundamentalMatrix(): Matrix {
        const qMatrix = this.getQSubMatrix();

        const identityMatrix = Matrix.getIdentityMatrix(qMatrix.getWidth());
        const difference = identityMatrix.subtractMatrix(qMatrix);

        const inverse = difference.getInverseMatrix();
        return inverse;
    }

    getQSubMatrix(): Matrix {
        const absorbingRows = this.getAbsorbingStates();
        const thisMatrix = this.toArray();
        const absorbingColIndices = absorbingRows.map((aRow) => {
            const row = thisMatrix[aRow];
            const pos = row.reduce((pos, frac, ind) => pos === -1 && frac.getNumerator() === 1 && frac.getDenominator() === 1 ? ind : pos, -1);
            return pos;
        });
        return new Matrix(this.matrix.filter((row, ind) => absorbingRows.indexOf(ind) === -1).map(row => {
            const filteredRow: Fraction[] = [];
            for (let i = 0; i < row.length; i++) {
                if (absorbingColIndices.indexOf(i) === -1) {
                    filteredRow.push(row[i]);
                }
            }

            return filteredRow;
        }));
    }

    getRSubMatrix(): Matrix {
        const absorbingRows = this.getAbsorbingStates();
        const thisMatrix = this.toArray();
        const absorbingColIndices = absorbingRows.map((aRow) => {
            const row = thisMatrix[aRow];
            const pos = row.reduce((pos, frac, ind) => pos === -1 && frac.getNumerator() === 1 && frac.getDenominator() === 1 ? ind : pos, -1);
            return pos;
        });

        return new Matrix(this.matrix.filter((row, ind) => absorbingRows.indexOf(ind) === -1).map(row => {
            const filteredRow: Fraction[] = [];
            for (let i = 0; i < row.length; i++) {
                if (absorbingColIndices.indexOf(i) > -1) {
                    filteredRow.push(row[i]);
                }
            }

            return filteredRow;
        }));
    }

    private isRowAbsorbing(row: Fraction[]): boolean {
        return row.filter(frac => frac.getNumerator() === 1 && frac.getDenominator() === 1).length === 1;
    }

    private getAbsorbingStates(): number[] {
        //return this.matrix.filter(row => this.isRowAbsorbing(row)).map((row, ind) => ind);
        return this.matrix.reduce((rowIndices, row, index) => {
            if (this.isRowAbsorbing(row)) {
                rowIndices.push(index);
            }
            return rowIndices;
        }, [] as number[]);

    }

}