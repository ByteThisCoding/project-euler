import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution88 extends AbstractSolution {

    getProblemName(): string {
        return "Product-Sum Numbers";
    }

    protected solve() {
        //return this.findMinForK(5);
        //return this.findMinForK(10);
        //return this.findMinForK(12_000);
        //return this.doSolve(6);
        //return this.doSolve(12);
        //return this.doSolve(26);
        return this.doSolve(12_000);
    }

    private doSolve(limit: number): number {
        const sumSet = new Set<number>();
        //provide for 2
        sumSet.add(4);
        for (let k = 3; k <= limit; k++) {
            sumSet.add(this.findMinForK(k));
        }
        //aggregate
        let sum = 0;
        for (const value of sumSet) {
            sum += value;
        }
        return sum;
    }

    /**
     * Assumes k>2
     * @param k 
     * @returns 
     */
    private findMinForK(k: number): number {

        //a partial sequence with 1s omitted
        let minSoFar = k * 2;
        //iterate over different non 1 set sizes
        for (let i = 2; i <= k - 2; i++) {
            const { min, pastThreshold } = this.processSeqToK(
                k, i, minSoFar, k - i, 1
            );
            if (pastThreshold) {
                break;
            }

            minSoFar = min;
        }

        return minSoFar;
    }

    private processSeqToK(
        k: number,
        seqSize: number,
        minSoFar: number,
        partialSum: number,
        partialProduct: number,
    ): {
        min: number;
        pastThreshold: boolean;
    } {

        //base case, work on this number only
        if (seqSize === 1) {
            let sum = partialSum + 1;
            for (let n = 2; n <= k; n++) {
                sum ++;
                const product = partialProduct * n;

                //console.log("===>", {p: product, s: sum});
                if (product > sum || product >= minSoFar || sum >= minSoFar) {
                    return {
                        min: minSoFar,
                        pastThreshold: n === 2
                    };
                } else if (product === sum) {
                    return {
                        min: sum,
                        pastThreshold: false
                    };
                } else {
                    //step over some values we know won't yield results
                    const offset = Math.ceil((sum - product) * n / product) - 1;
                    n += offset;
                    sum += offset;
                }
            }

            return {
                min: minSoFar,
                pastThreshold: false
            };
        }

        //otherwise, call recursively
        let isPastThreshold = false;
        let workingSum = partialSum + 1;
        for (let n = 2; n <= k; n++) {
            workingSum ++;
            const workingProduct = partialProduct * n;

            if (workingSum > minSoFar || workingProduct > minSoFar) {
                if (n === 2) {
                    isPastThreshold = true;
                }
                break;
            } else {
                const { min, pastThreshold } = this.processSeqToK(
                    n, seqSize - 1, minSoFar, workingSum, workingProduct
                );

                if (pastThreshold) {
                    if (n === 2) {
                        isPastThreshold = true;
                    }
                    break;
                } else {
                    minSoFar = min;
                }
            }
        }

        return {
            min: minSoFar,
            pastThreshold: isPastThreshold
        };

    }

}