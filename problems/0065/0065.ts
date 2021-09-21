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
        //let partialFrac = BigIntFraction.ONE;
        for (let i=seq.length - 2; i>=0; i--) {
            const seqFrac = new BigIntFraction(seq[i], 1n);
            partialFrac = BigIntFraction.ONE.divideBigIntFraction(seqFrac.addBigIntFraction(partialFrac));
            //partialFrac = seqFrac.addBigIntFraction(partialFrac);
            //console.log("p", seqFrac.toString(), partialFrac.toString());
        }

        const fullFrac = new BigIntFraction(offset, 1n).addBigIntFraction(partialFrac);

        console.log(/*seq, */fullFrac.toString());

        const numeratorDigits = Array.from(fullFrac.getNumerator().toString());
        return numeratorDigits.reduce((acc, intStr) => acc + BigInt(intStr), 0n);

    }

}