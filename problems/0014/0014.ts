import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution14 extends AbstractSolution {

    //we'll use a map to cache sequence items with number of steps to reduce to 1
    private cMap = new Map<number, number>();

    getProblemName(): string {
        return "Longest Collatz Sequence";
    }

    protected solve() {
        return this.doSolve(1_000_000);
    }

    private doSolve(limit: number): number {

        let maxN = 1;
        let maxNumSteps = 0;

        for (let n = 2; n < limit; n++) {
            const nSteps = this.calcCollatzNumSteps(n);
            if (nSteps > maxNumSteps) {
                maxN = n;
                maxNumSteps = nSteps;
            }
        }

        return maxN;
    }

    private calcCollatzNumSteps(input: number): number {
        //if we have in cache return immediately
        if (this.cMap.has(input)) {
            return this.cMap.get(input)!;
        }

        const seq: number[] = [input];
        let n = input;
        let numSteps = 0;

        //perform this step one time first so we can make n even to start the loop
        if (n % 2 === 1) {
            //this will always be even, so we can let loop continue
            n = 3 * n + 1;
            seq.push(n);
            numSteps++;

            const mapCheck = this.checkMap(n, numSteps);
            n = mapCheck.n;
            numSteps = mapCheck.numSteps;
        }

        //keep performing the two operations while n > 1
        while (n > 1) {

            //reduce by dividing by two until we reach an odd number
            while (n % 2 === 0) {
                n = n / 2;
                seq.push(n);
                numSteps++;

                const mapCheck = this.checkMap(n, numSteps);
                n = mapCheck.n;
                numSteps = mapCheck.numSteps;
            }

            //perform 3n+1 step if n>1
            if (n > 1) {
                //this will always be even, so we can let loop continue
                n = 3 * n + 1;
                seq.push(n);
                numSteps++;

                const mapCheck = this.checkMap(n, numSteps);
                n = mapCheck.n;
                numSteps = mapCheck.numSteps;
            }
        }

        //add entries to our map
        seq.forEach((item, index) => {
            this.cMap.set(
                item,
                numSteps - index
            )
        });

        return numSteps;
    }

    /**
     * Helper for "calcCollatzNumSteps"
     * If we have in the map we can use from there
     * @param n 
     * @param numSteps 
     * @returns 
     */
    private checkMap(n: number, numSteps: number): {
        n: number;
        numSteps: number;
    } {
        if (this.cMap.has(n)) {
            numSteps += this.cMap.get(n)!;
            n = 1;
        }
        return {
            n,
            numSteps
        };
    }
}