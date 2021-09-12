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

    getFactors(): Integer[] {
        return this.doGetFactors(false);
    }

    getUniqueFactors(): Integer[] {
        return this.doGetFactors(true);
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

    private doGetFactors(unique: boolean): Integer[] {
        const factors: number[] = [1, this.value];

        const numLimit: number = Math.sqrt(this.value);
        for (let i=2; i<=numLimit; i++) {
            if (this.value % i === 0) {
                factors.push(i);
                if (!unique || i !== this.value / i) {
                    factors.push(this.value / i);
                }
            }
        }

        factors.sort((a, b) => a - b);
        return factors.map(item => {
            return new Integer(item);
        });
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