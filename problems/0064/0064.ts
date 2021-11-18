import { BigIntUtils } from "../../utils/bigint-utils";
import { AbstractSolution, RunSolution } from "../../utils/solution";

interface iSeqItem {
    aTerm: bigint;
    remainder: bigint[];
}

@RunSolution
export class Solution64 extends AbstractSolution {

    getProblemName(): string {
        return "Odd Period Square Roots";
    }

    protected solve() {
        return this.doSolve(10_000);
        //return this.getNumRepeatingSqrt(23n);
    }

    /**
     * Check the repeating fractions for 2<=n<=limit
     * Return odd count
     */
    private doSolve(limit: number): number {
        let numOdd = 0;
        for (let n=2n; n<=limit; n++) {
            if (this.getNumRepeatingSqrt(n) % 2 === 1) {
                numOdd ++;
            }
        }
        return numOdd;
    }

    /**
     * Generate the sequence of the continued fraction for sqrt(n)
     * Return the size of the period
     * @param n 
     * @returns 
     */
    private getNumRepeatingSqrt(n: bigint): number {
        if (BigIntUtils.isPerfectSquare(n)) {
            return 0;
        }
        const floorSqrtN: bigint = BigIntUtils.sqrt(n);

        //originally, we used a sorted array, but using a set is much faster
        const seq = new Set<string>();

        //determine first / initial element
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

            const seqKey = `${aTerm},${lastItem.remainder[0]},${lastItem.remainder[1]}`
            if (seq.has(seqKey)) {
                return seq.size;
            } else {
                seq.add(seqKey);
            }

        }

    }
}