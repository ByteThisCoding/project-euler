import { Combinations } from "../../utils/combinations";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution51 extends AbstractSolution {

    private isPrimeMap = new Map<number, boolean>();

    getProblemName(): string {
        return "Prime Digit Replacements";
    }

    protected solve() {
        return this.permSolve(8);
    }

    private permSolve(familySize: number): number {
        let minSolution = -1;
        for (let n = 2; minSolution === -1; n++) {
            console.log("Looking in n digits: ", n);

            this.forEachPossibility(n, (perm: string) => {
                let numInFamily = 0;
                let lastPrime = 0;

                for (let rep = 9; rep >= familySize - numInFamily; rep--) {
                    const newNum = perm.replace(/\*/g, rep + "");

                    if (newNum[0] !== "0") {
                        const num = parseInt(newNum);
                        if (this.isPrime(num)) {
                            numInFamily++;
                            lastPrime = num;
                        }
                    }
                }

                if (numInFamily === familySize) {
                    minSolution = lastPrime;
                    //we stop generating possibilities by returning false
                    return false;
                }
            });

        }
        return minSolution;
    }

    private isPrime(n: number): boolean {
        if (this.isPrimeMap.has(n)) {
            return this.isPrimeMap.get(n)!;
        }
        const isPrime = Primes.isPrime(n);
        this.isPrimeMap.set(n, isPrime);
        return isPrime;
    }

    private forEachPossibility(n: number, callback: (perm: string) => any): void {
        Combinations.forEachNPossibilities(n - 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '*'], (subPerm: string) => {
            if (subPerm[0] !== "0" && subPerm.indexOf("*") > -1) {
                let resp;
                resp = callback(`${subPerm}1`);
                if (resp === false) {
                    return false;
                }
                resp = callback(`${subPerm}3`);
                if (resp === false) {
                    return false;
                }
                resp = callback(`${subPerm}7`);
                if (resp === false) {
                    return false;
                }
                return callback(`${subPerm}9`);
            }
        });
    }

}