import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution9 extends AbstractSolution {

    getProblemName(): string {
        return "Special Pythagorean Triplet";
    }

    protected solve(): number {
        //return this.bruteForceSolve(1_000);
        return this.smarterBruteForceSolve(1_000);
    }

    /**
     * This is slightly better than "bruteForceSolve"
     * In the for loops, we're adding to our squares
     *      instead of multiplying them out each time
     * @param target 
     * @returns 
     */
    private smarterBruteForceSolve(target: number): number {
        let product= 0;

        //b and a are swapped: b < a
        let aOffset = 1;
        let a = 0;
        for (let aSqr = 1; product === 0; aOffset += 2, aSqr += aOffset) {
            a++;
            let abcSum = 0;

            let b = 0;
            let bOffset = 1;
            for (let bSqr = 1; b < a && abcSum < target; bOffset += 2, bSqr += bOffset) {
                b ++;

                let cSquared = aSqr + bSqr;
                let c = Math.sqrt(cSquared);

                abcSum = a + b + c;

                if (abcSum === target) {
                    product = a * b * c;
                }
            }
        }

        return product;
    }

    /**
     * This is slightly less efficient than "smarterBruteForceSolve"
     * We've left this here for reference purposes
     * @param target 
     * @returns 
     */
    private bruteForceSolve(target: number): number {
        let product: number = 0;

        //b and a are swapped: b < a
        for (let a = 1; product === 0; a ++) {
            let abcSum = 0;
            let aSquared = a*a;
            for (let b = 1; b < a && abcSum < target; b++) {

                let cSquared = aSquared + b*b;
                let c = Math.sqrt(cSquared);

                abcSum = a + b + c;

                if (abcSum === target) {
                    product = a * b * c;
                }
            }
        }

        return product;

    }
}