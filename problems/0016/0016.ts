import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution16 extends AbstractSolution {

    getProblemName(): string {
        return "Power Digit Sum";
    }

    protected solve(): bigint {
        const bigPower = 2n ** 1000n;
        const bigStr = bigPower.toString();

        let sum = 0n;
        for (let i=0; i<bigStr.length; i++) {
            const char = bigStr.substring(i, i+1);
            sum += BigInt(char);
        }

        return sum;
        
    }

}