import { Combinations } from "../../utils/combinations";
import { Primes } from "../../utils/primes";
import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution41 extends AbstractSolution {

    getProblemName(): string {
        return "Pandigital Prime";
    }

    protected solve() {
        return this.doSolve();
    }

    /**
     * Keep iterating over different pandigitals of "i" length until we find something
     * Search high to low
     * @returns 
     */
    private doSolve(): number {
        let permutations = Combinations.getNPermutations(9, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

        let largestPrime = -1;

        const permsSet = new Set<string>();
        for (let i = 9; largestPrime === -1 && i > 1; i--) {
            const iStr = i.toString();

            for (let permIndex = 0; permIndex < permutations.length; permIndex++) {
                const perm = permutations[permIndex];
                const newPerm = perm.replace(iStr, "");

                permsSet.add(newPerm);
                const permNumber = parseInt(perm);

                if (Primes.isPrime(permNumber)) {
                    largestPrime = Math.max(permNumber, largestPrime);
                }
            }

            permutations = Array.from(permsSet);
            permsSet.clear();
        }

        return largestPrime;
    }

}