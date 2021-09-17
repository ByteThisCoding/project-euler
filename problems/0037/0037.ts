import { parse } from "path/posix";
import { Combinations } from "../../utils/combinations";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution37 extends AbstractSolution {

    //caching is commented out as it only had marginal impact on performance

    //private primeCache = new Map<string, boolean>();
    //private leftTruncateCache = new Map<string, boolean>();
    //private rightTruncateCache = new Map<string, boolean>();

    private middleCache: string[][] = [[""]];

    getProblemName(): string {
        return "Truncatable Primes";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        let primesFound = 0;
        let primesSum = 0;
        for (let i=0; primesFound < 11; i++) {
            const tPrimes = this.makeTruncatablePrimes(i);
            tPrimes.forEach(prime => {
                primesFound ++;
                primesSum += parseInt(prime);
            });
        }
        return primesSum;
    }

    private makeTruncatablePrimes(numMiddleDigits: number): string[] {

        const leftPrimes = [2,3,5,7];
        const rightPrimes = [3,7];
        const allChoices = [0,1,2,3,4,5,6,7,8,9];

        let innerChoices: string[] = [""];
        if (numMiddleDigits > 0) {
            const cacheChoices = this.middleCache[numMiddleDigits - 1];
            innerChoices = cacheChoices.reduce((ar, choice) => {
                allChoices.forEach(left => {
                    ar.push(`${left}${choice}`);
                });

                return ar;
            }, [] as string[]);

            this.middleCache[numMiddleDigits] = innerChoices;
        }

        let combos: string[] = [];

        for (let iLeft=0; iLeft<leftPrimes.length; iLeft++) {
            for (let iRight=0; iRight<rightPrimes.length; iRight++) {
                innerChoices.forEach(choice => {
                    const itemStr = `${leftPrimes[iLeft]}${choice}${rightPrimes[iRight]}`;
                    if (this.isTruncatablePrime(itemStr)) {
                        console.log("======>", itemStr);
                        combos.push(itemStr);
                    }
                })
            }
        }

        return combos;

    }

    private isTruncatablePrime(n: string): boolean {

        return this.isPrimeLeftTruncatable(n) && this.isPrimeRightTruncatable(n);
    }

    private isPrimeLeftTruncatable(n: string): boolean {
        let isTruncatablePrime = true;

        //remove from left
        for (let i=0; isTruncatablePrime && i<n.length; i++) {
            const subNstr = n.substring(i);
            /*if (this.leftTruncateCache.has(subNstr)) {
                isTruncatablePrime = this.leftTruncateCache.get(subNstr)!;
            } else {*/
                isTruncatablePrime = this.determineSingleCase(subNstr);
                /*this.leftTruncateCache.set(subNstr, isTruncatablePrime);
            }*/
        }

        return isTruncatablePrime;
    }

    private isPrimeRightTruncatable(n: string): boolean {
        let isTruncatablePrime = true;

        for (let i=n.length; isTruncatablePrime && i>0; i--) {
            const subNstr = n.substring(0, i);
            /*if (this.rightTruncateCache.has(subNstr)) {
                isTruncatablePrime = this.rightTruncateCache.get(subNstr)!;
            } else {*/
                isTruncatablePrime = this.determineSingleCase(subNstr);
                /*this.rightTruncateCache.set(subNstr, isTruncatablePrime);
            }*/
        }

        return isTruncatablePrime;
    }

    private determineSingleCase(subNstr: string): boolean {
        /*if (this.primeCache.has(subNstr)) {
            return this.primeCache.get(subNstr)!;
        }
        const isPrime = Primes.isPrime(BigInt(subNstr));
        this.primeCache.set(subNstr, isPrime);
        return isPrime;*/
        return Primes.isPrimeBigInt(BigInt(subNstr));
    }

}