export class Combinations {

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

        //let allChoices: string[] = [];

        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            const choicesRemaining = unique
                ? choices.filter(rchoice => rchoice !== choice)
                : choices;

            const subChoices = this.getNPermutations(n - 1, choicesRemaining);
            for (let sIndex = 0; sIndex < subChoices.length; sIndex++) {
                const substr = subChoices[sIndex];
                const response = callback(`${choice}${substr}`);
                if (response === false) {
                    return;
                }
            }
        }
    }

}