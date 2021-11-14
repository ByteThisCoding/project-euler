import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution92 extends AbstractSolution {

    private smallMap89 = new Map<number, boolean>([
        [89, true],
        [1, false]
    ]);

    private squareDigitMap: {[key: number]: number} = {
        0: 0,
        1: 1,
        2: 4,
        3: 9,
        4: 16,
        5: 25,
        6: 36,
        7: 49,
        8: 64,
        9: 81
    };

    getProblemName(): string {
        return "Square Digit Chains";
    }

    protected solve() {
        return this.doSolve(10_000_000);
    }

    private doSolve(limit: number): number {
        let count = 0;
        const smallLimit = Math.min(300, limit);
        for (let n=1; n<smallLimit; n++) {
            count += this.doesSmallNArriveAt89(n) ? 1 : 0;
        }
        for (let n=smallLimit; n<limit; n++) {
            count += this.doesNArriveAt89(n) ? 1 : 0;
        }
        return count;
    }

    private doesSmallNArriveAt89(n: number): boolean {
        const seq: number[] = [];
        while (true) {
            if (this.smallMap89.has(n)) {
                const val = this.smallMap89.get(n)!
                seq.forEach(num => {
                    this.smallMap89.set(num, val);
                })
                return val;
            } else {
                seq.push(n);
            }

            let next = 0;
            //get the next item
            while (n > 0) {
                const digit = n % 10;
                n = (n - digit)/10;
                next += this.squareDigitMap[digit];
            }

            n = next;
        }
    }

    private doesNArriveAt89(n: number): boolean {
        
        while (true) {
            if (this.smallMap89.has(n)) {
                return this.smallMap89.get(n)!;
            }

            let next = 0;
            //get the next item
            while (n > 0) {
                const digit = n % 10;
                n = (n - digit)/10;
                next += this.squareDigitMap[digit];
            }

            n = next;
        }
    }

}