import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution68 extends AbstractSolution {

    private choicesMap = new Map<string, number[][]>();

    getProblemName(): string {
        return "Magic 5-Gon Ring";
    }

    protected solve() {
        //return this.getMaxMagic(6, 3, Infinity);
        return this.getMaxMagic(10, 5, 16);
    }

    /***
     * Map choices permutation to seq:
     * :: 0, 1, 2
     * :: 3, 2, 4
     * :: 5, 4, 1
     * Index is from choice permutation
     * 
     */
    private getMaxMagic(upperNumber: number, numSums: number, maxLen: number): number {
        const seqPerms = this.getValidSeqPerms(upperNumber);

        const newAr = new Array(numSums * 3).fill(-1);

        let maxNumber = 0;
        for (let seqPermsIndex = 0; seqPermsIndex < seqPerms.length; seqPermsIndex++) {
            const seqEntries = seqPerms[seqPermsIndex];

            //convert the perms to a full sequence
            const seq: number[] = [...newAr];

            seq[0] = seqEntries[0];
            seq[1] = seqEntries[1];
            seq[2] = seqEntries[2];
            const initialSum = seq[0] + seq[1] + seq[2];

            seq[seq.length - 3] = seqEntries[seqEntries.length - 1];
            seq[seq.length - 2] = seqEntries[seqEntries.length - 2];
            seq[seq.length - 1] = seqEntries[1];

            let isValid = seq[seq.length - 3] + seq[seq.length - 2] + seq[seq.length - 1] === initialSum;
            for (let i = 3, seqOffset = 3; isValid && i < seqEntries.length - 1; i += 2, seqOffset += 3) {
                seq[seqOffset] = seqEntries[i];
                seq[seqOffset + 1] = seqEntries[i - 1];
                seq[seqOffset + 2] = seqEntries[i + 1];
				
                isValid = seq[seqOffset] + seq[seqOffset+1] + seq[seqOffset+2] === initialSum;
            }

            if (isValid) {
                const seqStr = seq.join("");
                if (seqStr.length <= maxLen) {
                    maxNumber = Math.max(
                        maxNumber,
                        parseInt(seqStr)
                    );
                }
            }

        }

        return maxNumber;
    }

    private getValidSeqPerms(upperNumber: number): number[][] {
        const choices = new Array(upperNumber).fill(0)
            .map((_, ind) => ind + 1);
        let seqPerms = this.getNumPerms(choices);
        //remove seq items if smallest leaf is not first
        seqPerms = seqPerms.filter(seq => {
            const first = seq[0];
            let isGood = true;
            for (let i = 3; isGood && i < seq.length; i += 2) {
                isGood = (first < seq[i]);
            }
            return isGood;
        });

        return seqPerms;
    }

    private getNumPerms(choices: number[]): number[][] {
        if (choices.length === 1) {
            return [choices];
        }

        const key = choices.join("");
        if (!this.choicesMap.has(key)) {
            const perms: number[][] = [];
            for (let i = 0; i < choices.length; i++) {
                const remaining = choices.filter(item => item !== choices[i]);
                const subChoices = this.getNumPerms(remaining);
                subChoices.forEach(sc => {
                    perms.push([choices[i], ...sc]);
                });
            }
            this.choicesMap.set(key, perms);
        }
        return this.choicesMap.get(key)!;
    }

}