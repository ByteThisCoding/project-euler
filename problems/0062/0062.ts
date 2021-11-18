import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution62 extends AbstractSolution {

    //cache to reduce redundant operations
    private cubeDigits = new Map<string, {count: number; smallestCube: number}>();

    getProblemName(): string {
        return "Cubic Permutations"
    }

    protected solve() {
        return this.doSolve(5);
    }

    /**
     * Find the smallest cube with numPerm digits,
     * Then, increment over further cubes until we find what we need
     * @param numPerm 
     * @returns 
     */
    private doSolve(numPerm: number): number {
        let cubeRt = 2;
        const limit = 10**(numPerm-1);
        while (cubeRt**3 < limit) {
            cubeRt ++;
        }

        //keep incrementing 
        for (cubeRt; true; cubeRt++) {
            const cube = cubeRt**3;
            const cubeDigits = Array.from(cube.toString()).sort().join();
            //check if we've already done this number
            if (this.cubeDigits.has(cubeDigits)) {
                const prevValue = this.cubeDigits.get(cubeDigits)!;
                if (prevValue.count === numPerm-1) {
                    //return smallest cube with value
                    return prevValue.smallestCube;
                } else {
                    prevValue.count++;
                }
            } else {
                //update the cache for further use
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