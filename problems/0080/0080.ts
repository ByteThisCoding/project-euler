import { BigIntFraction } from "../../utils/bigint-fraction";
import { BigIntUtils } from "../../utils/bigint-utils";
import { AbstractSolution, RunSolution } from "../../utils/solution";

interface iSeqItem {
    aTerm: bigint;
    remainder: bigint[];
}

@RunSolution
export class Solution80 extends AbstractSolution {

    getProblemName(): string {
        return "Square Digital Root Expansion";
    }

    protected solve() {
        //return this.getSumForN(2n);
        return this.doSolve();
    }

    private doSolve(): bigint {
        let sum = 0n;
        for (let n=1n; n<=100n; n++) {
            sum += this.getSumForN(n);
        }
        return sum;
    }

    /**
     * Create continued fraction sequence
     * Then, roll it into fraction
     * Then, divide fraction parts to get digits
     * @param n 
     * @returns 
     */
    private getSumForN(n: bigint): bigint {
        const floorSqrtN = BigIntUtils.sqrt(n);
        if (floorSqrtN**2n === n) {
            return 0n;
        }

        const seq = this.getSeqForN(floorSqrtN, n);
        const frac = this.rollUpFrac(seq);

        return this.divideSumDigits(floorSqrtN, frac);
    }

    /**
     * Get the sum of the digits of the first 100 digits
     * Roll back continued fraction to a certain point to get this value
     * @param floorSqrtN 
     * @param frac 
     * @returns 
     */
    private divideSumDigits(floorSqrtN: bigint, frac: BigIntFraction): bigint {

        //if limit was >=100, we would need to sum up digits of floorSqrtN itself and adjust loop
        let digitSum = floorSqrtN;

        let workingFrac = frac;
        for (let i=0; i<99; i++) {
            const tenNum = workingFrac.getNumerator()*10n;
            const digit = tenNum / workingFrac.getDenominator();

            digitSum += digit;

            const diff = tenNum - digit*workingFrac.getDenominator();
            workingFrac = new BigIntFraction(
                diff,
                workingFrac.getDenominator()
            );
        }

        return digitSum;
    }


    /**
     * Roll up fraction by continuously performing divisions
     * @param seq 
     * @returns 
     */
    private rollUpFrac(seq: iSeqItem[]): BigIntFraction {
        let partialFrac = new BigIntFraction(1n, seq[seq.length - 1].aTerm);

        for (let i=180; i>=0; i--) {
            const index = i % seq.length;
            const seqFrac = new BigIntFraction(seq[index].aTerm, 1n);
            partialFrac = BigIntFraction.ONE.divideBigIntFraction(seqFrac.addBigIntFraction(partialFrac));
        }

        return partialFrac;
    }

    /**
     * Get continued fraction sequence
     * @param floorSqrtN fed in to reduce redundant calculations
     * @param n 
     * @returns 
     */
    private getSeqForN(floorSqrtN: bigint, n: bigint): iSeqItem[] {
        const seq: iSeqItem[] = [];
        const seqHits = new Set<string>();

        //determine the first element
        let lastItem: iSeqItem = {
            aTerm: floorSqrtN,
            remainder: [-1n*floorSqrtN, 1n]
        };

        while (true) {

            const diff = n - lastItem.remainder[0]**2n;

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

            const key = `${aTerm},${lastItem.remainder}`;
            if (seqHits.has(key)) {
                return seq;
            } else {
                seq.push(lastItem);
                seqHits.add(key);
            }

        }
    }

}