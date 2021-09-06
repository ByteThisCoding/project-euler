import { AbstractSolution, RunSolution } from "../../utils/solution";
import { Fraction } from "../../utils/fraction";

@RunSolution
export class Solution33 extends AbstractSolution {

    getProblemName(): string {
        return "Digit Cancelling Fractions";
    }

    protected solve() {
        return this.getCuriousFracProductDenominator();
    }

    private getCuriousFracProductDenominator(): number {

        let fractionProduct = new Fraction(1, 1);

        /**
         * (ad)/(db)
         * (da)/(bd)
         * 
         * a !== d, b !== d
         */

        //d is the "common digit"
        for (let d = 1; d < 10; d++) {

            //a is denominator non-common digit
            for (let a = 1; a < 10; a++) {

                if (a !== d) {

                    const denominatorLeft = parseInt(`${d}${a}`);
                    const denominatorRight = parseInt(`${a}${d}`);

                    //b is numerator non-common digit
                    for (let b = 1; b < a; b++) {

                        if (b !== d) {
                            const numeratorLeft = parseInt(`${b}${d}`);
                            const numeratorRight = parseInt(`${d}${b}`);

                            const fractionLeft = new Fraction(
                                numeratorLeft,
                                denominatorLeft
                            );

                            const fractionRight = new Fraction(
                                numeratorRight,
                                denominatorRight
                            );

                            const abFrac = new Fraction(
                                b,
                                a
                            );

                            if (fractionLeft.equalTo(abFrac) || fractionRight.equalTo(abFrac)) {
                                fractionProduct = fractionProduct.multiplyFraction(abFrac);
                                /*console.log({
                                    ab: abFrac.toString(),
                                    left: fractionLeft.toString(),
                                    right: fractionRight.toString()
                                });*/
                            }
                        }

                    }

                }
            }

        }

        return fractionProduct.getDenominator();
    }

}