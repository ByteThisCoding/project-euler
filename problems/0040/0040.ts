import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution40 extends AbstractSolution {

    getProblemName(): string {
        return "Champernowne's Constant";
    }

    protected solve() {
        const digits = this.getChampIndices([
            1,
            10,
            100,
            1000,
            10000,
            100000,
            1000000
        ]);
        return digits.reduce((acc, digit) => acc*digit, 1);
    }

    /**
     * Iterate over the Champernowne constant
     * Assumes indices are sorted in non-decreasing order
     * @param indices 
     * @returns 
     */
    private getChampIndices(indices: number[]): number[] {

        let findingIndex = indices[0];
        let currentIndex = 0;
        let digitAtIndices: number[] = [];

        for (let i=1; digitAtIndices.length < indices.length; i++) {
            
            const numStr = `${i}`;
            const numLength = numStr.length;

            if (findingIndex <= currentIndex + numLength) {
                const numIndex = findingIndex - currentIndex;
                digitAtIndices.push(parseInt(
                    numStr[numIndex-1]
                ));
                findingIndex = indices[digitAtIndices.length];
                i --;
            } else {
                currentIndex += numLength;
            }
        }
        return digitAtIndices;
    }

}