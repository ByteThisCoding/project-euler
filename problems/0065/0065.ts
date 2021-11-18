import { BigIntFraction } from "../../utils/bigint-fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution65 extends AbstractSolution {

    getProblemName(): string {
        return "Convergents of e";
    }

    protected solve() {
        return this.doSolve(100);
    }

    /**
     * Generate the sequence of e
     * Then, iteratively roll back the sequence into a fraction
     * Assumes limit >= 2
     * @param limit 
     */
    private doSolve(limit: number): bigint {

        const offset = 2n;

        //generate sequence terms
        const seq = [1n,2n];
        let lastJump = 2n;
        for (let i=0; i<limit - 3; i++) {
            if (i % 3 === 2) {
                lastJump += 2n;
                seq.push(lastJump);
            } else {
                seq.push(1n);
            }
        }

        //roll back
        let partialFrac = new BigIntFraction(1n, seq[seq.length - 1]);
        for (let i=seq.length - 2; i>=0; i--) {
            const seqFrac = new BigIntFraction(seq[i], 1n);
            partialFrac = BigIntFraction.ONE.divideBigIntFraction(seqFrac.addBigIntFraction(partialFrac));
        }

        const fullFrac = new BigIntFraction(offset, 1n).addBigIntFraction(partialFrac);
        return this.getDigitsSum(fullFrac.getNumerator());
    }

    /**
     * Get the sum of each digit in a bigint
     */
    private getDigitsSum(n: bigint): bigint {
        const nStr = n.toString();
        let sum = 0n;
        for (let i=0; i<nStr.length; i++) {
            sum += BigInt(nStr[i]);
        }
        return sum;
    }

}