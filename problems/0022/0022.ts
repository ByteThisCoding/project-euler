import { AbstractSolution, RunSolution } from "../../utils/solution";
import { SortedArray } from "@byte-this/collections";
import fs from "fs";

@RunSolution
export class Solution22 extends AbstractSolution {

    private words = new SortedArray(
        SortedArray.compareStrings
    );

    getProblemName(): string {
        return "Names Scores";
    }

    protected async solve(): Promise<number> {
        await this.readFile(__dirname+"/names.txt");
    
        let sum = 0;
        let pos = 1;
        for (let word of this.words) {
            const wordLetterSum = this.calcWordCharSum(word);
            const wordTotal = wordLetterSum * pos;
            sum += wordTotal;

            pos ++;
        }

        return sum;
    }

    private calcWordCharSum(word: string): number {
        return Array.from(word).reduce((acc, char) => {
            return acc + char.toUpperCase().charCodeAt(0) - 64;
        }, 0);
    }

    private async readFile(fileName: string): Promise<void> {
        return new Promise(resolve => {
            const readable = fs.createReadStream(fileName, {
                encoding: 'utf8'
            });
    
            readable.on('readable', () => {
                let char;
                let word = "";
                while (null !== (char = readable.read(1) /* here */)) {
                    if (char === ",") {
                        this.words.add(word);
                        word = "";
                    } else if (char !== '"') {
                        word += char;
                    }
                }
                this.words.add(word);
                resolve();
            });
        });
    }

}