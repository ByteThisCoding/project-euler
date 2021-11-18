import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution91 extends AbstractSolution {

    getProblemName(): string {
        return "Right Triangles With Integer Coordinates";
    }

    protected solve() {
        //return this.doSolve(2);
        return this.doSolve(50);
    }

    /**
     * Iterate over x and y dimensions
     * For each, iterate over smaller x and y dimensions
     * Check if the coordinate pairs form valid triangles and count
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {

        let count = 0;

        //increment over grid
        for (let xTwo = 1; xTwo <= limit; xTwo ++) {
            for (let yTwo = 1; yTwo <= limit; yTwo ++) {

                //sub increment over smaller values
                for (let xOne = 0; xOne <= xTwo; xOne ++) {
                    for (let yOne = 0; yOne <= yTwo; yOne ++) {

                        //if valid, add to the count
                        count += this.isValidRightTriangle(xOne, yTwo, xTwo, yOne) ? 1: 0;

                    }
                }
            }
        }

        return count;
    }

    /**
     * Check if the pair + origin form a right triangle
     * @param pair 
     * @returns 
     */
    private isValidRightTriangle(fx: number, fy: number, sx: number, sy: number): boolean {
        //if any points are also the origin, not a valid triangle
        if (fx === 0 && fy === 0 || sx === 0 && sy === 0) {
            return false;
        }

        //if both points have 0 for x or y, not valid
        if (fx === 0 && sx === 0 || fy === 0 && sy === 0) {
            return false;
        }

        //if two coordinates are the same, return false
        if (fx === sx && fy === sy) {
            return false;
        }
        
        //use pythagorean theorem to check if right triangle
        const oFirstSqr = fx**2 + fy**2;
        const oSecondSqr = sx**2 + sy**2;
        const pairSqr = (sx - fx)**2
            + (sy - fy)**2;

        return oFirstSqr + oSecondSqr === pairSqr
            || oFirstSqr + pairSqr === oSecondSqr
            || oSecondSqr + pairSqr === oFirstSqr;

    }
}