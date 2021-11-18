import { HeptagonalSequence } from "../../utils/polygonal-seq/heptagonal-seq";
import { HexagonalSequence } from "../../utils/polygonal-seq/hexagonal-seq";
import { OctagonalSequence } from "../../utils/polygonal-seq/octagonal-seq";
import { PentagonalSequence } from "../../utils/polygonal-seq/pentagonal-seq";
import { SquareSequence } from "../../utils/polygonal-seq/square-seq";
import { TriangleSequence } from "../../utils/polygonal-seq/triangle-seq";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution61 extends AbstractSolution {

    private seqNames = ["triangle", "square", "pentagonal", "hexagonal", "heptagonal", "octagonal"];

    getProblemName(): string {
        return "Cyclical Figurate Numbers";
    }

    protected solve() {
        return this.iterateSeq(1_000, 10_000, "triangle");
    }

    /**
     * Iterate a sequence over a given range
     * Recursive implementation follows sequences down and tightens up the possible ranges
     * @param rangeStart 
     * @param rangeEnd 
     * @param currentSeq 
     * @param initialValue 
     * @param seqVisited 
     * @returns 
     */
    private iterateSeq(rangeStart: number, rangeEnd: number, currentSeq: string, initialValue: number = -1, seqVisited: string[] = []): number {

        const seqClass = this.getSeqClasses(currentSeq);
        seqVisited = [...seqVisited, currentSeq];
        const nextSequences = this.getUnvisitedSeq(seqVisited);

        const rangeValues = seqClass.getItemsInValueRange(rangeStart, rangeEnd);

        let subSum = Infinity;
        for (let i = 0; subSum === Infinity && i < rangeValues.length; i++) {

            const seqItem = rangeValues[i];

            const lastTwoStr = seqItem.toString().substring(2);
            const lastTwo = parseInt(lastTwoStr);
            const nextRangeStart = lastTwo * 100;
            const nextRangeEnd = nextRangeStart + 100;

            if (nextRangeStart > 999) {

                if (nextSequences.length === 0) {
                    if (lastTwoStr === initialValue.toString().substring(0, 2)) {
                        subSum = seqItem
                    }
                } else {
                    const nextInitialValue = initialValue > -1 ? initialValue : seqItem;
                    for (let nextSeqIndex = 0; subSum === Infinity && nextSeqIndex < nextSequences.length; nextSeqIndex++) {
                        const nextSeqClass = nextSequences[nextSeqIndex];
                        const recSum = this.iterateSeq(nextRangeStart, nextRangeEnd, nextSeqClass, nextInitialValue, seqVisited);
                        if (recSum !== Infinity) {
                            subSum = recSum + seqItem;
                        }
                    }
                }
            }

        }

        return subSum;
    }

    /**
     * Get the sequence class based on the string name
     * @param currentSeq 
     * @returns 
     */
    private getSeqClasses(currentSeq: string): any {
        let seqClass: any;
        switch (currentSeq) {
            case "triangle":
                seqClass = TriangleSequence;
                break;
            case "square":
                seqClass = SquareSequence;
                break;
            case "pentagonal":
                seqClass = PentagonalSequence;
                break;
            case "hexagonal":
                seqClass = HexagonalSequence;
                break;
            case "heptagonal":
                seqClass = HeptagonalSequence;
                break;
            case "octagonal":
                seqClass = OctagonalSequence;
                break;
        }

        return seqClass
    }


    /**
     * Given a string of visited sequences, check which ones we have left
     * @param visitedSeq 
     * @returns 
     */
    private getUnvisitedSeq(visitedSeq: string[]): string[] {
        return this.seqNames.filter(
            className => visitedSeq.indexOf(className) === -1
        );
    }
}