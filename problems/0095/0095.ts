import { Integer } from "../../utils/integer";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution95 extends AbstractSolution {

    //map a number to a (shared) set with all numbers in the chain
    private chains = new Map<number, Set<number>>();
    private visited = new Set<number>();

    getProblemName(): string {
        return "Amicable Chains";
    }

    protected solve() {
        return this.doSolve(1_000_000);
    }

    private doSolve(limit: number): number {
        //create chains
        for (let n=1; n<=limit; n++) {
            //console.log(n);
            this.processN(n, limit);
        }

        //find largest chain where all elements <= limit
        let largestSet: Set<number> = new Set<number>();
        for (const [key, set] of this.chains) {
            if (set.size > largestSet.size) {
                largestSet = set; 
            }   
        }

        let smallest = Infinity;
        largestSet.forEach(item => {
            smallest = Math.min(item, smallest);
        });
        
        return smallest;
    }

    private processN(n: number, limit: number): void {
        if (this.visited.has(n)) {
            return;
        }

        const seqSet = new Set<number>();
        const seq: number[] = [n];
        seqSet.add(n);

        while (n > 0) {
            const dOfN = this.dOfN(n);

            if (dOfN > limit || this.visited.has(dOfN)) {
                seq.forEach(sn => {
                    this.visited.add(sn);
                });
                return;
            }

            //if we've found something in an existing chain,
            //do nothing
            if (this.chains.has(dOfN)) {
                return;
            }

            //if we've found a chain, add all chain entries
            if (seqSet.has(dOfN)) {
                const set = this.chains.get(dOfN) || new Set<number>();
                set.add(dOfN);

                //don't add anything until we find our first element
                let found = false;
                seq.forEach((sn) => {
                    if (found) {
                        set.add(sn);
                        this.chains.set(sn, set);
                    } else if (sn === dOfN) {
                        found = true;
                    }
                    this.visited.add(sn);
                });
                this.chains.set(dOfN, set);
                this.visited.add(dOfN);
                return;
            }

            //otherwise, continue on
            seqSet.add(dOfN);
            seq.push(dOfN);
            n = dOfN;
        }
    }

    private dOfN(n: number): number {
        return Integer.getUniqueFactors(n).reduce((acc, int) => {
            if (int === n) {
                return acc;
            }
            //console.log(int);
            return acc + int;
        });
    }

}