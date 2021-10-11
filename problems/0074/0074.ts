import { Combinations } from "../../utils/combinations";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution74 extends AbstractSolution {

    private chainLenCache = new Map<string, number>();
    private factorialMapCache = new Map<string, bigint>();

    private factorialMap = [
        1n,
        1n,
        2n,
        6n,
        24n,
        120n,
        720n,
        5040n,
        40320n,
        362880n,
    ]
    
    getProblemName(): string {
        return "Digit Factorial Chains";
    }

    protected solve() {
        /*console.log(this.getChainLength(69n));
        console.log(this.getChainLength(169n));
        console.log(this.chainLenCache);
        console.log(this.factorialMapCache);*/

        //console.log(this.getChainLength(58n));
        //console.log(this.chainLenCache);

        return this.doSolve();
    }

    private doSolve(): number {
        let sixtyCount = 0;
        let longestN = 0n;
        let longestNLen = 0;
        for (let n=1n; n<1_000_000n; n++) {
            //console.log(n);
            const nLen = this.getChainLength(n);
            if (nLen > longestNLen) {
                longestNLen = nLen;
                longestN = n;
                console.log(longestN, longestNLen)
            }

            sixtyCount += nLen === 60 ? 1 : 0;
        }
        return sixtyCount;
    }

    private getChainLength(n: bigint): number {
        let key = this.getMapKey(n);
        if (this.chainLenCache.has(key)) {
            return this.chainLenCache.get(key)!;
        }

        const chainEntries = new Map<string, number>();

        chainEntries.set(key, 1);
        let index = 2;
        let loopStart = -1;
        let loopLen = 0;

        while (true) {
            n = this.mapFactorial(n);
            key = this.getMapKey(n);
            if (this.chainLenCache.has(key)) {
                //console.log({n, index, cv: this.chainLenCache.get(key)!})
                index += this.chainLenCache.get(key)!;
                break;
            } else {
                if (chainEntries.has(key)) {
                    loopStart = chainEntries.get(key)!;
                    loopLen = index - loopStart;
                    break;
                } else {
                    chainEntries.set(key, index);
                    index ++;
                }
            }
        }

        //console.log("----", chainEntries);
        Array.from(chainEntries).forEach(([chainN, ind], _, ar) => {
            //console.log(chainN);
            if (loopStart > -1 && ind >= loopStart) {
                this.chainLenCache.set(chainN, loopLen);
            } else {
                this.chainLenCache.set(chainN, index - ind);
            }
        });


        return index - 1;
    }

    private mapFactorial(n: bigint): bigint {
        const key = this.getMapKey(n);
        if (!this.factorialMapCache.has(key)) {
            let factorialSum = 0n;

            while (n > 0n) {
                const d = n % 10n;
                factorialSum += this.factorialMap[Number(d)];
                n /= 10n;
            }
    
            this.factorialMapCache.set(key, factorialSum);
        }

        return this.factorialMapCache.get(key)!;
    }

    private getMapKey(n: bigint): string {
        return Array.from(n.toString())
        .sort().join("");
        //return n.toString();
    }

}