import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";

@RunSolution
export class Solution89 extends AbstractSolution {

    //we're including chars with subtractions
    private romanCharMap: {[key: string]: number} = {
        "I": 1,
        "IV": 4,
        "V": 5,
        "IX": 9,
        "X": 10,
        "XL": 40,
        "L": 50,
        "XC": 90,
        "C": 100,
        "CD": 400,
        "D": 500,
        "CM": 900,
        "M": 1000
    };
    //key values reversed from prev
    private numberCharMap = Object.entries(this.romanCharMap)
        .reduce((obj, entry) => {
            obj[entry[1]] = entry[0];
            return obj;
        }, {} as {[key: number]: string});

    getProblemName(): string {
        return "Roman Numerals";
    }
    
    protected solve() {
        //return this.romanToNumber("XVI");
        //return this.numberToRoman(14);
        /*const num = this.romanToNumber("MMMMDCCCCXXXXVI");
        return this.numberToRoman(num);*/
        return this.doSolve();
    }

    /**
     * For each input roman numeral:
     * 1. Convert to number
     * 2. Convert back to roman numeral
     * 3. Compare input to new roman numeral
     */
    private doSolve(): number {
        let charDiffSum = 0;
        const romans = this.readFile();
        for (const roman of romans) {
            const initialCount = roman.length;
            const romanNumber = this.romanToNumber(roman);
            const newRoman = this.numberToRoman(romanNumber);
            charDiffSum += initialCount - newRoman.length;
        }
        return charDiffSum;
    }

    /**
     * Convert a valid roman numeral to a number
     * @param roman 
     */
    private romanToNumber(roman: string): number {
        let sum = 0;
        let lastDistinctChar = "";
        let lastDistinctCharValue = -1;
        //read from right to left
        for (let i=roman.length - 1; i>=0; i--) {
            const char = roman[i];
            const charValue = this.romanCharMap[char];
            
            if (charValue < lastDistinctCharValue) {
                sum -= charValue;
            } else {
                sum += charValue;
            }

            if (char !== lastDistinctChar) {
                lastDistinctChar = char;
                lastDistinctCharValue = charValue
            }
        }
        return sum;
    }

    /**
     * Convert a number to the roman numeral
     *      with the least possible number of chars
     * @param n 
     */
    private numberToRoman(n: number): string {
        const numKeys = Object.keys(this.numberCharMap)
            .map(key => parseInt(key))
            .sort((a, b) => b - a);

        //also reduce to initial string
        let smallest = "";
        for (const key of numKeys) {
            if (key <= n) {
                const multiple = Math.floor(n / key);
                n = n % key;

                smallest += this.numberCharMap[key].repeat(multiple);
            }
        }
        
        return smallest;
    }

    private readFile(): string[] {
        const fileContents = fs.readFileSync(__dirname + "/roman.txt", "utf-8");
        return fileContents.split("\r\n");
    }

}