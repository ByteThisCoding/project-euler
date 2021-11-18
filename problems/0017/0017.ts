import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution17 extends AbstractSolution {

    /**
     * This is an array which has a function in each index
     * ar[0] = num letters for any value < 10
     * ar[1] = num letters for any value < 100
     * etc...
     * 
     * Higher functions will use lower functions for those parts of the value
     */
    numWordsMap: ((value: number) => number)[] = [
        //where order of mangitude = 0
        (value: number): number => {
            const digitOne = Math.floor(value) % 10;
            switch (digitOne) {
                case 0:
                    return 0;
                case 1: //one
                case 2: //two
                case 6: //six
                    return 3;
                case 4: //four
                case 5: //five
                case 9: //nine
                    return 4;
                default: //3,7,8 eight
                    return 5;
            }
        },
        //where order of magnitude = 1
        (value: number): number => {
            const digitOne = Math.floor(value) % 10;
            const digitTwo = Math.floor(value / 10) % 10;
            const digitOneNorm: number = this.numWordsMap[0](digitOne);
            switch (digitTwo) {
                case 0:
                    return digitOneNorm;
                case 1:
                    /* special case */
                    switch (digitOne) {
                        case 0: //ten
                            return 3;
                        case 1: //eleven
                        case 2: //twelve
                            return 6;
                        case 3: //thirteen
                        case 4: //fourteen
                        case 8: //eighteen
                        case 9: //nineteen
                            return 8;
                        case 5: //fifteen
                        case 6: //sixteen
                            return 7;
                        default: //7
                            return 9;
                    }
                case 2: //twenty
                case 3: //thirty
                case 8: //eighty
                case 9: //ninety
                    return 6 + digitOneNorm;
                case 4: //forty
                case 5: //fifty
                case 6: //sixty
                    return 5 + digitOneNorm;
                default: //seventy 7
                    return 7 + digitOneNorm;

            }
        },
        //order of magnitude = 2
        (value: number): number => {
            const digitOneTwo = Math.floor(value) % 100;

            const digitThree = Math.floor(value / 100) % 10;

            if (digitThree === 0) {
                return this.numWordsMap[1](value);
            }

            const digitThreeLen = this.numWordsMap[0](digitThree);

            const hundLen = "hundred".length;
            const andLen = 3;

            return digitThreeLen + hundLen +
                (digitOneTwo === 0 ? 0 : andLen + this.numWordsMap[1](digitOneTwo));
        }
    ];

    getProblemName(): string {
        return "Number Letter Counts";
    }

    protected solve(): number {
        let totalNumLetters = 0;
        for (let n = 1; n < 1000; n++) {
            totalNumLetters += this.numWordsMap[2](n);
        }
        //handle special case separately
        totalNumLetters += "onethousand".length;

        return totalNumLetters;
    }

}