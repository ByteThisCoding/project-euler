/**
 * Singleton which exposes functionality for permutations and combinations
 */
export class Combinations {

    /**
     * Choose n from r
     * @param n 
     * @param r 
     * @returns 
     */
    public static chooseNFromRCount(n: bigint, r: bigint): bigint {
        const nMinusR = n - r;
        const small = nMinusR < n ? nMinusR : n;
        const big = r === small ? nMinusR : r;
        return this.factorialOf(n, big) / this.factorialOf(small);
    }

    /**
     * Get the factorial of n
     * Also allows for dividing by another factorial
     * This uses bigints by default
     * @param n 
     * @param div 
     * @returns 
     */
    public static factorialOf(n: bigint, div: bigint = 1n): bigint {
        let product = 1n;
        for (let m=div+1n; m<=n; m++) {
            product *= m;
        }
        return product;
    }


    public static forEachNPermutations(n: number, choices: (number | string)[], callback: (perm: string) => any): void {
        this.doForEachNPossibilities(n, choices, true, callback);
    }

    public static forEachNPossibilities(n: number, choices: (number | string)[], callback: (perm: string) => any): void {
        this.doForEachNPossibilities(n, choices, false, callback);
    }

    public static getNPermutations(n: number, choices: (number | string)[]): string[] {
        const ar: string[] = [];
        this.doForEachNPossibilities(n, choices, true, (perm: string) => ar.push(perm));
        return ar;
    }

    public static getNPossibilities(n: number, choices: (number | string)[]): string[] {
        const ar: string[] = [];
        this.doForEachNPossibilities(n, choices, false, (perm: string) => ar.push(perm));
        return ar;
    }
    
    private static doForEachNPossibilities(n: number, choices: (number | string)[], unique: boolean, callback: (perm: string) => any): void {
        if (n === 0) {
            return;
        }
        if (n === 1) {
            for (let i=0; i<choices.length; i++) {
                const choice = choices[i];
                const response = callback(`${choice}`);
                if (response === false) {
                    return;
                }
            }
        }

        let keepGoing = true;

        for (let i = 0; keepGoing && i < choices.length; i++) {
            const choice = choices[i];
            const choicesRemaining = unique
                ? choices.filter((rchoice, index) => index !== i)
                : choices;
            
            this.doForEachNPossibilities(n - 1, choicesRemaining, unique, (substr) => {
                keepGoing = callback(`${choice}${substr}`) === false ? false : true;
                return keepGoing;
            });
        }
    }

    public static areDigitsPermutations(a: number, b: number): boolean {

        //reduce by 10s and count digits up and down
        const digitAr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        while (a > 10) {
            digitAr[a % 10]++;
            a = Math.floor(a / 10);
        }
        digitAr[a % 10]++;

        while (b > 10) {
            digitAr[b % 10]--;
            b = Math.floor(b / 10);
        }
        digitAr[b % 10]--;

        for (let i = 0; i < 10; i++) {
            if (digitAr[i] !== 0) {
                return false;
            }
        }

        return true;
    }

}