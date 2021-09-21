import { SortedArray } from "@byte-this/collections";
import { BigIntUtils } from "../../utils/bigint-utils";
import { Fraction } from "../../utils/fraction";
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
        //return this.getNumRepeatingSqrt(8);
        //return this.getNumRepeatingSqrt(23n);

        /**for (let n=2n; n<14n; n++) {
            console.log(n, this.getNumRepeatingSqrt(n));
        }*/
    }

    private doSolve(limit: number): number {
        let numOdd = 0;
        for (let n=2n; n<=limit; n++) {
            if (this.getNumRepeatingSqrt(n) % 2 === 1) {
                numOdd ++;
            }
        }
        return numOdd;
    }

    private getNumRepeatingSqrt(n: bigint): number {
        const floorSqrtN: bigint = BigIntUtils.sqrt(n);
        if (floorSqrtN**2n === n) {
            return 0;
        }

        const seq = new SortedArray<iSeqItem>(
            (a, b) => {
                if (a.aTerm !== b.aTerm) {
                    return Number(b.aTerm - a.aTerm);
                }
                //return Number(a.remainder[0]/a.remainder[1] - b.remainder[0]/b.remainder[1])
                if (a.remainder[0] === b.remainder[0]) {
                    return Number(a.remainder[1] - b.remainder[1]);
                }
                return Number(a.remainder[0] - b.remainder[0])
            }
        );

        //determine first / initial element
        let lastItem: iSeqItem = {
            aTerm: floorSqrtN,
            remainder: [-1n*floorSqrtN, 1n]
        };

        //console.log("initial", lastItem);

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

            /*console.log({lastItem, numeratorOffset, diff, numerator, gcd});

            if (seq.length > 4) {
                return -1;
            }*/

            if (seq.contains(lastItem)) {
                return seq.length;
            } else {
                seq.add(lastItem);
            }

        }

    }

}