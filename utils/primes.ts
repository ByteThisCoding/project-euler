import { AbstractSequence } from "./sequence";

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

    static isPrime(number: number): boolean {
        if (number === 2 || number === 3) {
            return true;
        }

        const sixMod = number % 6;
        if (sixMod !== 5 && sixMod !== 1) {
            return false;
        }

        return this.determineIsPrime(number);
    }

    private static determineIsPrime(number: number): boolean {
        const limit = Math.sqrt(number);
        for (let i = 2; i <= limit; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }

}