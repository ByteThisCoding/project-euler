import { BigIntUtils } from "./bigint-utils";
import { Primes } from "./primes";

export class Integer {

    constructor(
        public readonly value: number
    ) {}
    
    static fromString(stringInt: string): Integer {
        return new Integer(
            parseInt(stringInt)
        );
    }

    static getFactors(n: number): number[] {
        return this.doGetFactors(n, false);
    }

    static getUniqueFactors(n: number): number[] {
        return this.doGetFactors(n, true);
    }

    static getUniquePrimeFactors(n: number): number[] {
        return this.doGetPrimeFactors(n, true);
    }

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

    static getFactorsBigInt(n: bigint): bigint[] {
        return this.doGetFactorsBigInt(n, false);
    }

    static getUniqueFactorsBigInt(n: bigint): bigint[] {
        return this.doGetFactorsBigInt(n, true);
    }

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

    getFactors(): Integer[] {
        return Integer.doGetFactors(this.value, false).map(val => new Integer(val));
    }

    getUniqueFactors(): Integer[] {
        return Integer.doGetFactors(this.value, true).map(val => new Integer(val));
    }

    getUniquePrimeFactors(): Integer[] {
        return Integer.doGetPrimeFactors(this.value, true).map(val => new Integer(val));
    }

    getNumDistinctPrimes(): number {
        return Integer.getNumDistinctPrimes(this.value);
    }

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

    getCommonFactors(integer: Integer): Integer[] {
        const thisFactors = this.getFactors();
        const thatFactors = integer.getFactors();

        //TODO: find more efficient way
        return thisFactors.filter(factor => {
            return !!thatFactors.find(item => item.value === factor.value);
        });
    }

    equals(compareTo: Integer | number): boolean {
        if (compareTo instanceof Integer) {
            return this.value === compareTo.value;
        } else {
            return this.value === compareTo;
        }
    }

    toString(): string {
        return `${this.value}`;
    }
}