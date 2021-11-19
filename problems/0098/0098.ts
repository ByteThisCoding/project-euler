import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";
import { BigIntUtils } from "../../utils/bigint-utils";

@RunSolution
export class Solution98 extends AbstractSolution {

    /**
     * Map the sorted letters of a word to a set
     *  of all words which have those exact letters
     */
    private reducedWords: {[key: string]: Set<string>} = {};

    //a map of # digits in a square to an array of squares
    private squareDigitsMap: bigint[][] = [[]];

    getProblemName(): string {
        return "Anagramic Squares";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Iterate over anagrams, store in cache, and process
     */
    private async doSolve(): Promise<bigint> {
        const wordLens = new Set<number>();
        //read each word and add to map
        await this.readWords(word => {
            const reduced = this.reduceWord(word);
            let wordSet: Set<string>;
            if (this.reducedWords[reduced]) {
                wordLens.add(word.length);
                wordSet = this.reducedWords[reduced]
            } else {
                wordSet = new Set<string>();
                this.reducedWords[reduced] = wordSet;
            }
            wordSet.add(word);
        });

        //find all squares which have <= longestWordLen digits
        this.populateSquares(wordLens);
        
        //with prep work done, find the value
        return this.findLargestSquare();
    }

    /**
     * For each word that is an anagram
     * : for each square with word.length digits
     * : check if any other anagrams also produce a square
     */
    private findLargestSquare(): bigint {

        let largestSquare = -1n;
        const wordsValues = Object.values(this.reducedWords);

        let visitedSets = new Set<Set<string>>();
        for (const wordSet of wordsValues) {
            if (wordSet.size > 1) {
                if (!visitedSets.has(wordSet)) {
                    const thisSquare = this.findLargestSquareForWordSet(wordSet);
                    largestSquare = thisSquare > largestSquare
                        ? thisSquare : largestSquare;
                    visitedSets.add(wordSet);
                }
            }    
        }

        return largestSquare;
    }

    /**
     * For the words in a set (anagrams)
     * : Iterate over words
     * : Find squares whose digits can be matched
     * : Iterate over remaining words
     * : Check if we can match digits from the same square
     * : If so, and if same # digits, assign if larger
     * : Return largest
     * ASSUMED: set has more than one element
     * @param words 
     * @returns 
     */
    private findLargestSquareForWordSet(words: Set<string>): bigint {
        let largestSquare = -1n;

        //for each word, check against the remaining words
        const wordsArray = Array.from(words);
        const squares = this.squareDigitsMap[wordsArray[0].length-1];

        //for each word
        for (let left=0; left<wordsArray.length-1; left++) {
            const leftWord = wordsArray[left];

            //for each square of this size 
            for (const square of squares) {
                let squareMatches = true;

                //create a char to digit map
                const charMap: {[key: string]: bigint} = {};
                const digitSet = new Set<bigint>();
                for (let i=0n; squareMatches && i<leftWord.length; i++) {
                    //grab the ith digit
                    const lenMinus = BigInt(leftWord.length) - i - 1n;
                    const calcDigit = square / 10n**lenMinus % 10n;

                    //make sure we don't assign a different digit to an existing assignment
                    const numI = Number(i);
                    if (charMap[leftWord[numI]] && charMap[leftWord[numI]] !== calcDigit) {
                        squareMatches = false;
                    } else {
                        if (digitSet.has(calcDigit)) {
                            squareMatches = false;
                        } else {
                            charMap[leftWord[numI]] = calcDigit;
                            digitSet.add(calcDigit);
                        }
                    }
                }

                for (let right=left+1; squareMatches && right<wordsArray.length; right++) {
                    const rightWord = wordsArray[right];

                    let rightNumber = 0n;
                    for (let i=0n; i<rightWord.length; i++) {
                        const iMinus = BigInt(rightWord.length - 1) - i;
                        rightNumber += charMap[rightWord[Number(i)]]
                            * 10n**(iMinus);
                    }

                    //if this is a square, consider a candidate
                    if (BigIntUtils.isPerfectSquare(rightNumber)) {
                        //if both squares have the same order of magnitude
                        if (BigIntUtils.log10(rightNumber) === BigIntUtils.log10(square)) {
                            largestSquare = rightNumber > largestSquare
                                ? rightNumber : largestSquare;
                        }
                    }
                }
            }
        }

        return largestSquare;
    }

    private populateSquares(wordLens: Set<number>): void {

        //find the limit
        let largestWordLen = 0;
        wordLens.forEach(len => {
            largestWordLen = Math.max(len, largestWordLen);
        });

        let sqrOffset = 1n;
        for (let sqr = 1n; true; sqrOffset += 2n, sqr += sqrOffset) {
            const numDigits = BigIntUtils.log10(sqr);
            const numDigitsCast = Number(numDigits);
            if (numDigits > largestWordLen) {
                break;
            }

            if (wordLens.has(numDigitsCast)) {
                while (this.squareDigitsMap.length <= numDigitsCast) {
                    this.squareDigitsMap.push([]);
                }
                this.squareDigitsMap[numDigitsCast].push(sqr);
            }
        }
    }

    /**
     * Reduce a word to a string with sorted letters
     */
    private reduceWord(word: string): string {
        return Array.from(word).sort().join("");
    }

    /**
     * Stream file and invoke callback on each word
     * @param callback 
     */
    private async readWords(callback: (word: string) => any) {
        return new Promise(resolve => {
            var readable = fs.createReadStream(__dirname+"/words.txt", {
                encoding: 'utf8'
            });
            readable.on('readable', function () {
                let char; //character will be put here
                let wordSoFar = "";
                while (null !== (char = readable.read(1))) {
                    switch (char) {
                        case '"':
                            if (wordSoFar !== "") {
                                callback(wordSoFar);
                                wordSoFar = "";
                            }
                            break;
                        case ",":
                            break;
                        default:
                            wordSoFar += char;
                            break;
                    }
                }

                resolve(void 0);
            });
        });
    }
}