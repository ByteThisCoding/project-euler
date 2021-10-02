import { AbstractSequence } from "./sequence";
const sqrt = require('bigint-isqrt');

export class Primes extends AbstractSequence<number> {

    private static instance: Primes = new Primes();

    /**
     * Singleton pattern
     */
    private constructor() {
        super();
    }

    protected getInitialSequenceItems(): number[] {
        return [2, 3, 5, 7, 11, 13]
    }

    protected calculateNthItem(n: number): number {
        let lastPrimeIndex = n - 1;
        let lastPrimeValue = this.getNthItem(lastPrimeIndex);

        const sixMod = lastPrimeValue % 6;
        const nextSixMultiple = lastPrimeValue + 6 - sixMod;

        let nextPrime = -1;

        for (let i = nextSixMultiple; nextPrime === -1; i += 6) {
            if (i - 1 !== lastPrimeValue && Primes.isPrime(i - 1)) {
                nextPrime = i - 1;
            } else if (Primes.isPrime(i + 1)) {
                nextPrime = i + 1;
            }
        }
        
        return nextPrime;
    }

    /**
     * Get the "nth" prime
     * @param n: index of prime (1 based)
     */
    static getNthPrime(n: number): number {
        return this.instance.getNthItem(n);
    }

    static getNthPrimeIndex(prime: number): number {
        return this.instance.getIndexOfItem(prime);
    }

    static getPrimesInRange(startIndex: number, endIndex: number): number[] {
        return this.instance.getItemsInRange(startIndex, endIndex);
    }

    static getSumOfPrimesInRange(startIndex: number, endIndex: number): number {
        return this.instance.getSumOfRange(startIndex, endIndex);
    }

    static getPrimesInValueRange(startValue: number, endValue: number): number[] {
        return this.instance.getItemsInValueRange(startValue, endValue);
    }

    static getClosestLowerPrime(n: number): number {

        let prevPrime = -1;
        let lastPrime = 2;
        for (let i=2; lastPrime < n; i++) {
            prevPrime = lastPrime;
            lastPrime = this.getNthPrime(i);
        }
        return prevPrime;
    }

    static isPrime(number: number): boolean {

        /*if (this.instance.items[this.instance.items.length - 1] >= number) {
            return this.instance.existsInSequence(number);
        }*/

        if (number === 1) {
            return false;
        }

        if (number === 2 || number === 3) {
            return true;
        }

        const sixMod = number % 6;
        if (sixMod !== 5 && sixMod !== 1) {
            return false;
        }

        return this.determineIsPrime(number);
    }

    public static isPrimeBigInt(number: bigint): boolean {
        if (number === 1n) {
            return false;
        }

        if (number === 2n || number === 3n) {
            return true;
        }

        const sixMod = number % 6n;
        if (sixMod !== 5n && sixMod !== 1n) {
            return false;
        }

        return this.determineIsPrimeBigInt(number);
    }

    private static determineIsPrime(number: number): boolean {
        const limit = Math.sqrt(number);

        if (number % 2 === 0) {
            return false;
        }

        for (let i = 3; i <= limit; i+=2) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }

    private static determineIsPrimeBigInt(number: bigint): boolean {
        const limit = sqrt(number);

        if (number % 2n === 0n) {
            return false;
        }

        for (let i = 3n; i <= limit; i+=2n) {
            if (number % i === 0n) {
                return false;
            }
        }
        return true;
    }
}