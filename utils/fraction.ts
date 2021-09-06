/**
* We also include some static methods to help us with implementations
* + static methods for operating over arrays of fractions
*/
export class Fraction {

    constructor(
        private readonly numerator: number,
        private readonly denominator: number
    ) {
        const reduction = this.reduce(numerator, denominator);
        this.numerator = reduction[0];
        this.denominator = reduction[1];

        //keep the negative sign in the numerator for consistency
        if (this.denominator < 0) {
            this.denominator *= -1;
            this.numerator *= -1;
        }
    }

    toString(): string {
        return this.numerator + "/" + this.denominator;
    }

    //accessor properties
    getNumerator(): number {
        return this.numerator;
    }
    
    getDenominator(): number {
        return this.denominator;
    }

    getReciprocal(): Fraction {
        return new Fraction(
            this.denominator,
            this.numerator
        );
    }

    toNumber(): number {
        return this.getNumerator() / this.getDenominator();
    }

    //equality and comparison
    equalTo(frac: Fraction): boolean {
        return frac.getNumerator() === this.getNumerator() && frac.getDenominator() === this.getDenominator();
    }

    compareTo(frac: Fraction): number {
        return this.toNumber() - frac.toNumber();
    }

    //operations will come in pairs for one vs many
    addFraction(frac: Fraction): Fraction {
        return this.addFractions([frac]);
    }
    addFractions(fracs: Fraction[]): Fraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: Fraction, b: Fraction): Fraction => {
            //add fractions by converting to a common multiple, then applying operation
            return new Fraction(
                a.getNumerator() * b.getDenominator() + b.getNumerator() * a.getDenominator(),
                a.getDenominator() * b.getDenominator()
            )
        });
    }

    subtractFraction(frac: Fraction): Fraction {
        return this.subtractFractions([frac]);
    }
    subtractFractions(fracs: Fraction[]): Fraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: Fraction, b: Fraction): Fraction => {
            //subtract fractions by converting to a common multiple, then applying operation
            return new Fraction(
                a.getNumerator() * b.getDenominator() - b.getNumerator() * a.getDenominator(),
                a.getDenominator() * b.getDenominator()
            )
        });
    }

    multiplyFraction(frac: Fraction): Fraction {
        return this.multiplyFractions([frac]);
    }
    multiplyFractions(fracs: Fraction[]): Fraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: Fraction, b: Fraction): Fraction => {
            return new Fraction(
                a.getNumerator() * b.getNumerator(),
                a.getDenominator() * b.getDenominator()
            )
        });
    }

    divideFraction(frac: Fraction): Fraction {
        return this.divideFractions([frac]);
    }
    divideFractions(fracs: Fraction[]): Fraction {
        //pass add operation into callback on operate
        return this.operate(fracs, (a: Fraction, b: Fraction): Fraction => {
            //divide fractions by multiplying the 2nd fraction's inverse
            //this way we will not run into any precision loss with division operations
            return new Fraction(
                a.getNumerator() * b.getDenominator(),
                a.getDenominator() * b.getNumerator()
            )
        });
    }

    /**
    * Helper method to facilitate performing some operation over multiple fractions
    */
    private operate(fractions: Fraction[], callback: (a: Fraction, b: Fraction) => Fraction): Fraction {
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
    private subOperate(fractions: Fraction[], callback: (a: Fraction, b: Fraction) => Fraction): Fraction {
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
    private reduce(numerator: number, denominator: number): [number, number] {
        const gcd = Fraction.gcd(numerator, denominator);
        return [numerator / gcd, denominator / gcd];
    }

    //some static utility functions and properties
    static readonly ZERO: Fraction = new Fraction(0, 1);
    static readonly ONE: Fraction = new Fraction(1, 1);

    /**
    * Get the greatest common denominator
    */
    static gcd(...integers: number[]): number {
        if (integers.length === 1) {
            return integers[0];
        }
        if (integers.length === 2) {
            return integers[1] ? Fraction.gcd(integers[1], integers[0] % integers[1]) : integers[0];
        }

        const firstTwo = Fraction.gcd(integers[0], integers[1]);
        return Fraction.gcd(firstTwo, ...[...integers].splice(2));
    }

    /**
    * Get the least common multiple
    */
    static lcm(...integers: number[]): number {
        if (integers.length === 1) {
            return integers[0];
        }
        if (integers.length === 2) {
            return (integers[0]*integers[1])/Fraction.gcd(...integers);
        }

        const firstTwo = Fraction.lcm(integers[0], integers[1]);
        return Fraction.lcm(firstTwo, ...[...integers].splice(2));
    }

    //static versions of add + other operations
    //these are not technically part of the interface but are included anyway
    static addFractionsArray(fracs: Fraction[]): Fraction {
        //start with fraction representing 0, then add all fractions to that
        return Fraction.ZERO.addFractions(fracs);
    }

    static subtractFractionsArray(fracs: Fraction[]): Fraction {
        //as a shortcut, we'll subtract all fracs from 0, then add 2*frac[0]
        return Fraction.ZERO
            .subtractFractions(fracs)
            .addFraction(
                fracs[0].multiplyFraction(new Fraction(2, 1))
            );
    }

    static multiplyFractionsArray(fracs: Fraction[]): Fraction {
        //start with fraction representing 1, then multiply remaining fracs
        return Fraction.ONE.multiplyFractions(fracs);
    }

    static divideFractionsArray(fracs: Fraction[]): Fraction {
        //create a fraction with first term in numerator and product of others in denominator
        //equivalent: multiply all fractions, divide by first term ^2
        return Fraction.multiplyFractionsArray(fracs)
            .divideFraction(
                fracs[0].multiplyFraction(fracs[0])
            );
    }

}
