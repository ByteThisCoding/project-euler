export class Combinations {

    public static chooseNFromRCount(n: bigint, r: bigint): bigint {
        const nMinusR = n - r;
        const small = nMinusR < n ? nMinusR : n;
        const big = r === small ? nMinusR : r;
        return this.factorialOf(n, big) / this.factorialOf(small);
    }

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

}