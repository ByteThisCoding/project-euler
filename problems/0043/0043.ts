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
        
        //in our video we used the Combinations class, but instead we'll generate ourselves to save some time
        /*Combinations.forEachNPermutations(10, [0,1,2,3,4,5,6,7,8,9], (perm: string) => {
            sum += (this.isQualified(perm) ? parseInt(perm) : 0);
        });*/

        //define the first number of each perm, then call recursive "forEachPerm" to get the rest
        //this way, we can avoid having invalid "0" perms
        for (let i=1; i<10; i++) {
            const choices = new Array(9).fill(0).map((_, ind) => {
                if (ind + 1 === i) {
                    return 0;
                }
                return ind+1;
            });
            this.forEachPerm(10, choices, (perm: string) => {
                sum += (this.isQualified(perm) ? parseInt(perm) : 0);
            }, "" + i);
        }


        return sum;
    }

    /**
     * Recursively generate permutations given a set of choices
     * Invoke a callback once we have the full string
     * @param lenTotal 
     * @param choices 
     * @param callback 
     * @param permSoFar 
     */
    private forEachPerm(lenTotal: number, choices: number[], callback: (perm: string) => void, permSoFar = ""): void {

        //recursive case
        if (choices.length === 1) {
            callback(permSoFar + choices[0]);
        } else {
            choices.forEach((choice, ind) => {
                const remainingChoices = [...choices];
                remainingChoices.splice(ind, 1);

                this.forEachPerm(lenTotal, remainingChoices, callback, permSoFar + "" + choice)
            });
        }
    }

    /**
     * This assumes perm is 10 digit permutation of 0-9 digits
     * @param perm 
     */
    private isQualified(perm: string): boolean {

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