import { Integer } from "../../utils/integer";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution12 extends AbstractSolution {
    
    getProblemName(): string {
        return "Highly Divisible Triangular Number";
    }

    protected solve(): number {
        return this.smartBruteForceSolve();
    }

    private smartBruteForceSolve(): number {

        const startTriangleIndex = 353;

        let lastTriangleNum: number = -1
        let lastNumFactors: number = -1
        for (let n = startTriangleIndex; lastNumFactors < 501; n ++) {

            lastTriangleNum = this.getNthTriangleNumber(n);
            lastNumFactors = new Integer(lastTriangleNum).getUniqueFactors().length;

        }


        return lastTriangleNum;
    }

    private getNthTriangleNumber(n: number): number {
        return (n*n+n)/2;
    }

    /**
     * 
     * Triangle Number Generator: (n(n+1))/2
     * 250*250 = 62500
     * 
     * t = (n(n+1))/2
     * --> 62500 = (n(n+1))/2
     * --> 125000 = n(n+1)
     * --> 125000 = n^2 + n
     * --> sqrt(125000) = sqrt(n)*sqrt(n+1)
     * --> 353
     * 
     * --> Triangle Number: 62481
     */

}