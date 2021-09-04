import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution14 extends AbstractSolution {

    private cMap = new Map<number, number>();

    getProblemName(): string {
        return "Longest Collatz Sequence";
    }

    protected solve() {
        return this.doSolve(1000000);
    }

    private doSolve(limit: number): number {
        
        let maxN = 1;
        let maxNumSteps = 0;

        for (let n=2; n<limit; n++) {
            const nSteps = this.calcCollatzNumSteps(n);
            if (nSteps > maxNumSteps) {
                maxN = n;
                maxNumSteps = nSteps;
            }
        }

        return maxN;
    }

    private calcCollatzNumSteps(input: number): number {

        if (this.cMap.has(input)) {
            return this.cMap.get(input)!;
        }

        let seq: number[] = [input];
        let n = input;
        let numSteps = 0;

        while (n > 1) {

            if (n % 2 === 0) {
                while (n % 2 === 0) {
                    n = n / 2;
                    seq.push(n);
                    numSteps++;

                    const mapCheck = this.checkMap(n, numSteps);
                    n = mapCheck.n;
                    numSteps = mapCheck.numSteps;
                }
            } else {
                n = 3 * n + 1;
                seq.push(n);
                numSteps++;

                const mapCheck = this.checkMap(n, numSteps);
                n = mapCheck.n;
                numSteps = mapCheck.numSteps;
            }
        }

        seq.forEach((item, index) => {
            this.cMap.set(
                item,
                numSteps - index
            )
        });

        return numSteps;
    }

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