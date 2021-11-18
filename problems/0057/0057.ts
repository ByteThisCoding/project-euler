import { BigIntFraction } from "../../utils/bigint-fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution57 extends AbstractSolution {

    getProblemName(): string {
        return "Square Root Convergents";
    }

    protected solve() {
        return this.doSolve(1_000);
    }

    private doSolve(limit: number): number {
        let numBigIntFractionsLongerDenominator = 0;
        const fracTwo = new BigIntFraction(2n, 1n);

        //this will be the expansion carry value
        let fracPart = new BigIntFraction(1n, 2n);

        //keep performing expansions up to the limit
        for (let i=1; i<limit; i++) {
            fracPart = BigIntFraction.ONE
                .divideBigIntFraction(
                    fracTwo.addBigIntFraction(fracPart)
                );

            const fullFrac = BigIntFraction.ONE.addBigIntFraction(fracPart);

            //compare denominator lengths
            if (fullFrac.getNumerator() > fullFrac.getDenominator()
                && fullFrac.getNumerator().toString().length > fullFrac.getDenominator().toString().length
            ) {
                numBigIntFractionsLongerDenominator ++;
            }
        }


        return numBigIntFractionsLongerDenominator;
    }


}