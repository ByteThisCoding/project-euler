import { BigIntFraction } from "../../utils/bigint-fraction";
import { BigIntUtils } from "../../utils/bigint-utils";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution66 extends AbstractSolution {

    getProblemName(): string {
        return "Diophantine Equation";
    }

    protected solve() {
        return this.doSolve(1_000n);
    }

    /**
     * Find diophantine solutions for each value of 2<=D<=limit
     * @param limit 
     * @returns 
     */
    private doSolve(limit: bigint): bigint {
        let maxD = 0n;
        let maxX = 0n;

        for (let D=2n; D<=limit; D++) {
            const xVal = this.findXValueDiophantine(D);
            if (xVal > maxX) {
                maxX = xVal;
                maxD = D;
            }
        }

        return maxD;
    }

    /**
     * Use a continued fraction to find solutions to this Pell's Equation
     * At each point, generate the next seq term, then roll back the fraction
     * When something is found, return the x value
     * @param D 
     * @returns 
     */
    private findXValueDiophantine(D: bigint): bigint {
        const floorSqrtN: bigint = BigIntUtils.sqrt(D);
        if (floorSqrtN**2n === D) {
            return -1n;
        }

        //determine first / initial element
        let seqATerms: bigint[] = [floorSqrtN];
        let seqRemainders: bigint[][] = [[-1n*floorSqrtN, 1n]];

        let lastIndex = 0;
        while (true) {

            const frac = this.rollBackContinuedFrac(seqATerms);

            const x = frac.getNumerator();
            const y = frac.getDenominator();

            if (x**2n - D*y**2n === 1n) {
                return x;
            }

            const diff = D - seqRemainders[lastIndex][0]**2n;

            let numerator = -1n*seqRemainders[lastIndex][0]*seqRemainders[lastIndex][1];
            let denominator = diff;

            const gcd = BigIntUtils.abs(BigIntUtils.gcdTwoNums(seqRemainders[lastIndex][1], denominator));

            const numeratorOffset = numerator+floorSqrtN*seqRemainders[lastIndex][1];
            const aTerm = numeratorOffset/denominator;
            const adjustedNumerator = numerator - aTerm*diff;


            seqATerms.push(aTerm);
            seqRemainders.push([adjustedNumerator/gcd, denominator/gcd]);
            lastIndex++;
        }

    }

    private rollBackContinuedFrac(seq: bigint[]): BigIntFraction {
        let partialFrac = new BigIntFraction(seq[seq.length - 1], 1n);
        //console.log(partialFrac.toString());
        for (let i=seq.length - 2; i>=0; i--) {
            partialFrac = new BigIntFraction(
                seq[i],
                1n
            ).addBigIntFraction(
                BigIntFraction.ONE.divideBigIntFraction(partialFrac)
            );
        };

        return partialFrac;
    }

}