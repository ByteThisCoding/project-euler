import { AbstractSolution, RunSolution } from "../../utils/solution";
import { SpiralSequence28 } from "./spiral-sequence";

@RunSolution
export class Solution28 extends AbstractSolution {

    getProblemName(): string {
        return "Number Spiral Diagonals";
    }

    protected solve(): any {
        const lastIndex = this.getEndIndex(1001);
        return SpiralSequence28.getSpiralSumOfRange(1, lastIndex);
    }

    private getEndIndex(n: number): number {
        return 5 + (n - 3)*2;
    }

    /**
     * 
     * 1, 3,5,7,9,    13,17,21,25,   31, 37, 43, 49
     * x, prev + 2    prev + 4       prev + 6
     * 
     * 
             43 44 45 46 47 48 49
             42 21 22 23 24 25 26
             41 20  7  8  9 10 27
             40 19  6  1  2 11 28
             39 18  5  4  3 12 29
             38 17 16 15 14 13 30
             37 36 35 34 33 32 31
     * 

     * --------------------------------------------

             1x1 ==> 1
             2x2 ==> 2
             3x3 ==> 5
             5x5 ==> 9
             7x7 ==> 13

             3  5  7   9
             5  9  13  17  21

             5 + (levels - 3)*2

     */

}