import { AbstractSolution, RunSolution } from "../../utils/solution";

@RunSolution
export class Solution45 extends AbstractSolution {

    getProblemName(): string {
        return "Triangular, Pentagonal, and Hexagonal";
    }

    protected solve() {
        return this.doSolve();
    }

    private doSolve(): number {
        for (let hexIndex=144; true; hexIndex++) {
            const hex = this.getNthHexagonal(hexIndex);
            if (this.isTrianglar(hex) && this.isPentagonal(hex)) {
                //return this.getNthTriangularInverse(hex);
                return hex;
            }
        }
    }

    /*private getNthTriangularInverse(n: number): number {
        const sqrt = Math.sqrt(1+8*n);
        return (sqrt-1)/2;
    }*/

    private isTrianglar(n: number): boolean {
        const sqrt = Math.sqrt(1+8*n);
        return sqrt % 2 === 1;
    }

    private isPentagonal(n: number): boolean {
        const squareRoot = Math.sqrt(1+24*n);
        return squareRoot % 6 === 5;
    }

    /*private isHexagonal(n: number): boolean {
        const squareRoot = Math.sqrt(1+8*n);
        return squareRoot % 4 === 3;
    }*/

    private getNthHexagonal(n: number): number {
        return n*(2*n-1);
    }

    /**
     * 
     * T(n) = n*(n*1)/2
     * ---> T(n) = 0.5*n**2 + 0.5*n
     * ---> n**2 + n - 2*T(n) = 0
     * ---> (-1 + Math.sqrt(1+8*T(n)))/2
     * ---> 1+8*T(n) is perfect square
     * ---> T(n) must be an odd number
     * 
     * ----------------------
     * 
     * H(n) = n*(2*n-1);
     * -----> H(n) = 2*n**2 - n
     * -----> 2*n**2 - n - H(n) = 0
     * -----> (1 + Math.sqrt(1+8*H(n)))/4
     * 
     */

}