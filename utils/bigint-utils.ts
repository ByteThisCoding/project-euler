const sqrt = require('bigint-isqrt');

/**
 * Provides some of the functionality which exists in Math.* for numbers but not for bigints
 */
export class BigIntUtils {

    /**
     * Get the log10, rounded down
     * @param n 
     * @returns 
     */
    static log10(n: bigint): bigint {
        return BigInt(n.toString().length - 1);
    }

    /**
     * Get the unique digits within a number
     * @param n 
     * @returns 
     */
    static getUniqueDigits(n: bigint): Set<bigint> {
        const digitsSet = new Set<bigint>();
        while (n > 0) {
            const digit = n % 10n;
            digitsSet.add(digit);
            n /= 10n;
        }

        return digitsSet;
    }

    static gcd(...integers: bigint[]): bigint {
        if (integers.length === 1) {
            return integers[0];
        }
        if (integers.length === 2) {
            return integers[1] ? BigIntUtils.gcdTwoNums(integers[1], integers[0] % integers[1]) : integers[0];
        }

        const firstTwo = BigIntUtils.gcdTwoNums(integers[0], integers[1]);
        return BigIntUtils.gcd(firstTwo, ...[...integers].splice(2));
    }

    static gcdTwoNums(a: bigint, b: bigint): bigint {
        return b ? BigIntUtils.gcdTwoNums(b, a % b) : a;
    }

    static sqrt(n: bigint): bigint {
        return sqrt(n);
    }

    static isPerfectSquare(n: bigint): boolean {
        const lastDigit = n % 10n;
        if ([0n, 1n, 4n, 5n, 6n, 9n].indexOf(lastDigit) === -1) {
            return false;
        }

        /*const root = this.getDigitalRoot(n);
        if ([1n, 4n, 7n, 9n].indexOf(root) === -1) {
            return false;
        }*/

        while ((n & 3n) === 0n && n !== 0n){
            n >>= 2n;
        }
        // So, for now x is not divisible by 2
        // The only possible residual modulo 8 for such x is 1
     
        if ((n & 7n) !== 1n){
            return false;
        }
        return n === this.sqrt(n)**2n;
    }

    static getDigitalRoot(n: bigint): bigint {
        let root = n;
        while (root > 9n) {
            root = Array.from(root.toString()).reduce((acc, char) => {
                return acc + BigInt(char);
            }, 0n);
        }
        return root;
    }

    static abs(n: bigint): bigint {
        if (n > 0n) {
            return n;
        }
        return n*-1n;
    }

}