import { AbstractSolution, RunSolution } from "../../utils/solution";
import fs from "fs";

@RunSolution
export class Solution42 extends AbstractSolution {

    getProblemName(): string {
        return "Coded Triangle Numbers";
    }

    protected solve() {
        return this.doSolve();
    }

    private async doSolve() {
        let numTriangleWords = 0;
        await this.readFile(__dirname+"/words.txt", (word: string) => {
            const wordValue = this.calcWordValue(word);
            if (this.isTriangleNumber(wordValue)) {
                numTriangleWords ++;
            }
        });
        return numTriangleWords;
    }

    private isTriangleNumber(n: number): boolean {
        /**
         * 
         * 55 =? 1/2*n*n + 1/2*n
         * 110 =? n^2 + n 
         * continue...
         * 
         */

        const doubleUpper = n*2;
        const floorSqrt = Math.floor(Math.sqrt(doubleUpper));
        return doubleUpper === floorSqrt**2 + floorSqrt;

    }

    private calcWordValue(word: string): number {
        return Array.from(word).reduce((acc, char) => {
            return acc + char.toUpperCase().charCodeAt(0) - 64;
        }, 0);
    }

    private async readFile(fileName: string, wordFoundCallback: (word: string) => any): Promise<void> {
        return new Promise(resolve => {
            const readable = fs.createReadStream(fileName, {
                encoding: 'utf8'
            });
    
            readable.on('readable', () => {
                let char;
                let word = "";
                while (null !== (char = readable.read(1) /* here */)) {
                    if (char === ",") {
                        wordFoundCallback(word);
                        word = "";
                    } else if (char !== '"') {
                        word += char;
                    }
                }
                wordFoundCallback(word)
                resolve();
            });
        });
    }

}