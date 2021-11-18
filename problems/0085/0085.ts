import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution85 extends AbstractSolution {

    getProblemName(): string {
        return "Counting Rectangles";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Search for best n and m combination
     * Iterate over n values, find m's with binary search
     * If m=1, we've exhausted possible n values
     */
    private doSolve(): number {
        const target = 2_000_000;

        let bestSolutionDiff = Infinity;
        let bestSolutionArea = 0;

        let m = 0;
        for (let n = 2; m !== 1; n++) {
            const res = this.findClosestM(n, target);
            m = res.m;
            const newDiff = Math.abs(target - res.subCount);
            if (bestSolutionDiff > newDiff) {
                bestSolutionDiff = newDiff;
                bestSolutionArea = n * m;
            }
        }

        return bestSolutionArea;
    }

    /**
     * For a particular n, find the m that will get closest to the target
     * This uses binary search to find the value
     * @param n 
     * @param target 
     */
    private findClosestM(n: number, target: number): {
        m: number,
        subCount: number
    } {
        let start = 1;
        let end = n;

        let subCount = 0;
        while (true) {
            let m = Math.floor((end - start) / 2 + start);
            //console.log(m);

            if (m > end) {
                return { m: m - 1, subCount };
            }
            if (m < start) {
                return { m: 1, subCount };
            }

            subCount = this.calcForRectangle(n, m);
            if (subCount === target || start === end) {
                //check that m-1 is not better
                const subCountMinus = this.calcForRectangle(n, m - 1);
                if (Math.abs(target - subCountMinus) < Math.abs(target - subCount)) {
                    m = m - 1;
                    subCount = subCountMinus;
                }
                return { m, subCount };
            }

            if (subCount > target) {
                end = m;
            } else {
                start = m + 1;
            }

        }
    }

    /**
     * Calculates the number of subrectangles
     * ASSUMES n >= n
     * @param n 
     * @param m 
     */
    private calcForRectangle(n: number, m: number): number {
        //by default, include 1x1 and n*m cases
        let count = n * m + 1;

        // Count subrectangles of all sizes excluding side of n length
        for (let c = 2; c < n; c++) {
            for (let d = 1; d <= Math.min(c, m); d++) {
                count += this.calcSubRectangle(n, m, c, d);
            }
        }

        // Count remaining
        for (let d = 1; d < m; d++) {
            count += this.calcSubRectangle(n, m, n, d);
        }

        return count;
    }

    /**
     * Calculates the number of subrectangles of size c and d
     * ASSUMES n >= n and c >= d
     * @param n 
     * @param m 
     * @param c 
     * @param d 
     */
    private calcSubRectangle(n: number, m: number, c: number, d: number): number {
        let count = Math.max(0, (m - c + 1) * (n - d + 1));
        //if sub rectangle is a square, this does not apply
        if (c !== d) {
            count += Math.max(0, (n - c + 1) * (m - d + 1));
        }
        return count;
    }

}