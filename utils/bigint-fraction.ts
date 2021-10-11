import { BigIntUtils } from "./bigint-utils";

/**
* We also include some static methods to help us with implementations
* + static methods for operating over arrays of fractions
*/
export class BigIntFraction {

    constructor(
        private readonly numerator: bigint,
        private readonly denominator: bigint
    ) {
        const reduction = this.reduce(numerator, denominator);
        this.numerator = reduction[0];
        this.denominator = reduction[1];

        //keep the negative sign in the numerator for consistency
        if (this.denominator < 0n) {
            this.denominator *= -1n;
            this.numerator *= -1n;
        }
    }

    toString(): string {
        return this.numerator + "/" + this.denominator;
    }

    //accessor properties
    getNumerator(): bigint {
        return this.numerator;
    }
    
    getDenominator(): bigint {
        return this.denominator;
    }

    getReciprocal(): BigIntFraction {
        return new BigIntFraction(
            this.denominator,
            this.numerator
        );
    }

    tobigint(): bigint {
        return this.getNumerator() / this.getDenominator();
    }

    //equality and comparison
    equalTo(frac: BigIntFraction): boolean {
        return frac.getNumerator() === this.getNumerator() && frac.getDenominator() === this.getDenominator();
    }

    compareTo(frac: BigIntFraction): bigint {
        return this.tobigint() - frac.tobigint();
    }

    //operations will come in pairs for one vs many
    addBigIntFraction(frac: BigIntFraction): BigIntFraction {
        return this.addBigIntFractions([frac]);
    }
    addBigIntFractions(fracs: BigIntFraction[]): BigIntFraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: BigIntFraction, b: BigIntFraction): BigIntFraction => {
            //add fractions by converting to a common multiple, then applying operation
            return new BigIntFraction(
                a.getNumerator() * b.getDenominator() + b.getNumerator() * a.getDenominator(),
                a.getDenominator() * b.getDenominator()
            )
        });
    }

    subtractBigIntFraction(frac: BigIntFraction): BigIntFraction {
        return this.subtractBigIntFractions([frac]);
    }
    subtractBigIntFractions(fracs: BigIntFraction[]): BigIntFraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: BigIntFraction, b: BigIntFraction): BigIntFraction => {
            //subtract fractions by converting to a common multiple, then applying operation
            return new BigIntFraction(
                a.getNumerator() * b.getDenominator() - b.getNumerator() * a.getDenominator(),
                a.getDenominator() * b.getDenominator()
            )
        });
    }

    multiplyBigIntFraction(frac: BigIntFraction): BigIntFraction {
        return this.multiplyBigIntFractions([frac]);
    }
    multiplyBigIntFractions(fracs: BigIntFraction[]): BigIntFraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: BigIntFraction, b: BigIntFraction): BigIntFraction => {
            return new BigIntFraction(
                a.getNumerator() * b.getNumerator(),
                a.getDenominator() * b.getDenominator()
            )
        });
    }

    divideBigIntFraction(frac: BigIntFraction): BigIntFraction {
        return this.divideBigIntFractions([frac]);
    }
    divideBigIntFractions(fracs: BigIntFraction[]): BigIntFraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: BigIntFraction, b: BigIntFraction): BigIntFraction => {
            //divide fractions by multiplying the 2nd fraction's inverse
            //this way we will not run into any precision loss with division operations
            return new BigIntFraction(
                a.getNumerator() * b.getDenominator(),
                a.getDenominator() * b.getNumerator()
            )
        });
    }

    /**
    * Helper method to facilitate performing some operation over multiple fractions
    */
    private operate(fractions: BigIntFraction[], callback: (a: BigIntFraction, b: BigIntFraction) => BigIntFraction): BigIntFraction {
        if (fractions.length === 0) {
            return this;
        }

        fractions = [
            this,
            ...fractions
        ];

        return this.subOperate(fractions, callback);
    }
    
    //handle recursive operate executions
    private subOperate(fractions: BigIntFraction[], callback: (a: BigIntFraction, b: BigIntFraction) => BigIntFraction): BigIntFraction {
        const result = callback(fractions[0], fractions[1]);

        if (fractions.length === 2) {
            return result;
        }

        return this.subOperate([result, ...fractions.splice(2)], callback);
    }

    /**
    * Reduce the numerator and denominator to lowest integer values
    * Then, return results
    */
    private reduce(numerator: bigint, denominator: bigint): [bigint, bigint] {
        const gcd = BigIntUtils.gcdTwoNums(numerator, denominator);
        return [numerator / gcd, denominator / gcd];
    }

    //some static utility functions and properties
    static readonly ZERO: BigIntFraction = new BigIntFraction(0n, 1n);
    static readonly ONE: BigIntFraction = new BigIntFraction(1n, 1n);

    /**
    * Get the least common multiple
    */
    static lcm(...integers: bigint[]): bigint {
        if (integers.length === 1) {
            return integers[0];
        }
        if (integers.length === 2) {
            return (integers[0]*integers[1])/BigIntUtils.gcd(...integers);
        }

        const firstTwo = BigIntFraction.lcm(integers[0], integers[1]);
        return BigIntFraction.lcm(firstTwo, ...[...integers].splice(2));
    }

    //static versions of add + other operations
    //these are not technically part of the interface but are included anyway
    static addBigIntFractionsArray(fracs: BigIntFraction[]): BigIntFraction {
        //start with fraction representing 0, then add all fractions to that
        return BigIntFraction.ZERO.addBigIntFractions(fracs);
    }

    static subtractBigIntFractionsArray(fracs: BigIntFraction[]): BigIntFraction {
        //as a shortcut, we'll subtract all fracs from 0, then add 2*frac[0]
        return BigIntFraction.ZERO
            .subtractBigIntFractions(fracs)
            .addBigIntFraction(
                fracs[0].multiplyBigIntFraction(new BigIntFraction(2n, 1n))
            );
    }

    static multiplyBigIntFractionsArray(fracs: BigIntFraction[]): BigIntFraction {
        //start with fraction representing 1, then multiply remaining fracs
        return BigIntFraction.ONE.multiplyBigIntFractions(fracs);
    }

    static divideBigIntFractionsArray(fracs: BigIntFraction[]): BigIntFraction {
        //create a fraction with first term in numerator and product of others in denominator
        //equivalent: multiply all fractions, divide by first term ^2
        return BigIntFraction.multiplyBigIntFractionsArray(fracs)
            .divideBigIntFraction(
                fracs[0].multiplyBigIntFraction(fracs[0])
            );
    }

}
