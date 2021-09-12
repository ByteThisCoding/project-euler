import { Combinations } from "../../utils/combinations";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution43 extends AbstractSolution  {

    private divisibilityMap = [
        -1,
        2,
        3,
        5,
        7,
        11,
        13,
        17
    ];

    getProblemName(): string {
        return "Sub-String Divisibility";
    }

    protected solve() {
        return this.doSolve();
        //return this.isQualified("1406357289");
    }

    private doSolve(): number {
        let sum = 0;
        Combinations.forEachNPermutations(10, [0,1,2,3,4,5,6,7,8,9], (perm: string) => {
            sum += (this.isQualified(perm) ? parseInt(perm) : 0);
        });
        return sum;
    }

    /**
     * This assumes perm is 10 digit permutation of 0-9 digits
     * @param perm 
     */
    private isQualified(perm: string): boolean {
        if (perm[0] === '0') {
            return false;
        }

        //7: as length is assumed to be 10
        for (let i=1; i<8; i++) {
            const subPerm = perm.substring(i, i+3);
            const subPermInt = parseInt(subPerm);
            //console.log({subPerm, div: this.divisibilityMap[i]})
            if (subPermInt % this.divisibilityMap[i] !== 0) {
                return false;
            }
        }

        console.log("====>", perm);
        return true;

    }

}