import { BigIntFraction } from "../../utils/bigint-fraction";
import { BigIntUtils } from "../../utils/bigint-utils";
import { AbstractSolution, RunSolution } from "../../utils/solution";

/**
 * Notes:
 *  : if height is an integer, area will be an integer for these triangles
 *  : a = 1/2*b*h, h^2 = n^2 - (nAlt/2)^2
 *  : nAlt = n + 1 or n - 1
 *  : Reducing, we get: n = 1/3(2*sqrt(3h^2+1) +- 1)
 *  : Above, +-1 represents nAlt offset
 *  : If we get an integer n value, we have found a triangle
 *  : Pell's equation
 */

interface iSeqItem {
    aTerm: bigint;
    remainder: bigint[];
}

@RunSolution
export class Solution94 extends AbstractSolution {

    getProblemName(): string {
        return "Almost Equilateral Triangles";
    }

    protected solve() {
        return this.doSolve(1_000_000_000n);
    }

    private doSolve(limit: bigint): bigint {
        let sum = 0n;

        this.generateDiophantine3((x, y, stop) => {
            //ignore degenerate triangle case
            if (x === 2n) {
                return;
            }
            const sqrtPlus = 2n * x;
            const sqrtPlusMod = sqrtPlus % 3n;
            if (sqrtPlusMod === 1n) {
                const nSub = (sqrtPlus - 1n) / 3n;
                const calc = nSub * 3n - 1n;
                if (calc <= limit) {
                    sum += calc;
                } else {
                    stop();
                }
            } else if (sqrtPlusMod === 2n) {
                const nAdd = (sqrtPlus + 1n) / 3n;
                const calc = nAdd * 3n + 1n;
                if (calc <= limit) {
                    sum += calc;
                } else {
                    stop();
                }
            }

        });

        return sum;
    }

    /**
     * We need to get values of x and y where
     * : x^2 - 3*y^2 = 1
     * Callback will be invoked with those values
     * @param callback 
     * @returns 
     */
    private generateDiophantine3(
        callback: (x: bigint, y: bigint, stop: Function) => void
    ): void {
        const D = 3n;

        const floorSqrtN: bigint = BigIntUtils.sqrt(D);

        //determine first / initial element
        let lastItem: iSeqItem = {
            aTerm: floorSqrtN,
            remainder: [-1n * floorSqrtN, 1n]
        };

        //console.log("initial", lastItem);

        let seq: iSeqItem[] = [lastItem];

        while (true) {

            const frac = this.rollBackContinuedFrac(seq.map(item => item.aTerm));

            const x = frac.getNumerator();
            const y = frac.getDenominator();

            if (x ** 2n - D * y ** 2n === 1n) {
                let stop = false;
                callback(x, y, () => stop = true);
                if (stop) {
                    return;
                }
            }

            const diff = D - lastItem.remainder[0] ** 2n;

            let numerator = -1n * lastItem.remainder[0] * lastItem.remainder[1];
            let denominator = diff;

            const gcd = BigIntUtils.abs(BigIntUtils.gcdTwoNums(lastItem.remainder[1], denominator));

            const numeratorOffset = numerator + floorSqrtN * lastItem.remainder[1];
            const aTerm = numeratorOffset / denominator;
            const adjustedNumerator = numerator - aTerm * diff;

            lastItem = {
                aTerm,
                remainder: [adjustedNumerator / gcd, denominator / gcd]
            };

            seq.push(lastItem);
        }

    }

    private rollBackContinuedFrac(seq: bigint[]): BigIntFraction {
        let partialFrac = new BigIntFraction(seq[seq.length - 1], 1n);
        //console.log(partialFrac.toString());
        for (let i = seq.length - 2; i >= 0; i--) {
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