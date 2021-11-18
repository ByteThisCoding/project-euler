import { Fraction } from "../../utils/fraction";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution75 extends AbstractSolution {

    getProblemName(): string {
        return "Singular Integer Right Triangles";
    }

    protected solve() {
        //return this.doSolve(49);
        return this.doSolve(1_500_000);
    }

    /**
     * We'll generate pythagorean triples using:
     * : for each n,m which are integers
     * : generate a = m**2 - n**2
     * : generate b = 2*m*n
     * : generate c = m**2 + n**2
     * : given the above, multiply by k up to limit for more triples
     * 
     * If we encounter a line length more than once, decrement count
     * @param limit 
     * @returns 
     */
    private doSolve(limit: number): number {

        let count = 0;

        const lineLenMap = new Map<number, number>();
        const loopLimit = Math.sqrt(limit / 2);
        
        for (let m=2; m < loopLimit; m++) {

            const mSq = m**2;

            for (let n=1; n<m; n++) {

                if ((m + n) % 2 === 1 && Fraction.gcdTwoNums(m, n) === 1) {
                    const nSq = n**2;

                    const aRoot = mSq - nSq;
                    const bRoot = 2*m*n;
                    const cRoot = mSq + nSq;

                    for (let k=1; true; k++) {

                        const lineLen = k*(aRoot + bRoot + cRoot);

                        if (lineLen > limit) {
                            break;
                        } else {

                            const numCount = lineLenMap.get(lineLen) || 0;
                            lineLenMap.set(lineLen, numCount + 1);

                            if (numCount === 0) {
                                count++;
                            } else if (numCount === 1) {
                                count --;
                            }                 


                        }

                    }

                }

            }

        }

        return count;

    }

}