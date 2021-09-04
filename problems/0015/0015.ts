import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution15 extends AbstractSolution {

    private posMap = new Map<string, number>();

    getProblemName(): string {
        return "Lattice Paths";
    }

    protected solve() {
        return this.checkSubtree(20, 0, 0);
    }

    private checkSubtree(n: number, xPos: number, yPos: number): number {
        if (xPos === n && yPos === n) {
            return 1;
        }

        const index = `${xPos},${yPos}`;
        if (this.posMap.has(index)) {
            return this.posMap.get(index)!;
        }

        let numLeaves = 0;
        if (xPos < n) {
            numLeaves += this.checkSubtree(n, xPos+1, yPos);
        }
        if (yPos < n) {
            numLeaves += this.checkSubtree(n, xPos, yPos + 1);
        }

        this.posMap.set(index, numLeaves);
        return numLeaves;

    }

    /***
     * 
     *                                  0.0
     *                  1.0                             0.1
     *          2.0             1.1             1.1             0.2
     *      x       2.1     2.1     1.2     2.1     1.2     1.2     x
     *     x x    x   2.2  x  2.2  2.2 x  x   2.2  2.2 x   x 2.2   x x
     */

}