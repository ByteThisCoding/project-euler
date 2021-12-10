import { AbstractSolution, RunSolution } from "../../utils/solution";
import { AvlSortedList } from "@byte-this/collections";
import fs from "fs";

@RunSolution
export class Solution22 extends AbstractSolution {

    /**
     * We'll use a sorted array to guarantee the array remains sorted as we make insertions
     * This saves time as opposed to sorting the array afterwords
     */
    private words = new AvlSortedList(
        AvlSortedList.compareStrings
    );

    getProblemName(): string {
        return "Names Scores";
    }

    /**
     * Read in words, sort as we insert, then calc sum
     * @returns 
     */
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

    /**
     * For each character:
     *      map to the letter number as described in the problem and add up
     * @param word 
     * @returns 
     */
    private calcWordCharSum(word: string): number {
        let acc = 0;
        for (let i=0; i<word.length; i++) {
            acc += word.charCodeAt(i) - 64;
        }

        return acc;

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