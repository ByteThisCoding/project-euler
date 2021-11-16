import { AbstractSolution, RunSolution } from "../../utils/solution";
import * as fs from "fs";

@RunSolution
export class Solution99 extends AbstractSolution {

    getProblemName(): string {
        return "Largest Exponential";
    }
    
    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        const pairs = this.readFile();

        let maxLine = 0;
        let maxValue = 0;

        pairs.forEach(([base, exp], ind) => {
            const thisValue = this.getMagnitudeValue(base, exp);
            if (thisValue > maxValue) {
                maxValue = thisValue;
                maxLine = ind + 1;
            }
        });

        return maxLine;
    }

    /**
     * Given a base and power, get some value which will be
     *      useful in comparing against other values
     */
    private getMagnitudeValue(base: number, exp: number): number {
        //convert so we can handle everything in log2, then compare new exponents
        return Math.log2(base)*exp;
    }

    private readFile(): number[][] {
        const fileContents = fs.readFileSync(__dirname + "/base_exp.txt", "utf-8");
        return fileContents.split("\r\n")
            .map(line => line.split(",").map(n => parseInt(n)));
    }

}