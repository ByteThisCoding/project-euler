import { BigIntFraction } from "../../utils/bigint-fraction";
import { BigIntUtils } from "../../utils/bigint-utils";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution71 extends AbstractSolution {

    getProblemName(): string {
        return "Ordered Fractions";
    }

    protected solve() {
        return this.efficientSolve(1_000_000n);
        //return this.inefficientSolve(50n);
        //return this.inefficientSolve(1_000_000n);
        //const nums = this.getCoprimeNumerators(1234567n);
        //return this.findBetterFraction(nums, 1234567n, new BigIntFraction(2n, 7n), new BigIntFraction(3n, 7n));
    }

    private efficientSolve(limit: bigint): bigint {
        //search frac is implicit in algorithm, so commented out
        //const searchLeftFrac = new BigIntFraction(3n, 7n);

        const numMultiply = limit/7n;

        return 2n + 3n*(numMultiply-1n);
    }

    private inefficientSolve(limit: bigint): bigint {
        const searchLeftFrac = new BigIntFraction(3n, 7n);

        let currentBestFrac = new BigIntFraction(1n, 3n);

        //iterate over denominator
        for (let d=3n; d <= limit; d++) {
        //for (let d=limit; d>2; d--) {

            //iterate over coprime numerators
            const numerators = this.getCoprimeNumerators(d);
            const bestNum = this.findBetterFraction(numerators, d, currentBestFrac, searchLeftFrac);
            const thisFrac = new BigIntFraction(bestNum, d);

            if (thisFrac.subtractBigIntFraction(currentBestFrac).getNumerator() > 0) {
                console.log(thisFrac.toString());
                currentBestFrac = thisFrac;
            }
        }

        return currentBestFrac.getNumerator();
    }

    private findBetterFraction(nums: bigint[], denom: bigint, currentBestFrac: BigIntFraction, findFrac: BigIntFraction): bigint {

        let left = Number(currentBestFrac.getNumerator()/currentBestFrac.getDenominator()) * nums.length;
        let right = Math.floor(nums.length*6/7);

        while (left < right) {

            const p = Math.floor(left + (right - left ) / 2);

            const pNum = nums[p];

            const pFrac = new BigIntFraction(pNum, denom);

            const comparison = pFrac.subtractBigIntFraction(findFrac);

            if (comparison.getNumerator() < 0n) {
                left = p + 1;
            } else {
                right = p;
            }

        }

        return nums[left - 1];
    }

    private getCoprimeNumerators(denom: bigint): bigint[] {
        const nums: bigint[] = [1n];
        for (let n=2n; n<denom; n++) {
            if (BigIntUtils.gcd(n, denom) === 1n) {
                nums.push(n);
            }
        }
        return nums;
    }

    /***
     * 
     * 2/5; 5/12; 8/19; 11/26; 14/33; 17/40; 20/47;
     * 
     */

}