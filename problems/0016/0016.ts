import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution16 extends AbstractSolution {

    getProblemName(): string {
        return "Power Digit Sum";
    }

    protected solve(): number {
        //use a bigint to perform the power operation
        const bigPower = 2n ** 1000n;

        //convert to string so we can iterate over chars
        const bigStr = bigPower.toString();

        //for each char, convert to number and add to sum
        let sum = 0;
        for (let i=0; i<bigStr.length; i++) {
            const char = bigStr.substring(i, i+1);
            sum += parseInt(char);
        }

        return sum;
        
    }

}