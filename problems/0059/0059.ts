import { Combinations } from "../../utils/combinations";
import { AbstractSolution, RunSolution } from "../../utils/solution";
const fs = require("fs");

@RunSolution
export class Solution59 extends AbstractSolution {

    getProblemName(): string {
        return "XOR Decryption";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        const cipherCodes = this.loadCodes();
        const letters = new Array(26).fill(0).map((_, index) => 97+index).map(
            code => String.fromCharCode(code)
        );
        let sum = -1;
        Combinations.forEachNPossibilities(3, letters, pwdThree => {
            sum = this.decipherText(pwdThree, cipherCodes);
            if (sum > -1) {
                //stop generating possibilities
                return false;
            }
        });
        return sum;
    }

    private decipherText(pwdThree: string, codes: number[]): number {
        const commonWords = [
            "and",
            "the",
            "is"
        ];

        const pwdCodes = Array.from(pwdThree).map(char => char.charCodeAt(0));

        const plainCodes = codes.map((code, index) => pwdCodes[index % 3]^code);
        const plainText = plainCodes.reduce((str, code) => {
            return str + String.fromCharCode(code);
        }, "");

        let hasCommonWords = true;
        for (let i=0; hasCommonWords && i<commonWords.length; i++) {
            const word = commonWords[i];
            if (plainText.indexOf(" "+word) === -1 && plainText.indexOf(word+" ") === -1) {
                hasCommonWords = false;
            }
        }

        if (hasCommonWords) {
            console.log(plainText);
            return plainCodes.reduce((acc, code) => acc + code);
        } else {
            return -1;
        }
    }

    private loadCodes(): number[] {
        const codesStr = fs.readFileSync(__dirname+"/p059_cipher.txt", "utf-8");
        return codesStr.split(",").map((code: string) => parseInt(code));
    }

}


//Plain Text
/*
An extract taken from the introduction of one of Euler's most celebrated papers, "De summis serierum reciprocarum" [On the sums of series of reciprocals]: I have recently found, quite unexpectedly, an elegant expression for the entire sum of this series 1 + 1/4 + 1/9 + 1/16 + etc., which depends on the quadrature of the circle, so that if the true sum of this series is obtained, from it at once the quadrature of the circle follows. Namely, I have found that the sum of this series is a sixth part of the square of the perimeter of the circle whose diameter is 1; or by putting the 
sum of this series equal to s, it has the ratio sqrt(6) multiplied by s to 1 of the perimeter to the diameter. I will soon show that the sum of this series to be approximately 1.644934066842264364; and from multiplying this number by 
six, and then taking the square root, the number 3.141592653589793238 is indeed produced, which expresses the perimeter of a circle whose diameter is 1. Following again the same steps by which I had arrived at this sum, I have discovered that the sum of the series 1 + 1/16 + 1/81 + 1/256 + 1/625 + etc. also depends on the quadrature of the circle. Namely, the sum of this multiplied by 90 gives the biquadrate (fourth power) of the circumference of the perimeter of 
a circle whose diameter is 1. And by similar reasoning I have likewise been able to determine the sums of the subsequent series in which the exponents are even numbers.
*/