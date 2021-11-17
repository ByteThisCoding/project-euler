import { BigIntUtils } from "./bigint-utils";
import { Primes } from "./primes";

/** 
 * Util singleton which includes factoring, getting prime factors, common factors, etc
 */
export class Integer {
    
    /**
     * Get all factors of a number
     * @param n 
     * @returns 
     */
    static getFactors(n: number): number[] {
        return this.doGetFactors(n, false);
    }

    /**
     * Get all distinct factors of a number
     * @param n 
     * @returns 
     */
    static getUniqueFactors(n: number): number[] {
        return this.doGetFactors(n, true);
    }

    /**
     * Get all distinct prime factors of a number
     * @param n 
     * @returns 
     */
    static getUniquePrimeFactors(n: number): number[] {
        return this.doGetPrimeFactors(n, true);
    }

    /**
     * @param n 
     * @param unique : if true, will only include distinct numbers in response
     * @returns 
     */
    private static doGetFactors(n: number, unique: boolean): number[] {
        const factorsLeft: number[] = [1];
        const factorsRight: number[] = [n];

        const numLimit: number = Math.sqrt(n);
        for (let i=2; i<=numLimit; i++) {
            if (n % i === 0) {
                factorsLeft.push(i);
                if (!unique || i !== n / i) {
                    factorsRight.push(n / i);
                }
            }
        }

        const factors = factorsLeft;
        for (let i=factorsRight.length-1; i>-1; i--) {
            factors.push(factorsRight[i]);
        }
        return factors;
    }

    /**
     * BigInt version
     * @param n 
     * @param unique : if true, will only include distinct numbers in response
     * @returns 
     */
    private static doGetPrimeFactors(n: number, unique: boolean): number[] {
        const factorsLeft: number[] = [1];
        const factorsRight: number[] = [];

        const numLimit: number = Math.sqrt(n);
        for (let i=2; i<=numLimit; i++) {
            if (n % i === 0 && Primes.isPrime(i)) {
                factorsLeft.push(i);
            }

            if ((!unique || i !== n / i) && Primes.isPrime(n / i)) {
                factorsRight.push(n / i);
            }
        }

        if (Primes.isPrime(n)) {
            factorsRight.push(n);
        }

        const factors = factorsLeft;
        for (let i=factorsRight.length-1; i>-1; i--) {
            factors.push(factorsRight[i]);
        }
        return factors;
    }

    /**
     * Get the factors for a bigint
     * @param n 
     * @returns 
     */
    static getFactorsBigInt(n: bigint): bigint[] {
        return this.doGetFactorsBigInt(n, false);
    }

    /**
     * Get the distinct factors for a bigint
     * @param n 
     * @returns 
     */
    static getUniqueFactorsBigInt(n: bigint): bigint[] {
        return this.doGetFactorsBigInt(n, true);
    }

    /**
     * Helper function to get bigint distinct or non distinct factors
     * @param n 
     * @param unique 
     * @returns 
     */
    private static doGetFactorsBigInt(n: bigint, unique: boolean): bigint[] {
        const factorsLeft: bigint[] = [1n];
        const factorsRight: bigint[] = [n];

        const numLimit: bigint = BigIntUtils.sqrt(n);
        for (let i=2n; i<=numLimit; i++) {
            if (n % i === 0n) {
                factorsLeft.push(i);
                if (!unique || i !== n / i) {
                    factorsRight.push(n / i);
                }
            }
        }

        const factors = factorsLeft;
        for (let i=factorsRight.length-1; i>-1; i--) {
            factors.push(factorsRight[i]);
        }
        return factors;
    }

    /**
     * Get the number of distinct prime factors of a number
     * @param n 
     * @returns 
     */
    static getNumDistinctPrimes(n: number): number {
        let numDistinctPrimes = 0;
        let lastPrime = 0;

        for (let primeIndex = 1; lastPrime <= n; primeIndex++) {
            lastPrime = Primes.getNthPrime(primeIndex);
            if (n % lastPrime === 0) {
                numDistinctPrimes ++;
            }
        }

        return numDistinctPrimes;
    }

    /**
     * Get the common factors between two numbers
     * @param a 
     * @param b 
     * @returns 
     */
    static getCommonFactors(a: number, b: number): number[] {
        const thisFactors = this.getUniqueFactors(a);
        const thatFactors = this.getUniqueFactors(b);

        const thisFactorsSet = new Set(thisFactors);

        //TODO: find more efficient way
        return thatFactors.filter(factor => {
            return thisFactorsSet.has(factor);
        });
    }

    /**
     * Check if the square root of a number is an integer
     * @param n 
     * @returns 
     */
    static isPerfectSquare(n: number): boolean {
        const lastDigit = n % 10;
        if ([0, 1, 4, 5, 6, 9].indexOf(lastDigit) === -1) {
            return false;
        }
        
        return Number.isInteger(Math.sqrt(n));
    }

    static getDigitalRoot(n: number): number {
        let root = n;
        while (root > 9) {
            root = Array.from(root.toString()).reduce((acc, char) => {
                return acc + parseInt(char);
            }, 0);
        }
        return root;
    }

}