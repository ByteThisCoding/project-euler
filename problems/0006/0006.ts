import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
class Solution6 extends AbstractSolution {

    getProblemName(): string {
        return "Sum Square Difference";
    }

    protected solve(): number {
        //25164150
        //return this.bruteForceSolve(100);
        return this.smartSolve(100);
    }

    private smartSolve(limit: number): number {
        /**
         * limit = 10
         * 1+2+3+4+5+6+7+8+9+10 = 55
         * 10*(10/2)+10/2
         * (n*(n+1))/2
         * 
         * limit = 8
         * 1+2+3+4+5+6+7+8=36
         */
        let addSquare = (limit*(limit+1))/2;
        addSquare *= addSquare;

        let squareAdd: number = 1;
        for (let i=2; i<=limit; i++) {
            squareAdd += i*i;
        }

        return addSquare - squareAdd;
    }

    private bruteForceSolve(limit: number): number {
        let squareAdd: number = 1;
        let addSquare: number = 1;
        for (let i=2; i<=limit; i++) {
            squareAdd += i*i;
            addSquare += i;
        }
        addSquare *= addSquare;

        return addSquare - squareAdd;
    }
}