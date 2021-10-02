import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution9 extends AbstractSolution {

    getProblemName(): string {
        return "Special Pythagorean Triplet";
    }

    protected solve(): number {
        return this.bruteForceSolve();
    }

    private bruteForceSolve(): number {
        let product: number = 0;

        //b and a are swapped: b < a
        for (let a = 1; product === 0; a ++) {
            let abcSum = 0;
            let aSquared = a*a;
            for (let b = 1; b < a && abcSum < 1000; b++) {

                let cSquared = aSquared + b*b;
                let c = Math.sqrt(cSquared);

                abcSum = a + b + c;

                if (abcSum === 1000) {
                    product = a * b * c;
                }
            }
        }

        return product;

    }
}