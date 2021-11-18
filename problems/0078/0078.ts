import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution78 extends AbstractSolution {

    getProblemName(): string {
        return "Coin Partitions";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Use the partition function which adds and subtracts
     *      alternating recursive partition values
     *      based on generalized pentagonal numbers
     */
    private doSolve(): number {
        //initialize partitions
        const partitions: number[] = [1];
        let lastPartition = partitions[partitions.length - 1];

        //generalized pentagonal numbers
        const genPentSeq: number[] = [0];

        let n = 0;
        for (n = 1; lastPartition % 1_000_000 !== 0; n++) {
            genPentSeq.push(this.nthGeneralizedPentagonalNumber(n));
            genPentSeq.push(this.nthGeneralizedPentagonalNumber(-n));

            lastPartition = 0;
            for (let i = 1; i < genPentSeq.length; i++) {
                const diff = Number(n - genPentSeq[i]);
                if (diff < 0) {
                    break;
                }

                if (Math.floor((i + 1) / 2) % 2 === 1) {
                    lastPartition += partitions[diff];
                } else {
                    lastPartition -= partitions[diff];
                }

                lastPartition %= 1_000_000;
            }

            lastPartition %= 1_000_000;
            partitions.push(lastPartition);
        }

        return n - 1;
    }

    /**
     * Get the "generalized" nth pentagonal number
     * Generalized includes negative n values
     */
    private nthGeneralizedPentagonalNumber(n: number): number {
        return (3 * n ** 2 - n) / 2;
    }
}