import { Fraction } from "./fraction";
import { Primes } from "./primes";

/**
 * Singleton to provide functions for calculating a totient value
 */
export class Totient {

    public static getTotientOfN(n: number): number {
        if (Primes.isPrime(n)) {
            return n - 1;
        }
    
        let product = new Fraction(n, 1);
    
        const numLimit: number = Math.sqrt(n);
        for (let i = 2; i <= numLimit; i++) {
            if (n % i === 0 && Primes.isPrime(i)) {
                product = product.subtractFraction(
                    product.divideFraction(
                        new Fraction(i, 1)
                    )
                );
            }
    
            if (i !== n / i && Primes.isPrime(n / i)) {
                product = product.subtractFraction(
                    product.divideFraction(
                        new Fraction(n / i, 1)
                    )
                );
            }
        }
    
        return product.getNumerator();
    }

    /**
     * Use a dynamic programming approach to get totient values up to and including a certain number
     * @param endNum 
     * @returns 
     */
    public static getTotientsUpTo(endNum: number): number[] {
        endNum += 1;

        let phis: Fraction[] = new Array(endNum + 1)
            .fill(0)
            .map((_, ind) => new Fraction(ind, 1));
    
        let prime = 0;
        for (let primeIndex=1; prime <= endNum; primeIndex++) {
            prime = Primes.getNthPrime(primeIndex);
    
            const numOps = endNum / prime;
            const primeFrac = new Fraction(prime, 1);
            for (let i=1; i<numOps; i++) {
                let product = phis[prime * i];
                product = product.subtractFraction(
                    product.divideFraction(
                        primeFrac
                    )
                );
                phis[prime * i] = product;
            }
        }
    
        return phis.map(frac => frac.getNumerator());
    }
    

}