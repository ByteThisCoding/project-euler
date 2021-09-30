import { BigIntFraction } from "../../utils/bigint-fraction";
import { BigIntUtils } from "../../utils/bigint-utils";
import { AbstractSolution, RunSolution } from "../../utils/solution";

interface iSeqItem {
    aTerm: bigint;
    remainder: bigint[];
}

@RunSolution
export class Solution66 extends AbstractSolution {

    getProblemName(): string {
        return "Diophantine Equation";
    }

    protected solve() {
        return this.doSolve(1_000n);
    }

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

    private findXValueDiophantine(D: bigint): bigint {
        const floorSqrtN: bigint = BigIntUtils.sqrt(D);
        if (floorSqrtN**2n === D) {
            return -1n;
        }

        //determine first / initial element
        let lastItem: iSeqItem = {
            aTerm: floorSqrtN,
            remainder: [-1n*floorSqrtN, 1n]
        };

        //console.log("initial", lastItem);

        let seq: iSeqItem[] = [lastItem];

        while (true) {

            const frac = this.rollBackContinuedFrac(seq.map(item => item.aTerm));

            const x = frac.getNumerator();
            const y = frac.getDenominator();

            if (x**2n - D*y**2n === 1n) {
                return x;
            }

            const diff = D - lastItem.remainder[0]**2n;

            let numerator = -1n*lastItem.remainder[0]*lastItem.remainder[1];
            let denominator = diff;

            const gcd = BigIntUtils.abs(BigIntUtils.gcd(lastItem.remainder[1], denominator));

            const numeratorOffset = numerator+floorSqrtN*lastItem.remainder[1];
            const aTerm = numeratorOffset/denominator;
            const adjustedNumerator = numerator - aTerm*diff;

            lastItem = {
                aTerm,
                remainder: [adjustedNumerator/gcd, denominator/gcd]
            };

            seq.push(lastItem);
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
            //console.log(partialFrac.toString());
        };

        //console.log(partialFrac.toString());

        return partialFrac;
    }

}