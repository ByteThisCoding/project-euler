import { Fraction } from "./fraction";
import { Primes } from "./primes";

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

    public static getTotientsUpTo(endNum: number): number[] {
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
    
        phis[phis.length - 1] = new Fraction(this.getTotientOfN(endNum), 1);
    
        return phis.map(frac => frac.getNumerator());
    }
    

}