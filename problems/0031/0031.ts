import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution31 extends AbstractSolution {

    getProblemName(): string {
        return "Coin Sums";
    }

    protected solve() {
        return this.getNumChoices(200, [1, 2, 5, 10, 20, 50, 100, 200]);
    }

    /**
     * We'll use the classic coin sums dynamic algorithm for this
     * Build up a matrix of subproblems which will help with the main one
     * @param limit 
     * @param choices 
     * @returns 
     */
    private getNumChoices(limit: number, choices: number[]): number {
        const subProblemMatrix: number[][] = [];

        //when there are no choices, we have no ways to make the change
        subProblemMatrix.push(
            new Array(limit + 1).fill(0)
        );
        //we can make change for 0 pence with 0 coins
        subProblemMatrix[0][0] = 1;

        //for each choice, determine # ways we can make change for column
        for (let choiceIndex = 1; choiceIndex <= choices.length; choiceIndex ++) {
            const choice = choices[choiceIndex - 1];
            subProblemMatrix.push(
                new Array(limit + 1).fill(0)
            );

            for (let limitIt=0; limitIt<=limit; limitIt++) {
                const prevCoinChoices = subProblemMatrix[choiceIndex-1][limitIt];
                const nowChoicesColIndex = limitIt - choice;
                const nowChoicePlus = nowChoicesColIndex > -1
                    ? subProblemMatrix[choiceIndex][nowChoicesColIndex]
                    : 0;
                
                subProblemMatrix[choiceIndex][limitIt] = prevCoinChoices + nowChoicePlus;
            }
        }

        const subProblemLastRow = subProblemMatrix[subProblemMatrix.length - 1];
        return subProblemLastRow[subProblemLastRow.length - 1];
    }

}