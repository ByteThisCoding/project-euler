const sqrt = require('bigint-isqrt');
export class BigIntUtils {

    public static gcd(...integers: bigint[]): bigint {
        if (integers.length === 1) {
            return integers[0];
        }
        if (integers.length === 2) {
            return integers[1] ? BigIntUtils.gcd(integers[1], integers[0] % integers[1]) : integers[0];
        }

        const firstTwo = BigIntUtils.gcd(integers[0], integers[1]);
        return BigIntUtils.gcd(firstTwo, ...[...integers].splice(2));
    }

    public static sqrt(n: bigint): bigint {
        return sqrt(n);
    }

    public static abs(n: bigint): bigint {
        if (n > 0n) {
            return n;
        }
        return n*-1n;
    }

}