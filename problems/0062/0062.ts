import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution62 extends AbstractSolution {

    private cubeDigits = new Map<string, {count: number; smallestCube: number}>();

    getProblemName(): string {
        return "Cubic Permutations"
    }

    protected solve() {
        return this.doSolve(5);
    }

    private doSolve(numPerm: number): number {
        //find smallest cube with numPerm digits
        let cubeRt = 2;
        const limit = 10**(numPerm-1);
        while (cubeRt**3 < limit) {
            cubeRt ++;
        }

        for (cubeRt; true; cubeRt++) {
            const cube = cubeRt**3;
            const cubeDigits = Array.from(cube.toString()).sort().join();
            if (this.cubeDigits.has(cubeDigits)) {
                const prevValue = this.cubeDigits.get(cubeDigits)!;
                if (prevValue.count === numPerm-1) {
                    //return smallest cube with value
                    return prevValue.smallestCube;
                } else {
                    prevValue.count++;
                }
            } else {
                this.cubeDigits.set(
                    cubeDigits,
                    {
                        count: 1,
                        smallestCube: cube
                    }
                );
            }
        }
    }
}