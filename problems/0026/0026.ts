import { iSortedList, SortedArray } from "@byte-this/collections";
import { Equals } from "@byte-this/funscript";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution26 extends AbstractSolution {

    getProblemName(): string {
        return "Reciprocal Cycles";
    }

    protected solve(): any {
        let longestRecurN = 0;
        let longestRecurCount = 0;
        for (let i=2; i<1000; i++) {
            const iRecur = this.findRecurring(i);
            if (iRecur > longestRecurCount) {
                longestRecurCount = iRecur;
                longestRecurN = i;
            }
        }
        return longestRecurN;
    }

    private findRecurring(denom: number): number {

        let seqValues: iSortedList<{
            seqDigit: number;
            subResult: number;
            index: number;
        }> = new SortedArray(
            (a, b) => {
                if (a.seqDigit === b.seqDigit) {
                    return a.subResult - b.subResult;
                }
                return a.subResult - b.subResult
            }
        );

        let prevValues = {
            seqDigit: 0,
            subResult: 1,
            index: -1
        };

        while (true) {
            let subNum = prevValues.subResult *
                (10 ** 
                    (1+Math.floor(Math.log10(denom) - Math.log10(prevValues.subResult)))
            );
            let seqDigit = Math.floor(subNum/denom);
            let subValue = seqDigit*denom;
            let subResult = subNum - subValue;

            if (subResult === 0) {
                break;
            }

            const newEntry = {
                seqDigit,
                subResult,
                index: prevValues.index + 1
            };
            
            //if (!!seqValues.find(item => Equals(item, newEntry))) {
            if (seqValues.contains(newEntry)) {
                break;
            } else {
                seqValues.add(newEntry);
                prevValues = newEntry;
            }
        }

        return seqValues.length;
        /*return seqValues.toArray().sort((a, b) => a.index - b.index)
            .map(item => item.seqDigit);*/
    }

    /***
     * 
     * 
     * 1/3
     * 
     *  __0.33
     * 3| 1.0
     *      9
     *     __
     *      10
     * 
     *  __0.142
     * 7| 1.00
     *      7
     *     __
     *      30
     *      27
     *      __
     * 
     */

}