import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution90 extends AbstractSolution {

    getProblemName(): string {
        return "Cube Digit Pairs";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Keep generating dice and checking if they are valid pairs
     */
    private doSolve(): number {
        let validDiceSet = new Set<string>();

        this.generateDice(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            new Set<number>(),
            new Set<number>(), 
            (dOne: Set<number>, dTwo: Set<number>) => {
                if (this.areDiceValid(dOne, dTwo)) {
                    const key = this.diceToString(dOne, dTwo);
                    //console.log(key);
                    validDiceSet.add(key);
                }
            }
        );

        return validDiceSet.size;
    }


    /**
     * Create a string representation
     * Useful for storing in a set + debugging purposes
     * This will order dice
     * @param dOne 
     * @param dTwo 
     * @returns 
     */
    private diceToString(dOne: Set<number>, dTwo: Set<number>): string {
        const dOneSorted = Array.from(dOne).sort((a, b) => a - b);
        const dTwoSorted = Array.from(dTwo).sort((a, b) => a - b);

        let dOneSum = dOneSorted.reduce((acc, sum) => acc + sum);
        let dTwoSum = dTwoSorted.reduce((acc, sum) => acc + sum);
        
        let dMin = dOneSorted;
        let dMax = dTwoSorted;

        if (dTwoSum > dOneSum) {
            dMin = dTwoSorted;
            dMax = dOneSorted;
        } else if (dTwoSum === dOneSum) {
            //order based on first different char
            for (let i=0; i<dTwoSorted.length; i++) {
                dOneSum -= dOneSorted[i];
                dTwoSum -= dTwoSorted[i];

                if (dTwoSum > dOneSum) {
                    dMin = dTwoSorted;
                    dMax = dOneSorted;
                    break;
                } else if (dTwoSum < dOneSum) {
                    break;
                }
            }
        }

        return dMin.join(",")+"."+dMax.join(",");
    }

    /**
     * Generate dice pairs by adding choices 0, 1, and/or 2 times
     * This is a recursive implementation
     * @param choices 
     * @param partialOne 
     * @param partialTwo 
     * @param callback 
     * @returns 
     */
    private generateDice(
        choices: number[],
        partialOne: Set<number>,
        partialTwo: Set<number>,
        callback: (dOne: Set<number>, dTwo: Set<number>) => void
    ): void {

        //base case, not enough choices left to fill out dice
        if (partialOne.size < (6 - choices.length) || partialTwo.size < (6 - choices.length)) {
            return;
        }

        //base case
        //if dice are full, callback immediately
        if (partialOne.size === 6 && partialTwo.size === 6) {
            callback(partialOne, partialTwo);
            return;
        }

        //base case, one choice left
        if (choices.length === 1) {
            let newPartialOne = partialOne;
            let newPartialTwo = partialTwo;
            if (partialOne.size < 6) {
                newPartialOne = new Set(partialOne);
                newPartialOne.add(choices[0]);
            }
            if (partialTwo.size < 6) {
                newPartialTwo = new Set(partialTwo);
                newPartialTwo.add(choices[0]);
            }

            this.generateDice([], newPartialOne, newPartialTwo, callback);
            return;
        }

        //recursive case, add choices in
        //seperate cases for adding 0 times, 1 time, and two times
        //we can only have 7 0 times
        const newChoices = choices.slice(1);

        /* Special cases
         * : 7 is the only one that doesn't need to be present at all
         * : 6 or 9 are interchangeable so we don't always have to add
        */
        if (choices[0] === 7 || choices[0] === 6) {
            this.generateDice(newChoices, partialOne, partialTwo, callback);
        }

        //add to left die
        let leftPartialOne = partialOne;
        if (partialOne.size < 6) {
            leftPartialOne = new Set(partialOne);
            leftPartialOne.add(choices[0]);
            this.generateDice(newChoices, leftPartialOne, partialTwo, callback);
        }

        //add to right die
        let rightPartialTwo = partialTwo;
        if (partialTwo.size < 6) {
            rightPartialTwo = new Set(partialTwo);
            rightPartialTwo.add(choices[0]);
            this.generateDice(newChoices, partialOne, rightPartialTwo, callback);
        }

        //add to both die
        if (partialOne.size < 6 && partialTwo.size < 6) {
            this.generateDice(newChoices, leftPartialOne, rightPartialTwo, callback);
        }
    } 
    
    /**
     * Validate the dice have the appropriate faces
     *  where all powers of two can be represented
     * Uses 6 in place of 9 to allow for rotation rule
     * @param dOne 
     * @param dTwo 
     */
    private areDiceValid(dOne: Set<number>, dTwo: Set<number>): boolean {
        if (!this.setsMatch(0, 1, dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatch(0, 4, dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatchAny(0, new Set([6, 9]), dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatchAny(1, new Set([6, 9]), dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatch(2, 5, dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatchAny(3, new Set([6, 9]), dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatchAny(4, new Set([6, 9]), dOne, dTwo)) {
            return false;
        }
        if (!this.setsMatch(8, 1, dOne, dTwo)) {
            return false;
        }
        
        return true;
    }

    /**
     * Check if two sets have elements such that one has a and the other has b
     * @param a 
     * @param b 
     * @param sOne 
     * @param sTwo 
     */
    private setsMatch(a: number, b: number, sOne: Set<number>, sTwo: Set<number>): boolean {
        return sOne.has(a) && sTwo.has(b) || sOne.has(b) && sTwo.has(a)
    }

    /**
     * Check if a set has any of the elements of the other set
     * @param b 
     * @param set 
     * @returns 
     */
    private setHasAny(b: Set<number>, set: Set<number>): boolean {
        for (const bItem of b) {
            if (set.has(bItem)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check that if one set as a, the other has any of b
     * @param a 
     * @param b 
     * @param sOne 
     * @param sTwo 
     */
    private setsMatchAny(a: number, b: Set<number>, sOne: Set<number>, sTwo: Set<number>): boolean {
        if (sOne.has(a)) {
            if (this.setHasAny(b, sTwo)) {
                return true;
            }
        }
        
        if (sTwo.has(a)) {
            if (this.setHasAny(b, sOne)) {
                return true;
            }
        }

        return false;
    }
}