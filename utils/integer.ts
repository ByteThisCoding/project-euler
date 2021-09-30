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
        const factors: number[] = [1, n];

        const numLimit: number = Math.sqrt(n);
        for (let i=2; i<=numLimit; i++) {
            if (n % i === 0) {
                factors.push(i);
                if (!unique || i !== n / i) {
                    factors.push(n / i);
                }
            }
        }

        factors.sort((a, b) => a - b);
        return factors;
    }

    private static doGetPrimeFactors(n: number, unique: boolean): number[] {
        const factors: number[] = [];

        const numLimit: number = Math.sqrt(n);
        for (let i=2; i<=numLimit; i++) {
            if (n % i === 0 && Primes.isPrime(i)) {
                factors.push(i);
                if ((!unique || i !== n / i) && Primes.isPrime(n / i)) {
                    factors.push(n / i);
                }
            }
        }

        factors.sort((a, b) => a - b);
        return factors;
    }

    static getFactorsBigInt(n: bigint): bigint[] {
        return this.doGetFactorsBigInt(n, false);
    }

    static getUniqueFactorsBigInt(n: bigint): bigint[] {
        return this.doGetFactorsBigInt(n, true);
    }

    private static doGetFactorsBigInt(n: bigint, unique: boolean): bigint[] {
        const factors: bigint[] = [1n, n];

        const numLimit: bigint = BigIntUtils.sqrt(n);
        for (let i=2n; i<=numLimit; i++) {
            if (n % i === 0n) {
                factors.push(i);
                if (!unique || i !== n / i) {
                    factors.push(n / i);
                }
            }
        }

        factors.sort((a, b) => Number(a - b));
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