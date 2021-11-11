import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution87 extends AbstractSolution {

    private squares = new Set<number>();
    private cubes = new Set<number>();
    private hyperCubes = new Set<number>();

    getProblemName(): string {
        return "Prime Power Triples";
    }

    protected solve() {
        //return this.doSolve(50);
        return this.doSolve(50_000_000);
    }

    private doSolve(limit: number): number {

        Primes.iterateOverPrimes((prime: number, stop: Function) => {
            const keepGoing = this.generateForPrime(prime, limit);
            if (!keepGoing) {
                stop();
            }
        });

        //create sums of hyperCubes and Cubes
        const hcCubeSums = new Set<number>();
        this.cubes.forEach(cube => {

            for (const hyperCube of this.hyperCubes) {
                const sum = cube + hyperCube;
                if (sum < limit) {
                    hcCubeSums.add(sum);
                } else {
                    break;
                }
            }
        });

        //count total sums
        const sums = new Set<number>();
        hcCubeSums.forEach(hcSum => {

            for (const sq of this.squares) {
                const sum = sq + hcSum;
                if (sum < limit) {
                    sums.add(sum);
                } else {
                    break;
                }
            }
        })

        return sums.size;
    }

    /**
     * Generate squares, cubes, and hyperCubes for a particular n
     * @param n 
     * @param limit 
     */
    private generateForPrime(prime: number, limit: number): boolean {

        //generate for future use
        const nSquare = prime ** 2;

        if (nSquare < limit) {
            this.squares.add(nSquare);
            const nCube = nSquare * prime;
            if (nCube < limit) {
                this.cubes.add(nCube);
                const nHyperCube = nCube * prime;
                if (nHyperCube < limit) {
                    this.hyperCubes.add(nHyperCube);
                }
            }
            return true;
        } else {
            return false;
        }

    }

}