import { Fraction } from "../../utils/fraction";
import { MarkovChainMatrix, Matrix } from "../../utils/matrix";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution84 extends AbstractSolution {

    getProblemName(): string {
        return "Monopoly Odds";
    }

    protected solve() {
        return this.doSolve(4);
    }

    /**
     * We will represent this as a Markov chain
     * Current state / likelihood of positions doesn't depend on previous moves
     * Reference: https://en.wikipedia.org/wiki/Markov_chain
     * @param die 
     */
    private doSolve(dieSize: 4 | 6): string {
        const markovChain = this.createMarkovChain(dieSize);
        
        //we can't use Matrix.getProbs because this matrix is large
        //we will use an estimation method instead
        const probEst = this.estimateEndStateProbabilities(markovChain);

        //copy array so we don't sort original one
        const probEstSorted = [...probEst].sort((a, b) => b.compareTo(a));

        const largest = ["", "", ""];
        for (let i=0; i<probEst.length; i++) {
            if (probEstSorted[0] === probEst[i]) {
                largest[0] = `${i}`.padStart(2, "0");
            } else if (probEstSorted[1] === probEst[i]) {
                largest[1] = `${i}`.padStart(2, "0");
            } else if (probEstSorted[2] === probEst[i]) {
                largest[2] = `${i}`.padStart(2, "0");
            }
        }

        return largest.join("");
    }

    /**
     * Create a 40x40 matrix which represents likelihood of transitioning from one state to another
     */
    private createMarkovChain(dieSize: 4 | 6): MarkovChainMatrix {
        //setup array of chances (1 = 0 because 2 die can't roll 1)
        const dieChances: number[] = new Array(dieSize * 2 + 1).fill(0);
        //let dieChancesSum = 0;
        for (let i = 1; i <= dieSize; i++) {
            for (let j = 1; j <= dieSize; j++) {
                dieChances[i + j]++;
                //dieChancesSum++;
            }
        }

        //put special pos indices into consts
        const GO_POS = 0;
        const JAIL_POS = 10;
        const GO_TO_JAIL_POS = 30;
        const C1_POS = 11;
        const E3_POS = 24;
        const H2_POS = 39;
        const R1_POS = 5;

        const C_CHEST_POSS = [2, 17, 33];
        const CHANCE_POSS = [7, 22, 36];

        //create transition matrix, account for special cases
        const transitionMatrix: Fraction[][] = [];
        for (let square = 0; square < 40; square++) {
            let squareRow: number[] = new Array(40).fill(0);

            //for each position 2 -> diceSize*2, get prob & factor in cards
            for (let nextSquare = 2; nextSquare <= dieSize * 2; nextSquare++) {
                const nextChance = dieChances[nextSquare]*16;
                const nextPos = (square + nextSquare) % 40;

                if (nextPos === GO_TO_JAIL_POS) {
                    squareRow[JAIL_POS] += nextChance;
                } else if (C_CHEST_POSS.includes(nextPos)) {
                    //nextChance/16 chance GO, nextChance/16 chance JAIL, (14*nextChance)/16 chance nextPos
                    squareRow[GO_POS] += nextChance/16;
                    squareRow[JAIL_POS] += nextChance/16;
                    squareRow[nextPos] += 14 * nextChance/16;

                } else if (CHANCE_POSS.includes(nextPos)) {

                    squareRow[GO_POS] += nextChance/16;
                    squareRow[JAIL_POS] += nextChance/16;
                    squareRow[C1_POS] += nextChance/16;
                    squareRow[E3_POS] += nextChance/16;
                    squareRow[H2_POS] += nextChance/16;
                    squareRow[R1_POS] += nextChance/16;

                    //next railway pos
                    const nextRailPos = (Math.ceil(square / 10) * 10 + 5) % 40;
                    squareRow[nextRailPos] += 2 * nextChance/16;

                    //next utility pos
                    const nextUtilPos = (square > 28 || square < 12) ? 12 : 28;
                    squareRow[nextUtilPos] += nextChance/16;

                    //back 3 squares
                    const backThreePos = (nextPos + 40 - 3) % 40;
                    squareRow[backThreePos] += nextChance/16;

                    squareRow[nextPos] += 6 * nextChance/16;
                } else {
                    squareRow[nextPos] += nextChance;
                }
            }
            transitionMatrix.push(squareRow.map(
                item => new Fraction(item, 16)
            ));
        }

        //console.log(transitionMatrix);
        return new MarkovChainMatrix(transitionMatrix);
    }

    /**
     * A real / final calculation is very expensive
     * We will use an approximation approach
     * @param markovChain 
     * @returns 
     */
    private estimateEndStateProbabilities(markovChain: MarkovChainMatrix): Fraction[] {
        //60 is picked arbitrarily as number of operations
        //higher = more precise, lower = faster performance
        const estimateMatrix = markovChain.getNthPower(37);
        const estAr = estimateMatrix.toArray();

        //rows represent starting from 0, as all Monopoly games do
        return estAr[0];
    }

}